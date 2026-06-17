/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, GraduationCap, CheckCircle2, ChevronRight, Star, Quote } from 'lucide-react';
import { DOCTORS } from '../data';
import { Doctor } from '../types';

interface DoctorsProps {
  onSelectDoctor: (doctorId: string) => void;
}

export default function Doctors({ onSelectDoctor }: DoctorsProps) {
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  return (
    <section id="doktorlar" className="py-20 bg-slate-50/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>UZMAN KADROMUZ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sağlığınızı Güvenilir Ellere Teslim Edin
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Kendi alanlarında akademik ihtisas sahibi, uluslararası tedavi yöntemlerini uygulayan deneyimli hekimlerimiz sizi bekliyor.
          </p>
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Doctor Headshot */}
              <div className="relative overflow-hidden aspect-h-4 aspect-w-3 bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Visual Rating Tag */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs border border-slate-100 rounded-lg px-2 py-1 shadow-md flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-extrabold text-slate-800">{doc.rating}</span>
                </div>

                {/* Overlaing specialty tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-xs rounded-xl p-3 text-white">
                  <p className="text-[10px] uppercase font-extrabold text-cyan-300 tracking-wider">Uzmanlık Alanı</p>
                  <p className="text-xs font-bold line-clamp-1">{doc.specialty}</p>
                </div>
              </div>

              {/* Bio Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-extrabold text-blue-600 tracking-wide">
                    {doc.title}
                  </p>
                  <p className="text-xs text-slate-400 font-medium pt-1">
                    {doc.experience}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                  <button
                    onClick={() => setActiveDoctor(doc)}
                    className="text-slate-500 hover:text-blue-600 flex items-center space-x-0.5 cursor-pointer"
                  >
                    <span>Özgeçmiş Oku</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectDoctor(doc.id)}
                    className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Randevu Al
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Bio Overlay Drawer / Modal info */}
        {activeDoctor && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100">
              
              <div className="flex flex-col sm:flex-row">
                {/* Doc visual */}
                <div className="sm:w-1/3 bg-slate-100 relative">
                  <img
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    className="w-full h-full object-cover min-h-[220px] sm:min-h-full"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg px-2.5 py-1 border border-slate-100 flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800">{activeDoctor.rating}</span>
                  </div>
                </div>

                {/* Doc Bio credentials */}
                <div className="sm:w-2/3 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-slate-900">{activeDoctor.name}</h3>
                      <p className="text-xs font-bold text-blue-600">{activeDoctor.title}</p>
                    </div>

                    {/* Educational background checklist */}
                    <div className="space-y-3 pt-2 text-xs text-slate-600">
                      <div className="flex items-start space-x-2">
                        <GraduationCap className="w-4.5 h-4.5 text-slate-500 mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-slate-800 font-extrabold block">Eğitim & Ünvan</strong>
                          <span>{activeDoctor.education}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Award className="w-4.5 h-4.5 text-slate-500 mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-slate-800 font-extrabold block">Tedavi Yaklaşımı</strong>
                          <span>{activeDoctor.about}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveDoctor(null)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      Kapat
                    </button>

                    <button
                      onClick={() => {
                        onSelectDoctor(activeDoctor.id);
                        setActiveDoctor(null);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-100 transition cursor-pointer"
                    >
                      Hekimden Randevu Al
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
