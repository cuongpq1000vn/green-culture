export default {
  collectionName: 'components_shared_meta_socials',
  info: {
    displayName: 'Meta Social',
    icon: 'share',
    description: 'Social media meta tags for SEO',
  },
  options: {},
  attributes: {
    socialNetwork: {
      type: 'enumeration',
      enum: ['Facebook', 'Twitter', 'LinkedIn'],
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'text',
      required: true,
    },
    image: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images'],
    },
  },
};