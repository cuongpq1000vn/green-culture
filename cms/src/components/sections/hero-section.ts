export default {
  collectionName: 'components_sections_hero_sections',
  info: {
    displayName: 'Hero Section',
    icon: 'picture',
    description: 'Main hero banner section',
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
    description: {
      type: 'richtext',
      required: false,
    },
    backgroundImage: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images'],
    },
    backgroundVideo: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['videos'],
    },
    ctaButton: {
      type: 'component',
      repeatable: false,
      component: 'shared.cta-button',
    },
    secondaryButton: {
      type: 'component',
      repeatable: false,
      component: 'shared.cta-button',
    },
    alignment: {
      type: 'enumeration',
      enum: ['left', 'center', 'right'],
      default: 'center',
    },
    overlay: {
      type: 'boolean',
      default: true,
    },
    overlayOpacity: {
      type: 'decimal',
      default: 0.4,
    },
  },
};