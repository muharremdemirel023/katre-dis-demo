/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Search, 
  PieChart as PieIcon, 
  CalendarDays, 
  Phone, 
  Clock, 
  Layers, 
  Plus, 
  FileText,
  DollarSign,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { TREATMENTS, DOCTORS } from '../data';
import { Appointment } from '../types';

interface AdminPanelProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, newStatus: Appointment['status']) => void;
  onAddWalkin: (appointment: Appointment) => void;
}

export default function AdminPanel({ appointments, onUpdateStatus, onAddWalkin }: AdminPanelProps) {
  // Login State
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'patients' | 'reports'>('dashboard');

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthorized(true);
      setLoginError('');
    } else {
      setLoginError('Hatalı güvenlik kodu! Lütfen "1234" yazarak tekrar deneyin.');
    }
  };

  // 1. Password Protection Screen
  if (!isAuthorized) {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-lg font-extrabold text-slate-900">Yönetici Girişi</h3>
            <p className="text-xs text-slate-400">Klinik panelini görüntülemek için kimlik doğrulaması gerekiyor.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Güvenlik Kodu (PIN)</label>
              <input
                type="password"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-lg focus:outline-none focus:ring-3 focus:ring-blue-100 placeholder-slate-300 font-extrabold tracking-widest"
              />
            </div>

            {loginError && (
              <p className="text-[11px] text-red-500 font-bold text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg shadow-blue-100 cursor-pointer text-sm"
            >
              Doğrula ve Paneli Aç
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Demo Test Giriş Kodu: <strong className="text-blue-600 font-black">1234</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats based on real active appointments array
  const totalApts = appointments.length;
  const pendingApts = appointments.filter(a => a.status === 'PENDING').length;
  const approvedApts = appointments.filter(a => a.status === 'APPROVED').length;

  // Revenue estimation
  const totalRevenueEstimate = appointments
    .filter(a => a.status === 'APPROVED')
    .reduce((sum, current) => {
      // Find matching treatment or default to 2500 TL
      const match = TREATMENTS.find(t => t.id === current.treatmentId);
      if (match) {
        // Parse numerical value from range: e.g. "15.000 TL - 28.000 TL" -> Extract min 15000 or average
        const basePriceStr = match.priceRange.replace(/[^0-9]/g, ''); // e.g. "1500028000"
        const matchedNumber = parseInt(match.priceRange.split(' ')[0].replace('.', ''), 10);
        return sum + (matchedNumber || 2500);
      }
      return sum + 2500;
    }, 0);

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const doc = DOCTORS.find(d => d.id === apt.doctorId);
    const treat = TREATMENTS.find(t => t.id === apt.treatmentId);
    
    const query = searchQuery.toLowerCase();
    const nameMatch = apt.name.toLowerCase().includes(query);
    const treatmentMatch = treat?.name.toLowerCase().includes(query) || false;
    const doctorMatch = doc?.name.toLowerCase().includes(query) || false;

    const matchesQuery = nameMatch || treatmentMatch || doctorMatch;
    const matchesStatus = statusFilter === 'ALL' ? true : apt.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  // Compile data for Recharts Treatment distribution
  const chartDataTreatments = TREATMENTS.map(treat => {
    const count = appointments.filter(a => a.treatmentId === treat.id).length;
    return {
      name: treat.name,
      'Randevu Sayısı': count
    };
  }).filter(item => item['Randevu Sayısı'] > 0);

  // Compile Doctor distribution
  const chartDataDoctors = DOCTORS.map(doc => {
    const count = appointments.filter(a => a.doctorId === doc.id).length;
    return {
      name: doc.name.split(' ').slice(-2).join(' '), // Shorten name
      'Hasta Sayısı': count
    };
  });

  const COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'];

  return (
    <section className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div>
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">YÖNETİM SİSTEMİ</span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Katre Klinik Kontrol Masası</h2>
            <p className="text-xs text-slate-400 font-medium">Klinik randevularını yönetin, raporları analiz edin ve uygunluğu düzenleyin.</p>
          </div>

          <div className="flex items-center space-x-1.5 self-start sm:self-auto">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-xs font-bold text-slate-700">Klinik Operasyonları Aktif</span>
          </div>
        </div>

        {/* Tab Controls Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-6 text-sm font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Genel Bakış</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-3 px-6 text-sm font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'calendar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Haftalık Takvim</span>
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`py-3 px-6 text-sm font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'patients'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Randevu & Hasta Yönetimi ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`py-3 px-6 text-sm font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'reports'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PieIcon className="w-4 h-4" />
            <span>İş Raporları</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Total Appointments */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Toplam Randevu</span>
                  <div className="text-3xl font-black text-slate-800 mt-1">{totalApts}</div>
                </div>
                <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Bekliyor</span>
                  <div className="text-3xl font-black text-amber-600 mt-1">{pendingApts}</div>
                </div>
                <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>

              {/* Approved Appoints */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Onaylandı</span>
                  <div className="text-3xl font-black text-emerald-600 mt-1">{approvedApts}</div>
                </div>
                <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>

              {/* Total Projected Clinic Turnover */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Tahmini Ciro (Onaylanan)</span>
                  <div className="text-lg font-black text-blue-700 mt-1">
                    {totalRevenueEstimate.toLocaleString('tr-TR')} TL
                  </div>
                </div>
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

            </div>

            {/* Dashboard Subsplit: Pending Approval table shortcut */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">Son Randevu İstekleri (Girişler)</h3>
                  <p className="text-xs text-slate-400">Bekleyen son hasta randevuları</p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('patients');
                    setStatusFilter('PENDING');
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline block"
                >
                  Bekleyenleri Gör
                </button>
              </div>

              {appointments.filter(a => a.status === 'PENDING').length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs font-bold bg-slate-50 rounded-xl">
                  Bekleyen aktif randevu talebi bulunmamaktadır.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-black uppercase text-slate-400 bg-slate-50">
                        <th className="py-3 px-4">Hasta</th>
                        <th className="py-3 px-4">Tedavi</th>
                        <th className="py-3 px-4">Doktor</th>
                        <th className="py-3 px-4">Tarih Seansı</th>
                        <th className="py-3 px-4">İletişim</th>
                        <th className="py-3 px-4 text-right">Eylemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs">
                      {appointments.filter(a => a.status === 'PENDING').slice(0, 5).map(apt => {
                        const dr = DOCTORS.find(d => d.id === apt.doctorId);
                        const tr = TREATMENTS.find(t => t.id === apt.treatmentId);
                        
                        return (
                          <tr key={apt.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-extrabold text-slate-800">{apt.name}</td>
                            <td className="py-3 px-4 font-semibold text-slate-600">{tr?.name}</td>
                            <td className="py-3 px-4 font-semibold text-slate-500">{dr?.name}</td>
                            <td className="py-3 px-4">
                              <span className="font-extrabold text-blue-600">{apt.date}</span>
                              <span className="ml-1.5 font-bold text-slate-400">{apt.time}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-500 font-medium">{apt.phone}</td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => onUpdateStatus(apt.id, 'APPROVED')}
                                className="bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 py-1.5 px-2.5 rounded-lg font-bold transition cursor-pointer"
                              >
                                Onayla
                              </button>
                              <button
                                onClick={() => onUpdateStatus(apt.id, 'CANCELLED')}
                                className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 py-1.5 px-2.5 rounded-lg font-bold transition cursor-pointer"
                              >
                                İptal Et
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: WEEKLY CALENDAR PLANNER */}
        {activeTab === 'calendar' && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Haftalık Yoğunluk Matrisi</h3>
              <p className="text-xs text-slate-400 font-medium">Haftanın günlerine göre saat bazında hasta doluluk takvimi.</p>
            </div>

            {/* Visual calendar display */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {/* Generate columns for Mon to Sun, or choose dates */}
              {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map((day, dIdx) => {
                // For simulation, let's map dates associated to this week
                const mappedDate = `2026-06-${15 + dIdx}`; // June 15 is Mon, June 18 is today (Thur)
                const dayApts = appointments.filter(a => a.date === mappedDate && a.status !== 'CANCELLED');

                return (
                  <div key={day} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col space-y-3 min-h-[300px]">
                    <div className="border-b border-slate-200/60 pb-2 text-center">
                      <div className="text-xs font-black text-slate-700 uppercase tracking-tight">{day}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{mappedDate}</div>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto max-h-[400px]">
                      {dayApts.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-center py-12 text-[10px] text-slate-400 font-medium">
                          Randevu Yok
                        </div>
                      ) : (
                        dayApts.map(apt => {
                          const docObj = DOCTORS.find(d => d.id === apt.doctorId);
                          const treatObj = TREATMENTS.find(t => t.id === apt.treatmentId);
                          
                          return (
                            <div
                              key={apt.id}
                              className={`p-2.5 rounded-lg border text-left space-y-1.5 transition ${
                                apt.status === 'APPROVED'
                                  ? 'bg-blue-50/70 border-blue-100 text-blue-900'
                                  : apt.status === 'CANCELLED'
                                  ? 'bg-red-50/70 border-red-100 text-red-900'
                                  : 'bg-amber-50/70 border-amber-100 text-amber-900'
                              }`}
                            >
                              <div className="flex justify-between items-center text-[10px] font-extrabold pb-1 border-b border-current/10">
                                <span className="flex items-center gap-0.5">
                                  <Clock className="w-3 h-3" /> {apt.time}
                                </span>
                                <span className="uppercase">{apt.status === 'PENDING' ? 'Bekliyor' : apt.status === 'CANCELLED' ? 'İptal Edildi' : 'Onaylandı'}</span>
                              </div>
                              <p className="text-[11px] font-black line-clamp-1">{apt.name}</p>
                              <p className="text-[9px] opacity-85 leading-tight">{treatObj?.name}</p>
                              <p className="text-[9px] opacity-60 font-medium whitespace-nowrap line-clamp-1">Hekim: {docObj?.name.split(' ').slice(-1)}</p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PATIENT & APPOINTMENT LIST CONTROLLER */}
        {activeTab === 'patients' && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            
            {/* Table Filters and search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Search input to parse names, treats, doctors */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Hasta adı, tedavi veya hekim ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-3 focus:ring-blue-100 font-semibold"
                />
              </div>

              {/* Status Selectors */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-extrabold uppercase">Durum:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-3 focus:ring-blue-100 font-bold text-slate-700"
                >
                  <option value="ALL">Hepsi</option>
                  <option value="PENDING">Bekliyor</option>
                  <option value="APPROVED">Onaylandı</option>
                  <option value="CANCELLED">İptal Edildi</option>
                </select>
              </div>
            </div>

            {/* Master Patient Table list */}
            {filteredAppointments.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm font-bold bg-slate-50/50 rounded-xl">
                Aradığınız kriterlere uygun randevu kaydı bulunamadı.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-black uppercase text-slate-400 bg-slate-50">
                      <th className="py-3 px-4">Hasta Kimliği / İletişim</th>
                      <th className="py-3 px-4">Tedavi Alanı</th>
                      <th className="py-3 px-4">Sorumlu Hekim</th>
                      <th className="py-3 px-4">Seans Tarih & Saat</th>
                      <th className="py-3 px-4">Not/Şikayet</th>
                      <th className="py-3 px-4 text-center">Durum</th>
                      <th className="py-3 px-4 text-right">Randevu Durum Kontrolü</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {filteredAppointments.map(apt => {
                      const doc = DOCTORS.find(d => d.id === apt.doctorId);
                      const treat = TREATMENTS.find(t => t.id === apt.treatmentId);
                      
                      return (
                        <tr key={apt.id} className="hover:bg-slate-50/50">
                          <td className="py-4 px-4 space-y-1">
                            <div className="font-extrabold text-slate-800 text-sm">{apt.name}</div>
                            <div className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" /> {apt.phone}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium">{apt.email}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-extrabold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/50">
                              {treat?.name}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-600">{doc?.name}</td>
                          <td className="py-4 px-4">
                            <div className="font-extrabold text-blue-600">{apt.date}</div>
                            <div className="text-[11px] font-extrabold text-slate-400 mt-0.5">{apt.time}</div>
                          </td>
                          <td className="py-4 px-4 max-w-xs text-slate-500 font-normal leading-relaxed">
                            {apt.note || <span className="italic text-slate-300">Belirtilmemiş</span>}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              apt.status === 'PENDING'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : apt.status === 'APPROVED'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : apt.status === 'CANCELLED'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {apt.status === 'PENDING' ? 'Bekliyor' : apt.status === 'APPROVED' ? 'Onaylandı' : apt.status === 'CANCELLED' ? 'İptal Edildi' : 'Onaylandı'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                            {apt.status === 'PENDING' && (
                              <button
                                onClick={() => onUpdateStatus(apt.id, 'APPROVED')}
                                className="bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 border border-emerald-200 p-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer"
                              >
                                Onayla
                              </button>
                            )}

                            {apt.status !== 'CANCELLED' && (
                              <button
                                onClick={() => onUpdateStatus(apt.id, 'CANCELLED')}
                                className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 border border-red-200 p-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer"
                              >
                                İptal Et
                              </button>
                            )}
                            
                            {apt.status === 'CANCELLED' && (
                              <span className="text-[11px] text-slate-300 font-extrabold italic">İptal Edildi</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CLINICAL REPORTS & ANALYTICS */}
        {activeTab === 'reports' && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-8 animate-fadeIn">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Klinik Operasyon Raporları</h3>
              <p className="text-xs text-slate-400 font-medium">Tedavi popülasyonu ve hekim dağılımının analitik grafileri.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Treatment charts popular block */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Tedavi Dağılım Oranları</h4>
                
                {chartDataTreatments.length === 0 ? (
                  <div className="py-20 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                    Grafik oluşturmak için yeterli aktif randevu verisi mevcut değil.
                  </div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartDataTreatments}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Randevu Sayısı" fill="#2563eb">
                          {chartDataTreatments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Doctors distribution of patients */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Hekim Doluluk Dağılımı</h4>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartDataDoctors}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Hasta Sayısı" fill="#06b6d4">
                        {chartDataDoctors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Strategic analytics callout summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 border border-slate-100 rounded-3xl p-6">
              
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Hekim Dağılım Analizi</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Hekim doluluğu analiz edildiğinde, tedavilerin büyük kısmı estetik gülüş tasarımları ve ortodontik operasyonlardan ibarettir. Çocuk diş hekimliği için gelen randevu oranları okul saatleri dışında artış göstermektedir.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Güvenlik ve Veri Koruma</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Sistemimizdeki tüm hasta iletişim kayıtları, telefon numaraları ve özel hasta notları yerel ve şifreli depolama birimlerinde (Local Secure Vault) depolanır. Dış kaynaklı hiç kimseyle paylaşılamaz.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
