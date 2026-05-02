/**
 * Quick test for getLandingPage after fixing populate queries
 * Run with: node scripts/test-landing-page.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function testLandingPage() {
  try {
    console.log('🧪 Testing getLandingPage with fixed populate query...\n');

    // Test the fixed populate query directly
    const fixedQuery = {
      hero: {
        populate: {
          backgroundImage: true,
          backgroundVideo: true,
          ctaButton: true,
          secondaryButton: true
        }
      },
      homeStats: true,
      aboutSection: {
        populate: {
          image: true,
          stats: true,
          features: true,
          ctaButton: true
        }
      },
      featuredProducts: {
        populate: {
          image: true,
          category: true
        }
      },
      ctaSection: {
        populate: {
          backgroundImage: true,
          primaryButton: true,
          secondaryButton: true
        }
      },
      seo: {
        populate: {
          metaImage: true,
          metaSocial: true
        }
      }
    };

    // Build URL with the fixed populate structure
    const url = new URL(`${STRAPI_URL}/api/landing-page`);
    
    // Add populate parameters
    function flattenPopulate(obj, prefix, params) {
      for (const [key, value] of Object.entries(obj)) {
        const newKey = `${prefix}[${key}]`;
        if (value === true) {
          params.set(newKey, 'true');
        } else if (typeof value === 'object' && value !== null) {
          flattenPopulate(value, newKey, params);
        } else if (value !== undefined && value !== null) {
          params.set(newKey, String(value));
        }
      }
    }

    flattenPopulate(fixedQuery, 'populate', url.searchParams);

    console.log('🎯 Fixed URL:', url.toString());

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📊 Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Landing page data retrieved');
      console.log('📋 Data structure:');
      console.log('- Has data:', !!data.data);
      console.log('- Has hero:', !!data.data?.hero);
      console.log('- Has aboutSection:', !!data.data?.aboutSection);
      console.log('- Has featuredProducts:', !!data.data?.featuredProducts);
      console.log('- Has ctaSection:', !!data.data?.ctaSection);
      
      if (data.data?.hero) {
        console.log('- Hero title:', data.data.hero.title || 'No title');
        console.log('- Hero backgroundImage:', !!data.data.hero.backgroundImage);
      }
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testLandingPage();