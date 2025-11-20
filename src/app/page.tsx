import { WebsitesBanner } from "@/components/sections/websites";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { XGrowth } from "@/components/sections/x-growth";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { SocialsShowcase } from "@/components/sections/socials-showcase";
import { Documenting } from "@/components/sections/documenting";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />
      <Documenting />
      <Work />

      <About />
      <WebsitesBanner />
      <Education />
      <Skills />
      <Contact />
    </main>
  );
}
