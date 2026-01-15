import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { HealthEngineSection } from "@/components/sections/health-engine";
import { BuildInPublicSection } from "@/components/sections/bip";
import { CursorStatsSection } from "@/components/sections/cursor-stats";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />
      <HealthEngineSection />
      <BuildInPublicSection />
      <About />
      <CursorStatsSection />

      <Contact />
    </main>
  );
}
