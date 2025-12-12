import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { query } from "@/lib/db";
import type { UserTier } from "./types";

export interface UserWithTier {
  id: string;
  email: string;
  subscription_tier: UserTier;
  isAdmin: boolean;
}

export async function getCurrentUserWithTier(): Promise<UserWithTier | null> {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    if (!session.isLoggedIn || !session.userId) {
      return null;
    }

    const result = await query(
      'SELECT id, email, subscription_tier, is_admin FROM users WHERE id = $1',
      [session.userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    return {
      id: user.id,
      email: user.email,
      subscription_tier: (user.subscription_tier as UserTier) || 'free',
      isAdmin: user.is_admin || false,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export function createAIGatingResponse(): Response {
  return new Response(
    JSON.stringify({ 
      error: 'AI tools require a Pro subscription.',
      upgradeRequired: true,
      requiredTier: 'pro',
    }),
    { 
      status: 403, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}

export function createLoginRequiredResponse(): Response {
  return new Response(
    JSON.stringify({ 
      error: 'Please log in to use this feature.',
      loginRequired: true,
    }),
    { 
      status: 401, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}
