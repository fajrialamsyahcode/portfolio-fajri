/**
 * Type definitions for Fajri Alamsyah's Portfolio
 * Sesuai spesifikasi docs/CONTENT_MODEL.md
 */

export type ProjectCategory = 'mandiri' | 'pekerjaan' | 'klien' | 'open_source';
export type RepoStatus = 'public' | 'private' | 'hidden';
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  id: string;
  nama: string;
  kategori: SkillCategory;
  urutan: number;
}

export interface ProjectGalleryItem {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  jenisProyek: ProjectCategory;
  thumbnail: {
    url: string;
    alt: string;
  };
  galeri?: ProjectGalleryItem[];
  masalah: string;
  kontribusi: string;
  solusi: string;
  hasil?: string;
  keahlian: Skill[];
  urlDemo?: string;
  statusRepo: RepoStatus;
  urlRepo?: string;
  keteranganRepoPrivat?: string;
  unggulan: boolean;
  tampilkan: boolean;
  urutan: number;
}

export interface Profile {
  nama: string;
  peran: string;
  sapaan: string;
  tagline: string;
  bio: string;
  lokasi?: string;
  foto?: {
    url: string;
    alt: string;
  };
  cv?: {
    url: string;
    namaFileTampil?: string;
  };
}

export interface SiteSettings {
  email: string;
  urlGithub?: string;
  urlLinkedin?: string;
  seoJudul: string;
  seoDeskripsi: string;
  ogImage?: string;
  siteUrl?: string;
}
