import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { getAllClustersOverview, getClusterOverviewById } from "@/lib/clusterHealth";

export async function GET(request: Request) {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const clusterId = searchParams.get("id");
  
  if (clusterId) {
    const cluster = await getClusterOverviewById(clusterId);
    if (!cluster) {
      return NextResponse.json({ error: "Cluster not found" }, { status: 404 });
    }
    return NextResponse.json(cluster);
  }
  
  const clusters = await getAllClustersOverview();
  return NextResponse.json(clusters);
}
