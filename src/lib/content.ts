import { Profile, Project, Skill, SiteSettings } from '@/types';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialSiteSettings,
} from '@/data/fixtures';
import { isSanityConfigured, sanityFetch } from '@/sanity/client';
import {
  profilQuery,
  pengaturanSitusQuery,
  keahlianQuery,
  featuredProjectsQuery,
  allProjectsQuery,
  projectBySlugQuery,
  allProjectSlugsQuery,
} from '@/sanity/queries';

/* ==============================================================================
 * ADAPTER DATA (Mengubah raw Sanity document ke model domain TypeScript bersih)
 * ============================================================================== */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptProfile(raw: any): Profile {
  if (!raw) {
    return {
      nama: 'Fajri Alamsyah',
      peran: 'Fullstack Developer',
      sapaan: 'Halo, saya',
      tagline: 'Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.',
      bio: '',
      lokasi: undefined,
      foto: undefined,
      cv: undefined,
    };
  }

  return {
    nama: raw.nama || 'Fajri Alamsyah',
    peran: raw.peran || 'Fullstack Developer',
    sapaan: raw.sapaan || 'Halo, saya',
    tagline: raw.tagline || '',
    bio: raw.bio || '',
    lokasi: raw.lokasi || undefined,
    foto: raw.foto?.asset?.url
      ? {
          url: raw.foto.asset.url,
          alt: raw.foto.alt || 'Foto Profil Fajri Alamsyah',
        }
      : undefined,
    cv: raw.cv?.asset?.url
      ? {
          url: `${raw.cv.asset.url}?dl=${encodeURIComponent(raw.cv.namaFileTampil || 'CV_Fajri_Alamsyah.pdf')}`,
          namaFileTampil: raw.cv.namaFileTampil || 'CV_Fajri_Alamsyah.pdf',
        }
      : undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptSiteSettings(raw: any): SiteSettings {
  if (!raw) {
    return {
      email: 'kontak@fajrialamsyah.com',
      seoJudul: 'Fajri Alamsyah — Fullstack Developer',
      seoDeskripsi: 'Portofolio profesional Fajri Alamsyah, Fullstack Developer.',
    };
  }

  return {
    email: raw.email || 'kontak@fajrialamsyah.com',
    urlGithub: raw.urlGithub || undefined,
    urlLinkedin: raw.urlLinkedin || undefined,
    seoJudul: raw.seoJudul || 'Fajri Alamsyah — Fullstack Developer',
    seoDeskripsi: raw.seoDeskripsi || 'Portofolio profesional Fajri Alamsyah, Fullstack Developer.',
    ogImage: raw.ogImage?.asset?.url || undefined,
    siteUrl: raw.siteUrl || undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptSkill(raw: any): Skill {
  return {
    id: raw._id || '',
    nama: raw.nama || '',
    kategori: raw.kategori || 'tools',
    urutan: Number(raw.urutan || 0),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptProject(raw: any): Project {
  const rawSkills = Array.isArray(raw.keahlian)
    ? raw.keahlian.filter((s: { nama?: string }) => s && s.nama)
    : [];
  const rawGaleri = Array.isArray(raw.galeri) ? raw.galeri : [];

  return {
    id: raw._id || '',
    judul: raw.judul || '',
    slug: raw.slug || '',
    ringkasan: raw.ringkasan || '',
    jenisProyek: raw.jenisProyek || 'pekerjaan',
    thumbnail: {
      url: raw.thumbnail?.asset?.url || '',
      alt: raw.thumbnail?.alt || raw.judul || 'Thumbnail Proyek',
    },
    galeri: rawGaleri.map((g: { asset?: { url?: string }; alt?: string; caption?: string }) => ({
      url: g.asset?.url || '',
      alt: g.alt || '',
      caption: g.caption || undefined,
    })),
    masalah: raw.masalah || '',
    kontribusi: raw.kontribusi || '',
    solusi: raw.solusi || '',
    hasil: raw.hasil || undefined,
    keahlian: rawSkills.map(adaptSkill),
    urlDemo: raw.urlDemo || undefined,
    statusRepo: raw.statusRepo || 'hidden',
    urlRepo: raw.urlRepo || undefined,
    keteranganRepoPrivat: raw.keteranganRepoPrivat || undefined,
    unggulan: Boolean(raw.unggulan),
    tampilkan: Boolean(raw.tampilkan),
    urutan: Number(raw.urutan || 0),
  };
}

function handleCmsError(error: unknown, context: string): void {
  // Biarkan Next.js menangani bailout dynamic server usage tanpa ditangkap sebagai error CMS
  if (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    (error as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE'
  ) {
    throw error;
  }
  console.error(`[CMS Error] ${context}:`, error);
}

/* ==============================================================================
 * LAPISAN AKSES KONTEN (Content Access Layer)
 * ============================================================================== */

export async function getProfile(): Promise<Profile> {
  if (!isSanityConfigured()) {
    // Mode unconfigured development: gunakan fixture berlabel jelas
    return initialProfile;
  }

  try {
    const raw = await sanityFetch<unknown>({ query: profilQuery });
    return adaptProfile(raw);
  } catch (error) {
    handleCmsError(error, 'Gagal mengambil dokumen profil dari Sanity');
    // Kembalikan empty state aman (tanpa data palsu di mode production)
    return adaptProfile(null);
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured()) {
    return initialSiteSettings;
  }

  try {
    const raw = await sanityFetch<unknown>({ query: pengaturanSitusQuery });
    return adaptSiteSettings(raw);
  } catch (error) {
    handleCmsError(error, 'Gagal mengambil pengaturan situs dari Sanity');
    return adaptSiteSettings(null);
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (!isSanityConfigured()) {
    return initialSkills;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = await sanityFetch<any[]>({ query: keahlianQuery });
    if (!Array.isArray(raw)) return [];
    return raw.map(adaptSkill);
  } catch (error) {
    handleCmsError(error, 'Gagal mengambil daftar keahlian dari Sanity');
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) {
    return initialProjects.filter((p) => p.tampilkan && p.unggulan).slice(0, 3);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = await sanityFetch<any[]>({ query: featuredProjectsQuery });
    if (!Array.isArray(raw)) return [];
    return raw.map(adaptProject).slice(0, 3);
  } catch (error) {
    handleCmsError(error, 'Gagal mengambil proyek unggulan dari Sanity');
    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) {
    return initialProjects.filter((p) => p.tampilkan);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = await sanityFetch<any[]>({ query: allProjectsQuery });
    if (!Array.isArray(raw)) return [];
    return raw.map(adaptProject);
  } catch (error) {
    handleCmsError(error, 'Gagal mengambil daftar proyek dari Sanity');
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!slug) return null;

  if (!isSanityConfigured()) {
    const project = initialProjects.find((p) => p.slug === slug && p.tampilkan);
    return project || null;
  }

  try {
    const raw = await sanityFetch<unknown>({
      query: projectBySlugQuery,
      params: { slug },
    });
    if (!raw) return null;
    return adaptProject(raw);
  } catch (error) {
    handleCmsError(error, `Gagal mengambil proyek "${slug}" dari Sanity`);
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured()) {
    return initialProjects.filter((p) => p.tampilkan).map((p) => ({ slug: p.slug }));
  }

  try {
    const raw = await sanityFetch<{ slug: string }[]>({ query: allProjectSlugsQuery });
    if (!Array.isArray(raw)) return [];
    return raw.filter((item) => Boolean(item && item.slug));
  } catch (error) {
    handleCmsError(error, 'Gagal mengambil seluruh slug proyek dari Sanity');
    return [];
  }
}
