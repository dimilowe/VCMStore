-- Migration: Add pillar_slug column to cms_objects table
-- Date: 2025-12-11
-- Purpose: Standardize pillar membership on pillar_slug across both tools and cms_objects tables
-- Run this on PRODUCTION before deploying

-- Step 1: Add the column (nullable, fast, non-blocking)
ALTER TABLE cms_objects ADD COLUMN IF NOT EXISTS pillar_slug TEXT;

-- Step 2: Backfill from cluster_slug where applicable
UPDATE cms_objects 
SET pillar_slug = cluster_slug 
WHERE pillar_slug IS NULL 
  AND cluster_slug IS NOT NULL;

-- Step 3: Verify the migration
SELECT slug, pillar_slug, cluster_slug 
FROM cms_objects 
WHERE type = 'tool' AND pillar_slug IS NOT NULL 
LIMIT 10;
