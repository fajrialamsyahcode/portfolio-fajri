import { defineField, defineType } from 'sanity';

export const keahlianType = defineType({
  name: 'keahlian',
  title: 'Keahlian & Teknologi',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Teknologi / Perangkat',
      type: 'string',
      description: 'Contoh: TypeScript, Next.js, Node.js, PostgreSQL, Tailwind CSS',
      validation: (rule) => rule.required().error('Nama keahlian wajib diisi'),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori Keahlian',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend Development', value: 'frontend' },
          { title: 'Backend Development', value: 'backend' },
          { title: 'Database & Penyimpanan', value: 'database' },
          { title: 'Tools & DevOps', value: 'tools' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Kategori keahlian wajib dipilih'),
    }),
    defineField({
      name: 'urutan',
      title: 'Nomor Urutan Tampilan',
      type: 'number',
      initialValue: 0,
      description: 'Angka lebih kecil akan tampil lebih dahulu dalam kelompoknya',
    }),
  ],
  preview: {
    select: {
      title: 'nama',
      subtitle: 'kategori',
    },
  },
});
