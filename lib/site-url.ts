import { PUBLIC_BASE_PATH } from "@/lib/site-paths";

const UNSAFE_HOSTNAMES: Record<string, true> = { localhost: true, "127.0.0.1": true, "::1": true };

/**
 * Returns the configured public URL only when it is an absolute web URL and
 * does not point at a local development host. No fallback domain is emitted.
 */
export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return undefined;
  }

  try {
    const url = new URL(configuredUrl);
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username ||
      url.password ||
      !hostname ||
      UNSAFE_HOSTNAMES[hostname] === true ||
      hostname.endsWith(".local") ||
      (url.pathname !== PUBLIC_BASE_PATH && url.pathname !== `${PUBLIC_BASE_PATH}/`) ||
      url.search ||
      url.hash
    ) {
      return undefined;
    }

    if (url.pathname === PUBLIC_BASE_PATH) {
      url.pathname = `${PUBLIC_BASE_PATH}/`;
    }
    return url;
  } catch {
    return undefined;
  }
}

export function requireSiteUrl(): URL {
  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL to the public site URL (for example, https://ketoanngochoang.com.vn/) before requesting sitemap.xml or robots.txt.",
    );
  }
  return siteUrl;
}

