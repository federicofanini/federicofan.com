import { FaceScanIllustration } from "../illustrations/face-scan";
import Link from "next/link";
import { IconCirclesRelation } from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import { SocialsShowcase } from "./socials-showcase";

export function Hero() {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl py-8">
        <div className="group flex gap-4 items-center">
          <div className="flex-col flex flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8">
              <div className="w-48 sm:w-auto">
                <FaceScanIllustration />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-balance text-lg text-justify">
                  I&apos;m building{" "}
                  <Link
                    href="https://uara.ai"
                    target="_blank"
                    className="font-museo inline underline underline-offset-4 hover:text-primary transition-colors text-secondary font-semibold"
                  >
                    Uara
                    <IconCirclesRelation className="size-4 inline-block ml-0.5" />
                  </Link>
                  , a health-tech company focused on human optimisation.
                </h1>
                <Separator className="my-4" />
                <div className="w-full space-y-2">
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
                    Documenting
                  </p>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-center gap-3 group/item">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform" />
                      <span className="font-mono text-muted-foreground group-hover/item:text-foreground transition-colors">
                        Decisions
                      </span>
                    </li>
                    <li className="flex items-center gap-3 group/item">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 group-hover/item:scale-125 transition-transform" />
                      <span className="font-mono text-muted-foreground group-hover/item:text-foreground transition-colors">
                        Constraints
                      </span>
                    </li>
                    <li className="flex items-center gap-3 group/item">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 group-hover/item:scale-125 transition-transform" />
                      <span className="font-mono text-muted-foreground group-hover/item:text-foreground transition-colors">
                        Failures
                      </span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground text-sm tracking-widest">
                    This is a record of building something{" "}
                    <span className="font-semibold text-primary">real</span>,
                    from the beginning.
                  </p>
                </div>
              </div>
            </div>
            <SocialsShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
