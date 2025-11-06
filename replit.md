# VCM Store

## Overview
VCM Store is a public-facing creator marketplace built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL. The platform allows visitors to browse products, blog posts, and resources without authentication. Users only need to create an account when claiming free products or purchasing paid items.

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, PostgreSQL
- **Payments**: Stripe Checkout
- **Authentication**: Email/password with bcrypt

### Key Features
- **Public-first browsing**: All content visible without login
- **Browse-first, account-later**: Authentication only required on claim/purchase
- **Product catalog**: Apps, courses, downloads, funnels, and freebies
- **Blog system**: SEO-optimized blog with WordPress-style editor, image uploads, and categories
- **Feedback system**: User feedback form with bug reports, feature requests, improvements, and general feedback
- **AI Strategy chat**: Mock AI that suggests products based on keywords
- **Email capture**: Newsletter subscription throughout the site
- **Stripe integration**: Payments with webhook-based fulfillment

## Database Schema

### Tables
- `products`: Product catalog with type, price, Stripe integration
- `users`: User accounts with email/password
- `profiles`: Extended user data
- `entitlements`: User access to products
- `purchases`: Purchase history
- `blog_posts`: SEO-optimized blog posts with featured images, categories, and scheduling
- `categories`: Blog post categories
- `blog_post_categories`: Many-to-many relationship between posts and categories
- `subscribers`: Email newsletter list
- `feedback`: User feedback submissions (bug reports, feature requests, improvements)

## Project Structure

```
/app                    # Next.js app directory
  /api                 # API routes
    /auth              # Signup, login endpoints
    /checkout          # Stripe checkout
    /webhooks          # Stripe webhook handler
  /blog                # Blog pages
  /product/[slug]      # Product detail pages
  /store               # Product catalog
  /dashboard           # User dashboard
  /strategy-ai         # AI chat interface
/components            # Reusable React components
  /ui                  # shadcn/ui components
/lib                   # Utilities and helpers
  db.ts                # Database connection
  auth.ts              # Authentication logic
  utils.ts             # Utility functions
```

## Routes

### Public Routes
- `/` - Homepage with hero and email capture
- `/store` - Full product catalog
- `/product/[slug]` - Product detail page
- `/blog` - Blog post listing
- `/blog/[slug]` - Individual blog post
- `/newsletter` - Newsletter signup page
- `/strategy-ai` - AI strategy chat

### Authenticated Routes
- `/dashboard` - User's products and entitlements
- `/apps/[slug]` - Access to purchased apps
- `/courses/[slug]` - Access to purchased courses
- `/downloads/[slug]` - Access to purchased downloads

## Development

### Running Locally
The dev server runs on port 5000:
```bash
npm run dev
```

### Environment Variables
- `DATABASE_URL` - External Neon PostgreSQL connection string (shared across dev and production)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `SESSION_SECRET` - Session encryption key
- `ADMIN_PASSWORD_HASH` - Hashed admin password for dashboard access
- `STORAGE_BUCKET` - Object storage bucket name for file uploads

### Database Configuration
**IMPORTANT**: This project uses an **external Neon PostgreSQL database** shared across all environments.

- ✅ Database connection uses `DATABASE_URL` environment variable
- ✅ **One shared database for both development and production** - changes sync instantly
- ✅ Products, users, and all data persist across environments
- ✅ What you add in testing immediately appears on the live site
- ✅ Same setup as APE - external Neon database for unified data

**Current Status**: External Neon database set up on 2025-11-03 with all required tables.

**Connection**: `postgresql://neondb_owner:***@ep-shiny-sun-ade9bu1b-pooler.c-2.us-east-1.aws.neon.tech/neondb`

**Code Implementation**: See `lib/db.ts` which uses Neon serverless driver with WebSocket support.

