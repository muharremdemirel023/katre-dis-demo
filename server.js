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

const DEFAULT_APPOINTMENTS = [
  {
    id: 'apt_1',
    name: 'Ahmet Hamdi Yılmaz',
    phone: '0532 111 22 33',
    email: 'ahmetyilmaz@gmail.com',
    treatmentId: 'implant',
    doctorId: 'dr_ahmet',
    date: '2026-06-18',
    time: '10:30',
    note: 'Sağ alt çene için implant kontrol muayenesi ve dikiş alımı yapılacak.',
    status: 'APPROVED',
    createdAt: '2026-06-15T09:12:00.000Z'
  },
  {
    id: 'apt_2',
    name: 'Zeynep Solmaz',
    phone: '0544 555 44 22',
    email: 'zeynep.solmaz@outlook.com',
    treatmentId: 'beyazlatma',
    doctorId: 'dr_mehmet',
    date: '2026-06-18',
    time: '13:30',
    note: 'Lazerle diş beyazlatma seansı yapılacak. Kahve lekeleri yoğun.',
    status: 'APPROVED',
    createdAt: '2026-06-16T11:40:00.000Z'
  },
  {
    id: 'apt_3',
    name: 'Kaan Demirci',
    phone: '0555 987 65 43',
    email: 'kaandemirci@gmail.com',
    treatmentId: 'ortodonti',
    doctorId: 'dr_selin',
    date: '2026-06-19',
    time: '09:00',
    note: 'Ortodonti plak yenileme ve tel aktivasyonu seansı.',
    status: 'APPROVED',
    createdAt: '2026-06-16T15:20:00.000Z'
  }
];

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(DEFAULT_APPOINTMENTS, null, 2));
  }
}

function readAppointments() {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return normalizeAppointments(Array.isArray(parsed) ? parsed : DEFAULT_APPOINTMENTS);
  } catch (error) {
    const normalizedDefaults = normalizeAppointments(DEFAULT_APPOINTMENTS);
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(normalizedDefaults, null, 2));
    return normalizedDefaults;
  }
}

function writeAppointments(data) {
  ensureDataFile();
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(normalizeAppointments(data), null, 2));
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

app.use(express.json());

app.get('/api/appointments', (_req, res) => {
  res.json(readAppointments());
});

app.put('/api/appointments', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an appointments array.' });
  }

  const normalizedAppointments = normalizeAppointments(req.body);
  writeAppointments(normalizedAppointments);
  res.json(normalizedAppointments);
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
