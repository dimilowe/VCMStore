import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, AdminSessionData } from "@/lib/admin-session";
import { CLUSTER_REGISTRY } from "@/data/clusterRegistry";

interface ExpectedLinksMap {
  [url: string]: number;
}

export async function GET() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const expectedLinks: ExpectedLinksMap = {};

    for (const [clusterId, cluster] of Object.entries(CLUSTER_REGISTRY)) {
      const toolCount = cluster.toolSlugs.length;
      const articleCount = cluster.articleSlugs.length;
      
      const pillarUrl = `/pillars/${cluster.pillarSlug}`;
      expectedLinks[pillarUrl] = toolCount + articleCount;

      for (const toolSlug of cluster.toolSlugs) {
        const toolUrl = `/tools/${toolSlug}`;
        const siblingCount = toolCount - 1;
        const linksFromArticles = Math.min(articleCount, 3);
        const linkFromPillar = 1;
        expectedLinks[toolUrl] = siblingCount + linksFromArticles + linkFromPillar;
      }

      for (const articleSlug of cluster.articleSlugs) {
        const articleUrl = `/mbb/${articleSlug}`;
        const linksFromTools = Math.min(toolCount, 3);
        const otherArticles = Math.min(articleCount - 1, 2);
        const linkFromPillar = 1;
        expectedLinks[articleUrl] = linksFromTools + otherArticles + linkFromPillar;
      }
    }

    return NextResponse.json({ expectedLinks });
  } catch (error) {
    console.error("Failed to calculate expected links:", error);
    return NextResponse.json({ error: "Failed to calculate expected links" }, { status: 500 });
  }
}
