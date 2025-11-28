import BlurFade from "@/components/magicui/blur-fade";
import { IconBulb } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function CVInterests() {
  return (
    <section id="cv-interests">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Interests
            <IconBulb className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <p className="text-sm text-muted-foreground">
            MedTech innovation, applied AI, IoT systems, founder psychology,
            high-performance workflows, blockchain ecosystems.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
