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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white py-16 lg:py-24">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-gradient from-blue-100/30 via-transparent to-transparent -z-10 pointer-events-none" />
      <div className="absolute -top-40 left-10 w-72 h-72 bg-cyan-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sancaktepe'nin En Güvenilir Polikliniği</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sağlıklı Gülüşler İçin <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Yanınızdayız
              </span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Katre Ağız ve Diş Sağlığı Polikliniği'nde, en modern teknolojiler ve uzman hekim kadromuz ile acısız, steril ve premium tedavi deneyimi sunuyoruz.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="premium-cta-shine w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-200/80 cursor-pointer"
              >
                <Calendar className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Hemen Randevu Al</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneFormatted}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white border-2 border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 hover:text-blue-600 font-bold px-8 py-4 rounded-xl shadow-md transition duration-300"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <span>Telefonla Ara</span>
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-2xl font-extrabold text-blue-600 font-sans">4.4 / 5</span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1 justify-center lg:justify-start">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Google değerlendirmesi
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-extrabold text-slate-800 font-sans">15+</span>
                <span className="text-xs text-slate-500 font-medium mt-1">Yıllık Tecrübe</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-extrabold text-slate-800 font-sans">99%</span>
                <span className="text-xs text-slate-500 font-medium mt-1">Hasta Memnuniyeti</span>
              </div>
            </div>
          </div>

          {/* Visual Container */}
          <div className="relative mx-auto max-w-lg lg:max-w-none w-full">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-20" />
            
            <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xl p-3">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Katre Ağız ve Diş Sağlığı Polikliniği Modern Tedavi Odası"
                className="w-full h-[320px] sm:h-[400px] object-cover rounded-xl"
              />
              
              {/* Overlay floating tags */}
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm border border-emerald-100 rounded-xl p-3 shadow-lg flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Güven ve Hijyen</div>
                  <div className="text-xs text-slate-800 font-bold">100% Steril Klinik Sınıfı</div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-xl p-3 shadow-lg flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 animate-pulse">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Acil Destek</div>
                  <div className="text-xs text-slate-800 font-bold">Nöbetçi Hekim Danışma</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
