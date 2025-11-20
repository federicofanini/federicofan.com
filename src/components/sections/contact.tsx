import BlurFade from "../magicui/blur-fade";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { IconBrandLine } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function Contact() {
  return (
    <section id="contact">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <h2 className="text-lg font-bold font-museo flex items-center gap-2">
          Contact
          <IconBrandLine className="size-5 text-primary" />
        </h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 17}>
        <p className="text-sm text-muted-foreground">
          Want to chat?{" "}
          <Link
            href={DATA.contact.social.X.url}
            className="text-foreground hover:underline transition-colors font-semibold"
          >
            DM me on X
          </Link>
          .
        </p>
      </BlurFade>
    </section>
  );
}
