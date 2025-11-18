import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";

const BLUR_FADE_DELAY = 0.04;

export function WebsitesBanner() {
  return (
    <section id="websites" className="space-y-4 w-full py-2">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="text-lg font-bold font-mono">My tiny agency</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          Need a clean, fast website for your startup or business? No carousels.
          No pop-ups. Just elegant design and quick turnaround.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="flex flex-wrap gap-2">
          <Link
            href="https://uara.co"
            target="_blank"
            className="text-sm hover:underline underline-offset-4 flex items-center gap-1"
          >
            See more at{" "}
            <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">
              uara.co
            </span>
            <ExternalLinkIcon className="size-2.5" />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}
