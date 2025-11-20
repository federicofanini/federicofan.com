import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { IconBriefcase } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function WebsitesBanner() {
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
          Need a{" "}
          <span className="font-semibold text-primary">
            clean, fast website
          </span>{" "}
          for your startup or business?
          <br />
          No carousels. No pop-ups.
          <br />
          Just{" "}
          <span className="font-semibold text-primary">
            elegant design
          </span> and{" "}
          <span className="font-semibold text-primary">quick turnaround</span>.
        </span>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <span className="text-md text-muted-foreground">
          <br />
          See more at{" "}
          <Link
            href="https://uara.co"
            target="_blank"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            uara.co
          </Link>
        </span>
      </BlurFade>
    </section>
  );
}
