"use client";

import { HomepageFeedback } from "@/components/feedback/homepage-feedback";
import { getTopFeedbacks } from "@/data/feedback";
import { IconBrandBilibili, IconLink } from "@tabler/icons-react";
import { SocialsSmall } from "./socials";
import BlurFade from "../magicui/blur-fade";
import { useEffect, useState } from "react";
import { YouTubeEmbed } from "./yt-embed";

const BLUR_FADE_DELAY = 0.04;

interface FeedbackType {
  id: string;
  message: string;
  upvotes: number;
  createdAt: Date;
  username: string | null;
}

export function Documenting() {
  const [topFeedbacks, setTopFeedbacks] = useState<FeedbackType[]>([]);

  useEffect(() => {
    getTopFeedbacks().then((res) => {
      if (res.success && res.data) {
        setTopFeedbacks(res.data);
      }
    });
  }, []);

  return (
    <section id="documenting">
      <div className="space-y-4 w-full py-8">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Documenting my life
            <IconBrandBilibili className="size-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              starting soon...
            </span>
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <span className="text-md text-muted-foreground">
            I&apos;m <span className="font-semibold text-primary">26yo</span>{" "}
            and I&apos;ve never documented my life before. Now things have
            changed.
          </span>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <YouTubeEmbed videoId="" />
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2 mb-4">
            All my links
            <IconLink className="size-5 text-primary" />
          </h2>
          <SocialsSmall />
        </BlurFade>

        {/* <HomepageFeedback topFeedbacks={topFeedbacks} /> */}
      </div>
    </section>
  );
}
