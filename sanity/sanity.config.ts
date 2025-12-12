import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import project from './schemas/project'
import pageAbout from './schemas/pageAbout'
import siteSettings from './schemas/siteSettings'
import tag from './schemas/tag'

const projectId = process.env.SANITY_PROJECT_ID || 'y5t2piic'
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'

export default defineConfig({
  name: 'francesca-mirabile',
  title: 'Francesca Mirabile CMS',
  projectId,
  dataset,
  schema: {
    types: [project, pageAbout, siteSettings, tag],
  },
  plugins: [deskTool(), visionTool({defaultApiVersion: apiVersion})],
})
