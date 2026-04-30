export default {
  collectionName: 'components_shared_feature_items',
  info: {
    displayName: 'Feature Item',
    icon: 'star',
    description: 'Feature highlight with icon and description',
  },
  options: {},
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'text',
      required: true,
    },
    icon: {
      type: 'string',
      required: false,
    },
    image: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images'],
    },
    color: {
      type: 'string',
      required: false,
    },
    order: {
      type: 'integer',
      default: 0,
    },
  },
};