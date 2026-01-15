"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { PostWithType } from "@/data/blog";
import { IconCalendar } from "@tabler/icons-react";
import BlurFade from "@/components/magicui/blur-fade";

type Tag = string;

interface WritingsListProps {
  allPosts: PostWithType[];
  allTags: string[];
}

const BLUR_FADE_DELAY = 0.04;

// Color palette for different post types and tags
const getPostColor = (post: PostWithType, index: number) => {
  const colors = [
    {
      bg: "bg-blue-400",
      border: "border-blue-400/30",
      borderHover: "hover:border-blue-400/60",
    },
    {
      bg: "bg-purple-400",
      border: "border-purple-400/30",
      borderHover: "hover:border-purple-400/60",
    },
    {
      bg: "bg-amber-400",
      border: "border-amber-400/30",
      borderHover: "hover:border-amber-400/60",
    },
    {
      bg: "bg-rose-400",
      border: "border-rose-400/30",
      borderHover: "hover:border-rose-400/60",
    },
    {
      bg: "bg-cyan-400",
      border: "border-cyan-400/30",
      borderHover: "hover:border-cyan-400/60",
    },
  ];
  return colors[index % colors.length];
};

export default function WritingsList({ allPosts, allTags }: WritingsListProps) {
  const [selectedTag, setSelectedTag] = useQueryState("tag", {
    defaultValue: "all",
    shallow: false,
  });

  const filteredPosts = allPosts.filter((post) => {
    if (selectedTag === "all") return true;
    if (selectedTag === "notes" || selectedTag === "journey") {
      return post.type === selectedTag;
    }
    return post.metadata.tags?.includes(selectedTag);
  });

  // Sort by date: most recent first (descending order)
  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt).getTime();
    const dateB = new Date(b.metadata.publishedAt).getTime();
    return dateB - dateA; // Newest first
  });

  const availableTags: Tag[] = ["all", "notes", "journey", ...allTags];

  return (
    <div className="flex flex-col space-y-10">
      <section id="header">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-md uppercase text-muted-foreground font-mono pb-4">
              All Writings
            </h1>
            <p className="text-muted-foreground text-balance text-lg text-justify">
              Notes, journey entries, and thoughts—documented as they happen.
            </p>
          </BlurFade>

          {/* Tag Filter */}
          <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
            <div className="pt-4">
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium mb-3">
                Filter
              </p>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      selectedTag === tag
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        selectedTag === tag
                          ? "bg-foreground scale-125"
                          : "bg-muted-foreground/50"
                      } transition-all`}
                    />
                    <span className="font-mono text-sm">{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="list">
        <div className="mx-auto max-w-2xl space-y-6">
          {sortedPosts.map((post, id) => {
            const colors = getPostColor(post, id);
            return (
              <BlurFade
                delay={BLUR_FADE_DELAY * 3 + id * 0.05}
                key={`${post.slug}-${post.type}`}
              >
                <Link
                  href={`/${post.type}/${post.slug}`}
                  className={`group relative pl-6 border-l-2 ${colors.border} ${colors.borderHover} transition-colors block`}
                >
                  <div
                    className={`absolute -left-[5px] top-2 w-2 h-2 rounded-full ${colors.bg}`}
                  />

                  <div className="space-y-2 pb-6">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-museo font-semibold text-base group-hover:text-foreground/70 transition-colors">
                        {post.metadata.title}
                      </h2>
                      <div className="flex items-center gap-2 shrink-0">
                        <Image
                          src="/me.png"
                          alt="Federico Fan"
                          className="rounded-md object-cover border border-border"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.metadata.summary}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono pt-1">
                      <div className="flex items-center gap-1">
                        <IconCalendar className="size-3" />
                        {new Date(post.metadata.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <span className="opacity-30">·</span>
                      <span className="capitalize opacity-60">{post.type}</span>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            );
          })}

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">
                No writings found. Try selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
