# Project Brief — Portofolio Fajri Alamsyah

Tanggal Dokumen: 24 Oktober 2026  
Status: Acuan Utama Proyek (Disetujui pada Fase 0)  
Pemilik Proyek: Fajri Alamsyah  
Peran / Profesi: Fullstack Developer  
Bahasa Antarmuka: Bahasa Indonesia  

---

## 1. Tujuan Proyek

Membangun website portofolio profesional pribadi untuk Fajri Alamsyah yang:
1. Menampilkan keahlian, profil, dan studi kasus proyek nyata secara rapi, elegan, dan terstruktur.
2. Memudahkan pembaruan konten mandiri (profil, keahlian, proyek, dan kontak) melalui CMS Sanity Studio tanpa harus mengubah kode sumber atau melakukan build ulang.
3. Memberikan pengalaman pengguna yang cepat, modern, aksesibel, dan responsif baik di perangkat seluler maupun desktop.
4. Membangun kredibilitas profesional sebagai Fullstack Developer melalui narasi studi kasus (masalah, kontribusi pribadi, solusi/fitur, teknologi, dan tautan kode/demo yang valid).

---

## 2. Ruang Lingkup Versi Pertama (Scope v1)

### Fitur Publik (In-Scope):
1. **Beranda (`/`):**
   - **Header / Navigasi:** Nama "Fajri Alamsyah", tautan menu (Proyek, Tentang, Kontak), dan tombol aksi "Unduh CV".
   - **Hero Section:**
     - Sapaan & Nama: "Halo, saya Fajri Alamsyah"
     - Peran: "Fullstack Developer"
     - Tagline: "Membangun aplikasi web yang berguna, rapi, dan mudah digunakan."
     - Tombol Aksi: "Lihat Proyek" (scroll/link ke proyek) dan "Hubungi Saya" (link ke kontak).
     - Komposisi Visual: Teks di sebelah kiri, foto PNG asli Fajri di tengah-kanan dengan latar transparan, serta tipografi dekoratif redup "PORTFOLIO" di latar belakang.
   - **Bagian Proyek Unggulan:** Menampilkan maksimal 3 (tiga) proyek dengan flag `unggulan: true`. Jika hanya ada 1 atau 2 proyek nyata, tampilkan sesuai jumlah nyata (tidak membuat dummy).
   - **Bagian Tentang Saya:** Penjelasan ringkas profil, latar belakang, dan pendekatan kerja.
   - **Bagian Keahlian (Skills):** Menampilkan keahlian yang dikelompokkan berdasarkan kategori (Frontend, Backend, Database, Tools & Lainnya).
   - **Bagian Kontak:** Tautan email langsung (`mailto:`) dan tautan ke profil profesional (LinkedIn, GitHub).
   - **Footer:** Hak cipta, identitas singkat, dan navigasi balik ke atas.
2. **Halaman Daftar Proyek (`/proyek`):**
   - Menampilkan seluruh proyek yang berstatus diterbitkan (`tampilkan: true`).
   - Kartu proyek memuat thumbnail, judul, ringkasan singkat, badge teknologi utama, dan tautan ke studi kasus.
3. **Halaman Studi Kasus Proyek (`/proyek/[slug]`):**
   - Informasi detail proyek: judul, kategori/jenis proyek, ringkasan.
   - Narasi mendalam: Latar Belakang / Masalah, Kontribusi Pribadi, Solusi Teknis / Fitur Utama, Hasil/Dampak (hanya jika ada fakta terverifikasi).
   - Daftar teknologi yang digunakan (terhubung ke referensi keahlian).
   - Galeri tangkapan layar (screenshot) dengan alt text deskriptif.
   - Tautan eksternal: Demo langsung (jika tersedia), Repositori publik (jika ada), atau keterangan status repositori (misal "Repositori privat untuk keperluan internal").
4. **Halaman Not Found (`/not-found` atau 404):**
   - Tampilan ramah bertema navy saat slug atau rute tidak ditemukan, dengan tombol kembali ke beranda.

