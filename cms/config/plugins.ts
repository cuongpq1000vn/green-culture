import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  // Configure upload plugin with custom breakpoints
  upload: {
    config: {
      breakpoints: {
        xlarge: 1920,
        large: 1200,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
  // Configure i18n plugin
  i18n: {
    enabled: true,
    config: {
      default: 'en',
      locales: ['en'],
    },
  },
});

export default config;
