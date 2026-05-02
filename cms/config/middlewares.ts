import type { Core } from '@strapi/strapi';

// Build CORS origins list
const getCorsOrigins = () => {
  const origins = [
    'http://localhost:3000', // Next.js dev server
    'https://localhost:3000', // Next.js dev server (HTTPS)
  ];
  
  // Add production frontend URL if configured
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl && !origins.includes(frontendUrl)) {
    origins.push(frontendUrl);
  }
  
  // Support multiple frontend URLs (comma-separated)
  const additionalUrls = process.env.ADDITIONAL_CORS_ORIGINS;
  if (additionalUrls) {
    additionalUrls.split(',').forEach((url) => {
      const trimmed = url.trim();
      if (trimmed && !origins.includes(trimmed)) {
        origins.push(trimmed);
      }
    });
  }
  
  return origins;
};

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com', // Cloudinary images
            'market-assets.strapi.io', // Strapi marketplace
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: getCorsOrigins(),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
