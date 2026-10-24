# Aturan Kerja Agent — Portofolio Fajri Alamsyah

Dokumen ini adalah aturan tetap (operating rules) bagi semua AI coding assistant / agent yang bekerja pada repositori `portfolio-fajri`. Setiap agent yang memulai pekerjaan WAJIB membaca dan mematuhi dokumen ini.

---

## 1. Prinsip Utama & Perlindungan Pekerjaan yang Ada

1. **Satu Fase per Pengerjaan:** Jalankan HANYA fase yang diminta oleh pemilik proyek. Jangan melompat atau berpindah ke fase berikutnya secara otomatis tanpa instruksi tertulis.
2. **Hormati dan Lindungi Kode yang Sudah Ada:** Selalu periksa pekerjaan yang telah selesai. DILARANG keras melakukan scaffold ulang, menghapus folder yang sudah ada (`docs/`, `inputs/`, `src/`, dll.), atau menimpa arsitektur tanpa alasan teknis yang jelas.
3. **Pencadangan Sebelum Modifikasi Signifikan:** Sebelum melakukan perubahan besar atau refactoring, cadangkan file yang relevan ke folder lokal bertanggal (misal `backups/YYYY-MM-DD/`). Folder backup dikecualikan dari Git dan public assets. Jangan menyalin `node_modules` atau folder cache build (`.next/`).
4. **Kunci Versi & Hindari Inkonsistensi:** Catat versi dependensi yang terpasang dan gunakan dokumentasi resmi yang cocok dengan versi tersebut. Pertahankan lockfile (`package-lock.json`). Jangan mengganti major version di tengah jalan.
5. **Anti-Halusinasi & Integritas Data:**
   - DILARANG mengarang data profil, angka pengalaman, klaim pencapaian, nama klien, testimoni, atau statistik fiktif.
   - DILARANG menggunakan foto, nama, atau proyek orang lain yang ada pada gambar referensi.
   - Jika suatu data atau aset belum disediakan oleh pemilik, beri status `BELUM TERSEDIA` atau gunakan placeholder literal eksplisit (misal `[Nama Proyek]`, `[Ringkasan Proyek]`) yang dipisahkan ke dalam file fixture khusus development.
   - Placeholder development TIDAK BOLEH bocor ke production build atau rilis publik.
6. **Aturan Mutlak Foto Pemilik:**
   - Website WAJIB menggunakan foto PNG asli berlatar transparan milik Fajri Alamsyah.
   - DILARANG merekayasa, membuat ulang, mengedit wajah, tubuh, pakaian, pose, atau proporsi Fajri menggunakan AI generator gambar.
   - Pada desktop: foto diposisikan di tengah-kanan hero dengan bagian bawah sejajar batas hero.
   - Pada mobile: foto diposisikan di bawah teks hero dengan proporsi kepala dan bahu yang proporsional tanpa terpotong (cutoff).
7. **Keamanan & Privasi:**
   - JANGAN PERNAH meminta, mencetak, atau memasukkan password, token rahasia, atau OTP ke dalam chat atau output teks.
   - Rahasia lingkungan hanya boleh berada di file `.env.local` atau dashboard hosting.
   - Token write Sanity TIDAK BOLEH dimasukkan ke dalam bundle client browser atau publik repository.
   - Folder `inputs/` dan `backups/` dikecualikan dari Git dan public assets.
8. **Batasan Tindakan Otomatis (Manual Boundary):**
   - Agent TIDAK BOLEH melakukan commit git, push git, deploy hosting publik, membuat resource cloud berbayar, atau memublikasikan dokumen CMS secara sepihak.
   - Tindakan akun (registrasi, login, billing, pengaturan DNS, dan penekanan tombol Publish CMS) dilakukan sendiri oleh pemilik mengikuti panduan yang disediakan agent.
9. **Verifikasi Nyata Sebelum Mengklaim Selesai:**
   - Verifikasi setiap fase menggunakan tooling nyata: `npm run lint`, `npm run typecheck`, dan `npm run build` (atau perintah setara yang terkonfigurasi).
   - Bedakan dengan tegas status: `SELESAI`, `SELESAI SEBAGIAN`, dan `TERBLOKIR`.
   - DILARANG mengklaim login berhasil, CMS terhubung, atau deployment aktif jika belum diuji secara empiris.
