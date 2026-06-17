/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  Layers, 
  Baby, 
  Flame, 
  Smile, 
  ArrowRight, 
  Clock, 
  Tag, 
  CheckCircle,
  X
} from 'lucide-react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';

interface ServicesProps {
  onSelectTreatment: (treatmentId: string) => void;
}

// Icon mapper helper
const getTreatmentIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-blue-600" />;
    case 'Activity': return <Activity className="w-6 h-6 text-blue-600" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-blue-600" />;
    case 'Layers': return <Layers className="w-6 h-6 text-blue-600" />;
    case 'Baby': return <Baby className="w-6 h-6 text-blue-600" />;
    case 'Flame': return <Flame className="w-6 h-6 text-blue-600" />;
    case 'Smile': return <Smile className="w-6 h-6 text-blue-600" />;
    default: return <Smile className="w-6 h-6 text-blue-600" />;
  }
};

export default function Services({ onSelectTreatment }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Treatment | null>(null);

  return (
    <section id="hizmetler" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>KLİNİK HİZMETLERİMİZ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gelişmiş Diş Tedavileri ve Gülüş Tasarımı
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Ağzınızın biyolojik ihtiyaçlarına tam uyum sağlayan, en son tıp teknolojilerini barındıran zengin tedavi yelpazemiz ile tanışın.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="group relative bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Circle */}
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100/60 rounded-xl flex items-center justify-center transition-colors">
                  {getTreatmentIcon(treatment.iconName)}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {treatment.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(treatment)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Detayları İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onSelectTreatment(treatment.id)}
                  className="bg-white group-hover:bg-blue-600 group-hover:text-white border border-slate-200 group-hover:border-blue-600 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Randevu Al
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
              
              {/* Modal Top Brand Strip */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-6 text-white relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 hover:bg-white/20 p-1.5 rounded-full transition-colors text-white cursor-pointer"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center text-white">
                    {getTreatmentIcon(selectedService.iconName)}
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-100">TEDAVİ DETAYI</span>
                </div>
                
                <h3 className="text-2xl font-black tracking-tight">{selectedService.name}</h3>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Açıklama</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-normal">
                    {selectedService.fullDetails}
                  </p>
                </div>

                {/* Logistics Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-3 flex items-center space-x-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Ortalama Süre</div>
                      <div className="text-xs font-bold text-slate-800">{selectedService.duration}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 flex items-center space-x-3">
                    <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600">
                      <Tag className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Yaklaşık Maliyet</div>
                      <div className="text-xs font-bold text-blue-600">{selectedService.priceRange}</div>
                    </div>
                  </div>
                </div>

                {/* Safety & Protocol Assurances */}
                <div className="pt-2">
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3">Tedavi Güvenceleri</h4>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Uluslararası standartlarda sterilizasyon ve temiz oda protokolü</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Ağrısız lokal anestezi sistemleri ve özel rahatlatıcı teknikler</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Avrupa menşeili sertifikalı medikal bileşenler ve implantlar</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-slate-500 hover:text-slate-700 text-sm font-bold cursor-pointer"
                >
                  Geri Dön
                </button>

                <button
                  onClick={() => {
                    onSelectTreatment(selectedService.id);
                    setSelectedService(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition duration-200 cursor-pointer"
                >
                  Randevu Talep Et
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
