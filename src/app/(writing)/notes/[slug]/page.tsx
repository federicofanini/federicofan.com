import { getAllWritings, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { IconCalendar } from "@tabler/icons-react";
import { SocialsShowcase } from "@/components/sections/socials-showcase";

export async function generateStaticParams() {
  const posts = await getAllWritings();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  // Try to find the post in both notes and journey
  let post;
  try {
    post = await getPost(params.slug, "notes");
  } catch {
    try {
      post = await getPost(params.slug, "journey");
    } catch {
      return undefined;
    }
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/notes/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Note({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  // Try to find the post in both notes and journey
  let post;
  try {
    post = await getPost(params.slug, "notes");
  } catch {
    try {
      post = await getPost(params.slug, "journey");
    } catch {
      notFound();
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-[100dvh] max-w-2xl mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/notes/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      {/* Back button */}
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group font-mono"
      >
        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Back
      </Link>

      {/* Header section */}
      <header className="mb-12 space-y-6">
        {/* Metadata line */}
        <Suspense fallback={<p className="h-5" />}>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <IconCalendar className="size-3" />
              {formatDate(post.metadata.publishedAt)}
            </div>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <>
                <span className="opacity-30">·</span>
                <div className="flex gap-1.5">
                  {post.metadata.tags
                    .filter(
                      (tag: string) => tag !== "notes" && tag !== "journey"
                    )
                    .map((tag: string) => (
                      <span key={tag} className="capitalize">
                        {tag}
                      </span>
                    ))}
                </div>
              </>
            )}
          </div>
        </Suspense>

        {/* Title */}
        <h1 className="font-semibold text-3xl md:text-4xl tracking-tight font-museo">
          {post.metadata.title}
        </h1>
      </header>

      {/* Featured image with 5:2 aspect ratio */}
      {post.metadata.image && (
        <div className="relative w-full aspect-[5/2] rounded-lg overflow-hidden mb-12 border border-border">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            className="object-cover "
            priority
          />
        </div>
      )}

      {/* Content */}
      <article
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-museo prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-sm prose-pre:border prose-pre:border-border"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>

      {/* Author signature */}
      <div className="mt-16 pt-8 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-md overflow-hidden border border-border">
            <Image
              src="/me.png"
              alt="Federico Fan"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium font-museo">Federico Fan</p>
            <p className="text-xs text-muted-foreground font-mono">
              Building Uara
            </p>
          </div>
        </div>
      </div>

      {/* Socials Footer CTA */}
      <SocialsShowcase />
    </main>
  );
}
