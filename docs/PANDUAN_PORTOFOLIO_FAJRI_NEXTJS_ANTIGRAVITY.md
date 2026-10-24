# Panduan Portofolio Fajri — Next.js dan Antigravity

Tanggal: 24 Oktober 2026  
Status: rencana dan paket prompt; implementasi serta pengujian belum dijalankan.  
Cara pakai: satu fase untuk satu pengerjaan Antigravity.

## 1. Keputusan awal dan batas versi pertama

Website publik memakai TypeScript, React, Next.js App Router, dan Tailwind CSS. Tema navy–biru muda mengikuti referensi yang telah dipilih. Admin menggunakan Sanity Studio yang ditempatkan pada rute /studio. Data dan unggahan media disimpan di proyek Sanity milik Fajri.

Ini rekomendasi untuk versi pertama agar pengelolaan konten memakai formulir CMS yang sudah tersedia. Sanity merupakan layanan eksternal dengan akun dan batas pemakaian sesuai paketnya. Admin memakai autentikasi dan keanggotaan proyek Sanity; URL /studio yang bisa dibuka tidak dengan sendirinya memberi hak mengedit. Hak tersebut harus diverifikasi.

Konten yang dapat diubah lewat admin: profil, teks hero, foto PNG, CV PDF, keahlian, proyek, screenshot, tautan, kontak, dan pengaturan SEO. Perubahan susunan desain atau penambahan fitur tetap dikerjakan melalui kode oleh agent.

Ruang lingkup versi pertama:

- Beranda: navigasi, hero, maksimal tiga proyek unggulan, tentang, keahlian, kontak, footer.
- Halaman /proyek untuk daftar seluruh proyek yang diterbitkan dan ditampilkan.
- Halaman /proyek/[slug] untuk studi kasus tiap proyek.
- Admin /studio, dengan formulir berlabel Indonesia.
- Kontak menggunakan tautan email dan jejaring profesional.
- Blog, formulir pengiriman pesan, akun pengunjung, analitik, dan admin kustom menjadi pekerjaan terpisah jika nanti dibutuhkan.

Keputusan awal aliran data: halaman publik mengambil konten published di server dengan strategi tanpa cache konten lintas request. Tujuannya agar hasil Publish dapat terlihat setelah halaman dimuat ulang, tanpa rebuild. Implementasi harus dicocokkan dengan versi Next.js dan next-sanity yang benar-benar dipasang, lalu diuji. Jangan menganggap perilaku ini otomatis tersedia karena CMS sudah terhubung.

## 2. Yang dikerjakan manual dan oleh agent

| Waktu | Kamu kerjakan manual | Antigravity kerjakan |
| --- | --- | --- |
| Sebelum fase 0 | Buat folder proyek, buka di Antigravity, simpan panduan ini di docs, lampirkan referensi | Memeriksa folder, aset, dan kebutuhan |
| Fase 1 | Memasang Node.js jika belum tersedia, mengikuti versi kompatibel yang ditemukan agent | Scaffold Next.js, konfigurasi TypeScript/Tailwind, menjalankan pemeriksaan |
| Fase 2 | Memberikan foto PNG asli dan menilai tampilan desktop/mobile | Membuat komponen, layout, responsivitas, dan data contoh lokal berlabel jelas |
| Sebelum/selama fase 3 | Membuat akun/proyek Sanity, memilih paket, melakukan login dan pengaturan akun | Membuat schema, menu admin, validasi, konfigurasi lokal, panduan CORS |
| Fase 4 | Mengisi konfigurasi yang dibutuhkan melalui file lokal atau dashboard sendiri | Menyambungkan konten admin ke halaman publik |
| Fase 5 | Memasukkan fakta profil, proyek, media, CV; menekan Publish | Membuat panduan pengisian dan memeriksa hasil tampil |
| Fase 6–7 | Melakukan pemeriksaan pemilik akun yang membutuhkan login pribadi | Memperbaiki SEO, aksesibilitas, performa; mengaudit aplikasi dan build |
| Fase 8 | Membuat repo, melakukan push, menghubungkan hosting, mengisi environment, dan mengatur domain | Menyiapkan konfigurasi serta instruksi rilis; memeriksa URL setelah diberikan |

Jangan mengirim password, kode OTP, atau token rahasia ke chat. Jika memang diperlukan, masukkan sendiri di file environment lokal atau dashboard hosting. Project ID dan nama dataset adalah konfigurasi identitas proyek, bukan pengganti autentikasi admin.

## 3. Persiapan folder dan bahan

Buat folder bernama portfolio-fajri dan buka folder tersebut di Antigravity. Simpan panduan ini sebagai:

docs/PANDUAN_PORTOFOLIO_FAJRI_NEXTJS_ANTIGRAVITY.md

Folder lain dapat dibuat agent pada fase 0:

~~~text
portfolio-fajri/
  docs/
    PANDUAN_PORTOFOLIO_FAJRI_NEXTJS_ANTIGRAVITY.md
  inputs/
    references/
    profile/
    projects/
    content.md
~~~

Isi yang kamu siapkan:

