import type { MetadataRoute } from "next";
import { BASE_URL } from "../lib/config";

export default function robots(): MetadataRoute.Robots {

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/admin/',
        '/login/',
        '/signup/private',
        '/privacy-policy',
        '/terms-of-conditions',
        '/not-found',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

