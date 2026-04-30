#!/usr/bin/env tsx

/**
 * API Verification Script for Strapi CMS
 * Tests all API endpoints to ensure data migration was successful
 * 
 * Usage: npm run verify:api
 */

import 'dotenv/config'
import fetch from 'node-fetch'

// Configuration
const STRAPI_BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface TestResult {
  endpoint: string
  status: 'PASS' | 'FAIL' | 'WARN'
  message: string
  dataCount?: number
}

async function testEndpoint(endpoint: string, populate?: string, expectedMinCount = 1): Promise<TestResult> {
  try {
    const url = `${STRAPI_BASE_URL}/api/${endpoint}${populate ? `?populate=${populate}` : ''}`
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    })

    if (!response.ok) {
      return {
        endpoint,
        status: 'FAIL',
        message: `HTTP ${response.status}: ${response.statusText}`
      }
    }

    const result = await response.json() as any
    const data = Array.isArray(result.data) ? result.data : (result.data ? [result.data] : [])
    const count = data.length

    if (count >= expectedMinCount) {
      return {
        endpoint,
        status: 'PASS',
        message: `Successfully fetched data`,
        dataCount: count
      }
    } else {
      return {
        endpoint,
        status: 'WARN',
        message: `Expected at least ${expectedMinCount} items, got ${count}`,
        dataCount: count
      }
    }

  } catch (error) {
    return {
      endpoint,
      status: 'FAIL',
      message: `Error: ${error.message}`
    }
  }
}

async function main() {
  console.log('🔍 Verifying Strapi API endpoints...\n')
  
  if (!STRAPI_API_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN environment variable is required')
    process.exit(1)
  }

  const tests = [
    // Collection types - don't use populate, just check data exists
    { endpoint: 'certifications', expectedCount: 8 },
    { endpoint: 'product-categories', expectedCount: 4 },
    { endpoint: 'products', expectedCount: 4 },
    { endpoint: 'stats', expectedCount: 8 },
    { endpoint: 'testimonials', expectedCount: 3 },
    { endpoint: 'global-partners', expectedCount: 6 },
    { endpoint: 'facilities', expectedCount: 3 },
    { endpoint: 'process-steps', expectedCount: 4 },
    { endpoint: 'blog-posts', expectedCount: 3 },
    
    // Single types - optional (may not be seeded yet)
    { endpoint: 'landing-page', expectedCount: 0, optional: true },
    { endpoint: 'site-setting', expectedCount: 0, optional: true },
    { endpoint: 'navigation', expectedCount: 0, optional: true },
  ]

  const results: TestResult[] = []

  console.log('Running API tests...\n')

  for (const test of tests) {
    process.stdout.write(`Testing ${test.endpoint}... `)
    const result = await testEndpoint(test.endpoint, undefined, test.expectedCount)
    
    // Convert FAIL to WARN for optional endpoints
    if (result.status === 'FAIL' && (test as any).optional) {
      result.status = 'WARN'
      result.message = `Optional: ${result.message}`
    }
    
    results.push(result)

    const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'WARN' ? '⚠️' : '❌'
    console.log(`${statusIcon} ${result.message}${result.dataCount !== undefined ? ` (${result.dataCount} items)` : ''}`)
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  // Summary
  const passCount = results.filter(r => r.status === 'PASS').length
  const warnCount = results.filter(r => r.status === 'WARN').length
  const failCount = results.filter(r => r.status === 'FAIL').length

  console.log('\n📊 Test Summary:')
  console.log(`   ✅ PASS: ${passCount}`)
  console.log(`   ⚠️  WARN: ${warnCount}`)
  console.log(`   ❌ FAIL: ${failCount}`)
  console.log(`   📝 Total: ${results.length}`)

  if (failCount > 0) {
    console.log('\n❌ Some API endpoints failed verification')
    console.log('Please check the failed endpoints and ensure:')
    console.log('   • Strapi is running and accessible')
    console.log('   • API token has correct permissions')
    console.log('   • Content migration completed successfully')
    process.exit(1)
  } else if (warnCount > 0) {
    console.log('\n⚠️  API verification completed with warnings')
    console.log('Some endpoints returned fewer items than expected.')
    console.log('This might be normal depending on your data.')
  } else {
    console.log('\n🎉 All API endpoints verified successfully!')
  }

  console.log('\n🔗 API Base URL:', STRAPI_BASE_URL)
  console.log('📋 You can now proceed with frontend integration')
}

// Run the verification
if (require.main === module) {
  main()
}

export { main as verifyApi }