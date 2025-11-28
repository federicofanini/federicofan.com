import BlurFade from "@/components/magicui/blur-fade";
import { IconStar } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.0;

const strengths = [
  "End‑to‑end product builder",
  "Founder mindset and execution speed",
  "Deep technical range across AI, medtech, SaaS, and IoT",
  "Comfortable with ambiguity, fast iteration, and owning outcomes",
];

export function CVStrengths() {
  return (
    <section id="cv-strengths">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Strengths
            <IconStar className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <Badge
                key={strength}
                variant="outline"
                className="text-xs py-1.5"
              >
                {strength}
              </Badge>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
