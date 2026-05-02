#!/usr/bin/env tsx

/**
 * Complete Migration Script for Strapi CMS
 * Handles image upload and content seeding in a single run
 * Supports idempotent operation - safe to run multiple times
 * 
 * Usage: npm run migrate:all
 */

import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'

// Configuration
const STRAPI_BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const IMAGES_DIR = path.join(process.cwd(), '..', 'public', 'images')

interface ImageMapping {
  filename: string
  mediaId: number
  url: string
  alternativeText: string
}

// ============================================================================
// Utility Functions
// ============================================================================

async function fetchExisting(contentType: string): Promise<any[]> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/${contentType}?pagination[pageSize]=100`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  })
  if (!response.ok) return []
  const data = await response.json() as { data?: any[] }
  return data.data || []
}

async function createEntry(contentType: string, data: any): Promise<any> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/${contentType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({ data })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`${response.status} ${errorText}`)
  }

  return response.json()
}

async function createSingleType(contentType: string, data: any): Promise<any> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/${contentType}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({ data })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`${response.status} ${errorText}`)
  }

  return response.json()
}

function getMediaId(imageMappings: Record<string, ImageMapping>, filename: string): number | null {
  const mapping = imageMappings[filename]
  return mapping ? mapping.mediaId : null
}

// ============================================================================
// Image Migration
// ============================================================================

function generateAltText(filename: string): string {
  const name = path.parse(filename).name
  const altTextMap: Record<string, string> = {
    'hero-bg': 'EGO agricultural export company hero background with fields and sky',
    'logo': 'EGO agricultural export company logo',
    'about-rice-field': 'Vast rice field landscape with green paddy under clear blue sky',
    'rice-closeup': 'Close-up view of high-quality rice grains showing texture and color',
    'rice-varieties': 'Display of various premium rice varieties from Vietnam',
    'coffee-beans': 'Premium Vietnamese coffee beans showing rich color and quality',
    'tropical-mango': 'Fresh tropical mango fruit showcasing natural sweetness and quality',
    'cassava-roots': 'Fresh cassava roots displaying natural quality and processing readiness',
    'facility-1': 'Modern agricultural processing facility with quality control equipment',
    'facility-2': 'State-of-the-art packaging and export preparation facility',
    'process-bg': 'Agricultural processing workflow background showing quality standards',
    'cta-bg': 'Call-to-action background with agricultural export theme',
    'globe': 'Global trade network illustration showing international partnerships',
    'blog-1': 'Agricultural export industry insights and market trends',
    'blog-2': 'Vietnam agricultural products quality and certification standards',
    'blog-3': 'International trade partnerships and export opportunities'
  }
  return altTextMap[name] || `Agricultural export related image: ${name.replace(/-/g, ' ')}`
}

async function fetchExistingMedia(): Promise<Map<string, number>> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/upload/files?pagination[pageSize]=100`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  })
  if (!response.ok) return new Map()
  const files = await response.json() as any[]
  const map = new Map<string, number>()
  for (const file of files) {
    map.set(file.name, file.id)
  }
  return map
}

