import BlurFade from "@/components/magicui/blur-fade";
import { getStartups } from "@/data/startup";
import Link from "next/link";

export const metadata = {
  title: "Startup",
  description: "My startup projects and experiments.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function StartupPage() {
  const startups = await getStartups();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">startup</h1>
      </BlurFade>
      {startups
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((startup, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={startup.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/startup/${startup.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">{startup.metadata.title}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {startup.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
