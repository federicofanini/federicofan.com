import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.0;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="max-w-[800px] mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-medium text-2xl tracking-tighter">Blog</h1>
          <p className="text-muted-foreground">
            My thoughts and learnings on software development, startups, and
            life.
          </p>
        </div>
      </BlurFade>

      <div className="grid gap-8">
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
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link className="group font-mono" href={`/blog/${post.slug}`}>
                <div className="rounded-lg border bg-black/80 overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-red-500" />
                      <div className="size-3 rounded-full bg-yellow-500" />
                      <div className="size-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-zinc-400">blog.post</div>
                    <div className="w-16" /> {/* Spacer to center filename */}
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 group-hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-start gap-2 text-green-500">
                      <span>$</span>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="text-blue-400">cat</span>{" "}
                          {post.metadata.title}
                        </div>
                        <p className="mt-2 text-xs text-zinc-400 line-clamp-2">
                          {post.metadata.summary}
                        </p>
                        <div className="mt-2 text-xs text-zinc-500">
                          Published:{" "}
                          {new Date(
                            post.metadata.publishedAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
      </div>
    </section>
  );
}