- inputs/references/: screenshot desain yang dipilih, serta ekspor desain Stitch jika sudah ada. Hasil Stitch tidak wajib; gambar referensi dan brief sudah cukup untuk mulai.
- inputs/profile/: foto PNG pribadi dan CV PDF yang memang hendak dipublikasikan.
- inputs/projects/: screenshot proyek yang boleh ditampilkan.
- inputs/content.md: fakta profil, daftar keahlian, kontak, dan data proyek. Templatenya ada di bagian akhir.

Folder inputs berisi bahan kerja; jangan otomatis dipublikasikan seluruhnya. Agent harus mengecualikannya dari Git dan public assets. Potret orang lain pada referensi tidak boleh menjadi aset website. Foto PNG milik Fajri belum dianggap tersedia hanya karena gambar referensi memuat seseorang.

Mulai fase 0 dan 1 walaupun sebagian materi belum lengkap. Bagian yang bergantung pada foto atau data harus diberi status BELUM TERSEDIA, bukan diisi fakta rekaan.

## 4. Brief desain yang menjadi acuan

Nama: Fajri Alamsyah.  
Peran: Fullstack Developer.  
Bahasa antarmuka: Indonesia.

| Token | Nilai |
| --- | --- |
| Latar utama | #0B1120 |
| Permukaan kartu | #111C30 |
| Teks utama | #F1F5F9 |
| Teks pendukung | #A8B3C7 |
| Aksen utama | #60A5FA |
| Garis pembatas | #243247 |
| Teks tombol utama | #0B1120 |
| Tulisan dekoratif PORTFOLIO | #1E3A5F |

Gunakan Inter, ruang kosong lega, garis tipis, dan sudut kartu lembut. Aksen biru muncul pada tombol, tautan, dan detail penting.

Hero desktop: teks di kiri; foto PNG di tengah-kanan dengan bagian bawah sejajar batas hero; tulisan PORTFOLIO besar dan redup di belakang komposisi. Foto asli tidak dibuat ulang atau diubah wajah, pakaian, pose, dan proporsinya. Nama, wajah, serta tombol harus terlihat jelas.

Teks hero awal:
- Halo, saya
- Fajri Alamsyah
- Fullstack Developer
- Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.
- Tombol: Lihat Proyek dan Hubungi Saya.

Pada mobile, teks hero berada di atas foto. Kartu menjadi satu kolom, teks isi nyaman dibaca, dan tombol mudah disentuh. Acuan ukuran 1440 px dan 390 px; periksa juga ukuran di antaranya. Foto harus mempertahankan transparansi dan siluetnya, dengan ruang cukup untuk kepala.

## 5. Bentuk admin dan data yang dimasukkan

Alamat lokal yang direncanakan: http://localhost:3000/studio, jika port 3000 tersedia. Setelah online: domain website ditambah /studio. Rute ini baru bekerja setelah fase 3 selesai dan server berjalan.

| Menu admin | Data | Hasil di website |
| --- | --- | --- |
| Profil | Nama, peran, sapaan, tagline, bio, foto PNG, alt foto, CV PDF | Hero, tentang, foto utama, tombol CV |
| Proyek | Nama, slug, ringkasan, gambar, studi kasus, teknologi, tautan, urutan, unggulan, tampilkan | Kartu, daftar proyek, detail proyek |
| Keahlian | Nama teknologi, kategori, urutan | Kelompok keahlian |
| Pengaturan Situs | Email, LinkedIn, GitHub, judul/deskripsi SEO, gambar berbagi, domain | Kontak, metadata, tautan sosial |

Profil dan Pengaturan Situs masing-masing hanya satu dokumen utama. Proyek dan Keahlian dapat ditambah sebanyak kebutuhan.

Rancangan field proyek:
- judul dan slug unik;
- ringkasan singkat;
- thumbnail dan alt text;
- galeri screenshot dengan alt/caption;
- latar belakang atau masalah;
- kontribusi pribadi;
- solusi/fitur utama;
- hasil, opsional dan hanya berdasarkan fakta;
- daftar referensi ke keahlian/teknologi;
- URL demo dan URL repositori, keduanya opsional;
- keterangan ketersediaan kode sumber: publik, privat, atau tidak ditampilkan;
- unggulan, tampilkan, dan urutan.

Draft/published memakai mekanisme Sanity. Tidak perlu membuat status terbit buatan yang bertentangan dengan mekanisme tersebut. Proyek unggulan ditampilkan maksimal tiga di beranda; sisanya tersedia di /proyek. Jika baru ada satu proyek, tampilkan satu saja.

Pengaturan layout dan palet tetap di kode. Admin mengubah konten, bukan berfungsi sebagai pembuat layout bebas.

## 6. Aturan tetap untuk setiap fase

