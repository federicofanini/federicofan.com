import BlurFade from "../magicui/blur-fade";
import { XGrowthSummary } from "../x-growth-summary";

const BLUR_FADE_DELAY = 0.0;

export function XGrowth() {
  return (
    <section id="x-growth">
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className="text-lg font-bold font-mono">Social Growth</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <XGrowthSummary />
      </BlurFade>
    </section>
  );
}
