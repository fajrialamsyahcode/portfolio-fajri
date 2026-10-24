# Changelog — Portofolio Fajri Alamsyah

Semua perubahan penting pada proyek portofolio Fajri Alamsyah dicatat dalam dokumen ini. Format mengikuti standar [Keep a Changelog](https://keepachangelog.com/id/1.0.0/).

---

## [0.8.0] - 2026-10-25

### Ditambahkan (Fase 8: Persiapan Deployment dan Verifikasi Online)
- **Buku Panduan Deployment Komprehensif ([`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)):**
  - Penyusunan instruksi lengkap inisialisasi Git, push GitHub, dan koneksi ke Vercel dengan arsitektur Dynamic SSR (bukan static export).
  - Penataan tabel environment variables publik Vercel (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL`).
  - Panduan konfigurasi izin CORS Origins pada Sanity Manage untuk domain produksi (`https://...vercel.app`) dengan *Allow credentials* aktif guna mengamankan autentikasi `/studio`.
  - Prosedur penambahan DNS domain kustom (A Record & CNAME) dan pembaruan URL kanonikal.
  - Dokumentasi alur kerja *Decoupling Kode vs Konten*, mekanisme instant rollback Vercel, dan ekspor dataset Sanity via CLI (`npx sanity dataset export`).
- **Pembaruan Lembar Checklist Rilis ([`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md)):**
  - Memperbarui status kesiapan deployment menjadi `SIAP DEPLOY (Awaiting Owner Deployment & Live URL)`.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (Exit 0).
- `docs/DEPLOYMENT.md`: Terbit lengkap dan terstruktur.

---

## [0.7.1] - 2026-10-25

### Ditambahkan (Fase 7: Audit Menyeluruh Pra-Rilis dan Uji Produksi Mandiri)
- **Lembar Audit Kesiapan Rilis ([`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md)):**
  - Penerbitan 21 item evaluasi pra-rilis mencakup kualitas kode, kompilasi, runtime, keamanan kredensial, konsistensi UI, SEO, aksesibilitas, dan audit dependensi.
  - Penegasan kesimpulan status tiga tingkat (*three-tier verdict*): Source code siap ke GitHub, kesiapan rilis publik menunggu pengisian data asli pemilik via CMS, dan pembuktian hosting menunggu Fase 8.
- **Penyempurnaan Dokumentasi Utama ([`README.md`](README.md)):**
  - Penambahan arsitektur embedded Sanity Studio (`/studio`), tabel environment variables, dan perbedaan antara repositori Git (kode sumber) vs pencadangan data CMS (`npx sanity dataset export`).
- **Audit Keamanan & Integritas Lingkungan:**
  - Pemindaian string rahasia: 0 secret / write token di frontend bundle.
  - Pemindaian tautan: 0 anchor dummy `href="#"`.
  - Verifikasi isolasi `.env*.local`, `inputs/`, dan `backups/` pada `.gitignore`.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (Exit 0).
- `npm run start`: LULUS (Server produksi mandiri merespons HTTP 200 OK pada `/`, `/proyek`, `/studio`, `/robots.txt`, dan `/sitemap.xml`).
- Audit dependensi: LULUS BERSYARAT (14 temuan dev-deps transitif pada `@sanity/cli`, diisolasi tanpa `audit fix --force` agar tidak merusak React 19).

---

## [0.7.0] - 2026-10-25

### Ditambahkan (Fase 6: Optimasi SEO, Aksesibilitas, dan Performa)
- **Dynamic SEO & Metadata Lengkap:**
  - Konfigurasi root metadata di [`src/app/layout.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/layout.tsx) (`metadataBase`, title template `%s | Fajri Alamsyah`, Open Graph `id_ID`, Twitter Card `summary_large_image`, dan Google Bot directives).
  - Implementasi fungsi `generateMetadata` dinamis berbasis data Sanity dan fallback aman pada Beranda ([`src/app/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/page.tsx)), Daftar Proyek ([`src/app/proyek/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/proyek/page.tsx)), dan Studi Kasus ([`src/app/proyek/[slug]/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/proyek/%5Bslug%5D/page.tsx)).
  - Pembuatan rute metadata dinamis Next.js: [`src/app/sitemap.ts`](file:///c:/laragon/www/portfolio-fajri/src/app/sitemap.ts) (pemetaan otomatis seluruh halaman publik & eksklusi `/studio`) dan [`src/app/robots.ts`](file:///c:/laragon/www/portfolio-fajri/src/app/robots.ts) (`disallow: /studio`).
  - Penyematan Schema.org Structured Data (JSON-LD): `Person` pada Beranda, `CollectionPage` pada Daftar Proyek, dan `TechArticle` pada Studi Kasus.
- **Penyempurnaan Aksesibilitas (WCAG / a11y):**
  - Penyediaan tautan pintas *Skip to content* (`<a href="#main-content">`) pada bagian atas body untuk pengguna keyboard dan pembaca layar.
  - Atribut landmark semantik `id="main-content"` pada seluruh tag `<main>` dan penamaan navigasi semantik `aria-label="Navigasi Utama"` serta `aria-label="Navigasi Seluler"`.
  - Dukungan `@media (prefers-reduced-motion: reduce)` pada [`src/app/globals.css`](file:///c:/laragon/www/portfolio-fajri/src/app/globals.css) guna mematikan animasi bagi pengguna dengan sensitivitas gerakan.
  - Indikator fokus keyboard `:focus-visible` 2px biru aksen pada seluruh elemen interaktif.
- **Pencadangan Sebelum Modifikasi:** Cadangan kode Fase 5 tersimpan di `backups/2026-10-25-phase5/`.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (0 error, rute `robots.txt`, `sitemap.xml`, `ƒ /`, `ƒ /proyek`, `● /proyek/[slug]`, dan `ƒ /studio` terkompilasi optimal).
- Pengujian HTTP Respons: `robots.txt` (200 OK), `sitemap.xml` (200 OK), Beranda (200 OK memuat JSON-LD dan Skip Link).
- Inspeksi Visual: LULUS verifikasi `browser_subagent` pada resolusi desktop (1440px) dan mobile (390px).

---

## [0.6.0] - 2026-10-25

### Ditambahkan (Fase 5: Kesiapan Isi Portofolio dan Panduan Admin)
- **Dokumentasi Panduan Pengelolaan Admin ([`docs/PANDUAN_ADMIN.md`](file:///c:/laragon/www/portfolio-fajri/docs/PANDUAN_ADMIN.md)):**
  - Membuat panduan resmi komprehensif bagi pemilik untuk mengoperasikan Sanity Studio di `/studio`.
  - Merinci panduan pengisian 4 domain konten: Profil Pribadi (foto PNG transparan, alt text, CV PDF), Pengaturan Situs & Kontak, Master Keahlian, dan Koleksi Proyek.
  - Menjelaskan mekanisme teknis perbedaan status **Draft** (autosave lokal CMS) vs **Publish** (rilis ke publik).
  - Menyusun panduan unpublish/visibilitas proyek, batas pengelolaan konten vs kode, dan instruksi pencadangan (backup) data via Sanity CLI (`npx sanity dataset export`).
- **Tabel Inventaris Konten & Pemisahan Tugas:**
  - Menyediakan matriks kesiapan data fakta pemilik (profil, bio, foto asli, CV, kontak, keahlian, dan studi kasus proyek).
- **Optimasi Penanganan Error Server ([`src/lib/content.ts`](file:///c:/laragon/www/portfolio-fajri/src/lib/content.ts)):**
  - Menerapkan fungsi `handleCmsError` untuk meneruskan sinyal internal Next.js `DYNAMIC_SERVER_USAGE` saat kompilasi build produksi.
  - Menghilangkan noise error log konsol sehingga proses `npm run build` berjalan 100% senyap dan optimal.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (0 error, rute dynamic dan SSG terkompilasi bersih).

---

## [0.5.1] - 2026-10-25

### Ditambahkan (Fase 3: Penyelesaian Konfigurasi Lingkungan Lokal & Project ID Sanity)
- **Konfigurasi Project ID Resmi ([`.env.local`](file:///c:/laragon/www/portfolio-fajri/.env.local)):**
  - Mengonfigurasi `NEXT_PUBLIC_SANITY_PROJECT_ID=lbts9jeh` dan `NEXT_PUBLIC_SANITY_DATASET=production`.
  - Berkas terlindungi dari repositori melalui `.gitignore`.
- **Verifikasi Live Studio di Peramban:**
  - Halaman `http://localhost:3000/studio` terverifikasi aktif (HTTP 200 OK) menampilkan dialog koneksi resmi Sanity.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (0 error).
- `browser_subagent`: LULUS verifikasi visual halaman `/studio` yang siap otorisasi CORS.

---

## [0.5.0] - 2026-10-24

### Ditambahkan (Fase 4: Integrasi Data Sanity ke Halaman Publik)
- **Sanity Client & Konfigurasi Cache ([`src/sanity/client.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/client.ts)):**
  - Mengonfigurasi `createClient` dengan `useCdn: false` dan `perspective: 'published'`.
  - Fungsi `sanityFetch` terpusat menggunakan strategi `cache: 'no-store'` dan `next: { revalidate: 0 }` agar setiap Publish di Studio langsung tampil seketika setelah refresh tanpa rebuild aplikasi.
- **Kueri GROQ Terpusat & Terparameter ([`src/sanity/queries.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/queries.ts)):**
  - Proyeksi field eksplisit untuk profil, pengaturan situs, keahlian, proyek unggulan, seluruh proyek, dan studi kasus per-slug.
  - Parameterisasi kueri slug (`$slug: String!`) tanpa interpolasi string mentah.
- **Data Adapter & Pemisahan Lapisan Akses ([`src/lib/content.ts`](file:///c:/laragon/www/portfolio-fajri/src/lib/content.ts)):**
  - Fungsi adapter (`adaptProfile`, `adaptProject`, `adaptSkill`, `adaptSiteSettings`) yang memetakan dokumen Sanity ke interface TypeScript murni.
  - Penanganan kasus profil kosong, proyek nol, dan kegagalan jaringan secara aman tanpa membocorkan data mock fiktif ke produksi.
- **Optimasi Media & Unduhan CV:**
  - Konfigurasi `images.remotePatterns` untuk domain `cdn.sanity.io` pada [`next.config.ts`](file:///c:/laragon/www/portfolio-fajri/next.config.ts).
  - Pemasangan komponen `<Image>` Next.js pada foto hero (`priority`, `object-contain object-bottom`), thumbnail kartu proyek, dan galeri studi kasus.
  - Penambahan parameter `?dl=` pada berkas CV PDF Sanity untuk pengunduhan dokumen langsung.
- **Pencadangan Sebelum Modifikasi:** Cadangan kode Fase 3 tersimpan di `backups/2026-10-24-phase3/`.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (seluruh rute statis, SSG, dan dinamis terkompilasi optimal).
- Pengujian HTTP Respons: LULUS (rute beranda `/` dan `/studio` merespons status 200 OK).
- Uji Integrasi Data Remote: Ditandai **TERTUNDA** menunggu pengisian draf nyata dan penekanan tombol Publish oleh pemilik.

---

## [0.4.0] - 2026-10-24

### Ditambahkan (Fase 3: Sanity Studio & Schema Konten)
- **Instalasi Sanity & Next-Sanity:** Memasang `next-sanity: 13.4.0` dan `sanity: 6.20.0` yang kompatibel dengan React 19 dan Next.js 16 App Router.
- **Schema 4 Jenis Dokumen Berbahasa Indonesia:**
  - Profil (`profil`): Singleton schema untuk data diri, peran, tagline, bio, foto PNG (alt text wajib), dan berkas CV PDF ([`src/sanity/schemaTypes/profil.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/schemaTypes/profil.ts)).
  - Proyek (`proyek`): Schema proyek dengan judul, slug unik, thumbnail, galeri, masalah, kontribusi, solusi, hasil, relasi keahlian, status repositori, URL demo, unggulan, dan urutan ([`src/sanity/schemaTypes/proyek.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/schemaTypes/proyek.ts)).
  - Keahlian (`keahlian`): Schema master keahlian dengan kategori Frontend, Backend, Database, dan Tools ([`src/sanity/schemaTypes/keahlian.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/schemaTypes/keahlian.ts)).
  - Pengaturan Situs (`pengaturanSitus`): Singleton schema untuk email, tautan media sosial, dan konfigurasi SEO ([`src/sanity/schemaTypes/pengaturanSitus.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/schemaTypes/pengaturanSitus.ts)).
- **Custom Desk Structure ([`src/sanity/structure.ts`](file:///c:/laragon/www/portfolio-fajri/src/sanity/structure.ts)):**
  - Menerapkan singleton structure untuk `profil` dan `pengaturanSitus` guna mencegah duplikasi dokumen.
  - Mengelompokkan `proyek` dan `keahlian` sebagai daftar dokumen dinamis.
- **Rute Embedded Studio ([`src/app/studio/[[...tool]]/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/studio/%5B%5B...tool%5D%5D/page.tsx)):**
  - Catch-all route `/studio` dengan proteksi noindex mesin pencari.
  - Penanganan status admin belum terkonfigurasi (*graceful unconfigured state*) yang memandu pemilik tanpa menyebabkan crash atau error build.
- **Pencadangan Sebelum Modifikasi:** Cadangan kode Fase 2 tersimpan di `backups/2026-10-24-phase2/`.

### Terverifikasi
- `npm run typecheck`: LULUS (0 error).
- `npm run lint`: LULUS (0 warning, 0 error).
- `npm run build`: LULUS (rute `ƒ /studio/[[...tool]]` terkompilasi optimal).
- `browser_subagent`: LULUS verifikasi tampilan `/studio` di browser lokal.
- Sesi Login Pemilik: Ditandai **BELUM DIVERIFIKASI** karena menunggu tindakan manual akun Sanity oleh pemilik.

---

## [0.3.0] - 2026-10-24

### Ditambahkan (Fase 2: Implementasi Desain Antarmuka Publik)
- **Navigasi Interaktif & Menu Mobile ([`src/components/layout/Navbar.tsx`](file:///c:/laragon/www/portfolio-fajri/src/components/layout/Navbar.tsx)):**
  - Brand name "Fajri Alamsyah" dengan aksen dot indikator.
  - Tautan menu: Proyek, Tentang, Keahlian, Kontak.
  - Penanganan status tombol CV (aktif jika ada file, atau status ramah "CV Belum Tersedia" jika belum diunggah).
  - Menu drawer hamburger untuk viewport seluler (390px) dengan transisi mulus dan atribut ARIA aksesibel.
- **Hero Section Navy ([`src/app/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/page.tsx)):**
  - Tipografi dekoratif besar "PORTFOLIO" `#1E3A5F` di latar belakang (`aria-hidden="true"`).
  - Komposisi 2-kolom pada desktop (1440px) dan stacked vertikal pada mobile (390px).
  - Slot placeholder foto pemilik siluet netral khusus development berlabel `[Placeholder Foto Fajri Alamsyah — Menunggu foto PNG asli di inputs/profile/]` tanpa rekayasa AI.
  - Dua tombol CTA utama: "Lihat Proyek" (primary blue) dan "Hubungi Saya" (outline).
- **Proyek Unggulan (Beranda):**
  - Kartu proyek dengan thumbnail rasio 16:9, badge kategori, ringkasan, badge teknologi, dan tombol "Lihat Studi Kasus".
  - Tautan "Lihat Semua Proyek" menuju `/proyek`.
- **Halaman Daftar Proyek ([`src/app/proyek/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/proyek/page.tsx)):**
  - Grid seluruh proyek terbit, navigasi kembali ke beranda, dan penanganan empty state ramah pengguna.
- **Halaman Studi Kasus Detail ([`src/app/proyek/[slug]/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/proyek/%5Bslug%5D/page.tsx)):**
  - Struktur narasi editorial lengkap: Latar Belakang & Masalah, Kontribusi Pribadi, Solusi Teknis & Fitur Utama, Hasil/Dampak, dan Galeri Tangkapan Layar.
  - Penanganan status repositori (publik dengan link, privat dengan badge keterangan keamanan, atau disembunyikan tanpa tautan `#` palsu).
  - Penanganan link demo publik yang aman.
- **Pencadangan Sebelum Modifikasi:** Cadangan kode Fase 1 tersimpan di `backups/2026-10-24-phase1/`.

---

## [0.2.0] - 2026-10-24

### Ditambahkan (Fase 1: Bangun Fondasi Next.js)
- **Fondasi Next.js App Router:** Menginisialisasi Next.js 16.4.3 dengan React 19.3.0, TypeScript 5, and Turbopack bundler.
- **Konfigurasi Token Desain ([`src/app/globals.css`](file:///c:/laragon/www/portfolio-fajri/src/app/globals.css)):** Menyiapkan 8 token warna resmi (`--bg-primary`, `--surface-card`, `--text-primary`, `--text-secondary`, `--accent-primary`, `--border-subtle`, `--btn-text-primary`, `--text-decorative`) di Tailwind CSS v4 `@theme` dan variabel CSS `:root`.
- **Root Layout & Tipografi ([`src/app/layout.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/layout.tsx)):** Integrasi Google Font `Inter` dengan `variable: '--font-inter'`, atribut `lang="id"`, dan metadata awal.
- **Model Data & Lapisan Akses Konten:**
  - Definisi interface TypeScript ([`src/types/index.ts`](file:///c:/laragon/www/portfolio-fajri/src/types/index.ts)).
  - Lapisan akses data terisolasi ([`src/lib/content.ts`](file:///c:/laragon/www/portfolio-fajri/src/lib/content.ts)).
  - Fixture data development ([`src/data/fixtures.ts`](file:///c:/laragon/www/portfolio-fajri/src/data/fixtures.ts)) dengan placeholder literal eksplisit bertanda kurung siku.
- **Komponen UI Dasar:**
  - [`src/components/ui/Container.tsx`](file:///c:/laragon/www/portfolio-fajri/src/components/ui/Container.tsx)
  - [`src/components/ui/Button.tsx`](file:///c:/laragon/www/portfolio-fajri/src/components/ui/Button.tsx) (varian primary, secondary, outline)
  - [`src/components/ui/Badge.tsx`](file:///c:/laragon/www/portfolio-fajri/src/components/ui/Badge.tsx)
  - [`src/components/layout/Navbar.tsx`](file:///c:/laragon/www/portfolio-fajri/src/components/layout/Navbar.tsx)
  - [`src/components/layout/Footer.tsx`](file:///c:/laragon/www/portfolio-fajri/src/components/layout/Footer.tsx)
- **Kerangka Rute Publik:**
  - Beranda ([`src/app/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/page.tsx)) memuat kerangka Hero (teks kiri, foto kanan, tipografi PORTFOLIO), Proyek Unggulan, Tentang, Keahlian, Kontak.
  - Halaman Daftar Proyek ([`src/app/proyek/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/proyek/page.tsx)).
  - Halaman Studi Kasus ([`src/app/proyek/[slug]/page.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/proyek/%5Bslug%5D/page.tsx)) dengan `generateStaticParams` dan `generateMetadata`.
  - Halaman 404 Not Found ([`src/app/not-found.tsx`](file:///c:/laragon/www/portfolio-fajri/src/app/not-found.tsx)).
- **Konfigurasi Environment & Panduan:**
  - Template konfigurasi aman ([`.env.example`](file:///c:/laragon/www/portfolio-fajri/.env.example)).
  - Dokumentasi menjalankan aplikasi ([`README.md`](file:///c:/laragon/www/portfolio-fajri/README.md)).
  - Script build & quality: `dev`, `build`, `start`, `lint`, `typecheck` pada `package.json`.

---

## [0.1.0] - 2026-10-24

### Ditambahkan (Fase 0: Tetapkan Acuan Proyek)
- **Aturan Operasional Agent ([`AGENTS.md`](file:///c:/laragon/www/portfolio-fajri/AGENTS.md)):** Menetapkan 14 aturan tetap pengerjaan per fase, perlindungan folder eksisting, larangan halusinasi data/rekayasa AI foto, batasan tindakan otomatis, serta kewajiban verifikasi empiris.
- **Project Brief ([`docs/PROJECT_BRIEF.md`](file:///c:/laragon/www/portfolio-fajri/docs/PROJECT_BRIEF.md)):** Merumuskan tujuan, ruang lingkup v1 (beranda, daftar proyek, studi kasus, studio), stack teknis (TypeScript, Next.js App Router, Tailwind CSS, Sanity Studio), arsitektur server-side data fetching dengan `cache: 'no-store'`, dan batasan keamanan.
- **Spesifikasi Desain ([`docs/DESIGN.md`](file:///c:/laragon/www/portfolio-fajri/docs/DESIGN.md)):** Menetapkan 8 token warna resmi tema navy–biru muda (`#0B1120`, `#111C30`, `#F1F5F9`, `#A8B3C7`, `#60A5FA`, `#243247`, `#0B1120`, `#1E3A5F`), tipografi Google Font Inter, aturan komposisi hero desktop/mobile, dan pedoman ketat foto PNG asli tanpa manipulasi AI.
- **Rencana Kerja 9 Fase ([`docs/PLAN.md`](file:///c:/laragon/www/portfolio-fajri/docs/PLAN.md)):** Memetakan Fase 0 hingga Fase 8 beserta pembagian tugas manual vs agent, deliverable, dan kriteria penyelesaian (Definition of Done).
- **Model Konten CMS ([`docs/CONTENT_MODEL.md`](file:///c:/laragon/www/portfolio-fajri/docs/CONTENT_MODEL.md)):** Mendefinisikan schema 4 jenis dokumen Sanity Studio (Profil, Proyek, Keahlian, Pengaturan Situs) dengan label Bahasa Indonesia dan mekanisme pemisahan draft vs published.
- **Panduan Aksi Manual Pemilik ([`docs/MANUAL_SETUP.md`](file:///c:/laragon/www/portfolio-fajri/docs/MANUAL_SETUP.md)):** Instruksi langkah demi langkah penyiapan akun Sanity, konfigurasi CORS lokal, login Studio, dan pengumpulan aset tanpa membocorkan kredensial rahasia.
- **Status Proyek ([`docs/STATUS.md`](file:///c:/laragon/www/portfolio-fajri/docs/STATUS.md)):** Pelacak status progres aktual, inventaris bahan mentah, hasil verifikasi lingkungan (Node.js v24.12.0), dan kesiapan menuju Fase 1.
- **Isolasi Berkas ([`.gitignore`](file:///c:/laragon/www/portfolio-fajri/.gitignore)):** Mengisolasi folder `inputs/`, `backups/`, berkas rahasia `.env*.local`, dan build output agar tidak terunggah ke Git publik.
- **Struktur Bahan ([`inputs/`](file:///c:/laragon/www/portfolio-fajri/inputs/)):** Membuat folder kerja `references/`, `profile/`, `projects/`, serta template data [`inputs/content.md`](file:///c:/laragon/www/portfolio-fajri/inputs/content.md).