1. Baca AGENTS.md, docs/STATUS.md, panduan ini, dan dokumen fase yang relevan.
2. Periksa pekerjaan yang sudah ada. Jangan scaffold ulang atau mengganti seluruh folder tanpa alasan.
3. Jalankan hanya fase yang diminta. Perbaiki kegagalan fase tersebut sebelum menyatakan selesai.
4. Cadangkan file yang akan diubah ke folder backup lokal bertanggal, di luar public dan dikecualikan dari Git. Jangan menyalin node_modules atau cache build sebagai backup rutin.
5. Catat versi dependensi dan gunakan dokumentasi resmi yang cocok dengan versi terpasang. Pertahankan lockfile. Jangan mengganti major version di tengah fase tanpa kebutuhan yang dijelaskan.
6. Jangan mengarang data, klaim hasil, angka pengalaman, logo klien, testimoni, foto, atau ketersediaan aset.
7. Jangan menyalin identitas dan proyek orang pada referensi. Placeholder lokal harus jelas dan tidak boleh bocor ke rilis publik.
8. Jangan mencetak rahasia environment ke output, menaruh token ke kode client, atau meminta password melalui chat.
9. Jangan melakukan commit, push, deploy publik, membuat layanan berbayar, atau menerbitkan konten CMS otomatis. Pada paket ini tindakan akun dan penerbitan dilakukan pemilik mengikuti petunjuk.
10. Verifikasi sesuai dampak perubahan. Gunakan lint, pemeriksaan tipe, build, dan pengujian perilaku yang relevan. Jangan membuat tes yang hanya menyalin implementasi.
11. Perbarui docs/STATUS.md dan CHANGELOG.md: perubahan, pemeriksaan dan hasilnya, bukti, hal manual, blocker, fase berikutnya.
12. Bedakan SELESAI, SELESAI SEBAGIAN, dan TERBLOKIR. Jangan menyebut login, koneksi CMS, publish, atau deployment berhasil jika belum diuji.
13. Pada akhir tiap fase, jelaskan singkat tiga konsep teknis yang dipakai agar pemilik ikut belajar.
14. Jangan berpindah ke fase berikutnya otomatis.

## 7. Urutan fase dan syarat lanjut

| Fase | Hasil | Syarat lanjut |
| --- | --- | --- |
| 0 | Brief, rencana, aturan agent, daftar bahan | Dokumen acuan jelas |
| 1 | Fondasi Next.js dan design tokens | Aplikasi berjalan; lint, typecheck, build lulus |
| 2 | UI beranda, daftar, dan detail proyek | Layout desktop/mobile dapat dinilai |
| 3 | Admin Sanity dan schema | Login pemilik serta formulir dapat diuji |
| 4 | Data CMS tersambung ke website | Published tampil; draft tidak tampil |
| 5 | Pengisian konten nyata dan panduan admin | Materi publik dan tautan sudah diperiksa |
| 6 | SEO, aksesibilitas, dan performa | Pemeriksaan terkait lulus |
| 7 | Audit akhir sebelum rilis | Blocker rilis selesai atau dilaporkan jelas |
| 8 | Panduan rilis dan pemeriksaan online | Domain/URL nyata diperiksa setelah disediakan |

---

## PROMPT FASE 0 — Tetapkan acuan proyek

Salin seluruh blok ini ke Antigravity:

~~~text
Baca panduan docs/PANDUAN_PORTOFOLIO_FAJRI_NEXTJS_ANTIGRAVITY.md secara lengkap. Jika AGENTS.md dan docs/STATUS.md sudah ada, baca lebih dahulu dan pertahankan instruksi yang masih relevan.

Kerjakan hanya FASE 0: persiapan proyek portofolio Fajri Alamsyah. Jangan mulai implementasi halaman atau memasang dependensi.

Tetapkan acuan:
- TypeScript + React + Next.js App Router + Tailwind CSS.
- Sanity Studio pada /studio untuk admin dan penyimpanan konten/media.
- Desain navy–biru muda dan komposisi foto PNG sesuai brief panduan.
- Rute publik /, /proyek, /proyek/[slug].
- Bahasa Indonesia.
- Versi pertama memakai pengambilan published content di server tanpa cache konten lintas request; implementasinya akan dicocokkan dengan versi terpasang.
- Kontak berupa tautan email dan sosial profesional.

Periksa folder dan inventaris aset. Bedakan foto PNG asli pemilik, CV, screenshot proyek, referensi desain, dan hasil Stitch. Jangan menganggap foto orang pada referensi sebagai foto Fajri.

Buat atau perbarui:
1. AGENTS.md: aturan kerja per fase dan perlindungan pekerjaan yang sudah ada.
2. docs/PROJECT_BRIEF.md: tujuan, ruang lingkup, stack, rute, dan keputusan arsitektur.
3. docs/DESIGN.md: warna, font, layout, aturan foto, responsivitas.
4. docs/PLAN.md: fase 0–8 dan syarat selesai.
5. docs/CONTENT_MODEL.md: empat jenis konten dan hubungan datanya.
6. docs/MANUAL_SETUP.md: langkah akun, konfigurasi, aset, dan pekerjaan manual.
7. docs/STATUS.md: fase berjalan, hasil, data belum tersedia, blocker, dan langkah berikutnya.
8. CHANGELOG.md.

Buat folder inputs yang diperlukan. Atur bahan mentah, file environment, dan backup agar tidak menjadi public assets atau ikut Git.

Jika foto atau data belum ada, catat sebagai belum tersedia dan tetap tuntaskan bagian perencanaan yang tidak bergantung padanya. Jangan meminta persetujuan untuk pilihan implementasi rutin yang sudah tercakup brief.

Akhiri dengan ringkasan acuan, daftar aset yang benar-benar tersedia, hal manual berikutnya, dan kesiapan menjalankan fase 1. Jangan mengklaim aplikasi sudah dibangun.
~~~

## PROMPT FASE 1 — Bangun fondasi

