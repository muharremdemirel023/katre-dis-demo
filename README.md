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
