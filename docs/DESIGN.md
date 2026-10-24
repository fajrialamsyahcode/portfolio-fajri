# Spesifikasi Desain — Portofolio Fajri Alamsyah

Tanggal Dokumen: 24 Oktober 2026  
Status: Acuan Desain Resmi (Fase 0)  

Dokumen ini memuat standar token warna, tipografi, aturan tata letak (layout), pedoman foto profil, dan prinsip responsivitas antarmuka.

---

## 1. Token Warna (Design Tokens)

Tema visual portofolio menggunakan palet gelap bernuansa **Navy–Biru Muda** yang elegan, berwibawa, dan kontras tinggi sesuai standar WCAG AAA/AA untuk kemudahan membaca.

| Nama Token | Nilai Hex | CSS Variable | Penggunaan UI |
| --- | --- | --- | --- |
| **Latar Utama (Primary Background)** | `#0B1120` | `--bg-primary` | Latar belakang keseluruhan halaman website dan body |
| **Permukaan Kartu (Card Surface)** | `#111C30` | `--surface-card` | Latar belakang kartu proyek, kartu keahlian, panel detail |
| **Teks Utama (Primary Text)** | `#F1F5F9` | `--text-primary` | Heading (h1-h4), judul kartu, teks penting, navigasi |
| **Teks Pendukung (Secondary Text)** | `#A8B3C7` | `--text-secondary` | Paragraf, ringkasan, deskripsi studi kasus, metadata |
| **Aksen Utama (Accent / Brand)** | `#60A5FA` | `--accent-primary` | Tombol CTA utama, badge aktif, link hover, focus ring |
| **Garis Pembatas (Border Line)** | `#243247` | `--border-subtle` | Garis kartu (1px), pemisah antar-section, garis navbar |
| **Teks Tombol Utama (Button Text)** | `#0B1120` | `--btn-text-primary` | Teks di dalam tombol aksen biru (`#60A5FA`) |
| **Tulisan Dekoratif (Decorative Text)** | `#1E3A5F` | `--text-decorative` | Tipografi latar belakang besar "PORTFOLIO" di section hero |

### Catatan Penggunaan Warna:
- **Kontras Tinggi:** Teks utama `#F1F5F9` pada latar `#0B1120` memiliki rasio kontras > 14:1, sangat ramah mata.
- **Konsistensi Border:** Setiap kartu menggunakan border halus `1px solid #243247` dengan `border-radius: 0.75rem` (12px) atau `1rem` (16px).
- **Efek Hover:** Kartu dan tombol memiliki transisi halus (transition 200ms ease-in-out) dengan sedikit pencerahan border atau bayangan lembut tanpa warna yang menyimpang.

---

## 2. Tipografi

- **Keluarga Font Utama:** `Inter`, sans-serif (dimuat melalui `next/font/google` dengan `subsets: ['latin']` dan `display: 'swap'`).
- **Skala Tipografi:**
  - **Display / Hero H1:** 2.5rem – 3.75rem (40-60px), Font Weight 700 / Bold, Line Height 1.15.
  - **Section Heading H2:** 1.875rem – 2.25rem (30-36px), Font Weight 700 / Bold, Line Height 1.25.
  - **Sub-heading / Card Title H3:** 1.25rem – 1.5rem (20-24px), Font Weight 600 / Semi-Bold.
  - **Body / Paragraf:** 1rem – 1.125rem (16-18px), Font Weight 400 / Normal, Line Height 1.6.
  - **Label / Metadata / Badge:** 0.875rem (14px), Font Weight 500 / Medium, Tracking 0.025em.
  - **Teks Dekoratif PORTFOLIO:** 5rem – 10rem (80-160px), Font Weight 900 / Black, Tracking wide, Uppercase, Opacity rendah/warna `#1E3A5F`, `aria-hidden="true"`, pointer-events none.

---

## 3. Komposisi Tata Letak (Layout)

### A. Section Hero Desktop (Acuan Lebar: 1440px)
- **Komposisi Grid:** 2 kolom asimetris:
  - **Kolom Kiri (Konten Teks & Aksi):**
    - Sapaan kecil: "Halo, saya" (`#60A5FA` / `#A8B3C7`).
    - Nama Besar: "Fajri Alamsyah" (`#F1F5F9`, H1 tegas).
    - Peran: "Fullstack Developer" (`#60A5FA`).
    - Tagline singkat: "Membangun aplikasi web yang berguna, rapi, dan mudah digunakan."
    - Kelompok Tombol CTA: Tombol utama "Lihat Proyek" (latar `#60A5FA`, teks `#0B1120`) dan tombol sekunder "Hubungi Saya" (latar transparan, border `#243247`, teks `#F1F5F9`, hover surface `#111C30`).
  - **Kolom Kanan / Tengah-Kanan (Foto Profil):**
    - Menampilkan foto PNG berlatar transparan asli Fajri.
    - Bagian bawah foto menempel rata (aligned bottom) dengan batas bawah kontainer hero.
    - Bayangan lembut atau gradient masking tipis di bagian paling bawah agar menyatu mulus dengan batas section.
  - **Latar Belakang Hero:**
    - Teks tipografi besar redup "PORTFOLIO" berwarna `#1E3A5F` diletakkan di lapisan belakang (z-index 0) di belakang teks dan foto, memberikan kedalaman tanpa mengurangi keterbacaan teks utama.

