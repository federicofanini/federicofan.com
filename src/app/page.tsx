import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { HealthEngineSection } from "@/components/sections/health-engine";
import { CursorStatsSection } from "@/components/sections/cursor-stats";
import { HomepageFeedback } from "@/components/feedback/homepage-feedback";
import { YoutubeCarousel } from "@/components/sections/youtube-carousel";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />
      <HealthEngineSection />
      <YoutubeCarousel />
      <About />
      <CursorStatsSection />
      <HomepageFeedback />
      <Contact />
    </main>
  );
}
