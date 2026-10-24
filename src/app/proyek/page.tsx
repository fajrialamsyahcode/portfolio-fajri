import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getAllProjects, getProfile } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = 'Daftar Proyek';
  const description = `Daftar seluruh studi kasus proyek aplikasi web dan sistem yang dibangun oleh ${profile.nama}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/proyek`,
    },
    openGraph: {
      title: `${title} | ${profile.nama}`,
      description,
      url: `${siteUrl}/proyek`,
      siteName: `Portofolio ${profile.nama}`,
      type: 'website',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${profile.nama}`,
      description,
    },
  };
}

export default async function ProyekPage() {
  const profile = await getProfile();
  const projects = await getAllProjects();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Daftar Proyek ${profile.nama}`,
    description: `Daftar seluruh studi kasus proyek aplikasi web dan sistem yang dibangun oleh ${profile.nama}.`,
    url: `${siteUrl}/proyek`,
    hasPart: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.judul,
      description: p.ringkasan,
      url: `${siteUrl}/proyek/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Navbar cvUrl={profile.cv?.url} />

      <main id="main-content" className="flex-1 py-12 sm:py-20 bg-bg-primary">
        <Container>
          {/* Header Bagian */}
          <div className="mb-12 max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent-primary hover:text-blue-300 transition-colors mb-6 group"
            >
              <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
              <span>Kembali ke Beranda</span>
            </Link>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
              Daftar Proyek
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Kumpulan dokumentasi proyek dan studi kasus aplikasi web yang pernah dibangun, mencakup latar belakang masalah, peran pribadi, arsitektur teknis, dan teknologi yang digunakan.
            </p>
          </div>

          {/* Grid Proyek */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="bg-surface-card border border-border-subtle rounded-xl overflow-hidden flex flex-col hover:border-accent-primary/60 transition-all duration-200 hover:-translate-y-1 shadow-lg group"
                >
                  {/* Thumbnail Slot */}
                  <div className="aspect-video w-full bg-border-subtle/30 border-b border-border-subtle flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    {project.thumbnail.url ? (
                      <Image
                        src={project.thumbnail.url}
                        alt={project.thumbnail.alt || project.judul}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-lg bg-surface-card border border-border-subtle flex items-center justify-center text-text-secondary mb-2 group-hover:text-accent-primary transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs text-text-secondary font-medium">
                          {project.thumbnail.alt}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-semibold text-accent-primary uppercase tracking-wider">
                          {project.jenisProyek}
                        </span>
                        {project.unggulan && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/30">
                            Unggulan
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                        <Link href={`/proyek/${project.slug}`}>
                          {project.judul}
                        </Link>
                      </h2>

                      <p className="text-sm text-text-secondary mb-5 line-clamp-3 leading-relaxed">
                        {project.ringkasan}
                      </p>
                    </div>

                    <div>
                      {/* Tags Teknologi */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.keahlian.slice(0, 4).map((tech) => (
                          <Badge key={tech.id} className="text-[11px]">
                            {tech.nama}
                          </Badge>
                        ))}
                        {project.keahlian.length > 4 && (
                          <span className="text-[11px] text-text-secondary self-center px-1">
                            +{project.keahlian.length - 4} lainnya
                          </span>
                        )}
                      </div>

                      <Button
                        href={`/proyek/${project.slug}`}
                        variant="outline"
                        className="w-full text-xs sm:text-sm py-2"
                      >
                        Lihat Studi Kasus &rarr;
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-12 text-center text-text-secondary max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-border-subtle/50 flex items-center justify-center text-text-secondary mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Belum Ada Proyek</h3>
              <p className="text-sm text-text-secondary">
                Saat ini belum ada proyek yang dipublikasikan. Silakan periksa kembali nanti.
              </p>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
}
