#!/usr/bin/env tsx

/**
 * Image Migration Script for Strapi CMS
 * Uploads all images from ../public/images/ to Strapi media library
 * 
 * Usage: npm run migrate:images
 */

import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'

// Configuration
const STRAPI_BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const IMAGES_DIR = path.join(process.cwd(), '..', 'public', 'images')

interface UploadResponse {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

interface ImageMapping {
  filename: string
  mediaId: number
  url: string
  alternativeText: string
}

async function uploadImage(filePath: string, filename: string): Promise<UploadResponse> {
  const formData = new FormData()
  
  // Add the file
  const fileBuffer = await fs.readFile(filePath)
  formData.append('files', fileBuffer, filename)
  
  // Add metadata
  const alternativeText = generateAltText(filename)
  const fileInfo = JSON.stringify({
    name: filename,
    alternativeText,
    caption: null
  })
  formData.append('fileInfo', fileInfo)

  const response = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: formData
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Upload failed for ${filename}: ${response.status} ${errorText}`)
  }

  const result = await response.json() as UploadResponse[]
  return result[0]
}

function generateAltText(filename: string): string {
  // Generate descriptive alt text from filename
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

async function saveImageMapping(mappings: ImageMapping[]): Promise<void> {
  const mappingFile = path.join(process.cwd(), 'scripts', 'image-mapping.json')
  await fs.writeFile(mappingFile, JSON.stringify(mappings, null, 2))
  console.log(`✅ Image mappings saved to ${mappingFile}`)
}

async function main() {
  try {
    console.log('🚀 Starting image migration to Strapi...')
    
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required')
    }

    // Check if images directory exists
    try {
      await fs.access(IMAGES_DIR)
    } catch {
      throw new Error(`Images directory not found: ${IMAGES_DIR}`)
    }

    // Read all image files
    const files = await fs.readdir(IMAGES_DIR)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )

    console.log(`📁 Found ${imageFiles.length} image files to upload`)

    const mappings: ImageMapping[] = []
    let successCount = 0
    let errorCount = 0

    // Upload each image
    for (const filename of imageFiles) {
      try {
        console.log(`📤 Uploading ${filename}...`)
        const filePath = path.join(IMAGES_DIR, filename)
        
        const uploadResult = await uploadImage(filePath, filename)
        
        mappings.push({
          filename,
          mediaId: uploadResult.id,
          url: uploadResult.url,
          alternativeText: uploadResult.alternativeText || ''
        })
        
        successCount++
        console.log(`✅ ${filename} uploaded successfully (ID: ${uploadResult.id})`)
        
        // Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500))
        
      } catch (error) {
        errorCount++
        console.error(`❌ Failed to upload ${filename}:`, error.message)
      }
    }

    // Save the mapping for use in content migration
    if (mappings.length > 0) {
      await saveImageMapping(mappings)
    }

    console.log('\n📊 Migration Summary:')
    console.log(`✅ Successfully uploaded: ${successCount} images`)
    console.log(`❌ Failed uploads: ${errorCount} images`)
    
    if (successCount === imageFiles.length) {
      console.log('🎉 All images migrated successfully!')
    } else if (successCount > 0) {
      console.log('⚠️  Migration completed with some errors')
      process.exit(1)
    } else {
      console.log('💥 Migration failed - no images were uploaded')
      process.exit(1)
    }

  } catch (error) {
    console.error('💥 Migration failed:', error.message)
    process.exit(1)
  }
}

// Run the migration
if (require.main === module) {
  main()
}

export { main as migrateImages, generateAltText }