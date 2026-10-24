# Portofolio Fajri Alamsyah

Website portofolio profesional pribadi untuk **Fajri Alamsyah (Fullstack Developer)** yang dibangun menggunakan Next.js App Router, TypeScript, Tailwind CSS, dan terintegrasi dengan Sanity Studio sebagai CMS headless.

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** Next.js (App Router) + React 19
- **Bahasa:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (v4)
- **Tipografi:** Google Font Inter
- **CMS / Headless Admin:** Sanity Studio (di rute `/studio` — disiapkan pada Fase 3)
- **Arsitektur Data:** Server-side fetching dengan `perspective: 'published'` dan `cache: 'no-store'`

---

## 🚀 Memulai Proyek Secara Lokal

### Prasyarat
- Node.js versi `18.18+` atau `20+` / `24+` (Disarankan LTS; proyek ini menggunakan Node v24.12.0)
- npm versi `9+` (atau `11+`)

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📜 Perintah yang Tersedia (NPM Scripts)

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server development Next.js lokal |
| `npm run build` | Membuat bundel produksi aplikasi (*production build*) |
| `npm run start` | Menjalankan server produksi lokal setelah dibuild |
| `npm run lint` | Menjalankan pemeriksaan kode menggunakan ESLint |
| `npm run typecheck` | Menjalankan validasi tipe TypeScript (`tsc --noEmit`) |

---

## 📁 Struktur Direktori Proyek

```text
portfolio-fajri/
├── docs/                     # Dokumentasi acuan, desain, rencana, dan model konten
├── inputs/                   # Berkas kerja pribadi (foto PNG asli, CV, tangkapan layar)
├── src/
│   ├── app/                  # Rute Next.js App Router
│   │   ├── globals.css       # Token desain dan Tailwind CSS
│   │   ├── layout.tsx        # Root layout (Inter font, metadata)
│   │   ├── page.tsx          # Beranda (Hero, Proyek Unggulan, Tentang, Keahlian, Kontak)
│   │   ├── not-found.tsx     # Halaman 404
│   │   └── proyek/
│   │       ├── page.tsx      # Halaman daftar proyek
│   │       └── [slug]/
│   │           └── page.tsx  # Halaman studi kasus detail proyek
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   └── ui/               # Container, Button, Badge
│   ├── data/                 # Fixture development bertipe (tanpa data palsu)
│   ├── lib/                  # Lapisan akses data (Content Access Layer)
│   └── types/                # Definisi tipe TypeScript
├── .env.example              # Contoh konfigurasi environment
├── .gitignore                # Proteksi aset rahasia dan bahan mentah
├── AGENTS.md                 # Aturan kerja agent per fase
└── CHANGELOG.md              # Riwayat perubahan proyek
```

---

## 🎨 Token Desain Resmi

| Token | Nilai Hex | CSS Variable | Fungsi |
| --- | --- | --- | --- |
| Latar utama | `#0B1120` | `--bg-primary` | Background utama seluruh halaman |
| Permukaan kartu | `#111C30` | `--surface-card` | Kartu proyek, kontainer panel, modal |
| Teks utama | `#F1F5F9` | `--text-primary` | Heading, teks paragraf utama |
| Teks pendukung | `#A8B3C7` | `--text-secondary` | Metadata, deskripsi sekunder |
| Aksen utama | `#60A5FA` | `--accent-primary` | Tombol CTA, link aktif, border fokus |
| Garis pembatas | `#243247` | `--border-subtle` | Garis pemisah, border kartu |
| Teks tombol utama | `#0B1120` | `--btn-text-primary` | Teks tombol biru aksen |
| Tulisan dekoratif | `#1E3A5F` | `--text-decorative` | Tulisan latar belakang PORTFOLIO |

---

## 🔐 Manajemen Konten (Sanity Studio)

Admin panel tersemat langsung pada rute: **`/studio`** (misal: [http://localhost:3000/studio](http://localhost:3000/studio)).
- **Autentikasi:** Menggunakan otorisasi keanggotaan proyek Sanity (Google / GitHub). Rute admin dilindungi dengan aturan `robots: noindex, nofollow`.
- **4 Jenis Konten:**
  1. **Profil Pribadi (Singleton):** Data diri, bio, foto PNG transparan asli, dan berkas CV PDF.
  2. **Pengaturan Situs & Kontak (Singleton):** Email publik, URL GitHub, URL LinkedIn, konfigurasi SEO, dan banner Open Graph.
  3. **Keahlian & Teknologi (Koleksi):** Master data keahlian (Frontend, Backend, Database, Tools).
  4. **Daftar Proyek (Koleksi):** Studi kasus aplikasi web (masalah, kontribusi, solusi teknis, galeri antarmuka, status repositori).

---

## ⚙️ Variabel Lingkungan (Environment Variables)

Salin berkas `.env.example` menjadi `.env.local` pada root direktori:

```env
# URL Situs Publik (untuk metadata SEO kanonikal & Open Graph)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Konfigurasi Identitas Sanity CMS (Publik & Aman)
NEXT_PUBLIC_SANITY_PROJECT_ID=lbts9jeh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-24
```

> [!IMPORTANT]
> - Seluruh konfigurasi di atas bersifat identitas publik proyek dan aman disertakan di frontend.
> - **JANGAN PERNAH** memasukkan token rahasia (seperti Sanity Write Token atau API Secret) ke dalam file kode atau commit Git!

---

## 💾 Perbedaan Source Code vs Backup Konten CMS

- **Source Code (Git / GitHub):**  
  Menyimpan logika aplikasi Next.js, komponen React, konfigurasi Tailwind CSS, schema Sanity, dan aturan desain. Perubahan source code dilakukan oleh developer/agent dan memicu deployment baru.
- **Data Konten (Sanity Content Lake):**  
  Menyimpan isi teks bio, foto asli, resume PDF, data keahlian, dan studi kasus proyek di cloud Sanity. Perubahan konten dilakukan melalui `/studio` via tombol **Publish** dan langsung tampil seketika di website publik tanpa perlu build ulang atau git push.
- **Pencadangan Konten (Backup CLI):**  
  Untuk mencadangkan seluruh data teks dan aset media Sanity ke komputer lokal:
  ```bash
  npx sanity dataset export production backups/sanity-backup.tar.gz
  ```

