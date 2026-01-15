import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { IconHome, IconCompass, IconLego, IconBook } from "@tabler/icons-react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { NotFoundIllustration } from "@/components/sections/404";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist",
};

export default function NotFound() {
  const suggestions = [
    {
      title: "Journey",
      description: "Read about my entrepreneurial path",
      href: "/journey",
      icon: IconCompass,
    },
    {
      title: "Notes",
      description: "Explore my thoughts and learnings",
      href: "/notes",
      icon: IconBook,
    },
  ];

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="not-found">
        <div className="mx-auto w-full max-w-2xl py-14">
          <div className="flex flex-col space-y-8">
            {/* Video Call Illustration */}
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="flex justify-center">
                <NotFoundIllustration />
              </div>
            </BlurFade>

            {/* Header */}
            <div className="space-y-4 text-center">
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <h1 className="text-4xl font-museo font-bold tracking-tight">
                  Connection Lost
                </h1>
              </BlurFade>

              <BlurFadeText
                delay={BLUR_FADE_DELAY * 3}
                className="text-xl text-muted-foreground leading-relaxed"
                yOffset={8}
                text="Looks like the page you're looking for has disconnected."
              />
            </div>

            {/* Description */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="space-y-4 pt-2">
                <p className="text-muted-foreground leading-relaxed text-center">
                  The page might have been moved, deleted, or maybe it never
                  existed. But hey, at least we tried to connect.
                </p>
              </div>
            </BlurFade>

            {/* Action Buttons */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <IconHome className="size-5" />
                  Back to Home
                </Link>
              </div>
            </BlurFade>

            {/* Suggestions */}
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="pt-8 border-t space-y-4">
                <h2 className="text-lg font-semibold">
                  Meanwhile, check these out
                </h2>
                <div className="grid gap-3">
                  {suggestions.map((suggestion, index) => (
                    <BlurFade
                      key={suggestion.href}
                      delay={BLUR_FADE_DELAY * (7 + index)}
                    >
                      <Link
                        href={suggestion.href}
                        className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border hover:bg-muted transition-colors group"
                      >
                        <suggestion.icon className="size-6 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="space-y-1">
                          <p className="font-medium text-sm">
                            {suggestion.title}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {suggestion.description}
                          </p>
                        </div>
                      </Link>
                    </BlurFade>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Contact */}
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <div className="pt-6 space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Think something should be here?{" "}
                  <Link
                    href={`mailto:${DATA.contact.email}`}
                    className="text-foreground hover:underline transition-colors font-semibold"
                  >
                    Let me know
                  </Link>
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