Manual sebelum fase ini: pasang Node.js hanya jika pemeriksaan agent menyatakan belum tersedia atau tidak kompatibel. Kamu tidak perlu menebak versi sendiri.

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/PROJECT_BRIEF.md, docs/PLAN.md, dan docs/DESIGN.md. Ikuti aturan tetap panduan. Cadangkan file yang akan diubah.

Kerjakan hanya FASE 1: fondasi Next.js portofolio Fajri.

1. Periksa Node.js dan package manager. Pilih Next.js stable, React, TypeScript, Tailwind, serta Node.js LTS yang kompatibel berdasarkan dokumentasi resmi saat pengerjaan. Catat versi nyata; jangan mencampur tutorial lintas versi.
2. Scaffold aplikasi dengan App Router, TypeScript strict, Tailwind, ESLint, dan struktur src yang konsisten. Karena folder sudah berisi docs/inputs, jangan menghapusnya agar generator mau berjalan. Gunakan scaffold sementara bila perlu dan pindahkan file secara selektif.
3. Buat struktur komponen, model data, dan lapisan akses konten yang terpisah dari tampilan.
4. Siapkan design tokens persis seperti docs/DESIGN.md, font Inter, dan layout dasar.
5. Buat kerangka rute /, /proyek, /proyek/[slug], serta halaman not-found. Rute /studio disiapkan pada fase 3.
6. Siapkan .env.example berisi nama konfigurasi dan nilai contoh yang tidak rahasia. Konfigurasi Sanity yang belum tersedia tidak boleh diisi ID palsu seolah valid atau membuat kerangka UI gagal dibuka.
7. Siapkan scripts dev, lint, typecheck, build, dan start yang benar untuk versi terpasang. Jangan mengandalkan perintah lint lama yang sudah tidak tersedia.
8. Perbarui README untuk menjalankan aplikasi lokal. Tidak perlu menyambungkan CMS pada fase ini.

Verifikasi: jalankan server lokal, lint, typecheck, dan build. Catat command serta hasil nyata. Selesaikan kegagalan yang disebabkan perubahan fase ini.

Perbarui STATUS.md dan CHANGELOG.md. Jelaskan tiga konsep: TypeScript, komponen React, dan App Router. Laporkan langkah manual yang tersisa lalu berhenti.
~~~

## PROMPT FASE 2 — Terapkan desain publik

Manual: lampirkan foto PNG pribadi. Jika belum tersedia, placeholder netral berlabel jelas dapat dipakai untuk menilai layout, dengan status visual belum final.

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/DESIGN.md, docs/PROJECT_BRIEF.md, serta aset referensi yang tersedia. Ikuti aturan tetap panduan dan cadangkan file terkait.

Kerjakan hanya FASE 2: implementasi UI publik dengan data contoh lokal yang dipisahkan dari komponen.

Bangun:
1. Navigasi dengan nama Fajri Alamsyah, menu Proyek/Tentang/Kontak, dan tombol CV.
2. Hero navy dengan tulisan PORTFOLIO besar redup #1E3A5F, teks di kiri, foto PNG pemilik di tengah-kanan. Pertahankan wajah, pakaian, pose, proporsi, dan transparansi foto. Jangan memakai potret orang pada referensi.
3. Teks hero sesuai brief dan dua CTA: Lihat Proyek serta Hubungi Saya.
4. Beranda dengan maksimal tiga proyek unggulan; halaman /proyek berisi daftar; halaman /proyek/[slug] berisi ringkasan, masalah, kontribusi, solusi, teknologi, galeri, serta tautan yang tersedia.
5. Bagian tentang, keahlian berkelompok, kontak, dan footer.

Gunakan placeholder literal seperti [Nama Proyek] untuk data yang belum diberikan, melalui fixture lokal khusus development. Jangan membuat perusahaan, pencapaian, angka, atau testimoni fiktif. Untuk tautan yang belum tersedia, sembunyikan kontrol atau gunakan keadaan nonaktif yang dapat dipahami; jangan memakai tautan # seolah berfungsi.

Pada mobile, teks hero di atas foto. Periksa lebar 390 dan 1440, serta ukuran antara. Nama panjang, kepala, dan CTA harus tetap utuh tanpa overflow. Gunakan komponen server secara default; batasi komponen client untuk interaksi yang membutuhkan state.

Sediakan empty state dan tampilan gambar hilang yang rapi. Isi studi kasus memakai teks/struktur aman; jangan merender HTML mentah dari konten.

Verifikasi layout lewat browser/screenshot jika tersedia, lalu lint, typecheck, dan build. Jika pemeriksaan visual tidak tersedia, sebutkan batasnya. Perbarui STATUS dan CHANGELOG, sebutkan bagian yang belum final karena aset, lalu berhenti.
~~~

## PROMPT FASE 3 — Buat admin dan formulir konten

Manual pada fase ini:
1. Buat akun Sanity milikmu sendiri dan proyek portofolio.
2. Pilih dataset public untuk konten portofolio yang memang akan dipublikasikan; gunakan nama dataset yang benar, misalnya production.
3. Catat Project ID dan nama dataset untuk konfigurasi lokal.
4. Ikuti petunjuk agent untuk menambahkan origin lokal yang tepat ke pengaturan CORS Sanity agar Studio dapat login. Origin mencakup skema, host, dan port, tanpa path /studio.
5. Lakukan login Studio sendiri. Jangan memberikan password/OTP ke agent.

