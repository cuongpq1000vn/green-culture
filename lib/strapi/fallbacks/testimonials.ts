/**
 * Static Fallback Data - Testimonials & Partners
 * 
 * Extracted from current testimonials and global partners components
 * Used when Strapi is unavailable or during development
 */

import type { Testimonial, GlobalPartner } from '../types';

// Testimonials Data
export const fallbackTestimonials: Omit<Testimonial, 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    id: 1,
    quote: 'EGO has been our trusted rice supplier for over 5 years. Their consistent quality and reliable delivery have been crucial for our distribution business.',
    authorName: 'Ahmed Al-Rashid',
    company: 'Gulf Food Distributors',
    country: 'UAE',
    avatar: {
      id: 30,
      url: '/images/avatar-ahmed.jpg',
      name: 'avatar-ahmed.jpg',
      alternativeText: 'Ahmed Al-Rashid portrait',
      width: 200,
      height: 200,
      formats: {},
    },
    featured: true,
    order: 1,
  },
  {
    id: 2,
    quote: 'The quality control standards at EGO are impressive. Every shipment meets our strict specifications, making them our preferred partner for premium rice imports.',
    authorName: 'Chen Wei Ming',
    company: 'Asia Pacific Trading Co.',
    country: 'China',
    avatar: {
      id: 31,
      url: '/images/avatar-chen.jpg',
      name: 'avatar-chen.jpg',
      alternativeText: 'Chen Wei Ming portrait',
      width: 200,
      height: 200,
      formats: {},
    },
    featured: true,
    order: 2,
  },
  {
    id: 3,
    quote: 'Working with EGO has streamlined our supply chain significantly. Their professional approach and transparent communication make partnership easy.',
    authorName: 'Maria Santos',
    company: 'Pacific Grain Imports',
    country: 'Philippines',
    avatar: {
      id: 32,
      url: '/images/avatar-maria.jpg',
      name: 'avatar-maria.jpg',
      alternativeText: 'Maria Santos portrait',
      width: 200,
      height: 200,
      formats: {},
    },
    featured: true,
    order: 3,
  },
];

// Global Partners Data
export const fallbackGlobalPartners: Omit<GlobalPartner, 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    id: 1,
    country: 'United Arab Emirates',
    flagEmoji: '🇦🇪',
    partnerCount: 12,
    yearsCooperation: '6+',
    order: 1,
  },
  {
    id: 2,
    country: 'Philippines',
    flagEmoji: '🇵🇭',
    partnerCount: 7,
    yearsCooperation: '4+',
    order: 2,
  },
  {
    id: 3,
    country: 'China',
    flagEmoji: '🇨🇳',
    partnerCount: 15,
    yearsCooperation: '8+',
    order: 3,
  },
  {
    id: 4,
    country: 'Malaysia',
    flagEmoji: '🇲🇾',
    partnerCount: 9,
    yearsCooperation: '5+',
    order: 4,
  },
  {
    id: 5,
    country: 'Indonesia',
    flagEmoji: '🇮🇩',
    partnerCount: 11,
    yearsCooperation: '7+',
    order: 5,
  },
  {
    id: 6,
    country: 'Singapore',
    flagEmoji: '🇸🇬',
    partnerCount: 6,
    yearsCooperation: '3+',
    order: 6,
  },
];