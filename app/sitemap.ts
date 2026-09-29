import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/data/services";
import { CONTENT_UPDATED_AT, ROUTES, WORKFLOW_STEPS } from "@/data/site";
import { routeToPath } from "@/lib/seo";
import { requireSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = requireSiteUrl();
  const updated = new Date(`${CONTENT_UPDATED_AT}T00:00:00+07:00`);
  const url = (route: string) => new URL(routeToPath(route), siteUrl).toString();
  return [
    {
      url: siteUrl.toString(),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      images: [url("/og-ngoc-hoang.png"), url("/logo-ngoc-hoang-512.png")],
    },
    ...SERVICE_PAGES.map((page) => ({
      url: url(ROUTES.detail(page.slug)),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: url(ROUTES.about),
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...WORKFLOW_STEPS.map((step) => ({
      url: url(ROUTES.detail(step.slug)),
      lastModified: updated,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
