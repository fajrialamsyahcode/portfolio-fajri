import type { StructureResolver } from 'sanity/structure';

/**
 * Custom Desk Structure untuk Sanity Studio Portofolio Fajri Alamsyah.
 * - Profil: Singleton dengan ID dokumen tetap 'profil'
 * - Pengaturan Situs: Singleton dengan ID dokumen tetap 'pengaturanSitus'
 * - Proyek & Keahlian: Koleksi dokumen yang dapat ditambah dan diurutkan
 */

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Manajemen Konten Portofolio')
    .items([
      // 1. Singleton: Profil Pribadi
      S.listItem()
        .title('Profil Pribadi')
        .id('profilSingleton')
        .child(
          S.document()
            .schemaType('profil')
            .documentId('profil')
            .title('Profil Fajri Alamsyah')
        ),

      // 2. Singleton: Pengaturan Situs & Kontak
      S.listItem()
        .title('Pengaturan Situs & Kontak')
        .id('pengaturanSitusSingleton')
        .child(
          S.document()
            .schemaType('pengaturanSitus')
            .documentId('pengaturanSitus')
            .title('Pengaturan Situs & Kontak')
        ),

      S.divider(),

      // 3. Collection: Proyek
      S.documentTypeListItem('proyek').title('Daftar Proyek'),

      // 4. Collection: Keahlian & Teknologi
      S.documentTypeListItem('keahlian').title('Keahlian & Teknologi'),
    ]);
