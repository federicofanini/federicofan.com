import { getRawPageContent } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";
import { manifestoComponents } from "./_components/manifesto-mdx";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const page = getRawPageContent("manifesto");

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = page.metadata as any;

  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/manifesto`,
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

export default async function ManifestoPage() {
  const page = getRawPageContent("manifesto");
  const metadata = page.metadata as any;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.summary,
            image: metadata.image
              ? `${DATA.url}${metadata.image}`
              : `${DATA.url}/og?title=${metadata.title}`,
            url: `${DATA.url}/manifesto`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      <div className="mx-auto w-full max-w-5xl py-8">
        {/* Header Section */}
        <header className="mb-16 space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase font-mono text-muted-foreground tracking-widest">
              {metadata.publishedAt &&
                new Date(metadata.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
            </p>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
              {metadata.title || "Manifesto"}
            </h1>
          </div>

          {metadata.summary && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {metadata.summary}
            </p>
          )}

          <Separator className="my-8" />

          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-md overflow-hidden border border-border">
              <Image
                src="/me.png"
                alt="Federico Fan"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">Federico Fan</p>
              <Link
                href="https://dub.sh/fedef"
                className="text-xs text-muted-foreground font-mono hover:underline hover:underline-offset-4 hover:text-foreground transition-colors"
                target="_blank"
              >
                @FedericoFan
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="max-w-none">
          <MDXRemote
            source={page.content}
            components={manifestoComponents as any}
          />
        </article>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground italic">
            Living document · Last updated{" "}
            {metadata.publishedAt &&
              new Date(metadata.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
          </p>
        </footer>
      </div>
    </>
  );
}
