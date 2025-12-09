import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { getCloudEntitlementsForUser } from "@/lib/cloudEntitlements";

export async function GET() {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ entitlements: [] });
    }

    const entitlements = await getCloudEntitlementsForUser(parseInt(session.userId, 10));
    
    return NextResponse.json({ entitlements });
  } catch (error) {
    console.error("[API] Error fetching cloud entitlements:", error);
    return NextResponse.json({ entitlements: [] });
  }
}
