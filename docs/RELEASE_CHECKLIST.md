# Lembar Audit Kesiapan Rilis (Release Checklist) — Portofolio Fajri Alamsyah

Tanggal Audit: 25 Oktober 2026  
Versi Proyek: 0.7.1  
Status Evaluasi: **AUDIT PRA-RILIS FASE 7 SELESAI (SIAP GITHUB)**

Dokumen ini mencatat bukti empiris kesiapan aplikasi sebelum source code diunggah ke GitHub dan dipublikasikan ke layanan hosting (Vercel).

---

## 1. Tabel Evaluasi Menyeluruh Pra-Rilis

| Kategori | Item Pemeriksaan | Status | Bukti Empiris | Tindakan Lanjutan | Penanggung Jawab |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **Kualitas Kode** | Pemeriksaan Tipe TypeScript (`typecheck`) | **LULUS** | `tsc --noEmit` keluar dengan kode 0 (0 error). | Pertahankan mode strict TypeScript. | Agent |
| **Kualitas Kode** | Pemeriksaan Linting (`lint`) | **LULUS** | `eslint` keluar dengan kode 0 (0 warning, 0 error). | Pertahankan standar konvensi kode. | Agent |
| **Kompilasi** | Kompilasi Produksi Next.js (`build`) | **LULUS** | `next build` selesai tanpa error. Semua rute statis, dynamic, SSG, robots.txt, dan sitemap.xml terbentuk. | Bundel siap di-deploy ke Vercel. | Agent |
| **Runtime Server** | Server Produksi Mandiri (`start`) | **LULUS** | `next start` melayani request lokal dengan status HTTP 200 OK pada `/`, `/proyek`, dan `/studio`. | Siap untuk lingkungan serverless/Node. | Agent |
| **Keamanan** | Proteksi Berkas Lingkungan & Rahasia | **LULUS** | Berkas `.env*.local` terisolasi di `.gitignore`. Grep search `token` dan `secret` di `src/` bernilai 0. | Jangan pernah commit file `.env.local`. | Pemilik / Agent |
| **Keamanan** | Isolasi Berkas Kerja & Cadangan | **LULUS** | Folder `inputs/` dan `backups/` telah dikecualikan dari Git melalui `.gitignore`. | Pertahankan aturan isolasi aset mentah. | Agent |
| **Keamanan** | Variabel Publik Frontend | **LULUS** | Hanya variabel identitas publik yang menggunakan prefix `NEXT_PUBLIC_` (`PROJECT_ID`, `DATASET`, `SITE_URL`). | Tidak ada write token di bundle client. | Agent |
| **Keamanan** | Otorisasi Akses Admin CMS | **LULUS** | Rute `/studio` terlindungi autentikasi Sanity. Pengunjung anonim diarahkan ke form login resmi. | Login hanya melalui akun terdaftar. | Pemilik |
| **Integritas Link** | Ketiadaan Tautan Palsu (`#`) | **LULUS** | Grep search `href="#"` pada seluruh komponen UI bernilai 0. Seluruh tombol memiliki link nyata. | Pertahankan navigasi fungsional. | Agent |
| **SEO** | Dynamic Metadata & Canonical URL | **LULUS** | Tag title template, deskripsi dinamis, dan canonical URL terpasang di Beranda, Proyek, dan Detail. | Otomatis membaca konfigurasi CMS. | Agent |
| **SEO** | Peta Situs Dinamis (`sitemap.xml`) | **LULUS** | Teruji via HTTP 200 OK. Memetakan seluruh halaman publik dan mengecualikan `/studio`. | Sitemap otomatis terbarui saat publish. | Agent |
| **SEO** | Direktif Robot Penjelajah (`robots.txt`) | **LULUS** | Teruji via HTTP 200 OK. Mengizinkan rute publik dan menerapkan `Disallow: /studio`. | Mencegah indeks form admin. | Agent |
| **SEO** | Data Terstruktur (Schema.org JSON-LD) | **LULUS** | Terverifikasi tag JSON-LD `Person`, `CollectionPage`, dan `TechArticle` pada markup HTML. | Meningkatkan rich snippet pencarian. | Agent |
| **Aksesibilitas** | Navigasi Pintas (*Skip to Content*) | **LULUS** | Tautan `<a href="#main-content">` terpasang di awal layout dengan indikator fokus keyboard. | Memudahkan navigasi screen reader. | Agent |
| **Aksesibilitas** | Dukungan *Prefers-Reduced-Motion* | **LULUS** | Media query di `globals.css` mematikan transisi/animasi bagi pengguna sensitif gerakan. | Sesuai pedoman WCAG 2.1 AA. | Agent |
| **Aksesibilitas** | Indikator Fokus Keyboard (`:focus-visible`) | **LULUS** | Ring fokus 2px warna biru aksen (`#60A5FA`) aktif pada tombol dan tautan. | Memenuhi standar navigasi keyboard. | Agent |
| **Aksesibilitas** | Hirarki Heading & Semantik HTML | **LULUS** | Satu `<h1>` per halaman, diikuti `<h2>` dan `<h3>` berurutan. Tag `<nav>` berlabel ARIA jelas. | Menjaga struktur editorial dokumen. | Agent |
| **Desain & UI** | Responsivitas Desktop (1440px) & Mobile (390px) | **LULUS** | Terverifikasi via `browser_subagent`. Bebas horizontal overflow, kontras warna tajam. | Layout konsisten di berbagai layar. | Agent |
| **Dependensi** | Audit Kerentanan Paket (`npm audit`) | **LULUS DENGAN CATATAN** | Temuan transitif dev-deps pada `@sanity/cli`. Dilarang `npm audit fix --force` karena downgrade ke Sanity 5 (breaking). | Pantau pembaruan rutin Sanity v3. | Agent |
| **Kelengkapan Konten** | Pengisian Fakta Asli (Foto, CV, Proyek) | **BELUM DIVERIFIKASI** | Pemilik memilih mengisi data nanti via `/studio`. Saat ini web menggunakan fallback terisolasi. | Isi profil & minimal 1 proyek nyata. | Pemilik |
| **Deployment** | Panduan Deployment & Konfigurasi Rilis | **LULUS** | Dokumen panduan komprehensif terbit di [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). | Siap dieksekusi pemilik. | Agent |
| **Deployment** | Verifikasi Hosting Online (Vercel) | **SIAP DEPLOY** | Panduan siap. Menunggu tindakan pemilik melakukan push GitHub, deploy Vercel, dan menyerahkan URL online. | Berikan URL live setelah deploy. | Pemilik |

