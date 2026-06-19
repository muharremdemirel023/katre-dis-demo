# Katre Diş Demo Projesi

Katre Diş Polikliniği için hazırlanmış modern web sitesi ve online randevu yönetim demosudur. Proje; hasta tarafında randevu talebi oluşturma, klinik tarafında randevuları görüntüleme ve durum yönetimi akışlarını içerir.

## Özellikler

- Modern klinik tanıtım sayfası
- Online randevu formu
- Randevu sonrası profesyonel başarı ekranı
- Admin panelde randevu listesi
- Randevu durumları: Bekliyor, Onaylandı, İptal Edildi
- Dosya tabanlı basit API ve tarayıcı yedeği
- Mobil uyumlu arayüz

## Kurulum

**Gereksinim:** Node.js

```bash
npm install
```

## Geliştirme Ortamı

API sunucusunu başlatın:

```bash
npm run server
```

Ayrı bir terminalde arayüzü başlatın:

```bash
npm run dev
```

Uygulama varsayılan olarak şu adreste açılır:

```text
http://localhost:3000
```

## Admin Panel

Admin panel adresi:

```text
http://localhost:3000/admin
```

Demo PIN:

```text
1234
```

## Build

Production çıktısı almak için:

```bash
npm run build
```

## Veri Saklama

Randevu kayıtları API çalışırken `data/appointments.json` dosyasında tutulur. API erişilemezse tarayıcı tarafında `localStorage` yedeği kullanılır.

Vercel statik demo modunda randevular `localStorage`da tutulur. Gerçek çok cihazlı kullanım için backend/veritabanı gerekir.

## WhatsApp / n8n Demo Entegrasyonu

Bos saat sorgusu ornegi:

```http
GET /api/whatsapp/available-slots?doctor=Dt.%20Ugur%20Kaya&date=2026-06-20
x-bot-secret: demo-secret-123
```

Randevu olusturma ornegi:

```http
POST /api/whatsapp/appointments
Content-Type: application/json
x-bot-secret: demo-secret-123
```

Ornek JSON body:

```json
{
  "name": "Ali Demir",
  "phone": "905551112233",
  "service": "Dolgu",
  "doctor": "Dt. Ugur Kaya",
  "date": "2026-06-20",
  "time": "14:30",
  "note": "WhatsApp bot uzerinden olusturuldu"
}
```

n8n akisi:

```text
Evolution API Webhook -> HTTP Request -> /api/whatsapp/available-slots veya /api/whatsapp/appointments -> WhatsApp cevap
```
