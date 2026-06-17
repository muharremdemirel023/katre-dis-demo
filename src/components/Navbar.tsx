/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Calendar, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onNavigate, onOpenBooking }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-50/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('hero')}>
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                <path d="M12 2C11.5 2 7 5 7 10C7 16 12 22 12 22C12 22 17 16 17 10C17 5 12.5 2 12 2Z" />
                <path d="M12 6C10.5 6 9.5 7 9.5 8.5C9.5 10 12 11.5 12 13" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                KATRE
              </span>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold -mt-1">
                Ağız ve Diş Sağlığı
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-slate-600">
            <button onClick={() => onNavigate('hakkimizda')} className="hover:text-blue-600 transition-colors duration-200">Hakkımızda</button>
            <button onClick={() => onNavigate('hizmetler')} className="hover:text-blue-600 transition-colors duration-200">Hizmetler</button>
            <button onClick={() => onNavigate('doktorlar')} className="hover:text-blue-600 transition-colors duration-200">Hekimlerimiz</button>
            <button onClick={() => onNavigate('yorumlar')} className="hover:text-blue-600 transition-colors duration-200">Değerlendirmeler</button>
            <button onClick={() => onNavigate('iletisim')} className="hover:text-blue-600 transition-colors duration-200">İletişim</button>
          </nav>

          {/* Actions & Rating */}
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
              onClick={onOpenBooking}
              className="premium-cta-shine flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-blue-200 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="relative z-10 w-4.5 h-4.5" />
              <span className="relative z-10">Hemen Randevu Al</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
