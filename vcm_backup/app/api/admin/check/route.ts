import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";

export async function GET() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  return NextResponse.json({ isAdmin: session.isAdmin || false });
}
