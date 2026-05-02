export default {
  collectionName: 'components_shared_stat_items',
  info: {
    displayName: 'Stat Item',
    icon: 'chartCircle',
    description: 'Statistical item with number and label',
  },
  options: {},
  attributes: {
    value: {
      type: 'string',
      required: true,
    },
    label: {
      type: 'string',
      required: true,
    },
    suffix: {
      type: 'string',
      required: false,
    },
    prefix: {
      type: 'string',
      required: false,
    },
    icon: {
      type: 'string',
      required: false,
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