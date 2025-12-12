import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Titolo sito',
      type: 'string',
      initialValue: 'Francesca Mirabile',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Testo breve sotto il titolo (opzionale).',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email contatti',
      type: 'string',
      description: 'Usata per il mailto del link Contact.',
    }),
    defineField({
      name: 'navLinks',
      title: 'Link header',
      type: 'array',
      of: [
        defineField({
          name: 'navItem',
          title: 'Nav item',
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'href', title: 'Href', type: 'string', description: 'URL o slug (es. /about)'},
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'siteTitle'},
    prepare: ({title}) => ({title: title || 'Site settings'}),
  },
})
