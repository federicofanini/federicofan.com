import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Image from "next/image";
import { SocialsSmall } from "./socials";

const BLUR_FADE_DELAY = 0.0;

export function Hero() {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl py-14">
        <div className="group flex gap-4 items-center">
          <div className="flex-col flex flex-1 space-y-1">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-museo font-semibold tracking-tight sm:text-4xl"
              yOffset={8}
              text={DATA.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
