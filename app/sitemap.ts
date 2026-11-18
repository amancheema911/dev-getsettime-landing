import type { MetadataRoute } from "next";
import { BASE_URL } from "../lib/config";
import { blogPosts } from "../lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    "",
    "/pricing",
    "/solutions",
    "/features",
    "/contact-us",
    "/help-center",
    "/claim-now-free-appointment-scheduling-software",
    "/blog",
    
    "/solutions/doctor-appointment-scheduling-software",
    "/solutions/dentist-appointment-scheduling-software",
    "/solutions/tutor-appointment-booking-software",
    "/solutions/salon-appointment-scheduling-software",
    "/solutions/physiotherapist-appointment-booking-software",
    "/solutions/dermatology-appointment-scheduling-software",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified,
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
