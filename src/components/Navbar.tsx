import React, { useState } from 'react';
import { Phone, Calendar, Star, Menu, X } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onNavigate, onOpenBooking }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  const handleOpenBooking = () => {
    onOpenBooking();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-50/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigate('hero')}
          >
            <img
  src="/katre-logo.png"
  alt="Katre Diş Logo"
  className="h-16 sm:h-20 w-auto object-contain"
/>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-slate-600">
            <button onClick={() => handleNavigate('hakkimizda')} className="hover:text-blue-600 transition-colors duration-200">Hakkımızda</button>
            <button onClick={() => handleNavigate('hizmetler')} className="hover:text-blue-600 transition-colors duration-200">Hizmetler</button>
            <button onClick={() => handleNavigate('doktorlar')} className="hover:text-blue-600 transition-colors duration-200">Hekimlerimiz</button>
            <button onClick={() => handleNavigate('yorumlar')} className="hover:text-blue-600 transition-colors duration-200">Değerlendirmeler</button>
            <button onClick={() => handleNavigate('iletisim')} className="hover:text-blue-600 transition-colors duration-200">İletişim</button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5 transition-colors">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <div className="text-xs text-slate-700 font-semibold">
                {CLINIC_INFO.rating} <span className="text-slate-400">Google değerlendirmesi</span>
              </div>
            </div>

            <a
              href={`tel:${CLINIC_INFO.phoneFormatted}`}
              className="hidden lg:flex items-center space-x-2 text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              <Phone className="w-4 h-4" />
              <span>{CLINIC_INFO.phone}</span>
            </a>

            <button
              onClick={handleOpenBooking}
              className="premium-cta-shine hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-blue-200 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="relative z-10 w-4.5 h-4.5" />
              <span className="relative z-10">Hemen Randevu Al</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-blue-100 bg-white text-slate-700 shadow-sm hover:bg-blue-50 transition"
              aria-label="Menüyü aç / kapat"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 top-20 z-40 bg-slate-900/30 lg:hidden"
        />
      )}

      <div
        className={`lg:hidden absolute left-0 right-0 top-20 z-50 px-4 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl bg-white border border-blue-50 shadow-2xl shadow-blue-900/10 overflow-hidden">
          <div className="p-3 space-y-1 text-slate-700 font-semibold">
            <button onClick={() => handleNavigate('hero')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50">Ana Sayfa</button>
            <button onClick={() => handleNavigate('hakkimizda')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50">Hakkımızda</button>
            <button onClick={() => handleNavigate('hizmetler')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50">Hizmetler</button>
            <button onClick={() => handleNavigate('doktorlar')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50">Hekimlerimiz</button>
            <button onClick={() => handleNavigate('yorumlar')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50">Değerlendirmeler</button>
            <button onClick={() => handleNavigate('iletisim')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50">İletişim</button>

            <div className="pt-2">
              <button
                onClick={handleOpenBooking}
                className="premium-cta-shine w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-3.5 rounded-xl shadow-lg shadow-blue-200"
              >
                <Calendar className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Hemen Randevu Al</span>
              </button>
            </div>

            <a
              href={`tel:${CLINIC_INFO.phoneFormatted}`}
              className="flex items-center justify-center space-x-2 text-blue-600 border border-blue-100 bg-blue-50/60 px-4 py-3 rounded-xl text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
            }
