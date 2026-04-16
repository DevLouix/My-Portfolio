import type { Block } from 'payload'
import { link } from '@/fields/link' // 1. Import the link utility

export const AboutMeBlock: Block = {
  slug: 'aboutMe',
  labels: {
    singular: 'About Me Section',
    plural: 'About Me Sections',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: "Hi, I'm [Your Name]",
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              admin: { width: '30%' },
              options: [
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'GitHub', value: 'github' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Website', value: 'website' },
              ],
            },
            // 2. Inject our dynamic link field, but hide the text label requirement!
            link({ disableLabel: true, overrides: { admin: { width: '70%' } } }),
          ],
        },
      ],
    },
  ],
}