# Admin Dashboard Setup Guide

Your VCM Store now includes a complete admin dashboard where you can manage products and upload files!

## Step 1: Set Up Admin Password

1. Run this command in the Shell:
   ```bash
   node scripts/hash-password.js
   ```

2. Enter your desired admin password when prompted

3. Copy the hash that's displayed

4. Add it to your Secrets:
   - Click "Tools" → "Secrets"
   - Click "New Secret"
   - Key: `ADMIN_PASSWORD_HASH`
   - Value: [paste the hash]
   - Click "Add"

## Step 2: Create Object Storage Bucket

1. Click "Tools" → "Object Storage"
2. Click "Create Bucket"
3. Name it something like `vcm-store-files`
4. After creating, add to Secrets:
   - Key: `STORAGE_BUCKET`
   - Value: your-bucket-name (e.g., `vcm-store-files`)

## Step 3: Access Admin Dashboard

1. Navigate to `/admin` in your app
2. Login with the password you created
3. Start adding products!

## Admin Features

### Product Management
- **Add Products**: Click "Add Product" button
- **Upload Files**: Use upload buttons for:
  - Thumbnail images (product cards)
  - Download files (freebies, PDFs, etc.)
- **Edit Products**: Click edit icon on any product
- **Delete Products**: Click trash icon (with confirmation)

### Product Types
- **Apps**: SaaS products, web applications
- **Downloads**: PDFs, templates, files
- **Funnels**: Sales funnel systems
- **Freebies**: Free lead magnets
- **Videos**: Video courses, training
- **Courses**: Full course offerings

### Pricing
- **Free**: Set price_type to "free"
- **Paid**: Set price_type to "one_time" and price in cents (e.g., 4900 = $49.00)

## File Upload Notes

- **Thumbnail Images**: Max 5MB, displays on product cards
- **Download Files**: Max 50MB, available after purchase/claim
- Files are stored securely in Replit Object Storage
- Costs: $0.03/GB/month storage, $0.10/GB bandwidth

## Troubleshooting

If uploads fail:
1. Make sure STORAGE_BUCKET is set in Secrets
2. Check that the bucket exists in Object Storage
3. Verify the bucket name matches exactly

If you can't login:
1. Make sure ADMIN_PASSWORD_HASH is set in Secrets
2. Re-run the hash-password script if needed
3. Check SESSION_SECRET exists in Secrets (should already be there)

## Next Steps

1. Add your first product
2. Upload a thumbnail image
3. Test the free claim flow
4. Set up Stripe for paid products (add STRIPE_SECRET_KEY to secrets)
