/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  FileText, 
  CheckCircle, 
  MessageCircle, 
  Users,
  AlertCircle
} from 'lucide-react';
import { TREATMENTS, DOCTORS, WORK_HOURS, CLINIC_INFO } from '../data';
import { Appointment } from '../types';

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTreatmentId: string;
  selectedDoctorId: string;
  existingAppointments: Appointment[];
  onAddAppointment: (appointment: Appointment) => void;
  successAppointment: Appointment | null;
  onSuccessClose: () => void;
}

export default function AppointmentForm({ 
  isOpen, 
  onClose, 
  selectedTreatmentId, 
  selectedDoctorId, 
  existingAppointments,
  onAddAppointment,
  successAppointment,
  onSuccessClose
}: AppointmentFormProps) {
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatmentId, setTreatmentId] = useState(selectedTreatmentId || TREATMENTS[0].id);
  const [doctorId, setDoctorId] = useState(selectedDoctorId || DOCTORS[0].id);
  
  // Set minimum date to today (past dates can NOT be chosen)
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  
  const [selectedTime, setSelectedTime] = useState('');
  const [note, setNote] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionKeyRef = useRef<string | null>(null);

  useEffect(() => {
    // Format current local date as YYYY-MM-DD
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    setMinDate(todayFormatted);
    
    // Set default date to today or tomorrow
    setDate(todayFormatted);
  }, []);

  // Update dropdown fields if parent tells us to
  useEffect(() => {
    if (selectedTreatmentId) {
      setTreatmentId(selectedTreatmentId);
    }
  }, [selectedTreatmentId]);

  useEffect(() => {
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    }
  }, [selectedDoctorId]);

  if (!isOpen) return null;

  // Conflict Resolution: pending and approved appointments block a slot; cancelled slots are free again.
  const isBlockingAppointment = (appointment: Appointment) =>
    appointment.status === 'PENDING' || appointment.status === 'APPROVED';

  const bookedTimes = existingAppointments
    .filter(apt => apt.doctorId === doctorId && apt.date === date && isBlockingAppointment(apt))
    .map(apt => apt.time);
  const bookedTimeSet = new Set(bookedTimes);
  const allSlotsBooked = WORK_HOURS.length > 0 && WORK_HOURS.every(hr => bookedTimeSet.has(hr));

  // Form Validation
  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Ad soyad alanı zorunludur.';
    if (!phone.trim()) {
      tempErrors.phone = 'Telefon numarası zorunludur.';
    } else if (phone.length < 10) {
      tempErrors.phone = 'Geçerli bir telefon numarası giriniz.';
    }
    if (!email.trim()) {
      tempErrors.email = 'E-posta alanı zorunludur.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Geçerli bir e-posta adresi yazın.';
    }
    if (!date) tempErrors.date = 'Lütfen randevu tarihi seçin.';
    if (!selectedTime) tempErrors.selectedTime = 'Lütfen randevu saati seçin.';
    if (selectedTime && bookedTimeSet.has(selectedTime)) {
      tempErrors.selectedTime = 'Seçtiğiniz saat dolu. Lütfen boş bir saat seçin.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();
    const normalizedEmail = email.trim();
    const normalizedNote = note.trim();
    const submissionKey = `${doctorId}|${date}|${selectedTime}|${normalizedPhone}|${normalizedEmail}`;

    if (submissionKeyRef.current === submissionKey || submissionKeyRef.current === 'processing') {
      return;
    }

    const slotTaken = existingAppointments.some(
      apt =>
        isBlockingAppointment(apt) &&
        apt.doctorId === doctorId &&
        apt.date === date &&
        apt.time === selectedTime
    );

    if (slotTaken) {
      setErrors({
        selectedTime: 'Bu saat dolu. Lütfen boş bir saat seçin.'
      });
      return;
    }

    const duplicateExists = existingAppointments.some(
      apt =>
        isBlockingAppointment(apt) &&
        apt.doctorId === doctorId &&
        apt.date === date &&
        apt.time === selectedTime &&
        apt.phone === normalizedPhone &&
        apt.email === normalizedEmail
    );

    if (duplicateExists) {
      setErrors({
        selectedTime: 'Bu tarih/saat için aynı kişiye ait bir kayıt mevcut.'
      });
      return;
    }

    submissionKeyRef.current = 'processing';
    setIsSubmitting(true);

    const newAppointment: Appointment = {
      id: 'apt_' + Date.now(),
      name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail,
      treatmentId,
      doctorId,
      date,
      time: selectedTime,
      note: normalizedNote,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    try {
      onAddAppointment(newAppointment);
      submissionKeyRef.current = submissionKey;
    } catch (error) {
      submissionKeyRef.current = null;
      setErrors({
        selectedTime: 'Randevu kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Secondary WhatsApp contact link for patients who prefer messaging the clinic.
  const getSuccessWhatsAppLink = () => {
    if (!successAppointment) return '#';
    const doctorObj = DOCTORS.find(d => d.id === successAppointment.doctorId);
    const treatmentObj = TREATMENTS.find(t => t.id === successAppointment.treatmentId);
    
    const rawMessage = `Merhaba Katre Diş Polikliniği,\n\nOnline randevu talebi oluşturdum. Bilgilerim şu şekildedir:\n\n*İsim:* ${successAppointment.name}\n*Tel:* ${successAppointment.phone}\n*Tedavi:* ${treatmentObj?.name}\n*Hekim:* ${doctorObj?.name}\n*Tarih:* ${successAppointment.date}\n*Saat:* ${successAppointment.time}\n\nBilgi almak istiyorum. Teşekkürler.`;
    
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;
  };

  const handleResetAndClose = () => {
    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setSelectedTime('');
    setNote('');
    setErrors({});
    submissionKeyRef.current = null;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <h3 className="font-extrabold tracking-tight text-base sm:text-lg">Katre Online Randevu Formu</h3>
              <p className="text-[11px] text-blue-100 font-medium">Bütün bilgileriniz HIPAA standartlarında korunmaktadır</p>
            </div>
          </div>

          {!successAppointment && (
            <button
              onClick={handleResetAndClose}
              className="hover:bg-white/15 p-1.5 rounded-full transition-colors text-white cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Success Screens vs Inputs Form */}
        {successAppointment ? (
          <div className="p-8 text-center space-y-6 overflow-y-auto flex-1 flex flex-col justify-center">
            
            {/* Visual badge */}
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-slate-900">Randevu talebiniz başarıyla alınmıştır.</h4>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Klinik ekibimiz en kısa sürede sizi arayarak randevunuzu teyit edecektir.
              </p>
            </div>

            {/* Generated card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-3.5 max-w-sm mx-auto">
              <div className="text-xs text-slate-400 font-extrabold uppercase tracking-widest text-center border-b border-slate-200/60 pb-2">
                Randevu Talep Özeti
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-slate-400 font-bold">Ad Soyad:</span>
                <span className="text-slate-800 font-extrabold text-right">{successAppointment.name}</span>

                <span className="text-slate-400 font-bold">Telefon:</span>
                <span className="text-slate-800 font-extrabold text-right">{successAppointment.phone}</span>

                <span className="text-slate-400 font-bold">Seçilen tedavi:</span>
                <span className="text-slate-800 font-extrabold text-right">
                  {TREATMENTS.find(t => t.id === successAppointment.treatmentId)?.name}
                </span>

                <span className="text-slate-400 font-bold">Uzman Hekim:</span>
                <span className="text-slate-800 font-extrabold text-right">
                  {DOCTORS.find(d => d.id === successAppointment.doctorId)?.name}
                </span>

                <span className="text-slate-400 font-bold">Seçilen tarih ve saat:</span>
                <span className="text-blue-600 font-black text-right">
                  {successAppointment.date} • {successAppointment.time}
                </span>
                
                <span className="text-slate-400 font-bold">Durum:</span>
                <span className="text-amber-600 font-bold text-right uppercase">Bekliyor</span>
              </div>
            </div>

            {/* Secondary action buttons */}
            <div className="space-y-3 max-w-sm mx-auto">
              <a
                href={getSuccessWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold py-2.5 px-5 rounded-xl flex items-center justify-center space-x-2 text-xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>İsterseniz kliniğe WhatsApp'tan da ulaşabilirsiniz</span>
              </a>

              <button
                type="button"
                onClick={onSuccessClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 px-6 rounded-xl text-xs transition"
              >
                Kapat
              </button>
            </div>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Input Sections */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">1. Kişisel ve İletişim Bilgileriniz</h4>
              
              {/* Ad Soyad */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="fullName">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Ad Soyad *</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      const updated = { ...errors };
                      delete updated.name;
                      setErrors(updated);
                    }
                  }}
                  className={`w-full bg-slate-50 border ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-100'} rounded-xl px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-3 font-semibold text-slate-800`}
                />
                {errors.name && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Tel & E-Posta row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Telefon Numarası */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="phoneNum">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>Telefon Numarası *</span>
                  </label>
                  <input
                    id="phoneNum"
                    type="tel"
                    placeholder="0530 000 00 00"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        const updated = { ...errors };
                        delete updated.phone;
                        setErrors(updated);
                      }
                    }}
                    className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-100'} rounded-xl px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-3 font-semibold text-slate-800`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* E-Posta */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="emailAddress">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>E-Posta Adresi *</span>
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    placeholder="ornek@mail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        const updated = { ...errors };
                        delete updated.email;
                        setErrors(updated);
                      }
                    }}
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-100'} rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-3 font-semibold text-slate-800`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Medical Selections */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">2. Tedavi ve Doktor Tercihiniz</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Tedavi Türü */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="treatmentSelect">
                    <Stethoscope className="w-4 h-4 text-slate-400" />
                    <span>Tedavi Türü *</span>
                  </label>
                  <select
                    id="treatmentSelect"
                    value={treatmentId}
                    onChange={(e) => setTreatmentId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-3 focus:ring-blue-100 font-semibold text-slate-800"
                  >
                    {TREATMENTS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Doktor Seçimi */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="doctorSelect">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Doktor Seçimi *</span>
                  </label>
                  <select
                    id="doctorSelect"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-3 focus:ring-blue-100 font-semibold text-slate-800"
                  >
                    {DOCTORS.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.title})</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Date and Time Selector */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">3. Tarih ve Saat Seçimi</h4>
              
              <div className="space-y-4">
                
                {/* Tarih Seçici (Minimum: Bugünden itibaren) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="datePicker">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Randevu Tarihi *</span>
                  </label>
                  <input
                    id="datePicker"
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setSelectedTime(''); // Reset time selection on date change
                      if (errors.date) {
                        const updated = { ...errors };
                        delete updated.date;
                        setErrors(updated);
                      }
                    }}
                    className={`w-full bg-slate-50 border ${errors.date ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-100'} rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-3 font-semibold text-slate-800`}
                  />
                  {errors.date && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.date}
                    </p>
                  )}
                </div>

                {/* Available Hours (Dolu saatler visual pasiftir ve seçilemez!) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Muayene Saati Seçin *</span>
                  </label>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                    {WORK_HOURS.map((hr) => {
                      const isTaken = bookedTimeSet.has(hr);
                      const isSelected = selectedTime === hr;

                      return (
                        <button
                          key={hr}
                          type="button"
                          disabled={isTaken}
                          onClick={() => {
                            if (isTaken) return;
                            setSelectedTime(hr);
                            if (errors.selectedTime) {
                              const updated = { ...errors };
                              delete updated.selectedTime;
                              setErrors(updated);
                            }
                          }}
                          className={`py-2 px-1 text-xs font-extrabold rounded-lg border text-center transition-all cursor-pointer ${
                            isTaken
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-80 relative'
                              : isSelected
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100'
                              : 'bg-white border-slate-200 hover:border-blue-400 text-slate-700 hover:bg-blue-50/50'
                          }`}
                        >
                          {hr}
                          {isTaken && (
                            <span className="block text-[8px] opacity-70 font-medium -mt-0.5">Dolu</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {allSlotsBooked && (
                    <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700">
                      Bu gün için tüm saatler dolu.
                    </div>
                  )}
                  {errors.selectedTime && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.selectedTime}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Note Area */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="noteArea">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Hekime Not (Varsa Şikayetleriniz)</span>
              </label>
              <textarea
                id="noteArea"
                placeholder="Örneğin: Sol arka dişimde hassasiyet var. Varsa alerjiniz vb."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-3 focus:ring-blue-100 font-semibold text-slate-800 h-20 resize-none"
              />
            </div>

            {/* Submission triggers */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-slate-400 hover:text-slate-700 text-xs font-extrabold uppercase tracking-widest cursor-pointer"
              >
                İptal Et
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg shadow-blue-100 transition cursor-pointer"
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Randevuyu Tamamla'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

