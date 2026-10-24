'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  cvUrl?: string;
}

export function Navbar({ cvUrl }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-primary/95 backdrop-blur border-b border-border-subtle transition-all">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight text-text-primary hover:text-accent-primary transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary inline-block"></span>
            <span>Fajri Alamsyah</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <Link
              href="/proyek"
              className="hover:text-accent-primary transition-colors"
            >
              Proyek
            </Link>
            <Link
              href="/#tentang"
              className="hover:text-accent-primary transition-colors"
            >
              Tentang
            </Link>
            <Link
              href="/#keahlian"
              className="hover:text-accent-primary transition-colors"
            >
              Keahlian
            </Link>
            <Link
              href="/#kontak"
              className="hover:text-accent-primary transition-colors"
            >
              Kontak
            </Link>
          </nav>

          {/* Desktop Action / CV */}
          <div className="hidden md:flex items-center gap-3">
            {cvUrl ? (
              <Button href={cvUrl} variant="outline" className="text-xs sm:text-sm px-4 py-2">
                Unduh CV
              </Button>
            ) : (
              <span
                className="text-xs text-text-secondary border border-border-subtle px-3 py-1.5 rounded-lg bg-surface-card select-none"
                title="Berkas CV PDF belum diunggah"
              >
                CV Belum Tersedia
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-card focus:outline-none focus:ring-2 focus:ring-accent-primary"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <nav aria-label="Navigasi Seluler" className="md:hidden py-4 border-t border-border-subtle flex flex-col gap-3">
            <Link
              href="/proyek"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
            >
              Daftar Proyek
            </Link>
            <Link
              href="/#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
            >
              Tentang
            </Link>
            <Link
              href="/#keahlian"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
            >
              Keahlian
            </Link>
            <Link
              href="/#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
            >
              Kontak
            </Link>

            <div className="pt-2 border-t border-border-subtle mt-1 px-3">
              {cvUrl ? (
                <Button
                  href={cvUrl}
                  variant="outline"
                  className="w-full text-sm py-2.5 justify-center"
                >
                  Unduh CV
                </Button>
              ) : (
                <div className="text-center text-xs text-text-secondary py-2 border border-border-subtle rounded-lg bg-surface-card">
                  CV Belum Tersedia
                </div>
              )}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
