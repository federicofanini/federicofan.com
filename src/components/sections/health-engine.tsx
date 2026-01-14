import { ImageIllustration } from "@/components/image-illustration";
import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";
import { IconCirclesRelation, IconExternalLink } from "@tabler/icons-react";

export function HealthEngineSection() {
  return (
    <section>
      <div className="py-24 md:pt-32">
        <div className="mx-auto mb-12 max-w-5xl space-y-6">
          <h1 className="text-2xl font-semibold sm:text-4xl w-full tracking-wider text-justify">
            I&apos;m building the{" "}
            <Highlighter action="underline" color="#FF9800">
              next health
            </Highlighter>{" "}
            <Highlighter action="highlight" color="#87CEFA">
              infrastructure
            </Highlighter>{" "}
          </h1>
          <ImageIllustration />
          <div className="relative mt-6">
            <p className="text-muted-foreground text-balance text-lg text-justify">
              I&apos;m building{" "}
              <Link
                href="https://uara.ai"
                target="_blank"
                className="inline underline underline-offset-4 hover:text-primary transition-colors text-secondary font-semibold"
              >
                Uara
                <IconCirclesRelation className="size-4 inline-block ml-0.5" />
              </Link>
              , a health-tech company focused on human optimisation, to connect
              your health data and get actionable insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
