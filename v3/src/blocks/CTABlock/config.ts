import { link } from '@/fields/link'
import type { Block } from 'payload'
export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'textarea' },
    link(), // 2. BAM! Replaced buttonLabel and buttonLink.
  ],
}