## Recent Changes
- 2025-11-06: **Added Feedback System** - User feedback form with categorized submissions
  - Created feedback database table to store submissions
  - Built FeedbackDialog component with 4 feedback types (bug, feature, improvement, general)
  - Added feedback button to homepage footer with premium white/gray/gold styling
  - Created API endpoint for secure feedback submission
  - Includes optional email field for follow-up and priority levels
  - Successfully tested and verified submissions are saved to database
- 2025-11-06: **Transformed Newsletter into Full Blog System** - SEO-optimized WordPress-style blog
  - WordPress-style content editor with rich text formatting toolbar
  - Image upload capabilities (featured images and inline content images)
  - Category system with many-to-many relationships
  - Post scheduling and draft management
  - SEO optimization: custom slugs, meta descriptions, sitemap.xml, robots.txt
  - Google Search Console verification (meta tag + HTML file)
  - First blog post "Testing1" published successfully at /newsletter/testing1
  - Fixed sidebar layout locked at 320px width to prevent expansion during uploads
- 2025-11-03: **Implemented Email + Password Authentication** - Complete post-purchase authentication system
  - Users create accounts AFTER purchasing (browse anonymously, authenticate only when buying)
  - Signup: Email + password (8+ characters), hashed with bcrypt, auto-login after signup
  - Login: Email + password verification with proper session management
  - Pending purchase system: Webhook stores purchases with NULL user_id when user doesn't exist
  - Claim purchases: After signup/login, pending purchases are matched to user via Stripe payment intent
  - SessionManager: Detects if user exists → shows signup or login form accordingly
  - iron-session: Cookie-based session management for secure authentication
  - Purchase flow: Stripe checkout → redirect → signup/login → claim purchases → access dashboard
- 2025-11-03: **Migrated to Replit Object Storage** - Fixed image storage for production deployment
  - All product images and downloads now stored in Replit Object Storage
  - Created `/api/files/[filename]` route to serve files from Object Storage
  - Fixed Next.js 15+ async params compatibility issue
  - Disabled Next.js image optimization to prevent URL mangling
  - Upload system configured to use `@replit/object-storage` package
  - Images accessible on both dev and production environments
  - Note: Product images need to be re-uploaded through admin interface
- 2025-11-03: **Switched to external Neon database** - Configured shared database for dev and production
  - Created external Neon PostgreSQL database (same setup as APE)
  - All 7 tables created: products, users, posts, entitlements, purchases, subscribers, profiles
  - One unified database - changes in testing instantly appear on live site
  - Removed retry logic (not needed for external Neon)
  - Server restarted and working properly
- 2025-11-01: Initial project setup with Next.js 14, database schema, and all core pages
  - Database tables created for products, users, entitlements, posts, subscribers
  - Implemented public browsing with authentication on claim/purchase
  - Added Stripe checkout integration and webhook handler
  - Created email capture component used throughout the site
  - Set up AI strategy chat with mock responses

## User Preferences
None specified yet.

## Authentication Flow

### Purchase Flow (New Customers)
1. Customer browses products anonymously (no account required)
2. Customer clicks "Buy Now" → Stripe Checkout (collects email)
3. Stripe redirects to `/dashboard?session_id=XXX`
4. SessionManager checks if email exists in users table
5. If no account exists → SignupForm (email prefilled, set password)
6. User creates account → Auto-login with iron-session
7. Claim purchases endpoint matches pending purchases by Stripe payment intent email
8. Purchases transferred from NULL user_id to new user's ID
9. Entitlements granted → User sees purchased products in dashboard

### Login Flow (Returning Customers)
1. Customer visits `/dashboard`
2. If no session → LoginForm displayed
3. Enter email + password → Verify with bcrypt
4. Create iron-session → Redirect to dashboard with purchases

### Security Features
- Passwords hashed with bcrypt (min 8 characters)
- iron-session for secure cookie-based authentication
- Pending purchases stored with NULL user_id until claimed
- Email matching via Stripe payment intent for claim verification

## Next Steps
- Add real AI integration (OpenAI/Anthropic)
- Add email sending for purchase confirmations
- Create admin panel for product management
- Add product search and filtering
- Implement SEO optimization with metadata
