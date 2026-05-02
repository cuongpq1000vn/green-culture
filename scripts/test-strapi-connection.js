/**
 * Test Strapi Connection
 * Run with: node scripts/test-strapi-connection.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

console.log('🔧 Testing Strapi Connection...');
console.log('📍 Strapi URL:', STRAPI_URL);
console.log('🔑 API Token:', STRAPI_API_TOKEN ? 'Present' : 'Missing');

async function testConnection() {
  try {
    // Test basic connection
    console.log('\n1️⃣ Testing basic connection...');
    const healthResponse = await fetch(`${STRAPI_URL}/api/content-manager/content-types`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Health check status:', healthResponse.status);
    
    if (!healthResponse.ok) {
      throw new Error(`Health check failed: ${healthResponse.status} ${healthResponse.statusText}`);
    }

    // Test landing page endpoint
    console.log('\n2️⃣ Testing landing page endpoint...');
    const landingPageUrl = `${STRAPI_URL}/api/landing-page?populate=*`;
    console.log('Fetching:', landingPageUrl);
    
    const landingPageResponse = await fetch(landingPageUrl, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Landing page status:', landingPageResponse.status);
    
    if (landingPageResponse.ok) {
      const data = await landingPageResponse.json();
      console.log('✅ Landing page data structure:');
      console.log('- Data exists:', !!data.data);
      console.log('- Has hero:', !!data.data?.hero);
      console.log('- Hero keys:', data.data?.hero ? Object.keys(data.data.hero) : 'none');
    } else {
      const errorText = await landingPageResponse.text();
      console.log('❌ Landing page error:', errorText);
    }

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n🔍 Troubleshooting steps:');
    console.log('1. Make sure Strapi is running on', STRAPI_URL);
    console.log('2. Check if the API token is valid');
    console.log('3. Verify the landing-page content type exists in Strapi');
    console.log('4. Check Strapi admin panel for any errors');
  }
}

testConnection();