import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { getAllWritings } from "@/data/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url;

  // Define all your routes here
  const routes = ["", "/feedback", "/notes", "/manifesto"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add all writings (notes and journey) dynamically - all use /notes/[slug] route
  const posts = await getAllWritings();
  const writingsRoutes = posts.map((post) => ({
    url: `${baseUrl}/notes/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...routes, ...writingsRoutes];
}
