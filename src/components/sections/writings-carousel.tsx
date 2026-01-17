"use client";

import Link from "next/link";
import { PostWithType } from "@/data/blog";

interface WritingsCarouselProps {
  writings: PostWithType[];
}

export function WritingsCarousel({ writings }: WritingsCarouselProps) {
  return (
    <section>
      <div className="mx-auto max-w-6xl">
        <h3 className="text-md uppercase text-muted-foreground font-mono mb-4">
          Writings:
        </h3>
        {/* Scrollable Container */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {writings.slice(0, 3).map((writing) => {
              const writingUrl = `/notes/${writing.slug}`;
              return (
                <Link
                  key={writing.slug}
                  href={writingUrl}
                  className="flex-shrink-0 w-72 group"
                >
                  <article className="h-full rounded border border-border/50 overflow-hidden hover:border-border transition-colors">
                    {/* Small Image */}
                    {writing.metadata.image && (
                      <div className="relative w-full h-32 bg-muted">
                        <img
                          src={writing.metadata.image}
                          alt={writing.metadata.title}
                          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                        {writing.type}
                      </div>
                      <h3 className="text-sm font-semibold mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                        {writing.metadata.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {writing.metadata.summary}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Small View All Button */}
        <div className="flex justify-center mt-4">
          <Link
            href="/notes"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            view all
          </Link>
        </div>
      </div>
    </section>
  );
}
