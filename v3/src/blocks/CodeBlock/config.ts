import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code',
  labels: {
    singular: 'Code Snippet',
    plural: 'Code Snippets',
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'Python', value: 'python' },
        { label: 'JSON', value: 'json' },
      ],
    },
    {
      name: 'code',
      type: 'code',
      required: true,
    },
  ],
}