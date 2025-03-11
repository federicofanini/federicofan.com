import { getStartup, getStartups } from "@/data/startup";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const startups = await getStartups();
  return startups.map((startup) => ({ slug: startup.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let startup = await getStartup(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    description,
    image,
  } = startup.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/startup/${startup.slug}`,
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

export default async function Startup({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let startup = await getStartup(params.slug);

  if (!startup) {
    notFound();
  }

  return (
    <section id="startup">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: startup.metadata.title,
            datePublished: startup.metadata.publishedAt,
            dateModified: startup.metadata.publishedAt,
            description: startup.metadata.description,
            image: startup.metadata.image
              ? `${DATA.url}${startup.metadata.image}`
              : `${DATA.url}/og?title=${startup.metadata.title}`,
            url: `${DATA.url}/startup/${startup.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {startup.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(startup.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: startup.source }}
      ></article>
    </section>
  );
}
