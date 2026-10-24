import { createClient, type QueryParams } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-24';

/**
 * Memeriksa apakah konfigurasi Sanity telah diisi dengan Project ID yang valid.
 */
export function isSanityConfigured(): boolean {
  return Boolean(
    projectId &&
    projectId.trim() !== '' &&
    projectId !== 'your_sanity_project_id' &&
    projectId !== 'unconfigured'
  );
}

/**
 * Sanity Client untuk pengambilan data di sisi server (Server-Side Fetching).
 * Sesuai arsitektur Fase 4:
 * - useCdn: false (agar perubahan terbitan langsung terbaca)
 * - perspective: 'published' (hanya mengambil data yang telah di-Publish, mengecualikan draf)
 */
export const sanityClient = createClient({
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
});

/**
 * Helper terpusat untuk menjalankan query Sanity dengan strategi tanpa cache lintas request.
 * Memastikan hasil Publish di Studio langsung tampil seketika setelah refresh tanpa rebuild.
 */
export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<T> {
  if (!isSanityConfigured()) {
    throw new Error('Sanity belum terkonfigurasi dengan Project ID yang valid.');
  }

  return sanityClient.fetch<T>(query, params, {
    cache: 'no-store',
    next: { revalidate: 0 },
  });
}
