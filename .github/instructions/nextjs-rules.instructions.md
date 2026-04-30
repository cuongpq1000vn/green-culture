---
description: "Use when working with Next.js projects, App Router, React Server Components, API routes, server actions, authentication, forms, or full-stack Next.js development. Covers frontend and backend patterns."
applyTo: ["app/**", "components/**", "lib/**", "**/*.tsx", "**/*.ts", "**/route.ts", "**/page.tsx", "**/layout.tsx"]
---

# Next.js Full-Stack Development Rules

## Project Structure (REQUIRED)

Always organize Next.js projects with this exact structure:

```
app/                          # App Router only
  layout.tsx                  # Root layout with metadata
  page.tsx                    # Home page
  globals.css                 # Global styles
  api/                        # API Route Handlers
    auth/                     # Authentication endpoints  
    users/                    # Resource endpoints
  (auth)/                     # Route groups for layout
    login/page.tsx
    register/page.tsx
  dashboard/
    page.tsx
    layout.tsx               # Nested layouts
components/
  ui/                        # shadcn/ui components
  forms/                     # Form components
  providers/                 # Context providers
lib/
  auth.ts                    # Authentication logic
  db.ts                      # Database connection
  utils.ts                   # Utilities (cn, etc.)
  validations/               # Zod schemas
  actions/                   # Server Actions
public/
  images/                    # Static assets
middleware.ts               # Route protection
next.config.js              # Next.js config
```

## App Router Architecture

### Always Use App Router
- Never use Pages Router for new projects
- Always place all routes in `app/` directory
- Always use `page.tsx` for route components
- Always use `layout.tsx` for shared layouts
- Always use `loading.tsx` for loading states
- Always use `error.tsx` for error boundaries
- Always use `not-found.tsx` for 404 pages

### Route Organization
- Always use route groups `(name)` for organization without affecting URL structure
- Always use dynamic routes `[id]` for parameters
- Always use catch-all routes `[...slug]` for flexible routing
- Never create nested `page.tsx` files without proper folder structure
- Always co-locate related files in route folders

## Server vs Client Components

### Server Components (DEFAULT)
- Always default to Server Components
- Never add `"use client"` unless absolutely required
- Always fetch data directly in Server Components
- Always pass data as props to Client Components
- Never use React hooks in Server Components
- Never access browser APIs in Server Components

### Client Components (EXPLICIT)
- Always add `"use client"` directive at the top when needed
- Use Client Components ONLY for:
  - Interactive elements (onClick, onChange, onSubmit)
  - React hooks (useState, useEffect, useContext)
  - Browser APIs (localStorage, window, document)
  - Third-party libraries requiring client-side execution
- Never use Client Components for static content
- Always minimize Client Component boundaries

### Component Guidelines
- Always keep components under 200 lines
- Always extract sub-components when exceeding limits  
- Always use TypeScript strict mode
- Always define proper TypeScript interfaces for props
- Never use `any` type
- Always use `React.FC` or function declarations with typed props

## Data Fetching & Caching

### Server-Side Data Fetching
- Always use `async/await` in Server Components
- Always fetch data at the component level, not in effects
- Always use Next.js built-in `fetch()` with caching
- Never use `useEffect` for initial data loading in Server Components
- Always handle loading and error states properly

```typescript
// Correct Server Component data fetching
async function ProductsPage() {
  const products = await fetch('/api/products', {
    next: { revalidate: 3600 } // Cache for 1 hour
  }).then(res => res.json())
  
  return <ProductList products={products} />
}
```

### Caching Strategy
- Always use `next: { revalidate: number }` for time-based revalidation
- Always use `next: { tags: ['products'] }` for on-demand revalidation
- Use `cache: 'no-store'` only for real-time data
- Always use `unstable_cache()` for expensive computations
- Never cache user-specific data globally

### Client-Side Data Fetching
- Use SWR or TanStack Query for client-side data fetching
- Always implement proper loading states
- Always implement proper error handling
- Never duplicate server state in client state

## API Route Handlers

### File Structure
- Always create API routes in `app/api/` directory
- Always use `route.ts` filename (not `route.js`)
- Always export named HTTP method functions: `GET`, `POST`, `PUT`, `DELETE`
- Never use default exports in route handlers

### Request/Response Handling
```typescript
// Correct API route structure
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    // Always validate input
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const data = await fetchData(id)
    return NextResponse.json(data)
  } catch (error) {
    // Always handle errors properly
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
```

### API Best Practices
- Always validate request data with Zod schemas
- Always return proper HTTP status codes
- Always handle errors with try/catch blocks
- Never expose internal error messages to clients
- Always use TypeScript for type safety
- Always implement rate limiting for production APIs
- Always sanitize user inputs

## Server Actions

### File Organization
- Always place Server Actions in `lib/actions/` directory
- Always use `"use server"` directive at the top
- Always export async functions
- Always validate form data with Zod schemas

### Form Handling with Server Actions
```typescript
// lib/actions/user.ts
"use server"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

export async function createUser(formData: FormData) {
  // Always validate input
  const validated = CreateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email')
  })
  
  if (!validated.success) {
    return { error: 'Invalid input' }
  }
  
  try {
    // Database operation
    await db.user.create({ data: validated.data })
    
    // Always revalidate affected paths
    revalidatePath('/users')
    
    return { success: true }
  } catch (error) {
    return { error: 'Failed to create user' }
  }
}
```

