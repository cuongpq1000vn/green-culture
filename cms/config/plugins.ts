import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const cloudinaryName = env('CLOUDINARY_NAME');
  const cloudinaryKey = env('CLOUDINARY_KEY');
  const cloudinarySecret = env('CLOUDINARY_SECRET');
  
  // Use Cloudinary in production when credentials are provided
  const useCloudinary = cloudinaryName && cloudinaryKey && cloudinarySecret;
  
  return {
    // Configure upload plugin - Cloudinary in production, local in development
    upload: useCloudinary
      ? {
          config: {
            provider: '@strapi/provider-upload-cloudinary',
            providerOptions: {
              cloud_name: cloudinaryName,
              api_key: cloudinaryKey,
              api_secret: cloudinarySecret,
            },
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
            breakpoints: {
              xlarge: 1920,
              large: 1200,
              medium: 750,
              small: 500,
              xsmall: 64,
            },
          },
        }
      : {
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
  };
};

export default config;
