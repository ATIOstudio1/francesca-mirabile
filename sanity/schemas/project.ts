import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order / Number',
      type: 'number',
      description: 'Numero usato per l’ordinamento e per la label (es. 1, 2, 3…).',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensioni',
      type: 'string',
      description: 'Es. 50x70cm',
    }),
    defineField({
      name: 'technique',
      title: 'Tecnica / Note',
      type: 'text',
      rows: 3,
      description: 'Es. Collage + sipario: carta. Struttura: ferro e alluminio.',
    }),
    defineField({
      name: 'cover',
      title: 'Immagine di copertina',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Didascalia breve (per hover Archive)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione lunga',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'credits',
      title: 'Crediti',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'cover', order: 'order'},
    prepare: ({title, media, order}) => ({
      title: title || 'Untitled',
      subtitle: order ? `#${order}` : '',
      media,
    }),
  },
})
