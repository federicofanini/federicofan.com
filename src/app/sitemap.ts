import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url;

  // Define all your routes here
  const routes = [
    "",
    "/startups",
    "/feedback",
    "/journey",
    "/blog",
    "/agency",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add blog posts dynamically if you have them
  // You can fetch blog post slugs here and add them to the sitemap

  return routes;
}