---

## 2. Kesimpulan Status Tiga Tingkat (Three-Tier Verdict)

Sesuai pedoman aturan kerja [AGENTS.md](file:///c:/laragon/www/portfolio-fajri/AGENTS.md), hasil audit dirumuskan secara tegas dalam 3 kesimpulan terpisah:

### 1. Kesiapan Source Code ke GitHub: **SIAP (READY)**
> **Status: LULUS.**  
> Seluruh kode sumber bersih dari error tipe, bebas linting issue, terkompilasi 100% pada Next.js build produksi, memiliki dokumentasi lengkap ([`README.md`](file:///c:/laragon/www/portfolio-fajri/README.md), [`docs/`](file:///c:/laragon/www/portfolio-fajri/docs)), dan terproteksi dari kebocoran secret atau bahan mentah melalui [`.gitignore`](file:///c:/laragon/www/portfolio-fajri/.gitignore). Kode siap dimasukkan ke repositori Git/GitHub pribadi pemilik.

### 2. Kesiapan Rilis Website Publik: **MENUNGGU PENGISIAN KONTEN (PENDING DATA INPUT)**
> **Status: SIAP TEKNIS / MENUNGGU FAKTA PEMILIK.**  
> Seluruh sistem frontend, SEO dinamis, dan admin CMS telah siap beroperasi. Namun rilis publik ke khalayak umum menunggu pemilik mengunggah foto PNG asli berlatar transparan, berkas CV PDF, dan minimal 1 studi kasus proyek nyata melalui `/studio` (mengikuti panduan di [`docs/PANDUAN_ADMIN.md`](file:///c:/laragon/www/portfolio-fajri/docs/PANDUAN_ADMIN.md)).

### 3. Pembuktian di Hosting Online: **SIAP DEPLOY (AWAITING OWNER DEPLOYMENT & LIVE URL)**
> **Status: SIAP DEPLOY (PANDUAN TERSEDIA).**  
> Seluruh konfigurasi teknis dan panduan operasional di [`docs/DEPLOYMENT.md`](file:///c:/laragon/www/portfolio-fajri/docs/DEPLOYMENT.md) telah siap. Pembuktian empiris website aktif online di internet (HTTP 200, aset termuat, detail proyek, canonical URL, robots, sitemap) akan segera diverifikasi oleh agent begitu pemilik menyelesaikan deployment di Vercel dan memberikan URL live-nya.

---

## 3. Langkah Manual Pemilik Menjalankan Rilis

Ikuti panduan lengkap di [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) untuk melakukan deployment:
1. **Inisialisasi & Commit Git:**
   ```powershell
   git init
   git add .
   git commit -m "feat: rilis portofolio profesional Fajri Alamsyah v0.8.0"
   ```
2. **Push ke GitHub:** Buat repo baru di GitHub, kaitkan remote, dan jalankan `git push -u origin main`.
3. **Deploy di Vercel:** Impor repo dari dashboard Vercel, atur environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID=lbts9jeh`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SITE_URL`), lalu klik **Deploy**.
4. **CORS Sanity:** Daftarkan URL hosting Vercel ke CORS Origins Sanity Manage (`https://www.sanity.io/manage`) dengan *Allow credentials* aktif.
5. **Verifikasi Online:** Berikan URL aktif Vercel kepada agent untuk pemeriksaan kualitas live menyeluruh.
