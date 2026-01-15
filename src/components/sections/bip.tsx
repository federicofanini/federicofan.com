import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";
import { IconNotebook, IconCaretRightFilled } from "@tabler/icons-react";

export function BuildInPublicSection() {
  return (
    <section>
      <div className="py-24 md:pt-16">
        <div className="mx-auto mb-12 max-w-5xl space-y-6">
          <h1 className="text-md uppercase text-muted-foreground font-mono pb-8">
            Why I&apos;m{" "}
            <Highlighter action="underline" color="#085983">
              building in public
            </Highlighter>{" "}
          </h1>

          <div className="relative mt-8">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500/20 via-purple-500/20 to-transparent rounded-full" />

            <div className="space-y-6 pl-8">
              <p className="text-muted-foreground text-balance text-lg leading-relaxed">
                I&apos;m building in public to stay precise.
              </p>

              <p className="text-muted-foreground text-balance text-lg leading-relaxed">
                I share early to document decisions while they&apos;re still
                uncertain, not after they look good.
              </p>
            </div>
          </div>
        </div>

        {/* Principles Grid 
        <div className="mx-auto max-w-5xl mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="group relative p-6 rounded-lg border border-border bg-card hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/5">
              <div className="flex flex-col h-full">
                <h3 className="font-museo font-semibold text-lg mb-3 text-foreground">
                  No hype
                </h3>
                <div className="h-px w-12 bg-gradient-to-r from-emerald-500/40 to-transparent mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Reality over narrative.
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-lg border border-border bg-card hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/5">
              <div className="flex flex-col h-full">
                <h3 className="font-museo font-semibold text-lg mb-3 text-foreground">
                  No shortcuts
                </h3>
                <div className="h-px w-12 bg-gradient-to-r from-purple-500/40 to-transparent mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Foundations over tactics.
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-lg border border-border bg-card hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/5">
              <div className="flex flex-col h-full">
                <h3 className="font-museo font-semibold text-lg mb-3 text-foreground">
                  No conclusions sold in advance
                </h3>
                <div className="h-px w-12 bg-gradient-to-r from-blue-500/40 to-transparent mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Process over outcomes.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-16 p-8 rounded-xl border border-border bg-gradient-to-br from-muted/30 to-transparent">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <IconNotebook className="size-6 text-muted-foreground/60" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-base text-foreground font-medium">
                  This isn&apos;t content.
                  <br />
                  It&apos;s documentation.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This is a record of building something real, from the
                  beginning.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/journey"
              className="group relative inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-base transition-all duration-200 hover:border-foreground/40 hover:bg-muted/30"
            >
              <span className="relative">
                Read the journey
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </span>
              <IconCaretRightFilled className="size-4 opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>*/}
      </div>
    </section>
  );
}
