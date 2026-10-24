import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getProjectBySlug, getProfile, getAllProjectSlugs } from '@/lib/content';

interface ProjectDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const profile = await getProfile();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan',
      description: 'Halaman proyek yang diminta tidak ditemukan.',
    };
  }

  const title = `${project.judul} — Studi Kasus`;
  const description = project.ringkasan;
  const projectUrl = `${siteUrl}/proyek/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${title} | ${profile.nama}`,
      description,
      url: projectUrl,
      siteName: `Portofolio ${profile.nama}`,
      type: 'article',
      locale: 'id_ID',
      images: project.thumbnail.url
        ? [
            {
              url: project.thumbnail.url,
              width: 1200,
              height: 630,
              alt: project.thumbnail.alt || project.judul,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${profile.nama}`,
      description,
      images: project.thumbnail.url ? [project.thumbnail.url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const profile = await getProfile();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!project) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.judul,
    description: project.ringkasan,
    url: `${siteUrl}/proyek/${project.slug}`,
    image: project.thumbnail.url || undefined,
    author: {
      '@type': 'Person',
      name: profile.nama,
      url: siteUrl,
    },
    keywords: project.keahlian.map((k) => k.nama).join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar cvUrl={profile.cv?.url} />

      <main id="main-content" className="flex-1 py-12 sm:py-20 bg-bg-primary">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Navigasi Balik */}
            <div className="mb-8">
              <Link
                href="/proyek"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent-primary hover:text-blue-300 transition-colors group"
              >
                <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                <span>Kembali ke Daftar Proyek</span>
              </Link>
            </div>

            {/* Header Studi Kasus */}
            <header className="mb-12 border-b border-border-subtle pb-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-xs font-semibold text-accent-primary uppercase tracking-wider px-3 py-1 rounded-full bg-surface-card border border-border-subtle">
                  {project.jenisProyek}
                </span>
                {project.unggulan && (
                  <span className="text-[11px] uppercase font-bold px-2.5 py-1 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/30">
                    Proyek Unggulan
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-4 leading-tight">
                {project.judul}
              </h1>

              <p className="text-base sm:text-xl text-text-secondary leading-relaxed mb-8 max-w-3xl">
                {project.ringkasan}
              </p>

              {/* Tautan Aksi Proyek */}
              <div className="flex flex-wrap items-center gap-4">
                {project.urlDemo ? (
                  <Button
                    href={project.urlDemo}
                    variant="primary"
                    className="min-h-[44px] px-6 text-sm font-semibold inline-flex items-center gap-2 shadow-lg shadow-accent-primary/10"
                  >
                    <span>Lihat Demo Publik</span>
                    <span>&rarr;</span>
                  </Button>
                ) : null}

                {project.statusRepo === 'public' && project.urlRepo ? (
                  <Button
                    href={project.urlRepo}
                    variant="outline"
                    className="min-h-[44px] px-6 text-sm inline-flex items-center gap-2"
                  >
                    <span>Repositori Kode Sumber</span>
                    <span>&rarr;</span>
                  </Button>
                ) : null}

                {project.statusRepo === 'private' ? (
                  <div className="inline-flex items-center gap-2 text-xs text-text-secondary bg-surface-card border border-border-subtle px-4 py-3 rounded-lg">
                    <svg className="w-4 h-4 text-accent-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>{project.keteranganRepoPrivat || 'Kode sumber bersifat privat untuk keperluan internal / klien'}</span>
                  </div>
                ) : null}
              </div>
            </header>

            {/* Thumbnail / Sampul Utama Proyek */}
            <div className="aspect-video w-full rounded-2xl bg-surface-card border border-border-subtle flex flex-col items-center justify-center p-8 text-center mb-12 shadow-xl relative overflow-hidden">
              {project.thumbnail.url ? (
                <Image
                  src={project.thumbnail.url}
                  alt={project.thumbnail.alt || project.judul}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-xl bg-bg-primary border border-border-subtle flex items-center justify-center text-accent-primary mb-3">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-text-primary mb-1">
                    {project.thumbnail.alt}
                  </span>
                  <span className="text-xs text-text-secondary">
                    [Slot Thumbnail Proyek — Beresolusi Tinggi & Ramah Aksesibilitas]
                  </span>
                </>
              )}
            </div>

            {/* Bagian Editorial Studi Kasus */}
            <div className="space-y-10">
              {/* 1. Latar Belakang & Masalah */}
              <section className="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                  <span>01. Identifikasi Masalah</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 border-b border-border-subtle pb-3">
                  Latar Belakang & Tantangan
                </h2>
                <div className="text-text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.masalah}
                </div>
              </section>

              {/* 2. Kontribusi Pribadi */}
              <section className="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                  <span>02. Peran & Tanggung Jawab</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 border-b border-border-subtle pb-3">
                  Kontribusi Pribadi
                </h2>
                <div className="text-text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.kontribusi}
                </div>
              </section>

              {/* 3. Solusi Teknis & Fitur Utama */}
              <section className="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                  <span>03. Arsitektur & Implementasi</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 border-b border-border-subtle pb-3">
                  Solusi Teknis & Fitur Utama
                </h2>
                <div className="text-text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.solusi}
                </div>
              </section>

              {/* 4. Hasil & Dampak (Opsional, Hanya jika fakta tersedia) */}
              {project.hasil && (
                <section className="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                    <span>04. Dampak Nyata</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 border-b border-border-subtle pb-3">
                    Hasil & Dampak
                  </h2>
                  <div className="text-text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line">
                    {project.hasil}
                  </div>
                </section>
              )}

              {/* 5. Teknologi yang Digunakan */}
              <section className="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                  <span>Teknologi Terlibat</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 border-b border-border-subtle pb-3">
                  Teknologi & Ekosistem
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {project.keahlian.map((tech) => (
                    <Badge key={tech.id} className="text-sm px-3.5 py-1.5 font-medium">
                      {tech.nama}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* 6. Galeri Tangkapan Layar (Jika ada) */}
              {project.galeri && project.galeri.length > 0 && (
                <section className="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                    <span>Dokumentasi Visual</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 border-b border-border-subtle pb-3">
                    Galeri Antarmuka
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.galeri.map((img, idx) => (
                      <figure key={idx} className="flex flex-col">
                        <div className="aspect-video w-full rounded-xl bg-bg-primary border border-border-subtle flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                          {img.url ? (
                            <Image
                              src={img.url}
                              alt={img.alt || 'Tangkapan Layar Proyek'}
                              fill
                              sizes="(max-width: 768px) 100vw, 440px"
                              className="object-cover"
                            />
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs text-text-secondary">{img.alt}</span>
                            </>
                          )}
                        </div>
                        {img.caption && (
                          <figcaption className="text-xs text-text-secondary mt-2 px-1 text-center sm:text-left">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Navigasi Footer Studi Kasus */}
            <div className="mt-16 pt-8 border-t border-border-subtle flex items-center justify-between">
              <Link
                href="/proyek"
                className="text-sm font-semibold text-accent-primary hover:underline inline-flex items-center gap-1"
              >
                &larr; Lihat Seluruh Proyek
              </Link>
              <Link
                href="/#kontak"
                className="text-sm font-semibold text-text-secondary hover:text-text-primary inline-flex items-center gap-1"
              >
                Diskusikan Proyek Serupa &rarr;
              </Link>
            </div>
          </article>
        </Container>
      </main>

      <Footer />
    </>
  );
}
