import Link from "next/link";
import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "In my free time I build clean, fast, elegant websites. Get a quote.",
};

export default function Page() {
  const social = DATA.contact.social;
  const sites = [
    ...DATA.work.map((w) => ({
      title: w.company,
      href: w.href,
      description: w.description,
    })),
    {
      title: "boschitt.com",
      href: "https://boschitt.com",
      description: "Gardening services website — SEO-optimized.",
    },
  ];
  return (
    <main className="space-y-8">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-mono text-muted-foreground">
          <span>$</span>
          <span>pnpm create website</span>
          <span className="hidden sm:inline text-green-500">uara.co</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          World-Class Websites
        </h1>
        <p className="text-sm text-muted-foreground">
          I build clean and minimal websites. Some say
          &quot;over‑engineered&quot;; I prefer &quot;future‑you will thank
          me&quot;.
        </p>
      </header>

      <section className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Need one for your startup or business? No carousels. No pop‑ups. No
          14MB hero videos. Just clean design, fast performance, and quick
          turnaround.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="https://uara.co" target="_blank">
            See more at{" "}
            <span className="font-mono text-teal-300 hover:underline underline-offset-4 font-semibold">
              uara.co
            </span>
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold font-mono">Built by me</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sites.map((site) => (
            <Link
              key={site.title}
              href={site.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border p-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold leading-tight group-hover:underline">
                    {site.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {site.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="pt-2 text-xs text-muted-foreground">
        <Link
          href="mailto:fed@uara.ai"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Prefer email? Drop me a line at{" "}
          <span className="font-mono hover:underline underline-offset-4 font-semibold">
            fed@uara.ai
          </span>
        </Link>
      </footer>
    </main>
  );
}