Dataset public memungkinkan pembacaan konten terbit melalui API; jangan menyimpan bahan internal dalam dokumen terbit. Draft memiliki perlakuan akses berbeda. Pengaturan CORS bukan pengganti otorisasi edit.

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/CONTENT_MODEL.md, dan docs/MANUAL_SETUP.md. Ikuti aturan tetap panduan dan cadangkan file terkait.

Kerjakan hanya FASE 3: Sanity Studio di /studio dan schema konten portofolio.

Gunakan Sanity/next-sanity stable yang kompatibel dengan dependensi terpasang. Ikuti dokumentasi resmi untuk embedded Studio, autentikasi, basePath, dan catch-all route.

Buat menu:
- Profil: singleton dengan ID tetap.
- Proyek: daftar dokumen yang bisa ditambah dan diurutkan.
- Keahlian: nama, kategori, urutan.
- Pengaturan Situs: singleton dengan ID tetap.

Implementasikan field sesuai CONTENT_MODEL. Profil mencakup foto PNG, alt text, CV PDF, nama, role, sapaan, tagline, dan bio. Proyek mencakup judul, slug unik, ringkasan, thumbnail/galeri, masalah, kontribusi, solusi, hasil opsional, referensi teknologi, tautan opsional, unggulan, tampilkan, urutan. Pengaturan Situs mencakup kontak dan SEO.

Gunakan label dan bantuan field berbahasa Indonesia. Studio boleh menggunakan UI bawaan; utamakan formulir yang mudah diisi. Tambahkan validasi judul/slug, URL http/https, email, gambar/alt, dan CV PDF. Bedakan field wajib dan opsional. Jelaskan bahwa validasi editor bukan pengganti pengamanan izin API.

Pakai autentikasi dan keanggotaan Sanity. Pengunjung tanpa otorisasi tidak boleh dapat mengedit atau mengunggah. Jangan membuat endpoint publik untuk mutation atau menyisipkan token write ke browser. Public frontend nantinya cukup membaca dataset public tanpa write token.

Siapkan .env.example dan petunjuk pengisian .env.local tanpa mencetak nilai rahasia. Jangan memalsukan project ID agar build terlihat lulus. Bila konfigurasi belum ada, jaga halaman publik tetap dapat dibuka dengan mode development yang jelas dan beri status admin belum terkonfigurasi.

Tuliskan langkah manual pembuatan proyek, CORS lokal, login, dan cara memastikan akun pemilik memiliki akses. Jangan mengambil alih login pribadi.

Verifikasi lint/typecheck/build sesuai konfigurasi nyata. Verifikasi login dan formulir jika sesi pemilik tersedia. Jika tidak, tandai pemeriksaan tersebut BELUM DIVERIFIKASI dan berikan langkah manual yang spesifik. Setelah tindakan manual selesai, fase yang sama dapat dilanjutkan tanpa scaffold ulang.

Perbarui STATUS dan CHANGELOG lalu berhenti.
~~~

## PROMPT FASE 4 — Sambungkan admin ke website

Manual: setelah formulir tersedia, masukkan profil minimum dan satu proyek nyata sebagai draft melalui /studio. Terbitkan sendiri ketika kontennya siap untuk pemeriksaan.

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/CONTENT_MODEL.md, dan konfigurasi Sanity yang sudah dibuat. Ikuti aturan tetap panduan dan cadangkan file terkait.

Kerjakan hanya FASE 4: integrasi konten Sanity ke seluruh halaman publik.

1. Buat query terpusat, berparameter, bertipe, dan hanya mengambil field yang dibutuhkan. Slug tidak boleh disisipkan sebagai string query mentah.
2. Gunakan perspective published secara eksplisit. Halaman publik harus mengecualikan draft, dokumen tersembunyi, dan referensi konten yang belum terbit.
3. Ambil data di server dengan strategi tanpa cache konten lintas request dan useCdn false. Pastikan konfigurasi cache/SSR kompatibel dengan versi Next.js serta next-sanity terpasang. Catat model cache yang dipilih; jangan mencampur API yang saling bertentangan.
4. Profil, hero, foto, bio, CV, proyek, keahlian, kontak, dan SEO harus membaca data CMS. Pisahkan adapter data dari komponen agar UI tidak tergantung bentuk query.
5. Maksimal tiga proyek unggulan pada beranda; daftar lengkap di /proyek. Urutan harus konsisten. Slug yang tidak ada menghasilkan 404.
6. Tampilkan tautan demo/repositori hanya jika tersedia dan valid. Kode privat diberi keterangan wajar sesuai data, tanpa tautan palsu.
7. Tampilkan PNG tanpa menghilangkan transparansi atau memotong wajah. Konfigurasikan host/path image optimizer secara spesifik untuk aset proyek Sanity.
8. Tombol Unduh CV harus mengunduh PDF yang dipilih admin. Periksa perilaku cross-origin; gunakan mekanisme file download Sanity yang didokumentasikan jika diperlukan.
9. Tangani profil kosong, proyek nol/satu/banyak, aset hilang, serta kegagalan CMS. Kesalahan koneksi tidak boleh berubah menjadi konten demo yang tampak sebagai fakta.
10. Fixture mock hanya untuk development eksplisit. Halaman production tidak boleh diam-diam fallback ke data contoh.

