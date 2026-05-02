/**
 * Static Fallback Data - Site Settings & Navigation
 * 
 * Global site configuration and navigation structure
 * Used when Strapi is unavailable or during development
 */

import type { SiteSettings, Navigation } from '../types';

// Site Settings Data
export const fallbackSiteSettings: SiteSettings = {
  id: 1,
  siteName: 'EGO Agricultural Export Company',
  logo: {
    id: 60,
    url: '/images/logo.jpg',
    name: 'ego-logo.jpg',
    alternativeText: 'EGO Agricultural Export Company Logo',
    width: 200,
    height: 80,
    formats: {},
  },
  footerLogo: {
    id: 61,
    url: '/images/logo.jpg',
    name: 'ego-logo-footer.jpg',
    alternativeText: 'EGO Logo Footer',
    width: 150,
    height: 60,
    formats: {},
  },
  companyDescription: 'EGO Agricultural Export Company has been a leading supplier of premium Vietnamese agricultural products for over 25 years. We specialize in rice, coffee, mango, and cassava exports to global markets.',
  copyrightText: '© 2024 EGO Agricultural Export Company. All rights reserved.',
  contactEmail: 'info@ego-agricultural.com',
  contactPhone: '+84 123 456 789',
  socialLinks: [
    {
      id: 1,
      label: 'Facebook',
      href: 'https://facebook.com/ego-agricultural',
      icon: 'facebook',
      openInNewTab: true,
    },
    {
      id: 2,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/ego-agricultural',
      icon: 'linkedin',
      openInNewTab: true,
    },
    {
      id: 3,
      label: 'Twitter',
      href: 'https://twitter.com/ego_agricultural',
      icon: 'twitter',
      openInNewTab: true,
    },
  ],
  defaultSeo: {
    id: 20,
    metaTitle: 'EGO Agricultural Export Company - Premium Vietnamese Agricultural Products',
    metaDescription: 'Leading supplier of premium Vietnamese rice, coffee, mango, and cassava to global markets. 25+ years of experience in agricultural export with international certifications.',
    keywords: 'Vietnamese agricultural export, premium rice, coffee beans, tropical mango, cassava products, agricultural supply chain, Vietnam export company',
    metaImage: {
      id: 62,
      url: '/images/og-default.jpg',
      name: 'default-og-image.jpg',
      alternativeText: 'EGO Agricultural Export Company',
      width: 1200,
      height: 630,
      formats: {},
    },
    canonicalUrl: 'https://ego-agricultural.com',
  },
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  publishedAt: '2023-01-01T00:00:00.000Z'
};

// Navigation Data
export const fallbackNavigation: Navigation = {
  id: 1,
  mainNav: [
    {
      id: 1,
      label: 'Home',
      href: '/',
      children: [],
    },
    {
      id: 2,
      label: 'About Us',
      href: '/about',
      children: [],
    },
    {
      id: 3,
      label: 'Products',
      href: '/products',
      children: [
        {
          id: 10,
          label: 'Rice Products',
          href: '/products#rice',
          icon: 'grain',
          openInNewTab: false,
        },
        {
          id: 11,
          label: 'Coffee',
          href: '/products#coffee',
          icon: 'coffee',
          openInNewTab: false,
        },
        {
          id: 12,
          label: 'Tropical Fruits',
          href: '/products#mango',
          icon: 'fruit',
          openInNewTab: false,
        },
        {
          id: 13,
          label: 'Cassava',
          href: '/products#cassava',
          icon: 'root',
          openInNewTab: false,
        },
      ],
    },
    {
      id: 4,
      label: 'Factory',
      href: '/factory',
      children: [],
    },
    {
      id: 5,
      label: 'News',
      href: '/news',
      children: [],
    },
  ],
  footerCompanyLinks: [
    {
      id: 20,
      label: 'About Us',
      href: '/about',
      openInNewTab: false,
    },
    {
      id: 21,
      label: 'Our Story',
      href: '/about#story',
      openInNewTab: false,
    },
    {
      id: 22,
      label: 'Quality Assurance',
      href: '/about#quality',
      openInNewTab: false,
    },
    {
      id: 23,
      label: 'Certifications',
      href: '/about#certifications',
      openInNewTab: false,
    },
    {
      id: 24,
      label: 'Sustainability',
      href: '/about#sustainability',
      openInNewTab: false,
    },
  ],
  footerProductLinks: [
    {
      id: 30,
      label: 'Premium Rice',
      href: '/products#rice',
      openInNewTab: false,
    },
    {
      id: 31,
      label: 'Arabica Coffee',
      href: '/products#coffee',
      openInNewTab: false,
    },
    {
      id: 32,
      label: 'Tropical Mango',
      href: '/products#mango',
      openInNewTab: false,
    },
    {
      id: 33,
      label: 'Cassava Products',
      href: '/products#cassava',
      openInNewTab: false,
    },
    {
      id: 34,
      label: 'Custom Orders',
      href: '/contact',
      openInNewTab: false,
    },
  ],
  footerContactLinks: [
    {
      id: 40,
      label: 'Contact Us',
      href: '/contact',
      openInNewTab: false,
    },
    {
      id: 41,
      label: 'Export Inquiries',
      href: '/contact#export',
      openInNewTab: false,
    },
    {
      id: 42,
      label: 'Partnership',
      href: '/contact#partnership',
      openInNewTab: false,
    },
    {
      id: 43,
      label: 'Support',
      href: '/contact#support',
      openInNewTab: false,
    },
    {
      id: 44,
      label: 'Careers',
      href: '/careers',
      openInNewTab: false,
    },
  ],
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  publishedAt: '2023-01-01T00:00:00.000Z'
};