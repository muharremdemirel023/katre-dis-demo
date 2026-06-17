/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, ExternalLink, CalendarDays } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface ContactProps {
  onOpenBooking: () => void;
}

export default function Contact({ onOpenBooking }: ContactProps) {
  const [waMessage, setWaMessage] = useState('Merhaba, Katre Diş Polikliğinden bilgi almak istiyorum.');

  const getWaLink = () => {
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;
  };

  return (
    <section id="iletisim" className="py-20 bg-slate-50/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>İLETİŞİM BİLGİLERİMİZ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bizimle Kolayca İletişime Geçin
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Klinik randevularınız veya tedavi detayları ile alakalı her türlü bilgi için profesyonel ekibimiz bir telefon veya mesaj uzağınızda.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column - Contact Details & Working hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">Ulaşım & İletişim</h3>
              
              {/* Communication Cards */}
              <div className="space-y-4">
                
                {/* Phone */}
                <a
                  href={`tel:${CLINIC_INFO.phoneFormatted}`}
                  className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition duration-200"
                >
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Telefon Numarası</h4>
                    <p className="text-slate-800 font-bold block text-base mt-0.5">{CLINIC_INFO.phone}</p>
                    <span className="text-[10px] text-blue-600 font-semibold">Tıklayarak Hemen Ara</span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl border border-transparent">
                  <div className="w-11 h-11 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Klinik Adresi</h4>
                    <p className="text-slate-700 font-medium text-sm mt-1 sm:leading-relaxed">
                      {CLINIC_INFO.address}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-cyan-600 font-bold mt-1.5 uppercase hover:underline">
                      <Navigation className="w-3.5 h-3.5" /> Sancaktepe, İstanbul
                    </span>
                  </div>
                </div>

                {/* Work Hours Info */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl border border-transparent">
                  <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Çalışma Saatleri</h4>
                    <p className="text-slate-700 font-medium text-sm mt-1">
                      {CLINIC_INFO.workingHours}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl border border-transparent">
                  <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">E-Posta Adresi</h4>
                    <p className="text-slate-700 font-medium text-sm mt-1">
                      info@katredispoliklinigi.com
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick WhatsApp Action Box */}
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-3xl p-8 text-white space-y-5 shadow-lg shadow-emerald-100/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-100" />
                </div>
                <div>
                  <h4 className="font-extrabold tracking-tight text-lg">Direkt WhatsApp Destek Hattı</h4>
                  <p className="text-xs text-emerald-100 font-medium">Hızlıca soru sorun veya bilgi randevusu alın</p>
                </div>
              </div>

              {/* Message inputs */}
              <div className="space-y-3">
                <textarea
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Mesajınızı buraya girin..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/70 focus:outline-none focus:ring-2 focus:ring-white/40 h-20 resize-none font-medium"
                />

                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-bold px-6 py-3.5 rounded-xl flex items-center justify-center space-x-3 transition transform active:translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Gönder</span>
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Map Embed & Nav shortcut */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex-1 flex flex-col overflow-hidden min-h-[400px]">
              
              {/* Google Map Embedded Frame */}
              <div className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-100 min-h-[350px]">
                <iframe
                  title="Katre Ağız ve Diş Sağlığı Polikliniği Harita Konumu"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.3996720445584!2d29.2198083!3d40.9727409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad0ee893cdba5%3A0xe5a363fe41cc999a!2sYunus%20Emre%2C%20Veysel%20Karani%20Cd.%20No%3A37%2C%2034791%20Sancaktepe%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1718645000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Navigation Action */}
              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Yol Tarifi Alın</h4>
                  <p className="text-xs text-slate-400 font-medium">Navigasyon ile kliniğimize yönlendirilmek için tıklayın</p>
                </div>

                <a
                  href="https://goo.gl/maps/c63HMRZunvCHuAie8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 transition shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Haritalarda Aç</span>
                </a>
              </div>
            </div>

            {/* Easy Appointment Shortcut Callout */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-500 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-extrabold tracking-tight">Kuyrukta Beklemeden Randevu Alın</h4>
                <p className="text-xs text-blue-100 font-medium">Yılda iki kere muayene ile sağlıklı dişlerinizi koruyabilirsiniz.</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition cursor-pointer"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Hemen Randevu Al</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
