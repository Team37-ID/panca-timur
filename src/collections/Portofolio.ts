import type { CollectionConfig } from 'payload'

export const Portofolio: CollectionConfig = {
  slug: 'portofolio',
  admin: {
    useAsTitle: 'tag',
  },
  auth: false,
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