### Fitur Admin (In-Scope):
- **Sanity Studio (`/studio`):**
  - Rute admin embedded yang dilindungi otorisasi akun Sanity pemilik.
  - Formulir berlabel Bahasa Indonesia dengan validasi ketat untuk 4 jenis dokumen: Profil, Proyek, Keahlian, dan Pengaturan Situs.

### Di Luar Ruang Lingkup v1 (Out of Scope):
- Sistem Blog / Artikel teknis.
- Formulir kontak kustom dengan backend database pesan / mailing server (cukup link `mailto:`).
- Autentikasi / akun pengunjung publik.
- Dashboard analitik kustom.
- Page builder drag-and-drop bebas (tata letak dan palet tetap dikontrol oleh kode agent).

---

## 3. Spesifikasi Arsitektur & Teknologi

| Komponen | Pilihan Teknologi | Alasan Pemilihan |
| --- | --- | --- |
| **Framework** | Next.js (App Router) + React | Standar modern SSR/RSC, routing berbasis direktori, performa pemuatan tinggi, SEO optimal. |
| **Bahasa** | TypeScript (Strict mode) | Menjamin type safety, mencegah runtime error, memudahkan pemetaan schema Sanity ke props komponen. |
| **Styling** | Tailwind CSS (v3 / v4 compatible) | Efisiensi penulisan CSS, sistem token utility yang konsisten dengan tema desain. |
| **Tipografi** | Google Font Inter | Font sans-serif modern, bersih, terbaca sangat baik pada ukuran kecil maupun besar. |
| **CMS & Aset** | Sanity.io (Cloud Content Lake) | Schema-as-code, media CDN bawaan, pengelolaan dokumen draft/published yang terstruktur. |
| **Admin Route** | Embedded Sanity Studio (`/studio`) | Admin terintegrasi langsung di dalam aplikasi Next.js tanpa perlu hosting terpisah. |

---

## 4. Keputusan Arsitektur Aliran Data (Data Flow Architecture)

1. **Server-Side Data Fetching:**
   - Halaman publik memanfaatkan React Server Components (RSC) untuk mengambil data langsung dari Sanity Content Lake.
2. **Strategi Tanpa Cache Konten Lintas Request (No Cross-Request Content Cache):**
   - Menggunakan opsi `useCdn: false` dan pengaturan fetch tanpa cache (misal `cache: 'no-store'` atau Next.js dynamic rendering) pada query publik.
   - **Tujuan:** Saat pemilik menekan tombol **Publish** di Sanity Studio, perubahan konten langsung tampil ketika halaman publik dimuat ulang (refresh) oleh pengunjung tanpa memerlukan rebuild aplikasi atau trigger deploy webhook.
3. **Perspektif Published:**
   - Semua query publik secara eksplisit meminta data dengan `perspective: 'published'`. Dokumen yang berstatus draft atau ditandai `tampilkan: false` tidak akan pernah dikirimkan ke antarmuka publik.
4. **Isolasi Lapisan Data (Data Access Layer):**
   - Logika query GROQ dan adapter transformasi data dipisahkan secara tegas dari komponen UI. Komponen UI hanya menerima props TypeScript murni, sehingga tidak bergantung pada bentuk query mentah.

---

## 5. Batasan Privasi & Keamanan

1. **Pemisahan Kredensial:**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` dan `NEXT_PUBLIC_SANITY_DATASET` bersifat identitas proyek yang aman diakses publik browser.
   - Token dengan hak **Write** sama sekali TIDAK DIBUTUHKAN oleh frontend publik, karena pengunjung tidak melakukan mutasi data.
2. **Otorisasi Studio:**
   - Akses edit pada `/studio` dilindungi oleh sistem login resmi Sanity (Google / GitHub / Email).
   - Pengunjung tanpa izin keanggotaan proyek Sanity tidak akan dapat mengakses dokumen atau melakukan perubahan.
3. **Penyaringan Aset Mentah:**
   - Folder `inputs/`, file `.env.local`, dan folder `backups/` tidak boleh dipublikasikan ke publik atau dimasukkan ke dalam repositori Git publik.
