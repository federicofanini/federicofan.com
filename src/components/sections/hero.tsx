import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Image from "next/image";
import { SocialsSmall } from "./socials";

const BLUR_FADE_DELAY = 0.0;

export function Hero() {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl">
        <div className="group flex gap-4 items-center">
          <div className="flex-col flex flex-1 space-y-1">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-2xl font-museo font-bold tracking-tight sm:text-3xl transition-all duration-500 group-hover:tracking-tighter"
              yOffset={8}
              text={`${DATA.name.split(" ")[0]} here 👋🏼`}
            />
            <BlurFadeText
              className="max-w-[600px] text-sm md:text-base font-mono text-muted-foreground transition-all duration-500 group-hover:text-foreground"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
