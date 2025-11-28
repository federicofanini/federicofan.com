import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { IconMail, IconMapPin, IconBrandGithub } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function CVHeader() {
  return (
    <section id="cv-header">
      <div className="mx-auto w-full max-w-2xl py-14">
        <BlurFadeText
          delay={BLUR_FADE_DELAY}
          className="text-4xl font-museo font-bold tracking-tight sm:text-5xl mb-2"
          yOffset={8}
          text="Federico Fanini"
        />
        <BlurFade delay={BLUR_FADE_DELAY + 0.1}>
          <p className="text-xl text-muted-foreground font-medium mb-4">
            Full-Stack Engineer • Founder
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY + 0.2}>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a
              href="mailto:fed@uara.ai"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <IconMail className="size-4" />
              fed@uara.ai
            </a>
            <a
              href="https://github.com/federicofanini"
              className="flex items-center gap-1 hover:text-primary transition-colors"
              target="_blank"
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </a>
            <span className="flex items-center gap-1">
              <IconMapPin className="size-4" />
              Italy
            </span>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
