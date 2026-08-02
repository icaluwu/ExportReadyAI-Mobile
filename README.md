# 🌐 ExportReadyAI Mobile

> **Aplikasi Konsultan & Evaluasi Kesiapan Ekspor UMKM Berbasis AI**  
> Dibuat khusus untuk **Digdaya x Hackathon 2026** oleh Tim **"Solo? Me 2"**.

---

## 👨‍💻 Informasi Tim & Acara

- **Acara:** Digdaya x Hackathon 2026
- **Nama Tim:** Solo? Me 2
- **Anggota / Pengembang:** [Teuku Vaickal Rizki Irdian](https://icaluwu.site)
- **Repositori Web:** ExportReadyAI Web App
- **Repositori Mobile:** [ExportReadyAI-Mobile](https://github.com/icaluwu/ExportReadyAI-Mobile.git)

---

## 🚀 Tentang Aplikasi

**ExportReadyAI Mobile** adalah aplikasi perangkat bergerak (*mobile app*) berbasis **React Native** dan **Expo SDK 54** yang dirancang untuk membantu Usaha Mikro, Kecil, dan Menengah (UMKM) Indonesia menilai kesiapan produk mereka menembus pasar internasional kurang dari 30 menit.

Aplikasi ini mengintegrasikan AI Gemini untuk memberikan analisis produk otomatis, rekomendasi HS Code, prediksi 3 negara tujuan utama, serta langkah konkret dalam bentuk *Roadmap Akses Ekspor 4 Fase*.

---

## ✨ Fitur Utama

- 📋 **Assessment Kesiapan Ekspor 4 Langkah:** Evaluasi profil produk, kapasitas bisnis, sertifikasi (Halal, BPOM, HACCP), dan target pasar.
- 🔍 **Pencari HS Code Otomatis (AI):** Membantu pelaku UMKM menemukan kode HS produk secara akurat menggunakan AI Gemini.
- 📊 **Dashboard Executive & Readiness Score:** Visualisasi nilai kesiapan ekspor (0–100) beserta indikator statistik usaha.
- 🗺️ **Roadmap Akses Ekspor Interaktif:** Panduan 4 fase (Legalitas, Kemasan, Buyer Matching, Logistik PEB) yang dapat diperbarui (*checklist*).
- 💬 **Konsultan Ekspor Virtual 24/7:** Fitur interaktif tanya-jawab regulasi bea cukai, dokumen ekspor, dan standar mutu produk.
- 💳 **Integrasi Pembayaran Midtrans (WebView):** Alur langganan *ExportReady Premium* berbasis Midtrans Snap Payment Gateway.
- 📱 **Desain UI/UX Responsive & Ringan:** Dioptimalkan dengan **Hermes Engine** dan **`react-native-safe-area-context`**, sehingga berjalan mulus bahkan di HP spesifikasi rendah (*HP kentang*).

---

## 🏗️ Arsitektur & Keamanan (Security)

Aplikasi ini menggunakan arsitektur aman di mana **Web dan Mobile terhubung ke database Supabase dan Backend Vercel yang sama**:

```
📱 Mobile Client (Expo Go)  ──>  🌐 Vercel Web API  ──>  🤖 Gemini AI (Google Cloud)
            │                           │
            └───────── DB Sync ─────────┴──>  🗄️ Supabase Database & Auth
```

### 🔒 Pernyataan Keamanan (Security Policy):
1. **Tidak Ada Secret API Key di Mobile App:**  
   Kunci rahasia sensitif seperti `GEMINI_API_KEY` dan `MIDTRANS_SERVER_KEY` **HANYA** disimpan pada server **Vercel** / Supabase Edge Functions. Aplikasi mobile tidak menyimpan API Key sensitif di dalam bundle aplikasi.
2. **Supabase Anon Key & Row Level Security (RLS):**  
   Mobile app hanya memegang `EXPO_PUBLIC_SUPABASE_ANON_KEY` yang aman bagi client-side dan dilindungi oleh aturan keamanan *Row Level Security (RLS)* di database Supabase.

---

## 🛠️ Panduan Instalasi & Pengujian di Expo Go (Free)

### 1. Prasyarat
- **Node.js** (v18 atau lebih baru)
- Aplikasi **Expo Go** terinstal di perangkat smartphone Android atau iOS.

### 2. Langkah Instalasi

```bash
# 1. Clone repositori ini
git clone https://github.com/icaluwu/ExportReadyAI-Mobile.git

# 2. Masuk ke direktori proyek
cd ExportReadyAI-Mobile

# 3. Install dependensi
npm install

# 4. Buat file .env di root proyek (Salin dari template .env.example)
cp .env.example .env
```

### 3. Konfigurasi Environment Variables (`.env`)

Isi file `.env` di komputer Anda:
```env
EXPO_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...
EXPO_PUBLIC_API_BASE_URL=http://<IP-LOKAL-PC-ANDA>:3000
```
*(Catatan: Gunakan IP Wi-Fi PC Anda saat testing lokal di Expo Go, atau gunakan URL domain produksi Vercel Anda).*

### 4. Jalankan Aplikasi

```bash
npx expo start
```
Buka aplikasi **Expo Go** di HP Anda, lalu **scan QR Code** yang muncul di terminal.

---

## 📄 Lisensi & Hak Cipta

Proyek ini dilisensikan di bawah **[MIT License](LICENSE)**.

> **PENAFIAN LISENSI (DISCLAIMER):**  
> Lisensi ini **HANYA** mencakup kode sumber (*source code*) aplikasi ExportReadyAI Mobile. Lisensi ini **TIDAK** mencakup, tidak menyediakan, dan tidak memberikan hak atas segenap API Key, kredensial environment sensitif, server access token, maupun basis data internal yang terhubung dengan layanan ExportReadyAI, panitia Digdaya x Hackathon 2026, atau pemilik repositori ini.

---

*Dibuat dengan ❤️ oleh **Teuku Vaickal Rizki Irdian** ([icaluwu.site](https://icaluwu.site)) — Tim Solo? Me 2 untuk **Digdaya x Hackathon 2026**.*
