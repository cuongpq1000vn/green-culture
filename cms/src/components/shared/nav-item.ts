export default {
  collectionName: 'components_shared_nav_items',
  info: {
    displayName: 'Nav Item',
    icon: 'bulletList',
    description: 'Navigation item with optional dropdown',
  },
  options: {},
  attributes: {
    label: {
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
    icon: {
      type: 'string',
      required: false,
    },
    children: {
      type: 'component',
      repeatable: true,
      component: 'shared.link',
    },
    order: {
      type: 'integer',
      default: 0,
    },
  },
};