import React from 'react';
import Link from 'next/link';
import type { Metadata, Viewport } from 'next';
import { Studio } from './Studio';
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Admin Sanity Studio — Portofolio Fajri Alamsyah',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const isConfigured = Boolean(
    projectId &&
    projectId.trim() !== '' &&
    projectId !== 'your_sanity_project_id' &&
    projectId !== 'unconfigured'
  );

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-[#F1F5F9] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-[#111C30] border border-[#243247] rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Status Admin: Menunggu Konfigurasi Project ID</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F1F5F9] mb-4">
            Sanity Studio Belum Terkonfigurasi
          </h1>

          <p className="text-sm sm:text-base text-[#A8B3C7] mb-8 leading-relaxed">
            Schema formulir dan rute embedded Studio di <code className="text-[#60A5FA]">/studio</code> telah selesai dibangun oleh agent. Agar Studio dapat terhubung dengan Content Lake Anda, silakan ikuti langkah manual berikut:
          </p>

          <ol className="space-y-4 text-sm text-[#F1F5F9] mb-8 border-y border-[#243247] py-6">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#60A5FA] text-[#0B1120] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>
                Buka <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-[#60A5FA] hover:underline font-semibold">sanity.io/manage</a> dan buat proyek baru bernama <strong className="text-white">portfolio-fajri</strong> dengan dataset <strong className="text-white">production</strong> (visibilitas Public).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#60A5FA] text-[#0B1120] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>
                Salin <strong className="text-white">Project ID</strong> dari dashboard Sanity tersebut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#60A5FA] text-[#0B1120] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>
                Buka tab <strong className="text-white">API</strong> &gt; <strong className="text-white">CORS Origins</strong> di Sanity Manage, lalu tambahkan origin: <code className="text-[#60A5FA] bg-[#0B1120] px-2 py-0.5 rounded border border-[#243247]">http://localhost:3000</code> dengan mencentang <strong className="text-white">Allow credentials</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#60A5FA] text-[#0B1120] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <span>
                Buat file <code className="text-[#60A5FA] bg-[#0B1120] px-2 py-0.5 rounded border border-[#243247]">.env.local</code> di root folder proyek ini, dan isi:
                <pre className="mt-2 p-3 bg-[#0B1120] border border-[#243247] rounded-lg text-xs font-mono text-[#A8B3C7] overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=project_id_anda
NEXT_PUBLIC_SANITY_DATASET=production`}
                </pre>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#60A5FA] text-[#0B1120] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                5
              </span>
              <span>
                Muat ulang (refresh) halaman <code className="text-[#60A5FA]">/studio</code> ini di peramban Anda untuk langsung masuk ke antarmuka login Studio.
              </span>
            </li>
          </ol>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="text-sm font-semibold text-[#60A5FA] hover:underline"
            >
              &larr; Kembali ke Beranda Website
            </Link>
            <span className="text-xs text-[#A8B3C7]">
              Halaman publik tetap dapat diakses normal
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <Studio />;
}
