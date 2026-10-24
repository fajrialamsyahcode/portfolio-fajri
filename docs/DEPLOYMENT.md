# Panduan Deployment & Rilis Online — Portofolio Fajri Alamsyah

Dokumen ini adalah panduan operasional resmi bagi pemilik proyek (Fajri Alamsyah) untuk mempublikasikan website portofolio ke GitHub dan Vercel, mengonfigurasi variabel lingkungan, mengatur izin domain CORS di Sanity, serta memverifikasi situs yang telah aktif secara online di internet.

---

## 1. Arsitektur Deployment & Runtime

Aplikasi ini dibangun menggunakan arsitektur **Next.js App Router dengan Server-Side Rendering (SSR) dinamis**:
- **Penyedia Hosting yang Direkomendasikan:** [Vercel](https://vercel.com/) (platform native untuk Next.js dengan dukungan serverless/edge runtime).
- **Strategi Data Publik:** Server fetch dengan `{ cache: 'no-store' }` dan `perspective: 'published'`. Konten yang baru dipublikasikan di Sanity Studio langsung tampil saat pengunjung memuat ulang halaman tanpa perlu proses *re-build* atau redeployment kode.
- **Penting (Tanpa Static Export):** Jangan pernah mengubah konfigurasi menjadi `output: 'export'` (HTML statis murni), karena fitur server data fetching, SEO dinamis, sitemap dinamis, dan embedded Sanity Studio (`/studio`) membutuhkan runtime server Node.js.

---

## 2. Berkas yang Dikecualikan dari Repositori Publik

Sebelum membuat commit pertama, pastikan berkas-berkas sensitif dan bahan mentah berikut **TIDAK PERNAH** dimasukkan ke dalam Git. Seluruhnya telah dikonfigurasi pada [`.gitignore`](../.gitignore):

| Berkas / Direktori | Alasan Pengecualian | Status di `.gitignore` |
| --- | --- | :---: |
| `.env.local` / `.env*.local` | Menyimpan konfigurasi lingkungan lokal & rahasia. | **Terproteksi** |
| `inputs/` | Berisi bahan mentah, foto non-transparan, catatan pribadi. | **Terproteksi** |
| `backups/` | Cadangan kode lokal sebelum refactoring. | **Terproteksi** |
| `node_modules/` | Dependensi npm lokal berukuran ratusan MB. | **Terproteksi** |
| `.next/`, `out/`, `build/` | Cache kompilasi lokal Next.js. | **Terproteksi** |
| `*.log`, `npm-debug.log*` | Berkas log runtime dan debug sistem. | **Terproteksi** |

> [!WARNING]
> Jangan pernah mematikan aturan `.gitignore` atau memaksakan `git add -f` pada berkas `.env.local` maupun folder `inputs/`.

---

## 3. Langkah 1: Inisialisasi Git Lokal dan Push ke GitHub

Lakukan langkah-langkah berikut di terminal komputer lokal Anda (PowerShell / Command Prompt):

### A. Periksa Status Berkas
Pastikan tidak ada berkas rahasia yang masuk dalam antrean git:
```powershell
git status
```

### B. Inisialisasi & Commit Pertama
Jika repositori belum diinisialisasi:
```powershell
git init
git add .
git commit -m "feat: inisialisasi portofolio profesional Fajri Alamsyah v0.7.1"
```

### C. Buat Repositori Baru di GitHub
1. Buka [GitHub](https://github.com/) dan login ke akun Anda.
2. Klik tombol **New** (Buat Repositori Baru).
3. Beri nama repositori, misalnya: `portfolio-fajri`.
4. Pilih visibilitas: **Public** (agar dapat diakses sebagai portofolio publik) atau **Private** (Vercel tetap bisa mengakses repositori private).
5. **Jangan centang** opsi *"Add a README file"*, *"Add .gitignore"*, atau *"Choose a license"* karena berkas-berkas tersebut sudah ada di proyek lokal Anda.
6. Klik **Create repository**.

### D. Hubungkan Remote & Push Kode Sumber
Salin URL repositori Anda dari GitHub (ganti `USERNAME` dengan username GitHub Anda), lalu jalankan:
```powershell
git branch -M main
git remote add origin https://github.com/USERNAME/portfolio-fajri.git
git push -u origin main
```

---

## 4. Langkah 2: Menghubungkan Repositori ke Vercel

1. Buka dashboard [Vercel](https://vercel.com/) dan login menggunakan akun GitHub Anda.
2. Pada halaman utama (Overview), klik tombol **Add New...** > **Project**.
3. Cari repositori `portfolio-fajri` yang baru saja Anda push, lalu klik tombol **Import**.
4. Di panel **Configure Project**:
   - **Project Name:** Biarkan `portfolio-fajri` atau sesuaikan dengan nama subdomain yang diinginkan.
   - **Framework Preset:** Terdeteksi otomatis sebagai `Next.js`.
   - **Root Directory:** `./` (akar direktori proyek).
   - **Build Command:** `next build` (bawaan).
   - **Output Directory:** `.next` (bawaan).
   - **Install Command:** `npm install` (bawaan).
   - **Node.js Version:** Vercel secara default menggunakan Node.js 18.x atau 20.x LTS (kompatibel penuh dengan Next.js 16).

---

## 5. Langkah 3: Konfigurasi Environment Variables di Vercel

Sebelum menekan tombol deploy, buka bagian accordion **Environment Variables** di halaman konfigurasi Vercel, lalu tambahkan variabel berikut:

| Nama Variabel | Sifat | Lingkungan (Environment) | Nilai / Keterangan |
| --- | :---: | :---: | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Publik | Production, Preview, Development | `lbts9jeh` (Project ID resmi Sanity Anda) |
| `NEXT_PUBLIC_SANITY_DATASET` | Publik | Production, Preview, Development | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Publik | Production, Preview, Development | `2026-10-24` (atau tanggal rilis schema) |
| `NEXT_PUBLIC_SITE_URL` | Publik | Production | URL domain produksi final Anda (misal `https://portfolio-fajri.vercel.app` atau `https://fajrialamsyah.com`). *Catatan: Jika belum tahu URL Vercel di awal, masukkan perkiraan subdomain Vercel Anda, lalu perbarui setelah build pertama selesai.* |

> [!NOTE]
> Semua variabel menggunakan awalan `NEXT_PUBLIC_` karena dibutuhkan oleh browser untuk menghubungi Sanity API publik dan menampilkan metadata Open Graph/Twitter Card. Tidak ada secret token yang dimasukkan ke Vercel untuk v1 ini.

Klik **Deploy** dan tunggu proses build selesai (biasanya memakan waktu 1–2 menit).

---

## 6. Langkah 4: Konfigurasi CORS Sanity untuk Domain Produksi

Setelah Vercel selesai melakukan build dan menerbitkan URL (misalnya: `https://portfolio-fajri.vercel.app`):

1. Buka browser dan kunjungi [Sanity Management Dashboard](https://www.sanity.io/manage).
2. Pilih proyek Anda: **`lbts9jeh`**.
3. Klik tab **API** pada menu navigasi atas.
4. Gulir ke bagian **CORS Origins**, lalu klik tombol **Add CORS origin**.
5. Masukkan konfigurasi berikut:
   - **Origin:** Masukkan URL domain Vercel Anda dengan protokol `https://` tanpa tanda garis miring penutup (contoh: `https://portfolio-fajri.vercel.app`).
   - **Allow credentials:** **Centang (Check)** opsi ini. Ini wajib agar sesi login akun Sanity Anda dapat bekerja saat mengakses `/studio` di domain produksi.
6. Klik **Save**.

> [!CAUTION]
> Dilarang menggunakan wildcard `*` sebagai origin CORS. Menggunakan origin spesifik menjaga keamanan dataset dan autentikasi admin studio Anda.

### Uji Akses Studio di Domain Produksi:
Buka URL: `https://portfolio-fajri.vercel.app/studio`
- Pastikan halaman Sanity Studio terbuka dengan sempurna.
- Login menggunakan akun Sanity Anda.
- Pastikan dokumen yang tersimpan di lokal (atau dokumen baru) dapat diakses dan diedit dari domain hosting online.

---

## 7. Langkah 5: Pengaturan Domain Kustom (Opsional)

Jika Anda memiliki domain pribadi (misalnya `fajrialamsyah.com` atau `fajri.dev`):

1. Masuk ke dashboard proyek Anda di Vercel > tab **Settings** > menu **Domains**.
2. Masukkan nama domain Anda, lalu klik **Add**.
3. Vercel akan menampilkan petunjuk DNS Record yang dibutuhkan:
   - **Apex domain (`domain.com`):** Buat `A Record` di DNS registrar Anda yang mengarah ke IP `76.76.21.21`.
   - **Subdomain (`www.domain.com`):** Buat `CNAME Record` yang mengarah ke `cname.vercel-dns.com`.
4. **Perbarui Variabel Lingkungan di Vercel:**
   - Ubah nilai `NEXT_PUBLIC_SITE_URL` menjadi `https://nama-domain-kustom.com`.
   - Lakukan **Redeploy** pada deployment terbaru agar sitemap dan metadata kanonikal menggunakan domain kustom tersebut.
5. **Daftarkan Domain Kustom ke CORS Sanity:**
   - Tambahkan `https://nama-domain-kustom.com` (dan `https://www.nama-domain-kustom.com` jika ada) ke CORS Origins di Sanity Manage dengan *Allow credentials* aktif.

---

## 8. Alur Kerja Perubahan Konten vs Perubahan Kode Sumber

Penting untuk memahami perbedaan siklus pembaruan pada arsitektur portofolio ini:

```
┌────────────────────────────────────────────────────────────────────────┐
│ KONTEN / TEKS / FOTO / CV                                              │
│ Diedit di https://domain-anda.vercel.app/studio                        │
│ └── Klik "Publish" di Sanity Studio                                    │
│ └── Hasil LANGSUNG TERLIHAT di website publik (Refresh halaman)        │
│ └── TIDAK PERLU git commit, TIDAK PERLU git push, TIDAK PERLU rebuild! │
├────────────────────────────────────────────────────────────────────────┤
│ KODE SUMBER / STYLING / KOMPONEN BARU                                  │
│ Diedit di editor kode lokal                                            │
│ └── Jalankan: git add . && git commit -m "..." && git push origin main │
│ └── Vercel OTOMATIS mendeteksi push dan melakukan build ulang (CI/CD)  │
│ └── Versi web baru otomatis aktif dalam 1-2 menit                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Pemeliharaan, Rollback, dan Pencadangan Konten

### A. Memantau Log Build dan Runtime
Jika terjadi kendala pada deployment:
1. Masuk ke dashboard Vercel > klik deployment yang bermasalah.
2. Buka tab **Building** untuk membaca log build kompilasi.
3. Buka tab **Logs** (Runtime Logs) untuk memantau request real-time dan pesan error server.

### B. Rollback Kode Instan di Vercel
Jika pembaruan kode menyebabkan masalah tampilan atau error:
1. Masuk ke dashboard Vercel > tab **Deployments**.
2. Cari versi deployment sebelumnya yang berjalan stabil.
3. Klik tombol titik tiga (`...`) di samping deployment tersebut > pilih **Instant Rollback**.
4. Website akan langsung kembali ke versi tersebut dalam hitungan detik tanpa perlu commit git baru.

### C. Pencadangan Rutin Data Konten (CMS Export)
Lakukan ekspor data Sanity secara berkala ke komputer lokal:
```powershell
npx sanity dataset export production backups/sanity-backup-$(Get-Date -Format 'yyyy-MM-dd').tar.gz
```
Berkas cadangan `.tar.gz` ini berisi seluruh dokumen JSON dan metadata aset yang dapat diimpor kembali sewaktu-waktu jika diperlukan.

---

## 10. Checklist Verifikasi Online (Setelah Situs Aktif)

Setelah Anda membagikan URL online ke agent, pemeriksaan berikut akan dilakukan secara empiris:

- [ ] Status respons HTTP: Halaman utama mengembalikan status **200 OK**.
- [ ] Aset Visual: Logo, favicon, dan gambar termuat tanpa broken image (404).
- [ ] Navigasi & Rute: Halaman `/proyek` dan detail `/proyek/[slug]` dapat diakses mulus.
- [ ] Berkas Unduhan: Tautan CV mengunduh berkas PDF yang benar.
- [ ] Mesin Pencari: URL `/robots.txt` dan `/sitemap.xml` dapat dibaca dan valid.
- [ ] Keamanan: Rute `/studio` meminta login resmi dan tidak dapat diakses anonim secara bebas.
