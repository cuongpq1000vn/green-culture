/**
 * Static Fallback Data - Facilities & Process Steps
 * 
 * Extracted from current facilities and process components
 * Used when Strapi is unavailable or during development
 */

import type { Facility, ProcessStep } from '../types';

// Facilities Data
export const fallbackFacilities: Omit<Facility, 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    id: 1,
    title: 'Processing Plant',
    description: 'State-of-the-art processing facility with modern milling equipment and quality control systems for rice processing and packaging.',
    image: {
      id: 40,
      url: '/images/facility-1.jpg',
      name: 'processing-plant.jpg',
      alternativeText: 'Modern rice processing plant interior',
      width: 800,
      height: 600,
      formats: {},
    },
    order: 1,
  },
  {
    id: 2,
    title: 'Storage Facility',
    description: 'Climate-controlled storage warehouses designed to maintain optimal conditions for agricultural products before export.',
    image: {
      id: 41,
      url: '/images/facility-2.jpg',
      name: 'storage-facility.jpg',
      alternativeText: 'Large-scale storage facility',
      width: 800,
      height: 600,
      formats: {},
    },
    order: 2,
  },
  {
    id: 3,
    title: 'Quality Control Laboratory',
    description: 'Advanced laboratory equipped with modern testing equipment to ensure all products meet international quality standards.',
    image: {
      id: 42,
      url: '/images/facility-1.jpg',
      name: 'quality-control-lab.jpg',
      alternativeText: 'Quality control laboratory with testing equipment',
      width: 800,
      height: 600,
      formats: {},
    },
    order: 3,
  },
];

// Process Steps Data
export const fallbackProcessSteps: Omit<ProcessStep, 'createdAt' | 'updatedAt' | 'publishedAt'>[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Paddy Inspection & Cleaning',
    description: 'Raw paddy is carefully inspected for moisture content, grain integrity, and foreign materials. It is then cleaned using modern equipment to remove dust, husks, stones, and impurities before entering the milling stage.',
    order: 1,
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Milling & Polishing',
    description: 'The cleaned paddy undergoes de-husking and whitening processes. Multiple polishing stages ensure consistent grain appearance and remove bran layers to meet export specifications.',
    order: 2,
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Grading & Sorting',
    description: 'Advanced color sorters and grading machines separate rice by size, color, and quality. This ensures only premium grains meeting international standards proceed to packaging.',
    order: 3,
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Packaging & Export',
    description: 'Final products are packaged in food-grade materials with proper labeling for traceability. Containers are loaded following international shipping protocols for global delivery.',
    order: 4,
  },
];