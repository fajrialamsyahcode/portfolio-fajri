import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-center items-center py-16 px-4">
      <Container className="max-w-md text-center">
        <div className="bg-surface-card border border-border-subtle rounded-2xl p-8 sm:p-12 shadow-xl">
          <span className="text-5xl sm:text-6xl font-extrabold text-accent-primary mb-4 block">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-text-primary">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm sm:text-base text-text-secondary mb-8 leading-relaxed">
            Halaman atau studi kasus proyek yang Anda cari tidak tersedia atau alamat URL telah dipindahkan.
          </p>
          <Button href="/" variant="primary" className="w-full">
            Kembali ke Beranda
          </Button>
        </div>
      </Container>
    </main>
  );
}
