export default {
  collectionName: 'components_sections_about_sections',
  info: {
    displayName: 'About Section',
    icon: 'information',
    description: 'About us section with stats and content',
  },
  options: {},
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    subtitle: {
      type: 'text',
      required: false,
    },
    content: {
      type: 'richtext',
      required: true,
    },
    image: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images'],
    },
    stats: {
      type: 'component',
      repeatable: true,
      component: 'shared.stat-item',
    },
    features: {
      type: 'component',
      repeatable: true,
      component: 'shared.feature-item',
    },
    layout: {
      type: 'enumeration',
      enum: ['image-left', 'image-right', 'image-top', 'centered'],
      default: 'image-right',
    },
    backgroundColor: {
      type: 'string',
      required: false,
    },
    ctaButton: {
      type: 'component',
      repeatable: false,
      component: 'shared.cta-button',
    },
  },
};