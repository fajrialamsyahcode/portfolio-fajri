import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-border-subtle bg-bg-primary mt-auto py-8 sm:py-12 text-sm text-text-secondary">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left">
            &copy; {currentYear} Fajri Alamsyah. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-accent-primary transition-colors">
              Beranda
            </Link>
            <Link href="/proyek" className="hover:text-accent-primary transition-colors">
              Proyek
            </Link>
            <a
              href="#top"
              className="hover:text-accent-primary transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              Kembali Ke Atas &uarr;
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
