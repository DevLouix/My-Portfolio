import type { Field } from 'payload'

type LinkType = (options?: {
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({ disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group', // Groups these fields together in the DB and UI
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            options: [
              { label: 'Internal Reference', value: 'reference' },
              { label: 'Custom URL', value: 'custom' },
              { label: 'Open Modal Form', value: 'modal' }, // 1. ADD THIS!
            ],
            defaultValue: 'reference',
            admin: { layout: 'horizontal', width: '50%' },
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'Open in new tab',
            admin: {
              width: '50%',
              style: { alignSelf: 'flex-end' },
            },
          },
        ],
      },
    ],
  }

  // Only add the label field if it isn't disabled
  if (!disableLabel) {
    linkResult.fields.push({
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
      },
    })
  }

  // Add the actual URL or Reference fields
  linkResult.fields.push(
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'posts'], // Can link to a Page OR a Post!
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference', // Only show if internal is selected
      },
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom', // Only show if custom is selected
      },
    },
    {
      name: 'modalId',
      label: 'Which Modal?',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact / Hire Me Form', value: 'contactForm' },
        { label: 'Newsletter Signup Form', value: 'newsletterForm' },
        // Add more modals here in the future!
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'modal', // Only show if Modal is selected
      },
    }
  )

  return { ...linkResult, ...overrides } as Field
}