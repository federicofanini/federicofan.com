"use client";

import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { IconBriefcase } from "@tabler/icons-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { WebsiteTiers } from "./website-tiers";

const BLUR_FADE_DELAY = 0.0;

export function WebsitesBanner() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: true, layout: "month_view" });
    })();
  }, []);

  return (
    <section id="websites">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="text-lg font-bold font-museo flex items-center gap-2">
          My tiny agency
          <IconBriefcase className="size-5 text-primary" />
        </h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <span className="text-md text-muted-foreground">
          I also build websites as a{" "}
          <span className="font-semibold text-primary">freelancer</span>.
          <br />
          <br />
          My approach is simple:{" "}
          <span className="font-semibold text-primary">clean design</span>,{" "}
          <span className="font-semibold text-primary">fast performance</span>,
          and <span className="font-semibold text-primary">quick delivery</span>
          .
          <br />
          No bloated frameworks. No unnecessary complexity.
          <br />
          <br />I use{" "}
          <span className="font-semibold text-primary">Next.js</span>,{" "}
          <span className="font-semibold text-primary">Tailwind</span>, and{" "}
          <span className="font-semibold text-primary">modern tools</span> to
          ship websites that actually convert.
          <br />
          Perfect for{" "}
          <span className="font-semibold text-primary">
            startups, agencies, and businesses
          </span>{" "}
          that need to move fast.
        </span>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <WebsiteTiers />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 font-museo">
            Or book a call to discuss your project
          </h3>
          <div className="rounded-xl border bg-card overflow-hidden h-[600px]">
            <Cal
              namespace="30min"
              calLink="fedef/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
