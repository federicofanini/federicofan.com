"use client";

import BlurFade from "../magicui/blur-fade";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";

const BLUR_FADE_DELAY = 0.0;

export function About() {
  return (
    <section id="about">
      <div>
        <div className="mx-auto max-w-5xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-md uppercase text-muted-foreground font-mono">
              WHO AM I
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
            <div className="flex items-start gap-4">
              {/* Profile Photo 
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="relative flex-shrink-0 cursor-pointer group"
                    aria-label="View profile photo"
                  >
                    <Image
                      src="/fedef.jpg"
                      alt="Federico Fan"
                      width={64}
                      height={64}
                      className="rounded-lg border border-primary aspect-square object-cover transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 overflow-hidden">
                  <div className="relative w-full aspect-square">
                    <Image
                      src="/fedef.jpg"
                      alt="Federico Fan"
                      fill
                      className="object-cover"
                    />
                  </div>
                </DialogContent>
              </Dialog>*/}
              <div className="flex-1">
                <p className="text-muted-foreground text-base leading-relaxed">
                  I&apos;m{" "}
                  <span className="font-semibold text-foreground">26</span> and
                  I&apos;ve never documented my journey before. Now things have
                  changed.
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Separator className="my-8" />
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <div className="space-y-6">
              {/* Past */}
              <div className="group relative pl-6 border-l-2 border-blue-400/30 hover:border-blue-400/60 transition-colors">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-blue-400" />
                <h3 className="font-museo font-semibold text-base mb-2">
                  Quietly Building
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Two degrees, a pandemic, and a medtech startup built from
                  nothing. Most of my life spent working in the background.
                </p>
              </div>

              {/* Transition */}
              <div className="group relative pl-6 border-l-2 border-amber-400/30 hover:border-amber-400/60 transition-colors">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-amber-400" />
                <h3 className="font-museo font-semibold text-base mb-2">
                  New Chapter
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Now I&apos;m closing that chapter and starting a new one. For
                  the first time, I&apos;m choosing to document what I&apos;m
                  building, what I&apos;m learning, and where I&apos;m headed.
                </p>
              </div>

              {/* Approach */}
              <div className="group relative pl-6 border-l-2 border-purple-400/30 hover:border-purple-400/60 transition-colors">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-400" />
                <h3 className="font-museo font-semibold text-base mb-2">
                  The Real Process
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Just documenting decisions, constraints, and failures as they
                  happen.
                </p>
              </div>

              {/* Beginning */}
              <div className="group relative pl-6 border-l-2 border-rose-400/30 hover:border-rose-400/60 transition-colors">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-rose-400" />
                <h3 className="font-museo font-semibold text-base mb-2">
                  Part of the Beginning
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I don&apos;t have a digital footprint yet — but I do have a
                  story, and I&apos;m figuring out how to tell it. If
                  you&apos;re here, you&apos;re part of this beginning.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
