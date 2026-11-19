import type { MetadataRoute } from "next";
import { recipes } from "@/lib/recipes";

/** The site's own canonical origin, used by metadata, robots.txt and sitemap.xml. */
export const SITE_URL = "https://recipe.bookchaowalit.com";

export function buildSitemap(base: string = SITE_URL): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...recipes.map((recipe) => ({ url: `${base}/recipes/${recipe.id}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

export function buildRobots(base: string = SITE_URL): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${base}/sitemap.xml` };
}
