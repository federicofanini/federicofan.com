"use client";

import { useState } from "react";
import BlurFade from "../magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ResumeCard } from "../resume-card";
import { Button } from "../ui/button";
import {
  IconArrowAutofitDown,
  IconArrowDown,
  IconArrowUpRight,
  IconLego,
} from "@tabler/icons-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.0;
const INITIAL_DISPLAY_COUNT = 6;

export function Startups() {
  const [showAll, setShowAll] = useState(false);
  const displayedWork = showAll
    ? DATA.work
    : DATA.work.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = DATA.work.length > INITIAL_DISPLAY_COUNT;

  return (
    <section id="startups">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 10} className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-museo flex items-center gap-2">
              My startups
              <IconLego className="size-5" />
            </h2>
            <Button
              variant="secondary"
              className="rounded-full py-2 gap-2 items-center"
              size="sm"
            >
              <Link href="/startups" className="flex items-center gap-2">
                View All
                <IconArrowUpRight className="size-5 bg-white text-black rounded-full p-1" />
              </Link>
            </Button>
          </div>
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
              sale={work.sale}
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
              className="mt-2 font-museo hover:text-secondary hover:bg-transparent"
            >
              {showAll ? "Show less" : "Show more"}
            </Button>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
