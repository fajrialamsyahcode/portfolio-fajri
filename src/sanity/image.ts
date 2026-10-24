import createImageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const imageBuilder = createImageUrlBuilder(sanityClient);

/**
 * Membangun URL gambar yang dioptimasi dari asset Sanity Image.
 * Mendukung hotspot, cropping, dan format webp otomatis.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  if (!source || !source.asset) {
    return null;
  }
  return imageBuilder.image(source).auto('format').fit('max');
}