Uji perilaku nyata jika pemilik sudah login:
- perubahan yang masih draft tidak mengubah halaman publik;
- setelah pemilik menekan Publish, muat ulang halaman publik dan periksa perubahan tanpa rebuild;
- proyek yang tidak ditampilkan hilang dari daftar dan detail publik;
- data tetap tersedia setelah server development dimulai ulang.

Jangan menekan Publish atau mengubah data remote atas nama pemilik pada fase ini. Bila login/input belum tersedia, selesaikan kode independen dan tandai uji integrasi sebagai tertunda.

Jalankan pemeriksaan yang relevan, perbarui STATUS dan CHANGELOG, lalu berhenti.
~~~

## PROMPT FASE 5 — Isi konten nyata dan ajarkan admin

Manual: kamu mengisi data yang akan tampil. Agent dapat membantu menyusun teks dari fakta yang kamu berikan, tetapi penerbitannya kamu lakukan sendiri.

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/CONTENT_MODEL.md, serta inputs/content.md jika ada. Ikuti aturan tetap panduan.

Kerjakan hanya FASE 5: kesiapan isi portofolio dan panduan admin untuk pemilik.

Buat docs/PANDUAN_ADMIN.md dengan langkah yang sesuai UI yang benar-benar dibuat:
1. Membuka /studio dan login.
2. Mengisi Profil, foto PNG, alt text, dan CV PDF.
3. Mengisi Pengaturan Situs dan tautan kontak.
4. Menambahkan Keahlian dan kategorinya, lalu menerbitkannya.
5. Membuat Proyek, mengisi slug, screenshot, masalah, kontribusi, solusi, dan teknologi.
6. Membedakan draft yang tersimpan dengan Publish yang membuat perubahan tampil.
7. Mengatur unggulan, tampilkan, urutan, serta menarik proyek dari tampilan publik.
8. Memeriksa website setelah Publish dan menangani perubahan yang belum muncul.
9. Memperbarui konten melalui admin dibanding mengubah layout melalui kode.
10. Menyiapkan ekspor data/asset dengan CLI Sanity sebagai langkah backup manual yang dapat diuji, tanpa menghapus dataset.

Buat tabel inventaris: data, sumber faktanya, status TERSEDIA/BELUM TERSEDIA/PERLU VERIFIKASI, dan tindakan pemilik. Jika fakta cukup, bantu rapikan kalimat tanpa membuat klaim baru. Jangan mengimpor atau memublikasikan data remote otomatis.

Setelah pemilik mengisi, periksa kecocokan CMS dan halaman publik. Bila baru ada satu proyek yang siap, tampilkan satu; jangan menambah proyek fiktif untuk memenuhi tiga kartu. Pastikan placeholder, nama dari referensi, URL dummy, dan data percobaan tidak masuk rilis publik.

Periksa bahwa CV yang terunduh adalah file yang dipilih, foto benar-benar milik Fajri, dan kontak menuju alamat yang diberikan. Data internal pekerjaan hanya boleh memakai materi yang pemilik nyatakan boleh tampil.

Jika pengisian belum selesai, berikan daftar field yang perlu diisi dan catat fase belum lengkap. Jangan menyatakan konten siap rilis hanya berdasarkan schema.

Perbarui STATUS dan CHANGELOG lalu berhenti.
~~~

## PROMPT FASE 6 — Rapikan SEO, aksesibilitas, dan performa

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/DESIGN.md, dan dokumen integrasi. Ikuti aturan tetap panduan dan cadangkan file terkait.

Kerjakan hanya FASE 6: kualitas halaman publik.

SEO:
- Metadata beranda, daftar, dan detail proyek berasal dari konten nyata dengan fallback aman.
- Canonical dan sitemap memakai URL situs dari konfigurasi nyata; jangan mengindeks localhost atau domain palsu.
- Sitemap hanya memuat rute publik yang memang tersedia.
- /studio memakai noindex dan dikecualikan dari sitemap. Jelaskan bahwa noindex/robots bukan mekanisme autentikasi.
- Open Graph memakai gambar yang diberikan atau komposisi teks yang sesuai identitas; jangan membuat potret baru.
- Structured data hanya memuat fakta yang tersedia, tanpa rating atau pencapaian rekaan.

Aksesibilitas:
- Heading berurutan, elemen semantik, label tombol, fokus keyboard, navigasi mobile, kontras, dan alt gambar.
- Tulisan PORTFOLIO dekoratif tidak mengganggu pembaca layar.
- Animasi menghormati prefers-reduced-motion.
- Kepala, nama, tombol, dan teks tidak bertumpuk pada lebar 360/390/768/1024/1440.

Performa:
- Optimalkan ukuran gambar, dimensi, sizes, font, dan pemuatan komponen.
- Pertahankan transparansi foto dan utamakan gambar hero secara tepat.
- Batasi JavaScript client pada interaksi yang membutuhkan.
- Pertahankan perilaku Publish lalu refresh tanpa rebuild dari fase 4.
- Kontak tetap menggunakan tautan yang nyata.

Jalankan lint, typecheck, build, dan pemeriksaan browser yang relevan. Jika tersedia, ukur Lighthouse pada production build dengan kondisi yang dicatat; laporkan hasil nyata tanpa menjanjikan skor tertentu.

