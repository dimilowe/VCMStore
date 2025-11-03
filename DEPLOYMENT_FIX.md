# Fix Deployment Database Connection

## Problem
Your published app at vcmstore.shop cannot connect to the Neon database because autoscale deployments don't automatically inherit workspace secrets.

## Solution

### Step 1: Already Done ✅
Updated `package.json` start script to bind correctly in production.

### Step 2: Set Deployment Environment Variable

**You need to add DATABASE_URL to your deployment via the Replit UI:**

1. Click on the **"Publishing"** tool in the left sidebar (Tools menu)
2. In the deployment settings, look for **"Published app secrets"** or **"Environment Variables"** section
3. Click **"Add secret"** or **"Add environment variable"**
4. Set:
   - **Key:** `DATABASE_URL`
   - **Value:** Copy the same DATABASE_URL value from your workspace Secrets (the one starting with `postgresql://...`)
5. Save the secret

### Step 3: Republish

After adding the DATABASE_URL secret to your deployment:
1. Click **"Republish"** or **"Deploy"** button
2. Wait for the deployment to complete
3. Test vcmstore.shop - it should now load products from the database

## Why This Was Needed

- Development uses workspace secrets (which you already have set)
- Autoscale deployments have separate environment variables
- The published app literally couldn't see DATABASE_URL until you add it to deployment secrets
- This is a Replit autoscale limitation, not a code issue

## After This Works

Once vcmstore.shop loads successfully, both your testing site and live site will share the exact same Neon database - just like APE.
