import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await query(
    `SELECT 
       id,
       slug,
       data->>'title' as title
     FROM cms_objects
     WHERE type = 'pillar'
     ORDER BY data->>'title' ASC`
  );

  const pillars = result.rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title || row.slug,
  }));

  return NextResponse.json({ pillars });
}