Perbaiki masalah yang ditemukan dalam ruang lingkup fase ini. Perbarui STATUS dan CHANGELOG, catat keterbatasan verifikasi, lalu berhenti.
~~~

## PROMPT FASE 7 — Audit akhir sebelum GitHub dan rilis

~~~text
Baca AGENTS.md, docs/STATUS.md, README, dan dokumen fase sebelumnya. Ikuti aturan tetap panduan.

Kerjakan hanya FASE 7: audit kesiapan rilis portofolio.

Periksa dan perbaiki masalah dalam ruang lingkup:
1. Tidak ada placeholder, identitas dari referensi, klaim palsu, tautan dummy, atau fixture development pada production.
2. Beranda, daftar, detail, 404, navigasi, kontak, foto, galeri, dan unduhan CV bekerja.
3. Admin menggunakan otorisasi Sanity; pengunjung tanpa hak tidak dapat mengedit atau mengunggah. Uji juga dari sesi browser yang tidak login bila tersedia.
4. Halaman publik hanya menampilkan published content; draft tidak bocor. Pengaturan tampilkan/unggulan/urutan konsisten.
5. Publish lalu refresh bekerja tanpa rebuild pada production build lokal.
6. Environment dan bahan mentah tidak masuk public, bundle browser, atau kandidat file untuk GitHub. Jangan mencetak isi secret ketika memeriksa.
7. Hanya konfigurasi yang memang publik yang memakai NEXT_PUBLIC. Tidak ada token write hardcoded.
8. Layout aman pada ukuran yang ditentukan, gambar tidak memotong wajah, dan pemeriksaan aksesibilitas terkait lulus.
9. Jalankan lint, typecheck, dan build. Jalankan tes perilaku integrasi yang bermakna sesuai akses yang tersedia.
10. Tinjau temuan dependensi dan perbaiki masalah yang relevan tanpa upgrade paksa yang merusak.
11. README menjelaskan stack, menjalankan proyek, environment, admin, dan perbedaan source code dengan backup konten CMS.

Buat docs/RELEASE_CHECKLIST.md dengan kolom LULUS/PERLU PERBAIKAN/BELUM DIVERIFIKASI, bukti, tindakan, dan penanggung jawab.

Simpulkan secara terpisah:
- siap atau belum untuk source code dimasukkan ke GitHub;
- siap atau belum untuk rilis website;
- sudah atau belum terbukti bekerja di hosting.

Build lokal yang lulus tidak membuktikan website online. Jika tindakan akun/manual belum diuji, nyatakan dengan jelas; jangan menghijaukan semua status.

Perbarui STATUS dan CHANGELOG. Jangan commit, push, atau deploy. Akhiri dengan langkah rilis manual yang benar-benar diperlukan.
~~~

## PROMPT FASE 8 — Siapkan rilis dan periksa hasil online

Manual: kamu melakukan tindakan akun, push, dan deploy mengikuti petunjuk. Fase ini dapat dilanjutkan setelah URL hosting tersedia.

~~~text
Baca AGENTS.md, docs/STATUS.md, docs/RELEASE_CHECKLIST.md, dan README. Ikuti aturan tetap panduan dan cadangkan file terkait.

Kerjakan hanya FASE 8: persiapan deployment dan verifikasi online.

Pilih deployment Next.js yang mendukung runtime server untuk strategi data yang sudah dibuat, dengan Vercel sebagai jalur panduan awal. Jangan mengganti menjadi static export karena kebutuhan CMS dinamis tanpa menjelaskan dan menguji ulang arsitekturnya.

Buat docs/DEPLOYMENT.md yang berisi:
1. Langkah pemilik membuat repo GitHub dan memasukkan source code setelah checklist fase 7 lulus.
2. Daftar file yang dikecualikan: secret, .env.local, inputs, backup, node_modules, output build, dan file pribadi yang tidak dimaksudkan terbit.
3. Langkah menghubungkan repo ke Vercel, memilih root aplikasi, serta Node/build settings yang kompatibel dengan versi proyek.
4. Nama environment variable, fungsi, sifat publik/rahasia, serta cakupan environment. Jangan isi dokumen dengan nilai rahasia.
5. Konfigurasi NEXT_PUBLIC_SITE_URL atau nama setara yang benar-benar dipakai proyek setelah URL final diketahui.
6. Pengaturan origin CORS Sanity untuk domain produksi yang tepat, dan pengujian login /studio pada domain tersebut. Hindari wildcard sebagai jalan pintas.
7. Langkah domain kustom jika pemilik menggunakannya. Jangan menebak nilai DNS; gunakan target dari dashboard hosting.
8. Cara memeriksa build logs, memperbarui source code, melakukan rollback kode, serta mengekspor konten sebagai backup.
9. Jelaskan bahwa perubahan konten melalui Publish tidak membutuhkan push kode pada arsitektur yang dipilih; perubahan source code memicu rilis kode sesuai pengaturan hosting.

Jangan melakukan push, membuat layanan berbayar, mengubah DNS, atau memublikasikan deployment atas nama pemilik pada fase ini.

Setelah pemilik memberikan URL yang benar-benar online, periksa halaman publik, image assets, detail proyek, unduhan CV, metadata/canonical/sitemap, serta perilaku update konten. Pemeriksaan login dan Publish yang memerlukan akun dilakukan pemilik, dengan langkah yang spesifik.

