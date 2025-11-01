import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";

export async function POST() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  session.destroy();
  return NextResponse.json({ success: true });
}
