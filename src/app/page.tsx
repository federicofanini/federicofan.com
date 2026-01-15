import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { HealthEngineSection } from "@/components/sections/health-engine";
import { CursorStatsSection } from "@/components/sections/cursor-stats";
import { HomepageFeedback } from "@/components/feedback/homepage-feedback";
import { YoutubeCarousel } from "@/components/sections/youtube-carousel";
import { WritingsCarousel } from "@/components/sections/writings-carousel";
import { getAllWritings } from "@/data/blog";

export default async function Page() {
  const allPosts = await getAllWritings();
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />
      {allPosts.length > 1 && <WritingsCarousel writings={allPosts} />}
      <HealthEngineSection />
      <YoutubeCarousel />
      <About />
      <CursorStatsSection />
      <HomepageFeedback />
      <Contact />
    </main>
  );
}
