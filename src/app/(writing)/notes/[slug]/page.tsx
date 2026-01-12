import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { IconCalendar } from "@tabler/icons-react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug, "notes");

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
  let post = await getPost(params.slug, "notes");

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
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to notes
      </Link>

      {/* Header section */}
      <header className="mb-8">
        {/* Title */}
        <h1 className="font-semibold text-2xl md:text-3xl tracking-tight mb-4 font-museo">
          {post.metadata.title}
        </h1>

        {/* Date */}
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
            <IconCalendar className="size-3" />
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
      </header>

      {/* Featured image */}
      {post.metadata.image && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
      <p className="text-sm text-muted-foreground font-museo mt-4">
        Federico Fan
      </p>
    </main>
  );
}
