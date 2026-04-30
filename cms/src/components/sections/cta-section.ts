export default {
  collectionName: 'components_sections_cta_sections',
  info: {
    displayName: 'CTA Section',
    icon: 'cursor',
    description: 'Call-to-action section with background',
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
    primaryButton: {
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
    theme: {
      type: 'enumeration',
      enum: ['light', 'dark', 'primary'],
      default: 'primary',
    },
    overlay: {
      type: 'boolean',
      default: true,
    },
    overlayOpacity: {
      type: 'decimal',
      default: 0.6,
    },
  },
};