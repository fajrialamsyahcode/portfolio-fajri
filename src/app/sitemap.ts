import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/lib/content';

/**
 * Peta Situs (Sitemap XML) Dinamis Next.js.
 * Memetakan rute publik aktif (Beranda, Daftar Proyek, dan Studi Kasus Terbit).
 * Rute admin /studio secara ketat dikecualikan dari sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const lastModified = new Date();

  // 1. Rute Statis Publik
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/proyek`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Rute Dinamis Seluruh Studi Kasus Proyek Terbit
  try {
    const projectSlugs = await getAllProjectSlugs();
    for (const item of projectSlugs) {
      if (item.slug) {
        routes.push({
          url: `${siteUrl}/proyek/${item.slug}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      (error as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE'
    ) {
      throw error;
    }
    console.error('[Sitemap] Gagal mengambil slug proyek untuk sitemap:', error);
  }

  return routes;
}
