import { groq } from 'next-sanity';

/**
 * Kueri GROQ Terpusat & Bertipe untuk Pengambilan Konten Portofolio.
 * Sesuai aturan FASE 4:
 * 1. Hanya mengambil field yang dibutuhkan (proyeksi eksplisit).
 * 2. Kueri berparameter (slug tidak disisipkan sebagai string mentah).
 * 3. Mengambil data terbitan (published) dan mengecualikan draf.
 */

export const profilQuery = groq`
  *[_type == "profil" && _id == "profil"][0] {
    nama,
    peran,
    sapaan,
    tagline,
    bio,
    lokasi,
    foto {
      asset-> {
        _id,
        url
      },
      alt
    },
    cv {
      asset-> {
        _id,
        url,
        originalFilename
      },
      namaFileTampil
    }
  }
`;

export const pengaturanSitusQuery = groq`
  *[_type == "pengaturanSitus" && _id == "pengaturanSitus"][0] {
    email,
    urlGithub,
    urlLinkedin,
    seoJudul,
    seoDeskripsi,
    ogImage {
      asset-> {
        _id,
        url
      }
    },
    siteUrl
  }
`;

export const keahlianQuery = groq`
  *[_type == "keahlian"] | order(urutan asc, _createdAt asc) {
    "_id": _id,
    nama,
    kategori,
    urutan
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "proyek" && tampilkan == true && unggulan == true] | order(urutan asc, _createdAt desc)[0...3] {
    "_id": _id,
    judul,
    "slug": slug.current,
    ringkasan,
    jenisProyek,
    thumbnail {
      asset-> {
        _id,
        url
      },
      alt
    },
    keahlian[]-> {
      "_id": _id,
      nama,
      kategori,
      urutan
    },
    urlDemo,
    statusRepo,
    urlRepo,
    keteranganRepoPrivat,
    unggulan,
    tampilkan,
    urutan
  }
`;

export const allProjectsQuery = groq`
  *[_type == "proyek" && tampilkan == true] | order(urutan asc, _createdAt desc) {
    "_id": _id,
    judul,
    "slug": slug.current,
    ringkasan,
    jenisProyek,
    thumbnail {
      asset-> {
        _id,
        url
      },
      alt
    },
    keahlian[]-> {
      "_id": _id,
      nama,
      kategori,
      urutan
    },
    urlDemo,
    statusRepo,
    urlRepo,
    keteranganRepoPrivat,
    unggulan,
    tampilkan,
    urutan
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "proyek" && slug.current == $slug && tampilkan == true][0] {
    "_id": _id,
    judul,
    "slug": slug.current,
    ringkasan,
    jenisProyek,
    thumbnail {
      asset-> {
        _id,
        url
      },
      alt
    },
    galeri[] {
      asset-> {
        _id,
        url
      },
      alt,
      caption
    },
    masalah,
    kontribusi,
    solusi,
    hasil,
    keahlian[]-> {
      "_id": _id,
      nama,
      kategori,
      urutan
    },
    urlDemo,
    statusRepo,
    urlRepo,
    keteranganRepoPrivat,
    unggulan,
    tampilkan,
    urutan
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "proyek" && tampilkan == true] {
    "slug": slug.current
  }
`;