10. **Pembaruan Dokumentasi Wajib:**
    - Pada akhir setiap sesi pengerjaan, WAJIB memperbarui `docs/STATUS.md` dan `CHANGELOG.md`.
    - Cantumkan: ringkasan perubahan, perintah verifikasi beserta hasilnya, bukti empiris, tindakan manual yang perlu dilakukan pemilik, dan kesiapan fase berikutnya.
11. **Edukasi Pemilik:**
    - Pada setiap laporan akhir fase, jelaskan secara ringkas 3 (tiga) konsep teknis penting yang diimplementasikan pada fase tersebut agar pemilik proyek memahami arsitekturnya.

---

## 2. Acuan Teknis dan Arsitektur Proyek

- **Stack:** TypeScript + React + Next.js App Router + Tailwind CSS.
- **Admin CMS:** Sanity Studio tersemat pada rute `/studio` dengan schema berbahasa Indonesia.
- **Bahasa Antarmuka:** Bahasa Indonesia untuk seluruh halaman publik dan form admin.
- **Strategi Data Publik:** Server-side fetching dengan `perspective: 'published'`, `useCdn: false`, dan strategi tanpa cache lintas request (misal `cache: 'no-store'`) agar hasil Publish di CMS langsung terlihat setelah muat ulang halaman (refresh) tanpa rebuild.
- **Rute Publik Versi 1:**
  - `/` (Beranda: Hero, Maks. 3 Proyek Unggulan, Tentang, Keahlian, Kontak, Footer)
  - `/proyek` (Daftar semua proyek yang berstatus tampilkan)
  - `/proyek/[slug]` (Studi kasus lengkap tiap proyek)
- **Kontak:** Tautan email (`mailto:`) dan tautan jejaring sosial profesional (LinkedIn, GitHub). Tidak ada form submit database di v1.

---

## 3. Token Desain Resmi (Strict)

| Token | Nilai Hex | Fungsi |
| --- | --- | --- |
| Latar utama | `#0B1120` | Background utama seluruh halaman |
| Permukaan kartu | `#111C30` | Background kartu, container, panel |
| Teks utama | `#F1F5F9` | Heading, teks paragraf utama |
| Teks pendukung | `#A8B3C7` | Deskripsi sekunder, metadata, label pendukung |
| Aksen utama | `#60A5FA` | Tombol CTA, link aktif, border fokus, badge |
| Garis pembatas | `#243247` | Border kartu, pembatas section, garis pemisah |
| Teks tombol utama | `#0B1120` | Teks di dalam tombol aksen biru (`#60A5FA`) |
| Tulisan dekoratif | `#1E3A5F` | Tipografi latar belakang besar "PORTFOLIO" di hero |

- **Tipografi:** Google Font Inter (modern, bersih, sans-serif).
- **Gaya:** Sudut kartu melengkung halus (rounded-lg/xl), garis pembatas tipis (1px), whitespace lega.

---

## 4. Alur Kerja Per Fase

Setiap pengerjaan wajib merujuk pada `docs/PLAN.md` dan `docs/PANDUAN_PORTOFOLIO_FAJRI_NEXTJS_ANTIGRAVITY.md`:
- **Fase 0:** Acuan proyek, aturan kerja, inventaris bahan, dan dokumen perencanaan (SELESAI).
- **Fase 1:** Fondasi Next.js App Router, TypeScript, Tailwind, konfigurasi tokens, struktur rute publik.
- **Fase 2:** Implementasi UI publik dengan data fixture lokal, responsivitas 390px - 1440px.
- **Fase 3:** Pemasangan Sanity Studio di `/studio`, schema 4 jenis konten, validasi field.
- **Fase 4:** Integrasi data Sanity ke halaman publik (server fetch, dynamic, published only).
- **Fase 5:** Pengisian data nyata oleh pemilik melalui `/studio`, pembuatan `docs/PANDUAN_ADMIN.md`.
- **Fase 6:** Optimasi SEO, Aksesibilitas (WCAG/a11y), dan Performa (Core Web Vitals).
- **Fase 7:** Audit menyeluruh sebelum rilis (`docs/RELEASE_CHECKLIST.md`), eliminasi mock data.
- **Fase 8:** Panduan rilis GitHub & Vercel (`docs/DEPLOYMENT.md`), konfigurasi CORS dan domain.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
