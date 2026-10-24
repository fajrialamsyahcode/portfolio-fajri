import { defineField, defineType } from 'sanity';

export const profilType = defineType({
  name: 'profil',
  title: 'Profil Pribadi',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lengkap',
      type: 'string',
      initialValue: 'Fajri Alamsyah',
      validation: (rule) => rule.required().error('Nama lengkap wajib diisi'),
    }),
    defineField({
      name: 'peran',
      title: 'Peran / Profesi',
      type: 'string',
      initialValue: 'Fullstack Developer',
      validation: (rule) => rule.required().error('Peran wajib diisi'),
    }),
    defineField({
      name: 'sapaan',
      title: 'Sapaan Pembuka (Hero)',
      type: 'string',
      initialValue: 'Halo, saya',
      description: 'Teks kecil pembuka di atas nama pada bagian hero',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline Singkat (Hero)',
      type: 'string',
      initialValue: 'Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.',
      validation: (rule) => rule.required().error('Tagline wajib diisi'),
    }),
    defineField({
      name: 'bio',
      title: 'Biografi / Tentang Saya',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().error('Biografi diri wajib diisi'),
      description: 'Penjelasan diri lebih mendalam untuk section Tentang Saya',
    }),
    defineField({
      name: 'lokasi',
      title: 'Lokasi / Domisili',
      type: 'string',
      description: 'Contoh: Indonesia atau nama kota yang ingin ditampilkan secara publik',
    }),
    defineField({
      name: 'foto',
      title: 'Foto Profil PNG (Hero)',
      type: 'image',
      description: 'Foto PNG asli berlatar transparan milik Fajri Alamsyah (tanpa rekayasa AI)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Teks Alternatif (Alt)',
          type: 'string',
          description: 'Deskripsi gambar untuk aksesibilitas pembaca layar (a11y)',
          validation: (rule) => rule.required().error('Alt text gambar foto profil wajib diisi'),
        }),
      ],
      validation: (rule) => rule.required().error('Foto profil wajib diunggah'),
    }),
    defineField({
      name: 'cv',
      title: 'Berkas CV (PDF)',
      type: 'file',
      description: 'Unggah berkas resume / CV terbaru dalam format PDF',
      options: {
        accept: '.pdf,application/pdf',
      },
      fields: [
        defineField({
          name: 'namaFileTampil',
          title: 'Label Nama Berkas',
          type: 'string',
          initialValue: 'CV_Fajri_Alamsyah.pdf',
        }),
      ],
      validation: (rule) => rule.required().error('Berkas CV PDF wajib diunggah'),
    }),
  ],
});