Catat hasil nyata dalam RELEASE_CHECKLIST dan STATUS. Jika URL belum tersedia, bedakan SIAP DEPLOY dari SUDAH ONLINE DAN DIVERIFIKASI. Jangan mengklaim hosting sudah berhasil sebelum diuji.
~~~

## 8. Prompt untuk melanjutkan fase yang terhenti

~~~text
Baca AGENTS.md, docs/STATUS.md, dan panduan proyek. Lanjutkan hanya FASE [nomor] dari kondisi terakhir. Tindakan manual yang sudah saya lakukan: [jelaskan tanpa password/token].

Periksa pekerjaan yang sudah selesai dan lanjutkan bagian yang tertunda. Jangan scaffold ulang, menghapus data, atau mengulang konfigurasi yang sudah benar. Verifikasi hasil, perbarui STATUS.md dan CHANGELOG.md, lalu berhenti sebelum fase berikutnya.
~~~

## 9. Template inputs/content.md

Isi yang diketahui saja. Biarkan kosong bila belum siap.

~~~text
PROFIL
Nama: Fajri Alamsyah
Peran: Fullstack Developer
Sapaan: Halo, saya
Tagline: Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.
Bio:
Lokasi yang ingin ditampilkan, opsional:
Nama file foto PNG:
Alt foto:
Nama file CV PDF:

KONTAK PUBLIK
Email profesional:
URL GitHub:
URL LinkedIn:

KEAHLIAN YANG BENAR-BENAR DIKUASAI
Frontend:
Backend:
Database:
Tools:

PROYEK 1
Nama:
Slug yang diinginkan:
Jenis proyek, misalnya mandiri/tim/pekerjaan:
Apakah materi boleh ditampilkan secara publik:
Masalah yang diselesaikan:
Kontribusi saya sendiri:
Solusi/fitur utama:
Teknologi:
Hasil yang dapat dibuktikan, opsional:
Screenshot yang boleh ditampilkan:
URL demo, jika ada:
URL repo publik, jika ada:
Jika repo privat, keterangan yang boleh ditampilkan:
Jadikan unggulan: ya/tidak
Tampilkan: ya/tidak
Urutan:

PROYEK 2 DAN SETERUSNYA
Ulangi format proyek di atas sesuai jumlah proyek nyata.
~~~

## 10. Cara memasukkan data setelah admin selesai

1. Buka /studio dan login menggunakan akun Sanity milikmu yang memiliki akses proyek.
2. Buka Profil. Isi nama, role, tagline, bio; unggah PNG dan PDF; isi alt foto; periksa lalu Publish.
3. Buka Pengaturan Situs. Isi kontak dan informasi SEO yang benar, lalu Publish.
4. Tambahkan dan Publish keahlian yang akan direferensikan proyek.
5. Buka Proyek, pilih buat dokumen, lalu isi field yang disediakan. Unggah screenshot yang memang milik atau diizinkan untuk ditampilkan.
6. Periksa judul, slug, isi kontribusi, tautan, alt gambar, unggulan, tampilkan, dan urutan.
7. Tekan Publish ketika siap. Draft yang tersimpan belum mengganti konten publik.
8. Muat ulang website dan periksa kartu serta detail proyek. Uji tombol CV setelah mengganti file.
9. Untuk memperbarui proyek, edit dokumen yang sama lalu Publish lagi. Tidak perlu membuat proyek baru untuk perubahan teks.
10. Untuk menarik proyek dari tampilan situs, matikan tampilkan dan Publish. Jika ingin menarik publikasi dokumennya dari API public, gunakan Unpublish sesuai UI Sanity; menyembunyikan kartu saja tidak menjadikan dokumen published bersifat privat.

Jika perubahan belum muncul: pastikan dokumen benar-benar published, proyek/dataset yang digunakan sesuai, field tampilkan aktif, dan query/strategi cache telah diverifikasi pada fase 4. Laporkan gejalanya ke agent; jangan membuat ulang seluruh aplikasi.

## 11. Sumber resmi untuk agent

Referensi diperiksa pada 24 Oktober 2026. Agent harus mencocokkan dokumentasi dengan versi yang terpasang saat fase dijalankan.

- [Next.js: instalasi](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js: caching](https://nextjs.org/docs/app/getting-started/caching)
- [Next.js: deployment](https://nextjs.org/docs/app/getting-started/deploying)
- [Sanity: embedded Studio](https://www.sanity.io/docs/studio/embedding-sanity-studio)
- [Sanity: dataset dan visibilitas](https://www.sanity.io/docs/content-lake/datasets)
- [Sanity: drafts dan published](https://www.sanity.io/docs/content-lake/drafts-and-versions)
- [Sanity: unggahan aset](https://www.sanity.io/docs/content-lake/assets)
- [Sanity: field file dan unduhan](https://www.sanity.io/docs/studio/file-type)
- [Sanity: ekspor data](https://www.sanity.io/docs/content-lake/exporting-data)

Catatan akhir: dokumen ini adalah instruksi kerja. Semua status implementasi dan pengujian harus diisi dari bukti pengerjaan Antigravity, bukan disalin sebagai klaim keberhasilan.

