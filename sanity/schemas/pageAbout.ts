import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageAbout',
  title: 'Pagina About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      initialValue: 'About',
    }),
    defineField({
      name: 'bio',
      title: 'Testo biografia',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'studio',
      title: 'Testo studio/contatti',
      type: 'string',
      description: 'Es. “Studio: Bergamo, via Rossi 120, 24125”.',
    }),
    defineField({
      name: 'gallery',
      title: 'Immagini About (slideshow)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
