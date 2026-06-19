import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;
const DATA_DIR = path.join(__dirname, 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const BOT_SECRET = process.env.BOT_SECRET || 'demo-secret-123';
const WHATSAPP_SUCCESS_REPLY = 'Randevu talebiniz al\u0131nd\u0131. Klinik onay\u0131ndan sonra size bilgi verilecektir.';
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;
const PHONE_PATTERN = /^[+\d\s]+$/;

// Mirrors src/data.ts WORK_HOURS for server-only WhatsApp/n8n demo availability checks.
const DEMO_WORK_HOURS = [
  '09:00', '09:45', '10:30', '11:15', '12:00',
  '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00', '18:45'
];

function createDataError(message) {
  const error = new Error(message);
  error.statusCode = 500;
  return error;
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2) + '\n');
  }
}

function normalizeAppointments(data) {
  return data.map(appointment => ({
    ...appointment,
    status:
      appointment.status === 'APPROVED' || appointment.status === 'CANCELLED'
        ? appointment.status
        : 'PENDING'
  }));
}

function readAppointments() {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw createDataError('Appointments data must be an array.');
    }

    return normalizeAppointments(parsed);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw createDataError('Appointments data is not valid JSON.');
    }

    if (error.statusCode) {
      throw error;
    }

    throw createDataError('Appointments data could not be read.');
  }
}

function writeAppointments(data) {
  ensureDataFile();

  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(normalizeAppointments(data), null, 2) + '\n');
  } catch (error) {
    throw createDataError('Appointments data could not be saved.');
  }
}

function sendDataError(res, error) {
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Appointments data error.'
  });
}

function requireBotSecret(req, res, next) {
  if (req.get('x-bot-secret') !== BOT_SECRET) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized.'
    });
  }

  return next();
}

function getRequiredString(body, field) {
  return typeof body[field] === 'string' ? body[field].trim() : '';
}

function validateWhatsappAppointment(body) {
  const values = {
    name: getRequiredString(body, 'name'),
    phone: getRequiredString(body, 'phone'),
    service: getRequiredString(body, 'service'),
    doctor: getRequiredString(body, 'doctor'),
    date: getRequiredString(body, 'date'),
    time: getRequiredString(body, 'time'),
    note: typeof body.note === 'string' ? body.note.trim() : ''
  };

  const missingFields = ['name', 'phone', 'service', 'doctor', 'date', 'time'].filter(field => !values[field]);
  if (missingFields.length > 0) {
    return { error: 'Missing required fields: ' + missingFields.join(', ') };
  }

  if (!PHONE_PATTERN.test(values.phone)) {
    return { error: 'Phone can only include digits, + and spaces.' };
  }

  if (!DATE_PATTERN.test(values.date)) {
    return { error: 'Date must use YYYY-MM-DD format.' };
  }

  if (!TIME_PATTERN.test(values.time)) {
    return { error: 'Time must use HH:mm format.' };
  }

  return { values };
}

function validateAvailabilityQuery(query) {
  const doctor = typeof query.doctor === 'string' ? query.doctor.trim() : '';
  const date = typeof query.date === 'string' ? query.date.trim() : '';

  if (!doctor || !date) {
    return { error: 'doctor and date query parameters are required.' };
  }

  if (!DATE_PATTERN.test(date)) {
    return { error: 'Date must use YYYY-MM-DD format.' };
  }

  return { values: { doctor, date } };
}

function getAppointmentDoctor(appointment) {
  if (typeof appointment.doctor === 'string' && appointment.doctor.trim()) {
    return appointment.doctor.trim();
  }

  return typeof appointment.doctorId === 'string' ? appointment.doctorId.trim() : '';
}

function isBlockingAppointment(appointment) {
  return appointment.status === 'PENDING' || appointment.status === 'APPROVED';
}

function hasSlotConflict(appointments, doctor, date, time) {
  return appointments.some(appointment =>
    isBlockingAppointment(appointment) &&
    getAppointmentDoctor(appointment) === doctor &&
    appointment.date === date &&
    appointment.time === time
  );
}

function createUniqueAppointmentId(appointments) {
  let id = '';

  do {
    id = 'wa_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  } while (appointments.some(appointment => appointment.id === id));

  return id;
}

app.use(express.json());

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      message: 'Request body is not valid JSON.'
    });
  }

  return next(error);
});

app.get('/api/appointments', (_req, res) => {
  try {
    res.json(readAppointments());
  } catch (error) {
    sendDataError(res, error);
  }
});

app.put('/api/appointments', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an appointments array.' });
  }

  try {
    const normalizedAppointments = normalizeAppointments(req.body);
    writeAppointments(normalizedAppointments);
    res.json(normalizedAppointments);
  } catch (error) {
    sendDataError(res, error);
  }
});

app.get('/api/whatsapp/available-slots', requireBotSecret, (req, res) => {
  const validation = validateAvailabilityQuery(req.query);

  if (validation.error) {
    return res.status(400).json({
      success: false,
      message: validation.error
    });
  }

  const { doctor, date } = validation.values;

  try {
    const appointments = readAppointments();
    const unavailableSlots = new Set(
      appointments
        .filter(appointment =>
          isBlockingAppointment(appointment) &&
          getAppointmentDoctor(appointment) === doctor &&
          appointment.date === date
        )
        .map(appointment => appointment.time)
    );

    return res.json({
      success: true,
      doctor,
      date,
      availableSlots: DEMO_WORK_HOURS.filter(slot => !unavailableSlots.has(slot))
    });
  } catch (error) {
    return sendDataError(res, error);
  }
});

app.post('/api/whatsapp/appointments', requireBotSecret, (req, res) => {
  const validation = validateWhatsappAppointment(req.body || {});

  if (validation.error) {
    return res.status(400).json({
      success: false,
      message: validation.error
    });
  }

  const { name, phone, service, doctor, date, time, note } = validation.values;

  try {
    // Re-read the latest file state immediately before conflict checks and write.
    const appointments = readAppointments();

    if (hasSlotConflict(appointments, doctor, date, time)) {
      return res.status(409).json({
        success: false,
        message: 'Bu saat dolu.'
      });
    }

    const appointment = {
      id: createUniqueAppointmentId(appointments),
      name,
      phone,
      email: '',
      treatmentId: service,
      doctorId: doctor,
      service,
      doctor,
      date,
      time,
      note,
      status: 'PENDING',
      source: 'WHATSAPP',
      createdAt: new Date().toISOString()
    };

    writeAppointments([appointment, ...appointments]);

    return res.status(201).json({
      success: true,
      appointment,
      reply: WHATSAPP_SUCCESS_REPLY
    });
  } catch (error) {
    return sendDataError(res, error);
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('API server running at http://localhost:' + PORT);
});
