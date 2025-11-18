import { DATA } from "@/data/resume";
import BlurFade from "../magicui/blur-fade";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.0;

export function SocialsSmall() {
  return (
    <section id="socials">
      <div className="flex min-h-0 flex-col gap-y-1">
        <BlurFade delay={BLUR_FADE_DELAY * 4.7}>
          <div className="flex gap-2">
            {Object.values(DATA.contact.social).map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center size-8 rounded-md border bg-background hover:bg-accent transition-colors"
              >
                <social.icon className="size-4" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
