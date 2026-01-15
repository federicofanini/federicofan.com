import { ImageIllustration } from "@/components/image-illustration";
import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";
import { IconCirclesRelation, IconCaretRightFilled } from "@tabler/icons-react";

export function HealthEngineSection() {
  return (
    <section>
      <div className="py-24 md:pt-16">
        <div className="mx-auto mb-12 max-w-5xl space-y-6">
          <h1 className="text-md uppercase text-muted-foreground font-mono pb-8">
            The{" "}
            <Highlighter action="underline" color="#085983">
              next health
            </Highlighter>{" "}
            <Highlighter action="box" color="#FF9800">
              infrastructure
            </Highlighter>{" "}
          </h1>
          <ImageIllustration />
          <div className="relative mt-6">
            <p className="text-muted-foreground text-balance text-lg text-justify">
              <Link
                href="https://uara.ai?ref=federicofan.com"
                target="_blank"
                className="font-museo inline underline underline-offset-4 hover:text-primary transition-colors text-secondary font-semibold"
              >
                Uara
                <IconCirclesRelation className="size-4 inline-block ml-0.5" />
              </Link>{" "}
              is being built to treat health as infrastructure.
              <br />A system designed to understand patterns, trade-offs, and
              change over time, not isolated metrics.
            </p>
          </div>
        </div>

        {/* Why I'm building this section */}
        <div className="mx-auto max-w-5xl mt-24 space-y-8">
          <h2 className="text-md uppercase text-muted-foreground font-mono">
            Why I&apos;m building this in public
          </h2>

          <div className="space-y-6">
            {/* Outcomes over engagement */}
            <div className="group relative pl-6 border-l-2 border-blue-400/30 hover:border-blue-400/60 transition-colors">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-blue-400" />
              <h3 className="font-museo font-semibold text-base mb-2">
                Outcomes
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Attention doesn&apos;t equal improvement. If progress can&apos;t
                be sustained over time, it doesn&apos;t matter how active a
                system feels.
              </p>
            </div>

            {/* Systems over motivation */}
            <div className="group relative pl-6 border-l-2 border-purple-400/30 hover:border-purple-400/60 transition-colors">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-400" />
              <h3 className="font-museo font-semibold text-base mb-2">
                Systems
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Motivation is unreliable. Health has to work under stress, low
                energy, and real constraints — not only when life is calm.
              </p>
            </div>

            {/* Clarity over more data */}
            <div className="group relative pl-6 border-l-2 border-amber-400/30 hover:border-amber-400/60 transition-colors">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="font-museo font-semibold text-base mb-2">
                Clarity
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                More metrics don&apos;t mean better decisions. What matters is
                understanding what changed, why it changed, and what it implies
                over time.
              </p>
            </div>

            {/* Not another tracker or habit app */}
            <div className="group relative pl-6 border-l-2 border-rose-400/30 hover:border-rose-400/60 transition-colors">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-rose-400" />
              <h3 className="font-museo font-semibold text-base mb-2">
                Not another tracker
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If something only works when conditions are ideal, it
                doesn&apos;t belong.
              </p>
            </div>

            {/* Built slowly, on purpose */}
            <div className="group relative pl-6 border-l-2 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="font-mono font-semibold text-base mb-2">
                Built on purpose
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tested before scaled. Shaped by biological limits.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/manifesto"
              className="group relative inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-base transition-all duration-200 hover:border-foreground/40 hover:bg-muted/30"
            >
              <span className="relative">
                More about my why
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </span>
              <IconCaretRightFilled className="size-4 opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
