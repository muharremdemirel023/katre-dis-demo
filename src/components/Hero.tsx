/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Calendar, Sparkles, Shield, HeartHandshake, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate: (section: string) => void;
}

export default function Hero({ onOpenBooking, onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative max-w-full overflow-x-hidden bg-gradient-to-b from-blue-50/70 via-white to-white py-14 lg:py-24 scroll-mt-20">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 max-w-full h-full bg-radial-gradient from-blue-100/30 via-transparent to-transparent -z-10 pointer-events-none" />
      <div className="absolute -top-40 left-0 sm:left-10 w-56 sm:w-72 h-56 sm:h-72 max-w-full bg-cyan-100/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="min-w-0 space-y-7 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex max-w-full items-center justify-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-center">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sancaktepe'nin En Güvenilir Polikliniği</span>
            </div>

            <h1 className="max-w-full text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
              Sağlıklı Gülüşler İçin <br />
              <span className="inline-block max-w-full bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Yanınızdayız
              </span>
            </h1>

            <p className="max-w-full sm:max-w-xl text-slate-600 text-base sm:text-xl mx-auto lg:mx-0 font-medium leading-relaxed break-words">
              Katre Ağız ve Diş Sağlığı Polikliniği'nde, en modern teknolojiler ve uzman hekim kadromuz ile acısız, steril ve premium tedavi deneyimi sunuyoruz.
            </p>

            {/* CTA Buttons */}
            <div className="flex min-w-0 flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onOpenBooking}
                className="premium-cta-shine w-full sm:w-auto max-w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-6 sm:px-8 py-4 rounded-xl shadow-xl shadow-blue-200/80 cursor-pointer"
              >
                <Calendar className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Hemen Randevu Al</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneFormatted}`}
                className="w-full sm:w-auto max-w-full flex items-center justify-center space-x-2 bg-white border-2 border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 hover:text-blue-600 font-bold px-6 sm:px-8 py-4 rounded-xl shadow-md transition duration-300"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <span>Telefonla Ara</span>
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="grid max-w-full grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-100 sm:max-w-md mx-auto lg:mx-0">
              <div className="min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-xl sm:text-2xl font-extrabold text-blue-600 font-sans">4.4 / 5</span>
                <span className="min-w-0 text-[10px] sm:text-xs text-slate-500 font-medium flex flex-wrap items-center gap-1 mt-1 justify-center lg:justify-start break-words">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Google değerlendirmesi
                </span>
              </div>
              <div className="min-w-0 flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-800 font-sans">15+</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 break-words">Yıllık Tecrübe</span>
              </div>
              <div className="min-w-0 flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-800 font-sans">99%</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 break-words">Hasta Memnuniyeti</span>
              </div>
            </div>
          </div>

          {/* Visual Container */}
          <div className="relative mx-auto w-full max-w-full sm:max-w-lg lg:max-w-none min-w-0">
            <div className="absolute inset-x-0 -inset-y-1.5 sm:-inset-1.5 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-20" />
            
            <div className="relative max-w-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xl p-2 sm:p-3">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Katre Ağız ve Diş Sağlığı Polikliniği Modern Tedavi Odası"
                className="w-full max-w-full h-[260px] sm:h-[400px] object-cover rounded-xl"
              />
              
              {/* Overlay floating tags */}
              <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-auto max-w-[calc(100%-2rem)] sm:max-w-xs bg-white/95 backdrop-blur-sm border border-emerald-100 rounded-xl p-2.5 sm:p-3 shadow-lg flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Güven ve Hijyen</div>
                  <div className="text-xs text-slate-800 font-bold break-words">100% Steril Klinik Sınıfı</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-auto sm:right-8 max-w-[calc(100%-2rem)] sm:max-w-xs bg-white/95 backdrop-blur-sm border border-blue-100 rounded-xl p-2.5 sm:p-3 shadow-lg flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 animate-pulse">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Acil Destek</div>
                  <div className="text-xs text-slate-800 font-bold break-words">Nöbetçi Hekim Danışma</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
