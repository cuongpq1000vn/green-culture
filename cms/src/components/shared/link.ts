export default {
  collectionName: 'components_shared_links',
  info: {
    displayName: 'Link',
    icon: 'link',
    description: 'Reusable link component',
  },
  options: {},
  attributes: {
    label: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
    isExternal: {
      type: 'boolean',
      default: false,
    },
    target: {
      type: 'enumeration',
      enum: ['_self', '_blank', '_parent', '_top'],
      default: '_self',
    },
    rel: {
      type: 'string',
      required: false,
    },
    ariaLabel: {
      type: 'string',
      required: false,
    },
  },
};