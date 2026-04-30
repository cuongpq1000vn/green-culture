/**
 * Static Fallback Data - Landing Page
 * 
 * Extracted from current landing page components
 * Used when Strapi is unavailable or during development
 */

import type { LandingPage, HeroSection, CTASection, Stat } from '../types';

// Hero Section Data
export const fallbackHeroSection: HeroSection = {
  id: 1,
  badge: 'Agricultural Supply & Export from Vietnam',
  title: 'Supplying High-Quality Agricultural\nProducts to Global Markets',
  subtitle: 'EGO processes and exports rice, expanding into coffee and mango with controlled quality systems and reliable international logistics.',
  backgroundImage: {
    id: 20,
    url: '/images/hero-bg.jpg',
    name: 'hero-background.jpg',
    alternativeText: 'Vietnamese agricultural landscape',
    width: 1920,
    height: 1080,
    formats: {},
  },
  ctaButton: {
    id: 1,
    label: 'Learn More',
    href: '/about',
    variant: 'primary',
    openInNewTab: false,
  },
};

// Stats Data
export const fallbackStats: Omit<Stat, 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    id: 1,
    value: '25+',
    label: 'Years Experience',
    section: 'home',
    order: 1,
  },
  {
    id: 2,
    value: '500+',
    label: 'Global Partners',
    section: 'home',
    order: 2,
  },
  {
    id: 3,
    value: '50K+',
    label: 'Tons Exported',
    section: 'home',
    order: 3,
  },
  {
    id: 4,
    value: '99%',
    label: 'Quality Guaranteed',
    section: 'home',
    order: 4,
  },
  {
    id: 5,
    value: '15+',
    label: 'Countries Served',
    section: 'about',
    order: 1,
  },
  {
    id: 6,
    value: '200+',
    label: 'Quality Checks',
    section: 'about',
    order: 2,
  },
  {
    id: 7,
    value: '24/7',
    label: 'Customer Support',
    section: 'about',
    order: 3,
  },
  {
    id: 8,
    value: '100%',
    label: 'Traceability',
    section: 'about',
    order: 4,
  },
];

// CTA Section Data
export const fallbackCTASection: CTASection = {
  id: 1,
  title: 'Ready to Partner with Us?',
  description: 'Join hundreds of satisfied customers worldwide. Get in touch to discuss your agricultural product needs.',
  backgroundImage: {
    id: 21,
    url: '/images/cta-bg.jpg',
    name: 'cta-background.jpg',
    alternativeText: 'Agricultural export background',
    width: 1920,
    height: 600,
    formats: {},
  },
  ctaButton: {
    id: 2,
    label: 'Contact Us Today',
    href: '/contact',
    variant: 'primary',
    openInNewTab: false,
  },
};

// About Section Data (for landing page)
export const fallbackAboutSection = {
  id: 1,
  badge: 'About EGO',
  title: 'Trusted Agricultural Partner Since 1999',
  description: 'EGO has been a leading agricultural export company from Vietnam, specializing in premium rice, coffee, mango, and cassava products. Our commitment to quality and sustainable farming practices has made us a trusted partner for businesses worldwide.',
  content: 'With over 25 years of experience in agricultural processing and export, we have built strong relationships with farmers across Vietnam and customers around the globe. Our state-of-the-art facilities and rigorous quality control processes ensure that every product meets international standards.',
  image: {
    id: 22,
    url: '/images/about-rice-field.jpg',
    name: 'about-rice-field.jpg',
    alternativeText: 'Vietnamese rice field landscape',
    width: 800,
    height: 600,
    formats: {},
  },
  features: [
    'ISO 22000 certified facilities',
    'Direct partnerships with farmers',
    'Advanced quality control systems',
    'Reliable international logistics',
    'Sustainable farming practices',
    'Traceability from farm to table',
  ],
  ctaButton: {
    id: 3,
    label: 'Learn More About Us',
    href: '/about',
    variant: 'outline',
    openInNewTab: false,
  },
};

// Complete Landing Page Data
export const fallbackLandingPage: Omit<LandingPage, 'createdAt' | 'updatedAt' | 'publishedAt'> = {
  id: 1,
  heroSection: fallbackHeroSection,
  statsBar: fallbackStats.filter(stat => stat.section === 'home'),
  featuredProducts: undefined, // Will be populated from products.ts
  ctaSection: fallbackCTASection,
  seo: {
    id: 1,
    metaTitle: 'EGO - Agricultural Supply & Export from Vietnam',
    metaDescription: 'EGO is your trusted partner in Vietnamese agricultural exports. With 25+ years of experience, we supply premium rice, coffee, mango, and cassava to global markets with guaranteed quality and international certifications.',
    keywords: 'Vietnamese rice export, agricultural products Vietnam, premium coffee beans, tropical mango, cassava products, agricultural export company',
    metaImage: {
      id: 23,
      url: '/images/og-image.jpg',
      name: 'og-image.jpg',
      alternativeText: 'EGO Agricultural Export Company',
      width: 1200,
      height: 630,
      formats: {},
    },
    canonicalUrl: 'https://ego-agricultural.com',
  },
};