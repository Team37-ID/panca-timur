import { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'featuredImg'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData.excerpt) return siblingData.excerpt

            const content = siblingData.content
            if (!content) return ''

            // Extract text from Payload richText structure
            interface TextNode {
              text: string
            }

            interface ContentBlock {
              children?: TextNode[]
            }
            console.log(content.root.children)
            const text: string = (content.root.children as ContentBlock[])
              .map((block) => block.children?.map((c: TextNode) => c.text).join(''))
              .join(' ')

            return text.slice(0, 160)
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImg',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
