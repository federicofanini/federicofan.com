import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { getBlogPosts, getJourneyPosts } from "@/data/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url;

  // Define all your routes here
  const routes = [
    "",
    "/startups",
    "/feedback",
    "/journey",
    "/notes",
    "/agency",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add notes/blog posts dynamically
  const posts = await getBlogPosts();
  const notesRoutes = posts.map((post) => ({
    url: `${baseUrl}/notes/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Add journey posts dynamically
  const journeyPosts = await getJourneyPosts();
  const journeyRoutes = journeyPosts.map((post) => ({
    url: `${baseUrl}/journey/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...routes, ...notesRoutes, ...journeyRoutes];
}
