/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AppointmentForm from './components/AppointmentForm';
import AdminPanel from './components/AdminPanel';
import { INITIAL_APPOINTMENTS, CLINIC_INFO } from './data';
import { Appointment } from './types';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChevronUp
} from 'lucide-react';

export default function App() {
  const API_APPOINTMENTS_URL = '/api/appointments';
  const normalizeAppointments = (items: Appointment[]): Appointment[] =>
    items.map(appointment => ({
      ...appointment,
      status:
        appointment.status === 'APPROVED' || appointment.status === 'CANCELLED'
          ? appointment.status
          : 'PENDING'
    }));

  // Appointments Database state with API + localStorage fallback
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Interactive navigation settings
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  
  // Display Mode: admin console is only available from /admin.
  const [isAdminModeActive, setIsAdminModeActive] = useState(() => window.location.pathname.replace(/\/$/, '') === '/admin');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  // Back to top floating switch
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load Initial Database from API first, then fallback to localStorage or static mock
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await fetch(API_APPOINTMENTS_URL);
        if (!response.ok) {
          throw new Error('API not available');
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const normalizedData = normalizeAppointments(data);
          setAppointments(normalizedData);
          localStorage.setItem('katre_clinic_appointments', JSON.stringify(normalizedData));
          return;
        }
      } catch (error) {
        const saved = localStorage.getItem('katre_clinic_appointments');
        if (saved) {
          try {
            setAppointments(normalizeAppointments(JSON.parse(saved)));
          } catch {
            setAppointments(normalizeAppointments(INITIAL_APPOINTMENTS));
          }
        } else {
          const normalizedInitialAppointments = normalizeAppointments(INITIAL_APPOINTMENTS);
          setAppointments(normalizedInitialAppointments);
          localStorage.setItem('katre_clinic_appointments', JSON.stringify(normalizedInitialAppointments));
        }
      }
    };

    loadAppointments();

    // Scroll top monitor
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncAdminRoute = () => {
      setIsAdminModeActive(window.location.pathname.replace(/\/$/, '') === '/admin');
    };

    window.addEventListener('popstate', syncAdminRoute);
    return () => window.removeEventListener('popstate', syncAdminRoute);
  }, []);

  const isDuplicateAppointment = (list: Appointment[], candidate: Appointment) => {
    return list.some(apt =>
      apt.id === candidate.id ||
      (
        apt.status !== 'CANCELLED' &&
        apt.date === candidate.date &&
        apt.time === candidate.time &&
        apt.doctorId === candidate.doctorId
      )
    );
  };

  // Save changes to API and keep browser fallback in sync
  const persistAppointments = async (newAppointments: Appointment[]) => {
    const normalizedAppointments = normalizeAppointments(newAppointments);
    setAppointments(normalizedAppointments);
    localStorage.setItem('katre_clinic_appointments', JSON.stringify(normalizedAppointments));

    try {
      await fetch(API_APPOINTMENTS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(normalizedAppointments)
      });
    } catch (error) {
      // Fallback is already stored locally; API can be unavailable in demo environments.
    }
  };

  // Add Appointment
  const handleAddAppointment = (newApt: Appointment) => {
    if (isDuplicateAppointment(appointments, newApt)) {
      return;
    }

    void persistAppointments([newApt, ...appointments]);
    setBookingSuccess(newApt);
  };

  // Walkin integration from AdminPanel
  const handleAddNewWalkin = (newApt: Appointment) => {
    handleAddAppointment(newApt);
  };

  // Confirm / Cancel/ Complete appointments from Admin dashboard
  const handleUpdateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: newStatus };
      }
      return apt;
    });

    void persistAppointments(updated);
  };

  // Trigger form prefilled with a specific treatment type
  const handleSelectTreatmentToBook = (treatmentId: string) => {
    setSelectedTreatment(treatmentId);
    setSelectedDoctor(''); // Reset doc select
    setIsBookingOpen(true);
  };

  // Trigger form prefilled with a specific doctor
  const handleSelectDoctorToBook = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedTreatment(''); // Reset treatment select
    setIsBookingOpen(true);
  };

  // Main UI section dynamic routing
  const scrollToSection = (id: string) => {
    if (window.location.pathname.replace(/\/$/, '') === '/admin') {
      window.history.pushState({}, '', '/');
    }
    setIsAdminModeActive(false); // Make sure we are in client section
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased flex flex-col justify-between">
      
      {/* Top Navigation Hub */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenBooking={() => {
          setSelectedTreatment('');
          setSelectedDoctor('');
          setIsBookingOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdminModeActive ? (
          // Secure Admin Portal
          <div className="bg-slate-50">
            {/* Quick header action path */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/');
                  setIsAdminModeActive(false);
                }}
                className="text-xs font-bold text-blue-600 bg-white border border-blue-100 hover:bg-blue-50/50 px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>← Klinik Web Sitesine Geri Dön</span>
              </button>
            </div>
            
            <AdminPanel
              appointments={appointments}
              onUpdateStatus={handleUpdateAppointmentStatus}
              onAddWalkin={handleAddNewWalkin}
            />
          </div>
        ) : (
          // Primary Clinical Website Content
          <div className="animate-fadeIn">
            {/* 1. Hero Block */}
            <Hero
              onOpenBooking={() => setIsBookingOpen(true)}
              onNavigate={scrollToSection}
            />

            {/* 2. Brand Story / About Us */}
            <About />

            {/* 3. Specialized Medical Services */}
            <Services onSelectTreatment={handleSelectTreatmentToBook} />

            {/* 4. Dr. Profiles */}
            <Doctors onSelectDoctor={handleSelectDoctorToBook} />

            {/* 5. Star Ratings & Testimonial Slider */}
            <Reviews />

            {/* 6. Location Maps & Direct Contact */}
            <Contact onOpenBooking={() => setIsBookingOpen(true)} />
          </div>
        )}
      </main>

      {/* Gorgeous Premium Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            
            {/* Clinic Bio & Brand Identity */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path d="M12 2C11.5 2 7 5 7 10C7 16 12 22 12 22C12 22 17 16 17 10C17 5 12.5 2 12 2Z" />
                    <path d="M12 6C10.5 6 9.5 7 9.5 8.5C9.5 10 12 11.5 12 13" />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-black tracking-wider text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                    KATRE DİŞ
                  </span>
                  <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-1">Ağız ve Diş Sağlığı</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-normal">
                Katre Ağız ve Diş Sağlığı Polikliniği, İstanbul Sancaktepe lokasyonunda tam donanımlı poliklinikleri, uzman hekim kadrosu ve yeni nesil tıp araçları ile ağız sağlığınız için en prestijli diş hastanesi hizmetini sunar.
              </p>

              {/* Clinic Ratings summary */}
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-850 p-3 rounded-xl max-w-xs">
                <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                <div className="text-xs">
                  <span className="font-bold text-slate-100">{CLINIC_INFO.rating} / 5</span>
                  <span className="text-slate-400"> • Google Maps Memnuniyet Skoru</span>
                </div>
              </div>
            </div>

            {/* Quick Links Menu */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-cyan-400 border-l-2 border-cyan-400 pl-3">
                Hızlı Gezinti
              </h4>
              <ul className="space-y-2.5 text-slate-300 text-sm font-semibold">
                <li>
                  <button onClick={() => scrollToSection('hakkimizda')} className="hover:text-cyan-400 transition">Hakkımızda</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('hizmetler')} className="hover:text-cyan-400 transition">Hizmetlerimiz</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('doktorlar')} className="hover:text-cyan-400 transition">Uzman Hekimlerimiz</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('yorumlar')} className="hover:text-cyan-400 transition">Hasta Yorumları</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('iletisim')} className="hover:text-cyan-400 transition">İletişim & Konum</button>
                </li>
              </ul>
            </div>

            {/* Contact quick links */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-cyan-400 border-l-2 border-cyan-400 pl-3">
                Klinik Bilgileri
              </h4>
              
              <ul className="space-y-3.5 text-sm text-slate-300 font-medium">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{CLINIC_INFO.address}</span>
                </li>

                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                  <a href={`tel:${CLINIC_INFO.phoneFormatted}`} className="font-extrabold text-white hover:text-cyan-300 transition">
                    {CLINIC_INFO.phone}
                  </a>
                </li>

                <li className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0" />
                  <span>{CLINIC_INFO.workingHours}</span>
                </li>
              </ul>

            </div>

          </div>

          {/* Legal / Copyright strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 text-center">
            <p>© 2026 Katre Ağız ve Diş Sağlığı Polikliniği. Tüm Hakları Saklıdır.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-400 transition">Aydınlatma Metni (KVKK)</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-400 transition">Çerez Politikası</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-400 transition">Yasal Uyarılar</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Appointment form modal */}
      <AppointmentForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTreatmentId={selectedTreatment}
        selectedDoctorId={selectedDoctor}
        existingAppointments={appointments}
        onAddAppointment={handleAddAppointment}
        successAppointment={bookingSuccess}
        onSuccessClose={() => {
          setBookingSuccess(null);
          setIsBookingOpen(false);
        }}
      />

      {/* Elegant scroll back to top floating trigger */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white p-3 rounded-full shadow-2xl shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 z-40 cursor-pointer font-bold"
          aria-label="Yukarı Çık"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}

