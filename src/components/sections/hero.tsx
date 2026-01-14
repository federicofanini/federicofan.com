import { DATA } from "@/data/resume";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { FaceScanIllustration } from "../illustrations/face-scan";

const BLUR_FADE_DELAY = 0.0;

export function Hero() {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl py-8">
        <div className="group flex gap-4 items-center">
          <div className="flex-col flex flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8">
              <FaceScanIllustration />
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-museo font-semibold tracking-tight sm:text-3xl text-center mt-8"
                yOffset={8}
                text={DATA.description}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
