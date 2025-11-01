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
- **Blog system**: Markdown-based blog with email capture
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
- `posts`: Blog content with markdown support
- `subscribers`: Email newsletter list

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
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `SESSION_SECRET` - Session encryption key

## Recent Changes
- 2025-11-01: Initial project setup with Next.js 14, database schema, and all core pages
- Database tables created for products, users, entitlements, posts, subscribers
- Implemented public browsing with authentication on claim/purchase
- Added Stripe checkout integration and webhook handler
- Created email capture component used throughout the site
- Set up AI strategy chat with mock responses

## User Preferences
None specified yet.

## Next Steps
- Add real AI integration (OpenAI/Anthropic)
- Implement session management with cookies/JWT
- Add email sending for purchase confirmations
- Create admin panel for product management
- Add product search and filtering
- Implement SEO optimization with metadata
