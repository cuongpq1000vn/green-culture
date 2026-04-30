/**
 * Static Fallback Data - Products
 * 
 * Extracted from current components/landing/products.tsx
 * Used when Strapi is unavailable or during development
 */

import type { Product, ProductCategory, Certification } from '../types';

// Product Categories
export const fallbackProductCategories: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    name: 'Grains',
    slug: 'grains',
    description: 'Premium rice varieties and grain products',
    image: {
      id: 1,
      url: '/images/rice-varieties.jpg',
      name: 'grains-category.jpg',
      alternativeText: 'Various grain products',
      width: 800,
      height: 600,
      formats: {},
    },
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    description: 'Premium coffee beans and beverage products',
    image: {
      id: 2,
      url: '/images/coffee-beans.jpg',
      name: 'beverages-category.jpg',
      alternativeText: 'Coffee beans',
      width: 800,
      height: 600,
      formats: {},
    },
  },
  {
    name: 'Fruits',
    slug: 'fruits',
    description: 'Fresh tropical fruits',
    image: {
      id: 3,
      url: '/images/tropical-mango.jpg',
      name: 'fruits-category.jpg',
      alternativeText: 'Fresh tropical mango',
      width: 800,
      height: 600,
      formats: {},
    },
  },
  {
    name: 'Roots & Tubers',
    slug: 'roots-tubers',
    description: 'Cassava and root vegetable products',
    image: {
      id: 4,
      url: '/images/cassava-roots.jpg',
      name: 'roots-category.jpg',
      alternativeText: 'Fresh cassava roots',
      width: 800,
      height: 600,
      formats: {},
    },
  },
];

// Certifications
export const fallbackCertifications: Omit<Certification, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    name: 'Organic Certified',
    slug: 'organic-certified',
    description: 'Certified organic farming practices',
    logo: {
      id: 5,
      url: '/images/cert-organic.svg',
      name: 'organic-cert.svg',
      alternativeText: 'Organic certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'Fair Trade',
    slug: 'fair-trade',
    description: 'Fair trade certification',
    logo: {
      id: 6,
      url: '/images/cert-fairtrade.svg',
      name: 'fairtrade-cert.svg',
      alternativeText: 'Fair Trade certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'ISO 22000',
    slug: 'iso-22000',
    description: 'Food safety management certification',
    logo: {
      id: 7,
      url: '/images/cert-iso22000.svg',
      name: 'iso22000-cert.svg',
      alternativeText: 'ISO 22000 certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'GlobalGAP',
    slug: 'globalgap',
    description: 'Good Agricultural Practices certification',
    logo: {
      id: 8,
      url: '/images/cert-globalgap.svg',
      name: 'globalgap-cert.svg',
      alternativeText: 'GlobalGAP certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'HACCP',
    slug: 'haccp',
    description: 'Hazard Analysis Critical Control Points',
    logo: {
      id: 9,
      url: '/images/cert-haccp.svg',
      name: 'haccp-cert.svg',
      alternativeText: 'HACCP certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'Rainforest Alliance',
    slug: 'rainforest-alliance',
    description: 'Sustainable farming practices certification',
    logo: {
      id: 10,
      url: '/images/cert-rainforest.svg',
      name: 'rainforest-cert.svg',
      alternativeText: 'Rainforest Alliance certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'UTZ Certified',
    slug: 'utz-certified',
    description: 'Sustainable coffee certification',
    logo: {
      id: 11,
      url: '/images/cert-utz.svg',
      name: 'utz-cert.svg',
      alternativeText: 'UTZ certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
  {
    name: 'BRC Food',
    slug: 'brc-food',
    description: 'British Retail Consortium food safety standard',
    logo: {
      id: 12,
      url: '/images/cert-brc.svg',
      name: 'brc-cert.svg',
      alternativeText: 'BRC Food certification logo',
      width: 100,
      height: 100,
      formats: {},
    },
  },
];

// Products
export const fallbackProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    title: 'Premium Rice',
    slug: 'premium-rice',
    description: 'High-quality Vietnamese rice varieties including fragrant jasmine and premium long-grain rice, carefully processed to maintain nutritional value and authentic taste.',
    image: {
      id: 13,
      url: '/images/rice-varieties.jpg',
      name: 'rice-varieties.jpg',
      alternativeText: 'Premium Vietnamese rice varieties',
      width: 800,
      height: 600,
      formats: {},
    },
    category: fallbackProductCategories[0] as ProductCategory,
    varieties: ['Jasmine Rice', 'Long-grain Rice', 'Short-grain Rice', 'Brown Rice'],
    certifications: [
      fallbackCertifications[0],
      fallbackCertifications[1],
      fallbackCertifications[2],
    ] as Certification[],
    packaging: '5kg, 10kg, 25kg, 50kg bags',
    featured: true,
    order: 1,
  },
  {
    title: 'Arabica Coffee',
    slug: 'arabica-coffee',
    description: 'Premium Vietnamese coffee beans sourced from highland regions, offering rich aroma and exceptional flavor profile for coffee enthusiasts worldwide.',
    image: {
      id: 14,
      url: '/images/coffee-beans.jpg',
      name: 'coffee-beans.jpg',
      alternativeText: 'Premium Arabica coffee beans',
      width: 800,
      height: 600,
      formats: {},
    },
    category: fallbackProductCategories[1] as ProductCategory,
    varieties: ['Robusta', 'Arabica', 'Specialty Blend', 'Instant Coffee'],
    certifications: [
      fallbackCertifications[5],
      fallbackCertifications[6],
      fallbackCertifications[0],
    ] as Certification[],
    packaging: '250g, 500g, 1kg bags',
    featured: true,
    order: 2,
  },
  {
    title: 'Tropical Mango',
    slug: 'tropical-mango',
    description: 'Fresh tropical mangoes cultivated in optimal growing conditions, delivering sweet, juicy fruit that meets international quality standards.',
    image: {
      id: 15,
      url: '/images/tropical-mango.jpg',
      name: 'tropical-mango.jpg',
      alternativeText: 'Fresh tropical mangoes',
      width: 800,
      height: 600,
      formats: {},
    },
    category: fallbackProductCategories[2] as ProductCategory,
    varieties: ['Kent Mango', 'Tommy Atkins', 'Haden', 'Keitt'],
    certifications: [
      fallbackCertifications[3],
      fallbackCertifications[0],
      fallbackCertifications[4],
    ] as Certification[],
    packaging: '4kg, 6kg, 10kg cartons',
    featured: true,
    order: 3,
  },
  {
    title: 'Cassava Products',
    slug: 'cassava-products',
    description: 'Versatile cassava products including fresh roots, dried chips, and starch, processed using modern techniques to ensure quality and shelf life.',
    image: {
      id: 16,
      url: '/images/cassava-roots.jpg',
      name: 'cassava-roots.jpg',
      alternativeText: 'Fresh cassava roots and products',
      width: 800,
      height: 600,
      formats: {},
    },
    category: fallbackProductCategories[3] as ProductCategory,
    varieties: ['Fresh Cassava', 'Cassava Chips', 'Cassava Starch', 'Tapioca'],
    certifications: [
      fallbackCertifications[4],
      fallbackCertifications[2],
      fallbackCertifications[7],
    ] as Certification[],
    packaging: '20kg, 25kg, 50kg bags',
    featured: true,
    order: 4,
  },
];