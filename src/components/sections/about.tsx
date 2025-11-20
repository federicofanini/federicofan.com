import BlurFade from "../magicui/blur-fade";
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";
import { IconTooltip } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function About() {
  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="text-lg font-bold font-museo flex items-center gap-2">
          About
          <IconTooltip className="size-5 text-primary" />
        </h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <span className="text-md text-muted-foreground">
          I&apos;m <span className="font-semibold text-primary">26yo</span> and
          I&apos;ve never documented my life before. Now things have changed.
          <br />
          <br />
        </span>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <span className="text-md text-muted-foreground">
          I&apos;ve spent most of my life working{" "}
          <span className="font-semibold text-primary">quietly</span>.
          <br />
          <span className="font-semibold text-primary">Two degrees</span>, a
          pandemic, and a medtech startup built from nothing.
          <br />
          Now I&apos;m closing that chapter and starting{" "}
          <span className="font-semibold text-primary">a new one</span>.
          <br />
          <br />
          For the first time, I&apos;m choosing to document what I&apos;m{" "}
          <span className="font-semibold text-primary">building</span>, what I’m{" "}
          <span className="font-semibold text-primary">learning</span>, and
          where I&apos;m{" "}
          <span className="font-semibold text-primary">headed</span>.
          <br />
          No polish. No script. Just the{" "}
          <span className="font-semibold text-primary">real process</span>.
          <br />
          <br />I don&apos;t have a{" "}
          <span className="font-semibold text-primary">
            digital footprint
          </span>{" "}
          yet — but I do have a story, and I&apos;m figuring out how to tell it.
          <br />
          If you&apos;re here, you&apos;re{" "}
          <span className="font-semibold text-primary">
            part of this beginning
          </span>
          .
        </span>
      </BlurFade>
    </section>
  );
}
