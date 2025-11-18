"use client";

import { useState } from "react";
import BlurFade from "../magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ResumeCard } from "../resume-card";
import { Button } from "../ui/button";

const BLUR_FADE_DELAY = 0.0;
const INITIAL_DISPLAY_COUNT = 6;

export function Work() {
  const [showAll, setShowAll] = useState(false);
  const displayedWork = showAll
    ? DATA.work
    : DATA.work.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = DATA.work.length > INITIAL_DISPLAY_COUNT;

  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <h2 className="text-lg font-bold font-mono">My startups</h2>
        </BlurFade>
        {displayedWork.map((work, id) => (
          <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? "Present"}`}
              description={work.description}
              abandoned={work.abandoned}
            />
          </BlurFade>
        ))}
        {hasMore && (
          <BlurFade
            delay={BLUR_FADE_DELAY * 11 + displayedWork.length * 0.05}
            className="flex justify-center"
          >
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="mt-2"
            >
              {showAll ? "Show less" : "Show more"}
            </Button>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
