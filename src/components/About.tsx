/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Crosshair, Sparkles, Award, Star, Compass } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function About() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: 'Yüksek Hijyen Standartları',
      description: 'Kliniklerimizde üstün sterilizasyon protokolleri ve tek kullanımlık hasta ekipmanları titizlikle uygulanır.'
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Uzman Hekim Kadrosu',
      description: 'Her biri kendi branşında (İmplantoloji, Ortodonti, Pedodonti...) ihtisas yapmış, ödüllü hekim kadrosu.'
    },
    {
      icon: <Crosshair className="w-6 h-6 text-blue-600" />,
      title: 'İleri Teknoloji Teşhis',
      description: 'Ağız içi tarayıcılar, panoramik rontgenler ve dijital tasarım laboratuvarımızla sıfır hata payı.'
    }
  ];

  return (
    <section id="hakkimizda" className="py-20 bg-slate-50/50scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Image & Trust Indicators */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-100/60 rounded-full blur-2xl -z-10" />
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cyan-100/60 rounded-full blur-3xl -z-10" />
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600"
                alt="Katre Ağız ve Diş Sağlığı Hasta Güven Odaklı Karşılama"
                className="w-full h-[450px] object-cover rounded-2xl shadow-xl border border-white"
              />
              
              {/* Floating review card */}
              <div className="absolute -bottom-8 -right-4 md:right-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-slate-800 font-extrabold text-xs ml-1.5">{CLINIC_INFO.rating}</span>
                </div>
                <blockquote className="text-slate-600 text-xs italic leading-relaxed">
                  "Hekimlerimizin samimiyeti, kliniğin tertemiz oluşu ve yapılan işlemlerin kalitesi takdire şayan."
                </blockquote>
                <div className="mt-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">
                  - GÜLAY T. (Google İncelemesi)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Brand Story & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1 bg-blue-100/80 text-blue-800 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>BİZ KİMİZ?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Hasta Memnuniyetini Diş Hekimliğinin Merkezine Konumluyoruz
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-[16px]">
              Katre Ağız ve Diş Sağlığı Polikliniği olarak İstanbul Sancaktepe\'de kurulduğumuz günden bu yana, her hastamızın kendine özgü biyolojik ve estetik gereksinimlerini göz önünde bulunduruyoruz. Bizim için başarı, yalnızca bitmiş teknik tedaviler değil; hastalarımızın klinikten özgüvenle ve geniş bir tebessümle ayrılmasıdır.
            </p>

            <p className="text-slate-600 leading-relaxed text-[16px]">
              En büyük yatırımımızı insan sağlığına ve klinik teknolojisine yapıyoruz. Son teknoloji 3D ağız içi tarayıcılar (CAD/CAM), ağrısız lokal anestezi sistemleri ve uluslararası akreditasyona sahip implant markalarımız ile diş hekimliği korkularınızı tamamen yok etmeye kararlıyız.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              {highlights.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
