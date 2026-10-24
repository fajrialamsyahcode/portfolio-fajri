import { defineArrayMember, defineField, defineType } from 'sanity';

export const proyekType = defineType({
  name: 'proyek',
  title: 'Daftar Proyek',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Proyek',
      type: 'string',
      description: 'Nama aplikasi web atau sistem yang dibangun',
      validation: (rule) => rule.required().error('Judul proyek wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      description: 'Pengenal unik dalam URL (misal: /proyek/sistem-manajemen)',
      validation: (rule) => rule.required().error('Slug URL wajib dibangkitkan'),
    }),
    defineField({
      name: 'ringkasan',
      title: 'Ringkasan Singkat',
      type: 'text',
      rows: 3,
      description: 'Penjelasan 1-2 kalimat untuk kartu proyek di halaman beranda dan daftar',
      validation: (rule) => rule.required().error('Ringkasan singkat wajib diisi'),
    }),
    defineField({
      name: 'jenisProyek',
      title: 'Jenis Pengerjaan',
      type: 'string',
      options: {
        list: [
          { title: 'Pekerjaan / Perusahaan', value: 'pekerjaan' },
          { title: 'Mandiri / Personal', value: 'mandiri' },
          { title: 'Klien / Freelance', value: 'klien' },
          { title: 'Open Source', value: 'open_source' },
        ],
        layout: 'radio',
      },
      initialValue: 'pekerjaan',
      validation: (rule) => rule.required().error('Jenis pengerjaan wajib dipilih'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail / Sampul Proyek',
      type: 'image',
      description: 'Gambar pratinjau kartu proyek (disarankan rasio aspek 16:9)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Teks Alternatif (Alt)',
          type: 'string',
          description: 'Deskripsi singkat gambar untuk pembaca layar',
          validation: (rule) => rule.required().error('Alt text gambar wajib diisi'),
        }),
      ],
      validation: (rule) => rule.required().error('Thumbnail proyek wajib diunggah'),
    }),
    defineField({
      name: 'galeri',
      title: 'Galeri Tangkapan Layar (Opsional)',
      type: 'array',
      description: 'Koleksi tangkapan layar fitur-fitur penting dalam studi kasus',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Teks Alternatif (Alt)',
              type: 'string',
              validation: (rule) => rule.required().error('Alt text gambar galeri wajib diisi'),
            }),
            defineField({
              name: 'caption',
              title: 'Keterangan Gambar (Caption)',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'masalah',
      title: 'Latar Belakang & Masalah',
      type: 'text',
      rows: 4,
      description: 'Tantangan, kendala nyata, atau kebutuhan sistem yang ingin diselesaikan',
      validation: (rule) => rule.required().error('Uraian masalah wajib diisi'),
    }),
    defineField({
      name: 'kontribusi',
      title: 'Kontribusi Pribadi',
      type: 'text',
      rows: 4,
      description: 'Peran dan tanggung jawab spesifik yang Anda kerjakan sendiri',
      validation: (rule) => rule.required().error('Uraian kontribusi pribadi wajib diisi'),
    }),
    defineField({
      name: 'solusi',
      title: 'Solusi Teknis & Fitur Utama',
      type: 'text',
      rows: 5,
      description: 'Arsitektur, pendekatan teknis, dan fitur utama yang Anda buat',
      validation: (rule) => rule.required().error('Uraian solusi teknis wajib diisi'),
    }),
    defineField({
      name: 'hasil',
      title: 'Hasil & Dampak (Opsional)',
      type: 'text',
      rows: 3,
      description: 'Dampak terukur yang dapat diverifikasi (HANYA isi jika ada fakta nyata; kosongkan jika belum)',
    }),
    defineField({
      name: 'keahlian',
      title: 'Teknologi yang Digunakan',
      type: 'array',
      description: 'Pilih teknologi dari master data Keahlian',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'keahlian' }],
        }),
      ],
      validation: (rule) => rule.required().min(1).error('Pilih minimal 1 teknologi yang digunakan'),
    }),
    defineField({
      name: 'urlDemo',
      title: 'URL Demo Publik (Opsional)',
      type: 'url',
      description: 'Tautan demo aplikasi aktif jika tersedia',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('URL demo harus menggunakan protokol http atau https'),
    }),
    defineField({
      name: 'statusRepo',
      title: 'Status Repositori Kode Sumber',
      type: 'string',
      options: {
        list: [
          { title: 'Publik (Kode Terbuka untuk Dilihat)', value: 'public' },
          { title: 'Privat (Kode Internal / Milik Klien)', value: 'private' },
          { title: 'Sembunyikan Kontrol Repositori', value: 'hidden' },
        ],
        layout: 'radio',
      },
      initialValue: 'private',
      validation: (rule) => rule.required().error('Status repositori wajib dipilih'),
    }),
    defineField({
      name: 'urlRepo',
      title: 'URL Repositori Kode (GitHub/GitLab)',
      type: 'url',
      description: 'Diisi jika repositori berstatus publik',
      hidden: ({ parent }) => parent?.statusRepo !== 'public',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('URL repositori harus menggunakan protokol http atau https'),
    }),
    defineField({
      name: 'keteranganRepoPrivat',
      title: 'Keterangan Repositori Privat',
      type: 'string',
      initialValue: 'Kode sumber privat untuk keperluan internal / klien',
      description: 'Teks penjelasan ramah bagi pengunjung website saat kode bersifat privat',
      hidden: ({ parent }) => parent?.statusRepo !== 'private',
    }),
    defineField({
      name: 'unggulan',
      title: 'Tampilkan Sebagai Proyek Unggulan di Beranda',
      type: 'boolean',
      initialValue: false,
      description: 'Maksimal 3 proyek unggulan teratas akan ditampilkan di beranda',
    }),
    defineField({
      name: 'tampilkan',
      title: 'Publikasikan di Website',
      type: 'boolean',
      initialValue: true,
      description: 'Jika dimatikan, proyek tidak akan muncul di daftar publik maupun detail studi kasus',
    }),
    defineField({
      name: 'urutan',
      title: 'Nomor Urutan Tampilan',
      type: 'number',
      initialValue: 0,
      description: 'Angka lebih kecil tampil lebih awal',
    }),
  ],
  preview: {
    select: {
      title: 'judul',
      subtitle: 'jenisProyek',
      media: 'thumbnail',
    },
  },
});
