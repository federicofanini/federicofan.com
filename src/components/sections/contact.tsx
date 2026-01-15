import BlurFade from "../magicui/blur-fade";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { IconMail, IconBrandX } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function Contact() {
  return (
    <section id="contact">
      <div>
        <div className="mx-auto max-w-5xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <h2 className="text-md uppercase text-muted-foreground font-mono">
              Get in touch
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="space-y-6">
              {/* X/Twitter */}
              <div className="group relative">
                <div className="flex items-center gap-2 mb-2">
                  <IconBrandX className="size-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Want to chat?{" "}
                    <Link
                      href={DATA.contact.social.X.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline transition-colors font-semibold"
                    >
                      DM me on X
                    </Link>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="group relative">
                <div className="flex items-center gap-2 mb-2">
                  <IconMail className="size-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    For anything else:{" "}
                    <Link
                      href={`mailto:${DATA.contact.email}`}
                      className="text-foreground hover:underline transition-colors font-semibold"
                    >
                      {DATA.contact.email}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
