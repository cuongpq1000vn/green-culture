# Migration Scripts

This directory contains scripts to migrate data from the existing Next.js application to Strapi CMS.

## Prerequisites

1. Strapi server must be running (`npm run develop`)
2. Environment variables must be set:
   - `STRAPI_URL` (default: `http://localhost:1337`)
   - `STRAPI_API_TOKEN` (get from Strapi admin panel)

## Getting the API Token

1. Start Strapi: `npm run develop`
2. Go to `http://localhost:1337/admin`
3. Create/login to admin account
4. Go to Settings → API Tokens → Global API Tokens
5. Create a new token with:
   - Name: `Migration Token`
   - Token type: `Full access`
   - Token duration: `Unlimited`
6. Copy the token and add to your `.env` file:
   ```bash
   STRAPI_API_TOKEN=your_token_here
   ```

## Migration Scripts

### 1. Image Migration
```bash
npm run migrate:images
```

- Uploads all images from `../public/images/` to Strapi media library
- Creates `scripts/image-mapping.json` with media ID mappings
- Generates descriptive alt text for each image

### 2. Content Migration
```bash
npm run migrate:content
```

- Seeds all content types with data from the existing application
- Uses image mappings from the previous step
- Creates relationships between content types

### 3. Complete Migration
```bash
npm run migrate:all
```

- Runs both image and content migration in sequence
- Recommended for first-time migration

### 4. API Verification
```bash
npm run verify:api
```

- Tests all API endpoints to ensure migration was successful
- Reports data counts and any issues
- Run after migration to verify everything works

## Migration Order

The scripts must be run in this order:

1. **Images first**: `npm run migrate:images`
2. **Content second**: `npm run migrate:content`
3. **Verify**: `npm run verify:api`

Or use the complete migration: `npm run migrate:all && npm run verify:api`

## Content Types Created

The migration creates the following content types with sample data:

### Collection Types
- **Certifications** (8 items): ISO 22000, HACCP, GlobalGAP, etc.
- **Product Categories** (4 items): Grains, Beverages, Fruits, Roots & Tubers
- **Products** (4 items): Rice, Coffee, Mango, Cassava with full details
- **Stats** (8 items): 4 for home page, 4 for about page
- **Testimonials** (3 items): Customer quotes and details
- **Global Partners** (6 items): Trading partners by country
- **Facilities** (3 items): Processing facilities with images
- **Process Steps** (4 items): Export process workflow
- **Blog Posts** (3 items): Sample articles with content

### Single Types
- **Landing Page**: Hero, about, and CTA sections
- **Site Settings**: Logo, contact info, social links
- **Navigation**: Main nav and footer navigation structure

## Troubleshooting

### Common Issues

1. **"STRAPI_API_TOKEN environment variable is required"**
   - Make sure you've created an API token in Strapi admin
   - Add it to your `.env` file

2. **"Upload failed" errors**
   - Check that Strapi is running
   - Verify the API token has upload permissions
   - Ensure images directory exists at `../public/images/`

3. **"Failed to create content" errors**
   - Run image migration first
   - Check content type schemas match the data structure
   - Verify API permissions allow creation

### Starting Fresh

To clear all data and start over:

1. Delete the database: `rm -rf .tmp/data.db` (SQLite)
2. Restart Strapi: `npm run develop`
3. Recreate admin user and API token
4. Run migration again

## File Structure

```
scripts/
├── migrate-images.ts      # Upload images to Strapi
├── migrate-content.ts     # Create all content entries
├── migrate-all.ts         # Run both migrations
├── verify-api.ts          # Test API endpoints
├── image-mapping.json     # Generated image ID mappings
└── README.md             # This file
```

## Next Steps

After successful migration:

1. Verify data in Strapi admin panel
2. Test API endpoints with the verify script
3. Update frontend components to use CMS data
4. Configure environment variables for production