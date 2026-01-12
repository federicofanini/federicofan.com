import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { IconMailFilled, IconMapPin, IconNfc } from "@tabler/icons-react";
import Link from "next/link";
import { SocialsSmall } from "@/components/sections/socials";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "Lost & Found",
  description: "Help return a lost item to its owner",
};

export default function LostPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="lost-and-found">
        <div className="mx-auto w-full max-w-2xl py-14">
          <div className="flex flex-col space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="flex items-center gap-3">
                  <IconMapPin className="size-8 text-primary" />
                  <h1 className="text-4xl font-museo font-bold tracking-tight">
                    Thank You
                  </h1>
                </div>
              </BlurFade>

              <BlurFadeText
                delay={BLUR_FADE_DELAY * 2}
                className="text-xl text-muted-foreground leading-relaxed"
                yOffset={8}
                text="You've found something that belongs to me. I really appreciate you taking the time to help return it."
              />
            </div>

            {/* NFC Explanation */}
            <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border">
                <IconNfc className="size-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">What just happened?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You scanned an NFC tag attached to this item. This tag
                    contains information to help return it to its owner.
                  </p>
                </div>
              </div>
            </BlurFade>

            {/* Instructions */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="space-y-4 pt-4">
                <h2 className="text-lg font-museo font-semibold">
                  How to return it
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Please send me an email with details about where you found it,
                  and we&apos;ll coordinate the best way to get it back. Your
                  kindness means a lot.
                </p>
              </div>
            </BlurFade>

            {/* Contact Button */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Link
                href="mailto:fed@uara.ai?subject=Found Your Item&body=Hi Federico,%0D%0A%0D%0AI found your item. Here are the details:%0D%0A%0D%0A"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium w-fit"
              >
                <IconMailFilled className="size-5" />
                Contact via Email
              </Link>
            </BlurFade>

            {/* Email Display */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  You can also reach me directly at{" "}
                  <Link
                    href="mailto:fed@uara.ai"
                    className="text-foreground hover:underline transition-colors font-semibold"
                  >
                    fed@uara.ai
                  </Link>
                </p>
              </div>
            </BlurFade>

            {/* Socials */}
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="pt-8 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Since we&apos;re getting in contact in such an uncommon way,
                  consider checking out my stuff
                </p>
                <SocialsSmall />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
