import { NextRequest, NextResponse } from 'next/server';

/**
 * Debug endpoint to test Strapi connection and see raw data
 * Visit: http://localhost:3000/api/debug/strapi?endpoint=blog-posts
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'blog-posts';
    
    // Build Strapi URL
    const strapiUrl = `${STRAPI_URL}/api/${endpoint}?populate=*&_t=${Date.now()}`;
    
    console.log('🔍 Debug fetching from:', strapiUrl);
    
    // Fetch directly from Strapi with cache-busting
    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...(STRAPI_API_TOKEN && {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        })
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { 
          error: `Strapi returned ${response.status}: ${response.statusText}`,
          details: errorText,
          url: strapiUrl
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      strapiUrl,
      hasToken: !!STRAPI_API_TOKEN,
      itemCount: Array.isArray(data.data) ? data.data.length : 1,
      data
    });
    
  } catch (error) {
    console.error('Debug fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch from Strapi',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}