import type { MetadataRoute } from 'next';

/**
 * Konfigurasi robots.txt dinamis Next.js.
 * - Mengizinkan perayapan mesin pencari pada halaman publik (/, /proyek, /proyek/*).
 * - Mengecualikan (/studio) dari perayapan (disallow).
 * Catatan Arsitektur: Noindex/Robots bukan mekanisme autentikasi keamanan.
 * Otorisasi akses Studio tetap diamankan secara kriptografis oleh Sanity Authentication.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/proyek', '/proyek/'],
        disallow: ['/studio', '/studio/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
