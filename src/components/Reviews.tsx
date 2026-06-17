/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare, ThumbsUp } from 'lucide-react';
import { REVIEWS, CLINIC_INFO } from '../data';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="yorumlar" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>HASTA GERİ BİLDİRİMLERİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tedavi Olan Hastalarımızın Değerlendirmeleri
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Katre Diş Polikliniğinde mutlu gülüşlerini geri kazanan yüzlerce hastamızın tarafsız deneyimlerini inceleyin.
          </p>
        </div>

        {/* Brand Summary Board & Custom Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Diagnostic Rating Badge */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
            <div className="space-y-2">
              <div className="text-6xl font-black text-slate-900 leading-none">4.4</div>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < 4
                        ? 'text-amber-400 fill-amber-400'
                        : i === 4
                        ? 'text-slate-300 fill-slate-300' // Displays 4 stars clearly, fitting the 4.4 rating beautifully
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-700">Google Haritalar Puanı</p>
              <p className="text-xs text-slate-400 font-medium">Google değerlendirmesi</p>
            </div>

            <div className="pt-6 border-t border-slate-200/60 text-left space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest mb-2">Memnuniyet Oranları</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-600 font-bold mb-1">
                    <span>Hekim İlgi & Alakası</span>
                    <span>%99</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '99%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 font-bold mb-1">
                    <span>Hijyen & Sterilizasyon</span>
                    <span>%100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 font-bold mb-1">
                    <span>Ağrısız Cerrahi/Kanal</span>
                    <span>%96</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Slider Box */}
          <div className="lg:col-span-8 relative">
            <div className="relative overflow-hidden bg-gradient-to-tr from-blue-50/50 to-white border border-blue-100/60 rounded-3xl p-8 md:p-12 shadow-sm min-h-[300px] flex flex-col justify-between">
              
              {/* Giant icon */}
              <Quote className="absolute top-8 right-8 w-16 h-16 text-blue-100/60 -z-0 pointer-events-none" />

              {/* Slider Content */}
              <div className="space-y-6 relative z-10">
                {/* Active Review Stars */}
                <div className="flex space-x-1">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-base md:text-lg italic leading-relaxed font-normal">
                  "{REVIEWS[currentIndex].comment}"
                </p>

                {/* Patient / Author credits */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-900 font-extrabold text-base">
                      {REVIEWS[currentIndex].name}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold">
                      {REVIEWS[currentIndex].date} • {REVIEWS[currentIndex].service} Alındı
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Doğrulanmış Hasta</span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                {/* Visual Indicators */}
                <div className="flex space-x-2">
                  {REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-6 bg-blue-600' : 'w-2.5 bg-slate-200'
                      }`}
                      aria-label={`Yorum ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Left / Right triggers */}
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition cursor-pointer font-bold"
                    aria-label="Önceki"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="p-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition cursor-pointer font-bold"
                    aria-label="Sonraki"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
