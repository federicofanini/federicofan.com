import BlurFade from "@/components/magicui/blur-fade";
import { IconUser } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function CVProfile() {
  return (
    <section id="cv-profile">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Profile
            <IconUser className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <p className="text-md text-muted-foreground leading-relaxed">
            Full‑stack engineer and tech founder with experience building
            complex SaaS systems, IoT medical platforms, AI products, and
            multi‑tenant architectures. I ship fast, own full verticals
            (backend, frontend, infra), and operate with a founder mindset.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
