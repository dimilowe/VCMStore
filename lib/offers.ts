import { query } from '@/lib/db';

type GrantAccessParams = {
  userId: string;
  offerKey: string;
  cmsSlug?: string | null;
  stripeCustomerId?: string | null;
  stripeSessionId?: string | null;
  amountTotal?: number | null;
};

export async function grantAccessForOffer(params: GrantAccessParams): Promise<void> {
  const { userId, offerKey, cmsSlug, stripeSessionId, amountTotal } = params;

  await query(
    `INSERT INTO purchases (user_id, product_slug, stripe_payment_intent_id, amount, status, metadata)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      userId,
      cmsSlug,
      stripeSessionId,
      amountTotal,
      "completed",
      JSON.stringify({ offerKey, cmsSlug })
    ]
  );

  await query(
    `INSERT INTO entitlements (user_id, product_slug, source, metadata, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT DO NOTHING`,
    [userId, cmsSlug, "purchase", JSON.stringify({ offerKey })]
  );

  console.log(`[Offers] Granted access: userId=${userId}, offerKey=${offerKey}, cmsSlug=${cmsSlug}`);
}

export async function storePendingPurchase(params: {
  email: string;
  offerKey: string;
  cmsSlug: string;
  stripeSessionId: string;
  amountTotal: number | null;
}): Promise<void> {
  const { email, offerKey, cmsSlug, stripeSessionId, amountTotal } = params;

  await query(
    `INSERT INTO purchases (user_id, product_slug, stripe_payment_intent_id, amount, status, metadata)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      null,
      cmsSlug,
      stripeSessionId,
      amountTotal,
      "pending",
      JSON.stringify({ offerKey, cmsSlug, pendingEmail: email })
    ]
  );

  console.log(`[Offers] Stored pending purchase: email=${email}, offerKey=${offerKey}, cmsSlug=${cmsSlug}`);
}

export async function claimPendingPurchases(userId: string, email: string): Promise<number> {
  const pending = await query(
    `SELECT id, product_slug, metadata FROM purchases 
     WHERE user_id IS NULL 
     AND status = 'pending' 
     AND metadata->>'pendingEmail' = $1`,
    [email.toLowerCase().trim()]
  );

  let claimed = 0;
  for (const purchase of pending.rows) {
    const offerKey = purchase.metadata?.offerKey;
    
    await query(
      `UPDATE purchases SET user_id = $1, status = 'completed' WHERE id = $2`,
      [userId, purchase.id]
    );

    await query(
      `INSERT INTO entitlements (user_id, product_slug, source, metadata, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT DO NOTHING`,
      [userId, purchase.product_slug, "purchase", JSON.stringify({ offerKey })]
    );

    claimed++;
  }

  if (claimed > 0) {
    console.log(`[Offers] Claimed ${claimed} pending purchases for userId=${userId}`);
  }

  return claimed;
}
