# Strapi CMS Deployment Guide

This guide covers deploying the EGO Strapi CMS to production platforms (Railway, Render, or similar).

## Prerequisites

1. **Cloudinary Account** (free tier available)
   - Sign up at https://cloudinary.com
   - Get your Cloud Name, API Key, and API Secret from the Dashboard

2. **PostgreSQL Database**
   - Most platforms provide managed PostgreSQL
   - Alternatively use Neon, Supabase, or Railway's PostgreSQL

3. **Your Production Frontend URL**
   - Needed for CORS configuration

---

## Option A: Deploy to Railway

Railway offers simple deployments with built-in PostgreSQL.

### Step 1: Create Railway Project

1. Go to https://railway.app and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set the **Root Directory** to `cms`

### Step 2: Add PostgreSQL Database

1. In your Railway project, click "New" → "Database" → "PostgreSQL"
2. Railway will create a database and add `DATABASE_URL` automatically

### Step 3: Configure Environment Variables

In Railway's Variables tab, add:

```bash
# Core
NODE_ENV=production
HOST=0.0.0.0
PORT=${{PORT}}

# Security Keys (generate unique values!)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=<generate-random-32-char-string>
ADMIN_JWT_SECRET=<generate-random-32-char-string>
TRANSFER_TOKEN_SALT=<generate-random-32-char-string>
JWT_SECRET=<generate-random-32-char-string>
ENCRYPTION_KEY=<generate-random-32-char-string>

# Database (Railway sets DATABASE_URL automatically)
DATABASE_CLIENT=postgres
DATABASE_SSL=true

# Cloudinary
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

# CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Generate secure keys:**
```bash
# Run this 5 times to generate unique keys
openssl rand -base64 32
```

### Step 4: Configure Build Settings

In Railway's Settings tab:
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Root Directory**: `cms`

### Step 5: Deploy

Railway will automatically deploy when you push to your connected branch.

---

## Option B: Deploy to Render

### Step 1: Create Render Web Service

1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: `ego-strapi-cms`
   - **Root Directory**: `cms`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

### Step 2: Create PostgreSQL Database

1. Click "New" → "PostgreSQL"
2. Note the **Internal Database URL**

### Step 3: Add Environment Variables

In the Environment tab, add all variables from Step 3 above, plus:

```bash
DATABASE_URL=<your-render-postgres-internal-url>
```

### Step 4: Deploy

Click "Create Web Service" and wait for deployment.

---

## Post-Deployment Steps

### 1. Create Admin User

1. Open your Strapi URL: `https://your-strapi-domain.railway.app/admin`
2. Create your admin account on first visit
3. Set a strong password

### 2. Run Content Migration

From your local machine, point the migration script to production:

```bash
cd cms

# Set production URL in your local .env temporarily
STRAPI_URL=https://your-strapi-domain.railway.app
STRAPI_API_TOKEN=<your-production-api-token>

# Run migration
npm run migrate
```

Or SSH into your deployment and run the migration there.

### 3. Configure API Token

1. Go to Settings → API Tokens in Strapi Admin
2. Create a new token with "Read-only" permissions
3. Copy this token to your frontend's environment variables:
   - In Vercel: `STRAPI_API_TOKEN=<your-token>`

### 4. Verify CORS

Test that your frontend can fetch from the CMS:

```bash
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Authorization: Bearer <your-api-token>" \
     https://your-strapi.railway.app/api/landing-page
```

### 5. Update Frontend Environment

In your Vercel project settings, add/update:

```bash
STRAPI_URL=https://your-strapi-domain.railway.app
STRAPI_API_TOKEN=<your-production-api-token>
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.railway.app
```

Redeploy frontend to pick up the new variables.

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `HOST` | Yes | `0.0.0.0` |
| `PORT` | Yes | Platform provides this |
| `APP_KEYS` | Yes | Comma-separated random strings |
| `API_TOKEN_SALT` | Yes | Random 32+ char string |
| `ADMIN_JWT_SECRET` | Yes | Random 32+ char string |
| `TRANSFER_TOKEN_SALT` | Yes | Random 32+ char string |
| `JWT_SECRET` | Yes | Random 32+ char string |
| `ENCRYPTION_KEY` | Yes | Random 32+ char string |
| `DATABASE_CLIENT` | Yes | `postgres` for production |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `DATABASE_SSL` | Yes | `true` for production |
| `CLOUDINARY_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_SECRET` | Yes | Cloudinary API secret |
| `FRONTEND_URL` | Yes | Your frontend domain for CORS |

---

## Troubleshooting

### Build Fails

1. Check Node.js version matches `engines` in package.json
2. Ensure `ROOT_DIRECTORY` is set to `cms`
3. Check build logs for dependency issues

### Database Connection Fails

1. Verify `DATABASE_URL` is correct
2. Ensure `DATABASE_SSL=true` for cloud PostgreSQL
3. Check if IP allowlisting is needed (Neon, Supabase)

### CORS Errors

1. Verify `FRONTEND_URL` matches your exact frontend domain
2. Include protocol (`https://`)
3. Restart Strapi after changing CORS config

### Cloudinary Upload Fails

1. Verify all three Cloudinary variables are set
2. Check Cloudinary dashboard for API rate limits
3. Ensure API key has upload permissions

### 502/503 Errors

1. Check memory limits (Strapi needs ~512MB minimum)
2. Review application logs for startup errors
3. Ensure `npm run start` (not `npm run develop`) for production

---

## Security Checklist

- [ ] All secret keys are unique and randomly generated
- [ ] Admin password is strong (16+ chars, mixed case, numbers, symbols)
- [ ] API token permissions are minimal (read-only for frontend)
- [ ] `FRONTEND_URL` is set to exact production domain
- [ ] No sensitive data in public repository
- [ ] SSL/TLS enabled on all connections

---

## Maintenance

### Database Backups

Most platforms offer automated backups. Additionally:

```bash
# Manual backup (Railway)
railway run pg_dump > backup.sql

# Manual backup (Render)
pg_dump $DATABASE_URL > backup.sql
```

### Updates

```bash
# Check for Strapi updates
cd cms
npm run upgrade:dry

# Apply updates
npm run upgrade
npm run build
```

Always test updates in development before deploying to production.
