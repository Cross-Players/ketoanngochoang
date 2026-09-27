import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT } from "@/data/site";
import { requireSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = requireSiteUrl();
  return [
    {
      url: siteUrl.toString(),
      lastModified: new Date(`${CONTENT_UPDATED_AT}T00:00:00+07:00`),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        new URL("og-ngoc-hoang.png", siteUrl).toString(),
        new URL("logo-ngoc-hoang-512.png", siteUrl).toString(),
      ],
    },
    {
      url: new URL("gioi-thieu/", siteUrl).toString(),
      lastModified: new Date(`${CONTENT_UPDATED_AT}T00:00:00+07:00`),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