async function uploadImage(filePath: string, filename: string): Promise<{ id: number; url: string }> {
  const FormDataNode = (await import('form-data')).default
  const formData = new FormDataNode()
  
  const fileBuffer = await fs.readFile(filePath)
  formData.append('files', fileBuffer, filename)
  
  const alternativeText = generateAltText(filename)
  formData.append('fileInfo', JSON.stringify({
    name: filename,
    alternativeText,
    caption: null
  }))

  const response = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      ...formData.getHeaders()
    },
    body: formData as any
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Upload failed: ${response.status} ${errorText}`)
  }

  const result = await response.json() as any[]
  return { id: result[0].id, url: result[0].url }
}

async function migrateImages(): Promise<Record<string, ImageMapping>> {
  console.log('\n📷 Phase 1: Image Migration')
  console.log('=' .repeat(50))

  const mappings: Record<string, ImageMapping> = {}
  
  try {
    await fs.access(IMAGES_DIR)
  } catch {
    console.log('⚠️  Images directory not found, skipping image migration')
    return mappings
  }

  const files = await fs.readdir(IMAGES_DIR)
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
  console.log(`📁 Found ${imageFiles.length} image files`)

  // Check existing media
  const existingMedia = await fetchExistingMedia()
  console.log(`📂 Found ${existingMedia.size} existing media files in Strapi`)

  let uploaded = 0, skipped = 0, failed = 0

  for (const filename of imageFiles) {
    const existingId = existingMedia.get(filename)
    if (existingId) {
      mappings[filename] = {
        filename,
        mediaId: existingId,
        url: `/uploads/${filename}`,
        alternativeText: generateAltText(filename)
      }
      skipped++
      continue
    }

    try {
      const filePath = path.join(IMAGES_DIR, filename)
      const result = await uploadImage(filePath, filename)
      mappings[filename] = {
        filename,
        mediaId: result.id,
        url: result.url,
        alternativeText: generateAltText(filename)
      }
      console.log(`✅ Uploaded: ${filename}`)
      uploaded++
    } catch (error: any) {
      console.error(`❌ Failed: ${filename} - ${error.message}`)
      failed++
    }
  }

  // Save mappings
  const mappingFile = path.join(process.cwd(), 'scripts', 'image-mapping.json')
  await fs.writeFile(mappingFile, JSON.stringify(Object.values(mappings), null, 2))

  console.log(`\n📊 Image Summary: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`)
  return mappings
}

// ============================================================================
// Content Migration Functions
// ============================================================================

async function seedCertifications() {
  console.log('\n📋 Seeding certifications...')
  const existing = await fetchExisting('certifications')
  const existingNames = new Set(existing.map((c: any) => c.name))

  const certifications = [
    { name: 'ISO 22000', slug: 'iso-22000', description: 'Food Safety Management System certification' },
    { name: 'HACCP', slug: 'haccp', description: 'Hazard Analysis and Critical Control Points' },
    { name: 'GlobalGAP', slug: 'globalgap', description: 'Global standard for good agricultural practices' },
    { name: 'BRC Food', slug: 'brc-food', description: 'British Retail Consortium food safety standard' },
    { name: 'Organic JAS', slug: 'organic-jas', description: 'Japanese Organic certification' },
    { name: 'USDA Organic', slug: 'usda-organic', description: 'USDA organic certification' },
    { name: 'EU Organic', slug: 'eu-organic', description: 'European Union organic certification' },
    { name: 'Rainforest Alliance', slug: 'rainforest-alliance', description: 'Sustainable agriculture certification' }
  ]

  let created = 0, skipped = 0
  for (const cert of certifications) {
    if (existingNames.has(cert.name)) {
      skipped++
      continue
    }
    try {
      await createEntry('certifications', { ...cert, publishedAt: new Date().toISOString() })
      console.log(`✅ ${cert.name}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${cert.name}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedProductCategories(): Promise<Record<string, number>> {
  console.log('\n📦 Seeding product categories...')
  const existing = await fetchExisting('product-categories')
  const existingNames = new Set(existing.map((c: any) => c.name))

  const categories = [
    { name: 'Grains', slug: 'grains', description: 'Rice, wheat, and other grain products' },
    { name: 'Beverages', slug: 'beverages', description: 'Coffee, tea, and beverage products' },
    { name: 'Fruits', slug: 'fruits', description: 'Fresh and processed fruit products' },
    { name: 'Roots & Tubers', slug: 'roots-tubers', description: 'Cassava, sweet potato, and root vegetables' }
  ]

  const categoryMap: Record<string, number> = {}
  existing.forEach((c: any) => { categoryMap[c.name] = c.id })

  let created = 0, skipped = 0
  for (const category of categories) {
    if (existingNames.has(category.name)) {
      skipped++
      continue
    }
    try {
      const result = await createEntry('product-categories', { ...category, publishedAt: new Date().toISOString() })
      categoryMap[category.name] = result.data.id
      console.log(`✅ ${category.name}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${category.name}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
  return categoryMap
}

async function seedProducts(imageMappings: Record<string, ImageMapping>, categoryMap: Record<string, number>) {
  console.log('\n🌾 Seeding products...')
  const existing = await fetchExisting('products')
  const existingSlugs = new Set(existing.map((p: any) => p.slug))

  const products = [
    {
      name: 'Premium Rice Varieties',
      slug: 'premium-rice-varieties',
      description: 'High-quality rice varieties including jasmine, basmati, and long grain rice.',
      shortDescription: 'Premium export-grade rice varieties from Vietnam',
      image: getMediaId(imageMappings, 'rice-varieties.jpg'),
      category: categoryMap['Grains'],
      origin: 'Vietnam',
      featured: true,
      price: 850.00,
      currency: 'USD',
      unit: 'ton',
      minOrderQuantity: 20
    },
    {
      name: 'Vietnamese Coffee Beans',
      slug: 'vietnamese-coffee-beans',
      description: 'Premium Arabica and Robusta coffee beans from Vietnam\'s highland regions.',
      shortDescription: 'Premium highland coffee beans',
      image: getMediaId(imageMappings, 'coffee-beans.jpg'),
      category: categoryMap['Beverages'],
      origin: 'Vietnam',
      featured: true,
      price: 2400.00,
      currency: 'USD',
      unit: 'ton',
      minOrderQuantity: 5
    },
    {
      name: 'Tropical Mango Products',
      slug: 'tropical-mango-products',
      description: 'Fresh tropical mangoes and processed mango products.',
      shortDescription: 'Fresh and processed mango products',
      image: getMediaId(imageMappings, 'tropical-mango.jpg'),
      category: categoryMap['Fruits'],
      origin: 'Vietnam',
      featured: false,
      price: 1200.00,
      currency: 'USD',
      unit: 'ton',
      minOrderQuantity: 10
    },
    {
      name: 'Cassava Products',
      slug: 'cassava-products',
      description: 'Versatile cassava products including fresh roots, dried chips, and starch.',
      shortDescription: 'Fresh and processed cassava products',
      image: getMediaId(imageMappings, 'cassava-roots.jpg'),
      category: categoryMap['Roots & Tubers'],
      origin: 'Vietnam',
      featured: false,
      price: 450.00,
      currency: 'USD',
      unit: 'ton',
      minOrderQuantity: 25
    }
  ]

  let created = 0, skipped = 0
  for (const product of products) {
    if (existingSlugs.has(product.slug)) {
      skipped++
      continue
    }
    try {
      await createEntry('products', { ...product, publishedAt: new Date().toISOString() })
      console.log(`✅ ${product.name}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${product.name}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedStats() {
  console.log('\n📊 Seeding stats...')
  const existing = await fetchExisting('stats')
  const existingKeys = new Set(existing.map((s: any) => `${s.label}-${s.section}`))

  const stats = [
    { label: 'Years of Experience', value: '15', suffix: '+', section: 'home', order: 1 },
    { label: 'Global Partners', value: '50', suffix: '+', section: 'home', order: 2 },
    { label: 'Tons Exported Annually', value: '10000', suffix: '+', section: 'home', order: 3 },
    { label: 'Countries Served', value: '25', suffix: '+', section: 'home', order: 4 },
    { label: 'Years of Experience', value: '15', suffix: '+', section: 'about', order: 1 },
    { label: 'Global Partners', value: '50', suffix: '+', section: 'about', order: 2 },
    { label: 'Tons Exported Annually', value: '10000', suffix: '+', section: 'about', order: 3 },
    { label: 'Countries Served', value: '25', suffix: '+', section: 'about', order: 4 }
  ]

  let created = 0, skipped = 0
  for (const stat of stats) {
    if (existingKeys.has(`${stat.label}-${stat.section}`)) {
      skipped++
      continue
    }
    try {
      await createEntry('stats', { ...stat, publishedAt: new Date().toISOString() })
      console.log(`✅ ${stat.label} (${stat.section})`)
      created++
    } catch (error: any) {
      console.error(`❌ ${stat.label}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedTestimonials() {
  console.log('\n💬 Seeding testimonials...')
  const existing = await fetchExisting('testimonials')
  const existingAuthors = new Set(existing.map((t: any) => t.author))

  const testimonials = [
    {
      quote: 'EGO has been our trusted partner for agricultural exports. Their commitment to quality is unmatched.',
      author: 'Ahmed Al-Rashid',
      position: 'Procurement Manager',
      company: 'Al-Rashid Trading Co.',
      country: 'UAE',
      rating: 5,
      featured: true
    },
    {
      quote: 'The quality of rice we receive from EGO consistently exceeds our expectations.',
      author: 'Chen Wei Ming',
      position: 'Supply Chain Director',
      company: 'Asia Pacific Foods',
      country: 'Singapore',
      rating: 5,
      featured: true
    },
    {
      quote: 'Professional service and excellent product quality. Highly recommended.',
      author: 'Maria Santos',
      position: 'Head of Purchasing',
      company: 'Santos Import/Export',
      country: 'Brazil',
      rating: 5,
      featured: false
    }
  ]

  let created = 0, skipped = 0
  for (const testimonial of testimonials) {
    if (existingAuthors.has(testimonial.author)) {
      skipped++
      continue
    }
    try {
      await createEntry('testimonials', { ...testimonial, publishedAt: new Date().toISOString() })
      console.log(`✅ ${testimonial.author}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${testimonial.author}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedGlobalPartners() {
  console.log('\n🌍 Seeding global partners...')
  const existing = await fetchExisting('global-partners')
  const existingCountries = new Set(existing.map((p: any) => p.country))

  const partners = [
    { country: 'Japan', countryCode: 'JP', region: 'Asia', description: 'Key market for premium rice' },
    { country: 'United States', countryCode: 'US', region: 'North America', description: 'Growing market for organic products' },
    { country: 'Germany', countryCode: 'DE', region: 'Europe', description: 'Major European partner' },
    { country: 'China', countryCode: 'CN', region: 'Asia', description: 'Large volume market' },
    { country: 'South Korea', countryCode: 'KR', region: 'Asia', description: 'Premium quality market' },
    { country: 'Australia', countryCode: 'AU', region: 'Oceania', description: 'Strategic Pacific partner' }
  ]

  let created = 0, skipped = 0
  for (const partner of partners) {
    if (existingCountries.has(partner.country)) {
      skipped++
      continue
    }
    try {
      await createEntry('global-partners', { ...partner, publishedAt: new Date().toISOString() })
      console.log(`✅ ${partner.country}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${partner.country}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedFacilities(imageMappings: Record<string, ImageMapping>) {
  console.log('\n🏭 Seeding facilities...')
  const existing = await fetchExisting('facilities')
  const existingSlugs = new Set(existing.map((f: any) => f.slug))

  const facilities = [
    {
      name: 'Primary Processing Facility',
      slug: 'primary-processing-facility',
      description: 'State-of-the-art processing facility with modern machinery.',
      type: 'processing',
      image: getMediaId(imageMappings, 'facility-1.jpg'),
      capacity: '1000 tons/month',
      featured: true,
      order: 1
    },
    {
      name: 'Quality Control Laboratory',
      slug: 'quality-control-laboratory',
      description: 'Advanced quality control laboratory ensuring international standards.',
      type: 'processing',
      image: getMediaId(imageMappings, 'facility-2.jpg'),
      capacity: '500 samples/day',
      featured: true,
      order: 2
    },
    {
      name: 'Export Packaging Center',
      slug: 'export-packaging-center',
      description: 'Specialized packaging facility with climate-controlled storage.',
      type: 'packaging',
      image: getMediaId(imageMappings, 'facility-1.jpg'),
      capacity: '2000 tons/month',
      featured: false,
      order: 3
    }
  ]

  let created = 0, skipped = 0
  for (const facility of facilities) {
    if (existingSlugs.has(facility.slug)) {
      skipped++
      continue
    }
    try {
      await createEntry('facilities', { ...facility, publishedAt: new Date().toISOString() })
      console.log(`✅ ${facility.name}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${facility.name}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedProcessSteps() {
  console.log('\n⚙️ Seeding process steps...')
  const existing = await fetchExisting('process-steps')
  const existingSlugs = new Set(existing.map((s: any) => s.slug))

  const steps = [
    { title: 'Sourcing & Procurement', slug: 'sourcing-procurement', description: 'Direct partnerships with local farmers.', stepNumber: 1, icon: 'leaf', order: 1 },
    { title: 'Processing & Quality Control', slug: 'processing-quality-control', description: 'Advanced processing with stringent quality control.', stepNumber: 2, icon: 'settings', order: 2 },
    { title: 'Testing & Certification', slug: 'testing-certification', description: 'Comprehensive testing and third-party certifications.', stepNumber: 3, icon: 'check-circle', order: 3 },
    { title: 'Packaging & Export', slug: 'packaging-export', description: 'Professional packaging and global logistics.', stepNumber: 4, icon: 'truck', order: 4 }
  ]

  let created = 0, skipped = 0
  for (const step of steps) {
    if (existingSlugs.has(step.slug)) {
      skipped++
      continue
    }
    try {
      await createEntry('process-steps', { ...step, publishedAt: new Date().toISOString() })
      console.log(`✅ ${step.title}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${step.title}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedBlogPosts(imageMappings: Record<string, ImageMapping>) {
  console.log('\n📝 Seeding blog posts...')
  const existing = await fetchExisting('blog-posts')
  const existingSlugs = new Set(existing.map((p: any) => p.slug))

  const posts = [
    {
      title: 'Vietnam Agricultural Export Market: Opportunities and Growth',
      slug: 'vietnam-agricultural-export-market',
      excerpt: 'Explore the expanding opportunities in Vietnam\'s agricultural export sector.',
      content: 'Vietnam has emerged as a key player in the global agricultural export market.',
      coverImage: getMediaId(imageMappings, 'blog-1.jpg'),
      author: 'EGO Research Team',
      publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      readingTime: 5,
      featured: true,
      views: 0
    },
    {
      title: 'Quality Certification Standards in Food Export',
      slug: 'quality-certification-standards',
      excerpt: 'Understanding international food safety and quality certification standards.',
      content: 'International food export requires adherence to strict quality and safety standards.',
      coverImage: getMediaId(imageMappings, 'blog-2.jpg'),
      author: 'Quality Assurance Team',
      publishedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      readingTime: 8,
      featured: true,
      views: 0
    },
    {
      title: 'Sustainable Farming Practices',
      slug: 'sustainable-farming-practices',
      excerpt: 'How sustainable farming creates value for farmers, exporters, and buyers.',
      content: 'Sustainability in agriculture is a business imperative.',
      coverImage: getMediaId(imageMappings, 'blog-3.jpg'),
      author: 'Sustainability Team',
      publishedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      readingTime: 6,
      featured: false,
      views: 0
    }
  ]

  let created = 0, skipped = 0
  for (const post of posts) {
    if (existingSlugs.has(post.slug)) {
      skipped++
      continue
    }
    try {
      await createEntry('blog-posts', { ...post, publishedAt: new Date().toISOString() })
      console.log(`✅ ${post.title}`)
      created++
    } catch (error: any) {
      console.error(`❌ ${post.title}: ${error.message}`)
    }
  }
  console.log(`   Created: ${created}, Skipped: ${skipped}`)
}

async function seedSiteSettings(imageMappings: Record<string, ImageMapping>) {
  console.log('\n⚙️ Creating site settings...')
  try {
    await createSingleType('site-setting', {
      siteName: 'EGO Agricultural Export',
      siteDescription: 'Premium Vietnamese agricultural products for global markets',
      logo: getMediaId(imageMappings, 'logo.jpg'),
      contactInfo: {
        email: 'export@ego-agri.com',
        phone: '+84 28 1234 5678',
        address: 'Ho Chi Minh City, Vietnam'
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/company/ego-agri',
        facebook: 'https://facebook.com/ego-agri'
      }
    })
    console.log('✅ Site settings created')
  } catch (error: any) {
    console.error(`❌ Site settings: ${error.message}`)
  }
}

async function seedLandingPage(imageMappings: Record<string, ImageMapping>) {
  console.log('\n🏠 Creating landing page...')
  try {
    await createSingleType('landing-page', {
      hero: {
        title: 'Premium Vietnamese Agricultural Products',
        subtitle: 'Global Export Excellence',
        description: 'Connecting Vietnamese farms to international markets with quality, reliability, and sustainability.',
        backgroundImage: getMediaId(imageMappings, 'hero-bg.jpg'),
        alignment: 'center',
        overlay: true
      },
      aboutSection: {
        title: 'About EGO',
        subtitle: 'Your Trusted Export Partner',
        content: 'With over 15 years of experience, EGO has established itself as a leading agricultural export company.',
        image: getMediaId(imageMappings, 'about-rice-field.jpg')
      },
      ctaSection: {
        title: 'Ready to Partner With Us?',
        description: 'Contact us today to discuss your agricultural import needs.',
        backgroundImage: getMediaId(imageMappings, 'cta-bg.jpg')
      },
      facilitiesSection: { 
        title: 'Our Facilities', 
        subtitle: 'Processing Facilities',
        description: 'Our modern facilities combine traditional expertise with advanced technology, featuring practical infrastructure designed to support export-ready standards.',
        buttonText: 'Learn More',
        buttonHref: '/factory'
      },
      processSection: { title: 'Our Process', subtitle: 'Quality at Every Step' },
      partnersSection: { title: 'Global Partners', subtitle: 'Worldwide Reach' },
      testimonialsSection: { title: 'What Our Partners Say', subtitle: 'Trusted by Industry Leaders' },
      blogSection: { title: 'Latest News', subtitle: 'Industry Insights' },
      publishedAt: new Date().toISOString()
    })
    console.log('✅ Landing page created')
  } catch (error: any) {
    console.error(`❌ Landing page: ${error.message}`)
  }
}

async function seedNavigation() {
  console.log('\n🧭 Creating navigation...')
  try {
    await createSingleType('navigation', {
      mainNavigation: [
        { label: 'Home', url: '/', order: 1 },
        { label: 'About', url: '/about', order: 2 },
        { label: 'Products', url: '/products', order: 3 },
        { label: 'Factory', url: '/factory', order: 4 },
        { label: 'News', url: '/news', order: 5 }
      ],
      footerNavigation: {
        company: ['About Us', 'Our Team', 'Careers'],
        products: ['Rice', 'Coffee', 'Fruits', 'Cassava'],
        support: ['Contact', 'FAQ', 'Shipping']
      },
      footerColumns: [
        { title: 'Company', links: [{ label: 'About', url: '/about' }] },
        { title: 'Products', links: [{ label: 'All Products', url: '/products' }] }
      ]
    })
    console.log('✅ Navigation created')
  } catch (error: any) {
    console.error(`❌ Navigation: ${error.message}`)
  }
}

// ============================================================================
// Main Migration
// ============================================================================

async function main() {
  console.log('🚀 Starting Complete Migration to Strapi')
  console.log('=' .repeat(50))

  if (!STRAPI_API_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN environment variable is required')
    process.exit(1)
  }

  try {
    // Phase 1: Images
    const imageMappings = await migrateImages()

    // Phase 2: Content
    console.log('\n📄 Phase 2: Content Migration')
    console.log('=' .repeat(50))

    await seedCertifications()
    const categoryMap = await seedProductCategories()
    await seedProducts(imageMappings, categoryMap)
    await seedStats()
    await seedTestimonials()
    await seedGlobalPartners()
    await seedFacilities(imageMappings)
    await seedProcessSteps()
    await seedBlogPosts(imageMappings)
    
    // Single types
    await seedSiteSettings(imageMappings)
    await seedLandingPage(imageMappings)
    await seedNavigation()

    console.log('\n' + '=' .repeat(50))
    console.log('🎉 Migration Complete!')
    console.log('=' .repeat(50))
    console.log('\n📋 Next steps:')
    console.log('   1. Verify content in Strapi admin: http://localhost:1337/admin')
    console.log('   2. Test API endpoints: npm run verify:api')
    console.log('   3. Start frontend: cd .. && pnpm dev')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()
