import { defineField, defineType } from 'sanity';

export const pengaturanSitusType = defineType({
  name: 'pengaturanSitus',
  title: 'Pengaturan Situs & Kontak',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Alamat Email Publik',
      type: 'string',
      description: 'Email tujuan tombol kontak dan tautan mailto',
      validation: (rule) => rule.required().email().error('Format alamat email tidak valid'),
    }),
    defineField({
      name: 'urlGithub',
      title: 'Tautan Profil GitHub',
      type: 'url',
      description: 'Contoh: https://github.com/username',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('URL GitHub harus menggunakan protokol http atau https'),
    }),
    defineField({
      name: 'urlLinkedin',
      title: 'Tautan Profil LinkedIn',
      type: 'url',
      description: 'Contoh: https://linkedin.com/in/username',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('URL LinkedIn harus menggunakan protokol http atau https'),
    }),
    defineField({
      name: 'seoJudul',
      title: 'Judul SEO Standar Website',
      type: 'string',
      initialValue: 'Fajri Alamsyah — Fullstack Developer',
      description: 'Judul yang muncul pada tab peramban dan hasil pencarian Google',
      validation: (rule) => rule.required().error('Judul SEO standar wajib diisi'),
    }),
    defineField({
      name: 'seoDeskripsi',
      title: 'Deskripsi SEO Standar (Meta Description)',
      type: 'text',
      rows: 3,
      initialValue:
        'Portofolio profesional Fajri Alamsyah, Fullstack Developer. Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.',
      description: 'Ringkasan isi situs untuk mesin pencari (disarankan 150-160 karakter)',
      validation: (rule) => rule.required().error('Deskripsi SEO wajib diisi'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Gambar Pratinjau Sosial (Open Graph Image)',
      type: 'image',
      description: 'Gambar banner saat tautan website dibagikan ke media sosial (WhatsApp, X, LinkedIn)',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Domain Produksi Website (Canonical URL)',
      type: 'url',
      description: 'Domain website final setelah deployment online (misal: https://fajrialamsyah.com)',
    }),
  ],
});
