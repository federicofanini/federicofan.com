import BlurFade from "@/components/magicui/blur-fade";
import { getJourneyPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { IconCalendar } from "@tabler/icons-react";

export const metadata = {
  title: "Journey",
  description: "My startup life, lessons learned, and stories along the way.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function JourneyPage() {
  const posts = await getJourneyPosts();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl mx-auto py-12 px-4">
      <section id="header">
        <div className="mx-auto w-full max-w-2xl py-10">
          <div className="group flex flex-col gap-6 items-start">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="text-4xl font-museo font-semibold tracking-tight sm:text-4xl mb-2">
                Journey
              </h1>
              <p className="text-muted-foreground text-lg font-medium max-w-2xl">
                My startup life, lessons learned, and stories along the way.
              </p>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="list">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col gap-4">
            {posts
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post, id) => (
                <BlurFade
                  delay={BLUR_FADE_DELAY * 3 + id * 0.05}
                  key={post.slug}
                >
                  <Link
                    className="group block py-4 border-b border-border hover:border-foreground/20 transition-colors"
                    href={`/journey/${post.slug}`}
                  >
                    <div className="flex gap-4 items-start">
                      {post.metadata.image && (
                        <div className="relative w-20 h-20 rounded overflow-hidden shrink-0">
                          <Image
                            src={post.metadata.image}
                            alt={post.metadata.title}
                            className="object-cover"
                            width={80}
                            height={80}
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-4">
                          <h2 className="text-lg font-medium group-hover:text-foreground/70 transition-colors font-museo">
                            {post.metadata.title}
                          </h2>
                          <p className="text-[10px] text-muted-foreground shrink-0 font-mono flex items-center gap-1">
                            <IconCalendar className="size-3" />
                            {new Date(
                              post.metadata.publishedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {post.metadata.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                </BlurFade>
              ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles yet. Check back soon...
              </p>
            </div>
          )}
        </BlurFade>
      </section>
    </main>
  );
}
