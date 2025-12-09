import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, AdminSessionData } from "@/lib/admin-session";
import { CLUSTER_REGISTRY } from "@/data/clusterRegistry";
import { query } from "@/lib/db";

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
    const legacyTools: string[] = [];

    const cmsToolsResult = await query(
      `SELECT slug FROM cms_objects WHERE type = 'tool'`
    );
    const cmsToolSlugs = new Set<string>(cmsToolsResult.rows.map((r: any) => r.slug));

    const toolUrlsResult = await query(
      `SELECT url FROM global_urls 
       WHERE url LIKE '/tools/%' 
       AND url NOT LIKE '/tools/all' 
       AND url NOT LIKE '/tools/clusters/%' 
       AND url NOT LIKE '%/embed' 
       AND url NOT LIKE '%/success'
       AND url NOT LIKE '%[slug]%'`
    );

    for (const row of toolUrlsResult.rows) {
      const slug = row.url.replace('/tools/', '');
      if (!cmsToolSlugs.has(slug)) {
        legacyTools.push(row.url);
      }
    }

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

    return NextResponse.json({ expectedLinks, legacyTools });
  } catch (error) {
    console.error("Failed to calculate expected links:", error);
    return NextResponse.json({ error: "Failed to calculate expected links" }, { status: 500 });
  }
}
