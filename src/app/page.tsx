import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  getProfile,
  getFeaturedProjects,
  getSkills,
  getSiteSettings,
} from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const title = settings.seoJudul || `${profile.nama} — ${profile.peran}`;
  const description = settings.seoDeskripsi || profile.tagline || 'Portofolio profesional Fullstack Developer.';

  return {
    title,
    description,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: `Portofolio ${profile.nama}`,
      locale: 'id_ID',
      type: 'website',
      images: settings.ogImage
        ? [
            {
              url: settings.ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: settings.ogImage ? [settings.ogImage] : undefined,
    },
  };
}

export default async function HomePage() {
  const profile = await getProfile();
  const featuredProjects = await getFeaturedProjects();
  const skills = await getSkills();
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const skillCategories = [
    { key: 'frontend', title: 'Frontend Development', desc: 'Antarmuka web interaktif & responsif' },
    { key: 'backend', title: 'Backend & Arsitektur API', desc: 'Layanan server terstruktur & handal' },
    { key: 'database', title: 'Database & Penyimpanan', desc: 'Manajemen basis data & content lake' },
    { key: 'tools', title: 'Tools & DevOps', desc: 'Alat bantu pengembangan & kolaborasi' },
  ];

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.nama,
    jobTitle: profile.peran,
    url: siteUrl,
    description: profile.tagline,
    sameAs: [settings.urlLinkedin, settings.urlGithub].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar cvUrl={profile.cv?.url} />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 border-b border-border-subtle bg-bg-primary">
          {/* Tipografi Latar Belakang PORTFOLIO */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none -z-10 overflow-hidden"
          >
            <span className="text-[13vw] font-black uppercase tracking-widest text-[#1E3A5F]/30 leading-none whitespace-nowrap">
              PORTFOLIO
            </span>
          </div>

          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Kolom Kiri: Teks & Aksi */}
              <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-border-subtle text-accent-primary text-xs sm:text-sm font-medium mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                  <span>{profile.sapaan}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-3 leading-[1.15]">
                  {profile.nama}
                </h1>

                <p className="text-xl sm:text-2xl font-bold text-accent-primary mb-5">
                  {profile.peran}
                </p>

                <p className="text-base sm:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed">
                  {profile.tagline}
                </p>

                {/* Dua Tombol CTA Utama */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <Button
                    href="#proyek"
                    variant="primary"
                    className="min-h-[48px] px-6 text-base justify-center shadow-lg shadow-accent-primary/10"
                  >
                    Lihat Proyek
                  </Button>
                  <Button
                    href="#kontak"
                    variant="outline"
                    className="min-h-[48px] px-6 text-base justify-center"
                  >
                    Hubungi Saya
                  </Button>
                </div>
              </div>

              {/* Kolom Kanan: Foto Profil Pemilik */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-4/5 rounded-2xl bg-surface-card border border-border-subtle p-6 flex flex-col items-center justify-between text-center shadow-2xl overflow-hidden group">
                  {/* Efek visual border glow halus */}
                  <div className="absolute inset-0 bg-linear-to-b from-accent-primary/5 via-transparent to-bg-primary/80 pointer-events-none" />

                  {profile.foto?.url ? (
                    <div className="relative w-full h-full flex items-end justify-center">
                      <Image
                        src={profile.foto.url}
                        alt={profile.foto.alt || 'Foto Profil Fajri Alamsyah'}
                        fill
                        priority
                        sizes="(max-width: 768px) 340px, 380px"
                        className="object-contain object-bottom"
                      />
                    </div>
                  ) : (
                    /* Placeholder Netral Khusus Development */
                    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full py-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-border-subtle/70 border-2 border-accent-primary/40 flex items-center justify-center text-accent-primary mb-5 shadow-inner">
                        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>

                      <div className="bg-bg-primary/80 border border-border-subtle rounded-lg px-4 py-3 max-w-[280px]">
                        <p className="text-xs sm:text-sm text-text-primary font-semibold mb-1">
                          [Placeholder Foto Fajri Alamsyah]
                        </p>
                        <p className="text-[11px] text-text-secondary leading-snug">
                          Menunggu file foto PNG asli berlatar transparan di folder <code className="text-accent-primary">inputs/profile/</code>
                        </p>
                      </div>

                      <span className="mt-4 text-[11px] text-accent-primary/80 uppercase tracking-wider font-medium">
                        Proporsi Kepala & Bahu Utuh (Tanpa AI)
                      </span>
                    </div>
                  )}

                  {/* Batas bawah hero menyatu mulus */}
                  <div className="absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-surface-card to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* PROYEK UNGGULAN (MAKSIMAL 3 PROYEK) */}
        <section id="proyek" className="py-16 sm:py-24 border-b border-border-subtle bg-bg-primary">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                  <span>Karya Terpilih</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                  Proyek Unggulan
                </h2>
                <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-xl">
                  Studi kasus aplikasi web yang menonjolkan arsitektur rapi, kemudahan penggunaan, dan penyelesaian masalah nyata.
                </p>
              </div>

              <div>
                <Link
                  href="/proyek"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-blue-300 transition-colors group"
                >
                  <span>Lihat Semua Proyek</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>

            {featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="bg-surface-card border border-border-subtle rounded-xl overflow-hidden flex flex-col hover:border-accent-primary/50 transition-all duration-200 hover:-translate-y-1 shadow-md group"
                  >
                    {/* Thumbnail Card */}
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

                    {/* Card Body */}
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

                        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                          <Link href={`/proyek/${project.slug}`}>
                            {project.judul}
                          </Link>
                        </h3>

                        <p className="text-sm text-text-secondary mb-5 line-clamp-3 leading-relaxed">
                          {project.ringkasan}
                        </p>
                      </div>

                      <div>
                        {/* Tags Teknologi */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.keahlian.slice(0, 3).map((tech) => (
                            <Badge key={tech.id} className="text-[11px]">
                              {tech.nama}
                            </Badge>
                          ))}
                          {project.keahlian.length > 3 && (
                            <span className="text-[11px] text-text-secondary self-center px-1">
                              +{project.keahlian.length - 3} lainnya
                            </span>
                          )}
                        </div>

                        <Button
                          href={`/proyek/${project.slug}`}
                          variant="outline"
                          className="w-full text-xs sm:text-sm py-2"
                        >
                          Lihat Studi Kasus
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-surface-card border border-border-subtle rounded-xl p-12 text-center text-text-secondary">
                Belum ada proyek unggulan yang ditampilkan.
              </div>
            )}
          </Container>
        </section>

        {/* TENTANG SAYA */}
        <section id="tentang" className="py-16 sm:py-24 border-b border-border-subtle bg-surface-card/40">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                <span>Profil Profesional</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary mb-6">
                Tentang Saya
              </h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
                {profile.bio}
              </p>

              {profile.lokasi && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-border-subtle text-sm text-accent-primary mb-10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Berbasis di {profile.lokasi}</span>
                </div>
              )}

              {/* 3 Pilar Kerja */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                  <h4 className="text-sm font-bold text-accent-primary mb-2">Kode Bersih & Rapi</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Struktur kode teratur, type-safe dengan TypeScript, dan mudah dirawat.
                  </p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                  <h4 className="text-sm font-bold text-accent-primary mb-2">Fokus Pengguna</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Tampilan responsif, navigasi intuitif, dan memperhatikan aksesibilitas.
                  </p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                  <h4 className="text-sm font-bold text-accent-primary mb-2">Performa Tinggi</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Server rendering efisien dan pengoptimalan aset untuk kecepatan muat halaman.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* KEAHLIAN BERKELOMPOK */}
        <section id="keahlian" className="py-16 sm:py-24 border-b border-border-subtle bg-bg-primary">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                <span>Teknologi & Perangkat</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary mb-3">
                Keahlian Teknis
              </h2>
              <p className="text-text-secondary text-sm sm:text-base">
                Bahasa pemrograman, framework, dan peralatan yang digunakan dalam merancang serta membangun aplikasi modern.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((cat) => {
                const categorySkills = skills.filter((s) => s.kategori === cat.key);
                return (
                  <div
                    key={cat.key}
                    className="bg-surface-card border border-border-subtle rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-base font-bold text-accent-primary mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-text-secondary mb-4 pb-3 border-b border-border-subtle">
                        {cat.desc}
                      </p>

                      <ul className="space-y-2.5">
                        {categorySkills.length > 0 ? (
                          categorySkills.map((s) => (
                            <li
                              key={s.id}
                              className="text-sm text-text-primary flex items-center gap-2.5 font-medium"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                              <span>{s.nama}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-text-secondary">Belum ada data keahlian</li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* KONTAK */}
        <section id="kontak" className="py-16 sm:py-24 bg-bg-primary">
          <Container>
            <div className="max-w-2xl mx-auto text-center bg-surface-card border border-border-subtle rounded-2xl p-8 sm:p-12 shadow-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">
                <span>Kolaborasi & Diskusi</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
                Mari Terhubung
              </h2>
              <p className="text-text-secondary text-sm sm:text-base mb-8 leading-relaxed">
                Tertarik untuk berkolaborasi, mendiskusikan peluang proyek, atau memiliki pertanyaan teknis? Anda dapat menghubungi saya langsung melalui email atau media sosial profesional di bawah ini.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Button
                  href={`mailto:${settings.email}`}
                  variant="primary"
                  className="w-full sm:w-auto min-h-[44px] px-6 text-sm sm:text-base font-semibold"
                >
                  Kirim Email ({settings.email})
                </Button>
                {settings.urlLinkedin && (
                  <Button
                    href={settings.urlLinkedin}
                    variant="outline"
                    className="w-full sm:w-auto min-h-[44px] px-6 text-sm sm:text-base"
                  >
                    LinkedIn
                  </Button>
                )}
                {settings.urlGithub && (
                  <Button
                    href={settings.urlGithub}
                    variant="outline"
                    className="w-full sm:w-auto min-h-[44px] px-6 text-sm sm:text-base"
                  >
                    GitHub
                  </Button>
                )}
              </div>

              <p className="text-xs text-text-secondary">
                Alamat email: <span className="text-text-primary font-mono select-all">{settings.email}</span>
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
