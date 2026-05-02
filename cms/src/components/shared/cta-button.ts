export default {
  collectionName: 'components_shared_cta_buttons',
  info: {
    displayName: 'CTA Button',
    icon: 'cursor',
    description: 'Call-to-action button component',
  },
  options: {},
  attributes: {
    text: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: false,
    },
    isExternal: {
      type: 'boolean',
      default: false,
    },
    variant: {
      type: 'enumeration',
      enum: ['primary', 'secondary', 'outline', 'ghost'],
      default: 'primary',
    },
    size: {
      type: 'enumeration',
      enum: ['sm', 'md', 'lg'],
      default: 'md',
    },
    icon: {
      type: 'string',
      required: false,
    },
    disabled: {
      type: 'boolean',
      default: false,
    },
  },
};