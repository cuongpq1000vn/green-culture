/**
 * Static Fallback Data - Blog Posts
 * 
 * Sample blog post data for the news section
 * Used when Strapi is unavailable or during development
 */

import type { BlogPost } from '../types';

// Blog Posts Data
export const fallbackBlogPosts: Omit<BlogPost, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 1,
    title: 'Sustainable Rice Farming: Our Commitment to Environmental Responsibility',
    slug: 'sustainable-rice-farming-environmental-responsibility',
    excerpt: 'Learn about our sustainable farming practices that benefit both the environment and local communities while maintaining high-quality rice production.',
    content: `
# Sustainable Rice Farming: Our Commitment to Environmental Responsibility

At EGO Agricultural Export Company, we believe that sustainable farming practices are essential for the long-term success of our business and the well-being of our planet. Our commitment to environmental responsibility drives every aspect of our rice production process.

## Water Conservation Techniques

Rice farming traditionally requires significant water resources, but we've implemented advanced water management systems that reduce consumption by 30% while maintaining optimal growing conditions. Our precision irrigation systems and water recycling programs ensure minimal environmental impact.

## Organic Farming Methods

We work closely with our partner farmers to transition to organic farming methods, eliminating harmful pesticides and synthetic fertilizers. This approach not only produces healthier rice but also protects local ecosystems and biodiversity.

## Community Impact

Our sustainable practices extend beyond environmental benefits. By supporting local farmers with fair trade agreements and providing training in sustainable methods, we're building stronger, more resilient farming communities across Vietnam.

The future of agriculture depends on our actions today. Through sustainable practices, we're ensuring that Vietnamese rice continues to feed the world for generations to come.
    `,
    coverImage: {
      id: 50,
      url: '/images/blog-sustainable-farming.jpg',
      name: 'sustainable-farming.jpg',
      alternativeText: 'Sustainable rice farming practices in Vietnam',
      width: 800,
      height: 400,
      formats: {},
    },
    category: 'Sustainability',
    publishedAt: '2024-03-15T08:00:00.000Z',
    author: 'EGO Agriculture Team',
    featured: true,
    seo: {
      id: 10,
      metaTitle: 'Sustainable Rice Farming Practices - EGO Agricultural Export',
      metaDescription: 'Discover EGO\'s commitment to sustainable rice farming practices that protect the environment while producing high-quality agricultural products.',
      keywords: 'sustainable farming, rice production, environmental responsibility, organic farming, Vietnam agriculture',
      metaImage: {
        id: 51,
        url: '/images/blog-sustainable-farming-og.jpg',
        name: 'sustainable-farming-og.jpg',
        alternativeText: 'Sustainable rice farming practices',
        width: 1200,
        height: 630,
        formats: {},
      },
    },
  },
  {
    id: 2,
    title: 'Quality Control in Agricultural Export: Ensuring International Standards',
    slug: 'quality-control-agricultural-export-international-standards',
    excerpt: 'Explore our comprehensive quality control processes that ensure every product meets strict international standards before reaching global markets.',
    content: `
# Quality Control in Agricultural Export: Ensuring International Standards

Quality control is at the heart of everything we do at EGO Agricultural Export Company. Our rigorous testing and quality assurance processes ensure that every grain of rice, every coffee bean, and every piece of fruit meets the highest international standards.

## Multi-Stage Quality Testing

Our quality control process begins at the farm level and continues through every stage of processing. We conduct moisture content analysis, grain integrity testing, and contamination screening to ensure only the best products reach our customers.

## International Certifications

We maintain multiple international certifications including ISO 22000, HACCP, and GlobalGAP. These certifications demonstrate our commitment to food safety and quality management throughout our operations.

## Technology and Innovation

We've invested in state-of-the-art laboratory equipment and color sorting machines that can detect even the smallest imperfections. This technology allows us to maintain consistent quality while increasing efficiency.

## Continuous Improvement

Our quality control team regularly reviews and updates our processes based on the latest industry standards and customer feedback. This commitment to continuous improvement helps us stay ahead in the competitive global market.
    `,
    coverImage: {
      id: 52,
      url: '/images/blog-quality-control.jpg',
      name: 'quality-control.jpg',
      alternativeText: 'Quality control laboratory testing agricultural products',
      width: 800,
      height: 400,
      formats: {},
    },
    category: 'Technology',
    publishedAt: '2024-03-10T10:00:00.000Z',
    author: 'Quality Assurance Team',
    featured: true,
    seo: {
      id: 11,
      metaTitle: 'Agricultural Export Quality Control - International Standards',
      metaDescription: 'Learn about EGO\'s comprehensive quality control processes that ensure agricultural products meet strict international standards.',
      keywords: 'quality control, agricultural export, international standards, food safety, ISO certification',
    },
  },
  {
    id: 3,
    title: 'Expanding Horizons: New Markets and Product Lines for 2024',
    slug: 'expanding-horizons-new-markets-product-lines-2024',
    excerpt: 'Discover EGO\'s expansion plans for 2024, including new product lines and entry into emerging markets across Southeast Asia and the Middle East.',
    content: `
# Expanding Horizons: New Markets and Product Lines for 2024

As we look ahead to 2024, EGO Agricultural Export Company is excited to share our ambitious expansion plans. Building on our 25+ years of success in agricultural export, we're ready to explore new markets and introduce innovative product lines.

## New Market Opportunities

We're expanding our presence in the Middle East and North Africa regions, where demand for high-quality rice and coffee continues to grow. Our established relationships and proven quality standards position us well for success in these markets.

## Product Line Diversification

In addition to our core rice and coffee offerings, we're introducing processed mango products and cassava-based items to meet evolving consumer preferences for healthy, sustainable food options.

## Partnership Development

Our growth strategy focuses on building long-term partnerships with local distributors and retailers in target markets. These relationships ensure better market penetration and customer service.

## Investment in Infrastructure

To support our expansion, we're investing in additional processing capacity and logistics infrastructure. This investment will allow us to maintain our quality standards while scaling operations.
    `,
    coverImage: {
      id: 53,
      url: '/images/blog-expansion.jpg',
      name: 'expansion.jpg',
      alternativeText: 'Global expansion and new market opportunities',
      width: 800,
      height: 400,
      formats: {},
    },
    category: 'Company News',
    publishedAt: '2024-03-05T14:00:00.000Z',
    author: 'Business Development Team',
    featured: false,
    seo: {
      id: 12,
      metaTitle: 'EGO Agricultural Export Expansion Plans 2024',
      metaDescription: 'Learn about EGO\'s exciting expansion plans for 2024, including new markets and product lines in agricultural export.',
      keywords: 'business expansion, new markets, agricultural products, Southeast Asia, Middle East export',
    },
  },
];