### B. Section Hero Mobile (Acuan Lebar: 390px, mendukung 360px - 430px)
- **Komposisi Tumpuk (Stacked Single Column):**
  - Teks sapaan, nama, peran, dan tagline berada di bagian atas.
  - Tombol CTA disusun rapi (bisa berdampingan atau bertumpuk vertikal dengan target sentuh minimal 44x44px).
  - Foto PNG Fajri berada di bawah teks dengan ukuran proporsional.
  - Kepala dan bahu tidak boleh terpotong (cutoff).
  - Tidak ada teks yang terpotong horizontal (no horizontal scrollbar).

### C. Bagian Proyek Unggulan (Featured Projects)
- Maksimal 3 proyek di halaman beranda.
- Grid responsif: 1 kolom di mobile, 2 atau 3 kolom di desktop.
- Kartu memuat gambar rasio aspek konsisten (16:9), badge teknologi, ringkasan singkat, dan link ke `/proyek/[slug]`.

### D. Halaman Proyek (`/proyek`) dan Detail Proyek (`/proyek/[slug]`)
- `/proyek`: Grid lengkap kartu proyek yang berstatus published.
- `/proyek/[slug]`: Tata letak editorial studi kasus yang bersih:
  - Header studi kasus (judul, peran, teknologi, link demo/repo jika ada).
  - Gambar utama / thumbnail beresolusi tajam.
  - Struktur narasi: Masalah, Kontribusi Pribadi, Solusi Teknis, Hasil.
  - Galeri screenshot proyek dengan caption.

---

## 4. Aturan Ketat Foto Profil (Photo Strict Guidelines)

1. **Keaslian Foto:**
   - Foto yang digunakan pada website publik WAJIB merupakan foto PNG asli milik Fajri Alamsyah dengan latar belakang transparan.
   - **LARANGAN KERAS:** DILARANG menggunakan tool AI untuk membuat ulang, merekayasa, atau mengubah wajah, ekspresi, pakaian, gaya rambut, pose, atau proporsi tubuh Fajri.
2. **Larangan Potret Referensi:**
   - Foto orang asing pada screenshot desain referensi atau template Stitch BUKAN foto Fajri dan DILARANG dijadikan aset website.
3. **Penanganan Jika Foto Belum Tersedia:**
   - Selama Fase 0 dan Fase 1, status foto dicatat sebagai `BELUM TERSEDIA`.
   - Pada Fase 2 (pengujian UI), jika foto asli belum dimasukkan oleh pemilik ke `inputs/profile/`, agent diperbolehkan menggunakan placeholder siluet netral berlabel jelas: `[Placeholder Foto Fajri - Menunggu Foto PNG Asli]`.
   - Placeholder ini WAJIB diganti dengan foto asli sebelum rilis publik (Fase 5 dan 7).
4. **Optimasi Gambar:**
   - Menggunakan komponen `next/image` dengan properti `priority` pada foto hero.
   - Menyertakan `alt` text deskriptif yang sesuai fakta (misal: "Foto Fajri Alamsyah, Fullstack Developer").
   - Memastikan `unoptimized` tidak diaktifkan sembarangan, dan konfigurasi domain gambar Sanity disiapkan dengan tepat.

---

## 5. Responsivitas dan Aksesibilitas

- **Breakpoints:**
  - `sm`: 640px (perangkat seluler lanskap)
  - `md`: 768px (tablet portrait)
  - `lg`: 1024px (laptop / tablet landscape)
  - `xl`: 1280px (desktop standar)
  - `2xl`: 1440px+ (desktop lebar)
- **Aksesibilitas (A11y):**
  - Hirarki heading teratur: satu `<h1>` per halaman, diikuti `<h2>`, `<h3>` berurutan tanpa lompatan tingkat.
  - Elemen dekoratif seperti teks "PORTFOLIO" wajib memiliki atribut `aria-hidden="true"`.
  - Tombol dan tautan memiliki label yang jelas (tidak ada link kosong).
  - Dukungan navigasi keyboard penuh (focus outline terlihat dengan ring aksen `#60A5FA`).
  - Mendukung preferensi gerak berkurang (`prefers-reduced-motion: reduce`).
