import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { SiteSettings } from './globals/SiteSettings'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Leads } from './collections/Leads'
import { Subscribers } from './collections/Subscribers'
import { Analytics } from './collections/Analytics'
import { Comments } from './collections/Comments'
import { Redirects } from './collections/Redirects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/102024-admin-pagoka',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Blog',
    },
  },
  maxDepth: 5, // Global maximum allowed (safety net)
  defaultDepth: 2, // Standard depth for all queries if not specified
  collections: [Users, Media, Categories, Pages, Posts, Leads, Subscribers, Analytics, Comments, Redirects],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        // This key must exactly match your Media collection slug ('media')
        media: true,
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION as string,
        endpoint: process.env.S3_ENDPOINT as string,
        // Enterprise tip: Supabase S3 REQUIRES forcePathStyle to be true!
        forcePathStyle: true,
      },
    }),
  ],
})
