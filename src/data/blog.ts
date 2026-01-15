import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeYouTube } from "@/lib/rehype-youtube";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
};

export type ContentType = "notes" | "journey";

export type PostWithType = {
  metadata: Metadata;
  slug: string;
  source: string;
  type: ContentType;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

// Cache the unified processor to avoid creating multiple Shiki instances
let cachedProcessor: any = null;

function getProcessor() {
  if (!cachedProcessor) {
    cachedProcessor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeYouTube)
      .use(rehypePrettyCode, {
        // https://rehype-pretty.pages.dev/#usage
        theme: {
          light: "min-light",
          dark: "min-dark",
        },
        keepBackground: false,
      })
      .use(rehypeStringify, { allowDangerousHtml: true });
  }
  return cachedProcessor;
}

export async function markdownToHTML(markdown: string) {
  const p = await getProcessor().process(markdown);
  return p.toString();
}

export async function getPost(slug: string, type: ContentType = "notes") {
  const filePath = path.join("content", type, `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

async function getAllPosts(
  dir: string,
  type: ContentType
): Promise<
  {
    metadata: Metadata;
    slug: string;
    source: string;
  }[]
> {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug, type);
      return {
        metadata: metadata as Metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content", "notes"), "notes");
}

export async function getJourneyPosts() {
  return getAllPosts(path.join(process.cwd(), "content", "journey"), "journey");
}

// Aggregate all writings from both notes and journey
export async function getAllWritings(): Promise<PostWithType[]> {
  const [notePosts, journeyPosts] = await Promise.all([
    getBlogPosts(),
    getJourneyPosts(),
  ]);

  const notesWithType: PostWithType[] = notePosts.map((post) => ({
    ...post,
    type: "notes" as ContentType,
  }));

  const journeyWithType: PostWithType[] = journeyPosts.map((post) => ({
    ...post,
    type: "journey" as ContentType,
  }));

  const allPosts = [...notesWithType, ...journeyWithType];

  // Sort by date: most recent first (descending order)
  return allPosts.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt).getTime();
    const dateB = new Date(b.metadata.publishedAt).getTime();
    return dateB - dateA; // Newest first
  });
}

// Get all unique tags from all writings
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllWritings();
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).sort();
}

// Get standalone page content (like manifesto)
export async function getPageContent(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

// Get raw MDX content for client-side rendering
export function getRawPageContent(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  return {
    content: rawContent,
    metadata,
    slug,
  };
}