### Server Action Rules
- Always use Server Actions for form submissions
- Always validate data on the server side
- Always use `revalidatePath()` or `revalidateTag()` after mutations
- Never trust client-side validation alone
- Always return structured responses (success/error objects)
- Always handle database errors gracefully

## Authentication & Authorization

### Authentication Setup
- Always use NextAuth.js or similar production-ready solution
- Never implement custom authentication from scratch
- Always store sessions securely (JWT or database sessions)
- Always validate authentication in middleware or server components
- Never store sensitive data in localStorage or sessionStorage

### Route Protection
```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login'
  }
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

### Authorization Patterns
- Always check user permissions in Server Components
- Always validate user access in API routes
- Always use role-based or attribute-based access control
- Never rely on client-side authorization alone
- Always redirect unauthorized users appropriately

## Validation & Form Handling

### Schema Validation
- Always use Zod for runtime type validation
- Always validate data at API boundaries
- Always create reusable validation schemas
- Never trust client-side data without server validation

```typescript
// lib/validations/user.ts
import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older')
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>
```

### Form Components
- Always use React Hook Form with Zod resolver
- Always implement proper form validation
- Always show validation errors to users
- Always disable submit button during submission
- Always provide loading states

## Error Handling

### Global Error Handling
- Always create custom `error.tsx` boundaries
- Always create custom `not-found.tsx` pages
- Always log errors for debugging
- Never expose internal errors to users

### API Error Responses
```typescript
// Always use consistent error response format
type ErrorResponse = {
  error: string
  code?: string
  details?: unknown
}

// In API routes
return NextResponse.json(
  { error: 'User not found', code: 'USER_NOT_FOUND' },
  { status: 404 }
)
```

### Client Error Handling
- Always wrap async operations in try/catch
- Always show user-friendly error messages
- Always provide fallback UI for failed operations
- Always implement retry mechanisms where appropriate

## Security Rules

### Input Sanitization
- Always sanitize user inputs
- Always validate file uploads
- Always use parameterized queries for databases
- Never trust any user input without validation
- Always escape output when rendering user content

### Environment Variables
- Always prefix client-side variables with `NEXT_PUBLIC_`
- Never expose secrets in client-side code
- Always validate environment variables at startup
- Always use different configs for different environments

### Security Headers
```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      }
    ]
  }
}
```

## Performance Rules

### Bundle Optimization
- Always use dynamic imports for large components
- Always implement code splitting at route level
- Always optimize images with Next.js Image component
- Never import entire icon libraries
- Always analyze bundle size with `@next/bundle-analyzer`

### Image Optimization
```typescript
// Always use Next.js Image component
import Image from 'next/image'

// Correct usage
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={400}
  priority // Only for above-fold images
  placeholder="blur"
/>
```

### Loading Performance
- Always use `loading.tsx` for route-level loading states
- Always implement Suspense boundaries for async components
- Always preload critical resources
- Always use streaming for large datasets

## SEO & Metadata

### Metadata API
```typescript
// Always use Metadata API in layouts and pages
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg']
  }
}
```

### SEO Best Practices
- Always include proper meta tags
- Always use semantic HTML structure
- Always implement proper heading hierarchy (h1, h2, h3)
- Always include alt text for images
- Always create XML sitemaps
- Always implement structured data when relevant

## Testing Rules

### Testing Structure
- Always write tests for Server Actions
- Always write tests for API routes
- Always write integration tests for critical flows
- Always mock external dependencies
- Always test error scenarios

### Testing Tools
- Use Jest + Testing Library for unit tests
- Use Playwright for E2E tests
- Always aim for >80% test coverage
- Always test authentication flows
- Always test form submissions

## Code Quality Rules

### TypeScript Usage
- Always use strict TypeScript mode
- Always define interfaces for component props
- Always use proper return types for functions
- Never use `any` type except for migration scenarios
- Always use type assertions sparingly and safely

### Code Organization
- Always use absolute imports with `@/` alias
- Always follow consistent naming conventions
- Always use kebab-case for file names
- Always use PascalCase for component names
- Always use camelCase for functions and variables

## AI Agent Behavior Rules

### Hallucination Prevention
- Always verify Next.js API methods before using them
- Always check current Next.js version compatibility
- Never assume features exist without verification
- Always reference official Next.js documentation
- Always test generated code before claiming it works

### Code Generation Rules
- Always generate complete, runnable code examples
- Always include proper TypeScript types
- Always include error handling in generated code
- Always follow the established project patterns
- Always explain breaking changes between Next.js versions

### Best Practices for AI
- Always ask for clarification on ambiguous requirements
- Always suggest modern Next.js patterns over legacy approaches
- Always consider performance implications of generated code
- Always validate that suggested packages are compatible
- Never generate code that bypasses Next.js built-in features

## Development Workflow

### Development Commands
```bash
# Always use these commands in development
pnpm dev          # Development server
pnpm build        # Production build test
pnpm start        # Production server
pnpm lint         # ESLint check
pnpm type-check   # TypeScript check
```

### Pre-deployment Checklist
- Always run `pnpm build` successfully
- Always fix all TypeScript errors
- Always fix all linting errors
- Always test critical user flows
- Always verify environment variables are set
- Always check bundle size
- Always test on production-like environment

---

These rules ensure consistent, secure, and performant Next.js applications while preventing common AI hallucination pitfalls and enforcing best practices for full-stack development.