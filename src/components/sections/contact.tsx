import BlurFade from "../magicui/blur-fade";
import Link from "next/link";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.0;

export function Contact() {
  return (
    <section id="contact">
      <div className="grid items-start justify-start gap-4 text-start w-full py-4">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <h2 className="text-lg font-bold font-mono">Contact</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed">
            Want to chat? Just shoot me a dm{" "}
            <Link
              href={DATA.contact.social.X.url}
              className="text-white hover:underline font-semibold"
            >
              with a direct question on twitter
            </Link>{" "}
            and I&apos;ll respond whenever I can.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
