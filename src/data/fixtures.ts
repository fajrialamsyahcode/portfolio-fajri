import { Profile, Project, Skill, SiteSettings } from '@/types';

/**
 * Fixture data khusus development (Fase 1-2).
 * Sesuai aturan AGENTS.md:
 * - Tidak menggunakan data/angka fiktif atau testimoni rekaan.
 * - Menggunakan placeholder eksplisit bertanda kurung siku.
 * - Dipisahkan dari komponen UI dan lapisan data utama.
 */

export const initialProfile: Profile = {
  nama: 'Fajri Alamsyah',
  peran: 'Fullstack Developer',
  sapaan: 'Halo, saya',
  tagline: 'Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.',
  bio: 'Fullstack Developer yang berfokus pada pengembangan aplikasi web modern, performa tinggi, dan pengalaman pengguna yang bersih serta intuitif. Terbiasa merancang antarmuka responsif, arsitektur server terukur, dan integrasi basis data.',
  lokasi: 'Indonesia',
  foto: undefined, // BELUM TERSEDIA (menunggu foto asli Fajri di inputs/profile)
  cv: undefined,   // BELUM TERSEDIA (menunggu file PDF di inputs/profile)
};

export const initialSiteSettings: SiteSettings = {
  email: 'kontak@fajrialamsyah.com',
  urlGithub: 'https://github.com',
  urlLinkedin: 'https://linkedin.com',
  seoJudul: 'Fajri Alamsyah — Fullstack Developer',
  seoDeskripsi: 'Portofolio profesional Fajri Alamsyah, Fullstack Developer. Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.',
};

export const initialSkills: Skill[] = [
  // Frontend
  { id: 'skill-1', nama: 'TypeScript', kategori: 'frontend', urutan: 1 },
  { id: 'skill-2', nama: 'React & Next.js', kategori: 'frontend', urutan: 2 },
  { id: 'skill-3', nama: 'Tailwind CSS', kategori: 'frontend', urutan: 3 },
  { id: 'skill-4', nama: 'HTML5 & Semantics', kategori: 'frontend', urutan: 4 },
  // Backend
  { id: 'skill-5', nama: 'Node.js', kategori: 'backend', urutan: 5 },
  { id: 'skill-6', nama: 'RESTful API Architecture', kategori: 'backend', urutan: 6 },
  { id: 'skill-7', nama: 'Express / Next.js API', kategori: 'backend', urutan: 7 },
  // Database
  { id: 'skill-8', nama: 'PostgreSQL', kategori: 'database', urutan: 8 },
  { id: 'skill-9', nama: 'MySQL', kategori: 'database', urutan: 9 },
  { id: 'skill-10', nama: 'Sanity Content Lake', kategori: 'database', urutan: 10 },
  // Tools
  { id: 'skill-11', nama: 'Git & GitHub', kategori: 'tools', urutan: 11 },
  { id: 'skill-12', nama: 'Docker', kategori: 'tools', urutan: 12 },
  { id: 'skill-13', nama: 'VS Code & Tooling', kategori: 'tools', urutan: 13 },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    judul: '[Nama Proyek 1 — Sistem Manajemen Informasi]',
    slug: 'proyek-sistem-manajemen-informasi',
    ringkasan: '[Ringkasan singkat mengenai masalah operasional data dan solusi sistem web terintegrasi yang dibangun]',
    jenisProyek: 'pekerjaan',
    thumbnail: {
      url: '',
      alt: '[Tangkapan Layar Dashboard Sistem Manajemen Informasi]',
    },
    galeri: [
      {
        url: '',
        alt: '[Pratinjau Antarmuka Form Input Data]',
        caption: '[Tampilan formulir input data dengan validasi interaktif]',
      },
      {
        url: '',
        alt: '[Pratinjau Ringkasan Laporan Tabel]',
        caption: '[Tampilan rekapitulasi data berbasis filter dan sorting]',
      },
    ],
    masalah: '[Penjelasan latar belakang kendala pencatatan manual, duplikasi data, dan kebutuhan sistem yang responsif serta aman]',
    kontribusi: '[Merancang arsitektur basis data, mengembangkan antarmuka pengguna responsif, dan menyusun API server]',
    solusi: '[Membangun antarmuka berbasis web dengan Next.js dan Tailwind CSS, validasi skema data, serta mekanisme pelaporan]',
    hasil: '[Proses pembaruan data menjadi terpusat dan mudah diakses oleh pengguna internal]',
    keahlian: [initialSkills[0], initialSkills[1], initialSkills[2], initialSkills[4], initialSkills[7]],
    statusRepo: 'private',
    keteranganRepoPrivat: 'Kode sumber bersifat privat untuk keperluan internal organisasi / klien',
    unggulan: true,
    tampilkan: true,
    urutan: 1,
  },
  {
    id: 'proj-2',
    judul: '[Nama Proyek 2 — Aplikasi Layanan Publik Interaktif]',
    slug: 'proyek-layanan-publik-interaktif',
    ringkasan: '[Aplikasi web pencarian informasi dan layanan publik dengan fokus pada kemudahan navigasi dan aksesibilitas seluler]',
    jenisProyek: 'mandiri',
    thumbnail: {
      url: '',
      alt: '[Tangkapan Layar Halaman Beranda Layanan Publik]',
    },
    masalah: '[Masyarakat membutuhkan akses informasi yang cepat, ramah layar ponsel, dan tidak membingungkan]',
    kontribusi: '[Mengembangkan antarmuka pencarian cepat, integrasi API publik, dan pengoptimalan performa Core Web Vitals]',
    solusi: '[Menerapkan sistem pencarian dinamis, layout mobile-first, dan caching di server]',
    hasil: '[Halaman memuat dalam waktu singkat dengan skor aksesibilitas yang baik]',
    keahlian: [initialSkills[0], initialSkills[1], initialSkills[2], initialSkills[10]],
    urlDemo: 'https://example.com/demo',
    statusRepo: 'public',
    urlRepo: 'https://github.com/example/repo',
    unggulan: true,
    tampilkan: true,
    urutan: 2,
  },
];
