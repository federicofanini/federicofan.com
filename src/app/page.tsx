import { WebsitesBanner } from "@/components/sections/websites";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Startups } from "@/components/sections/startups";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Documenting } from "@/components/sections/documenting";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />

      <Startups />
      <Documenting />

      <About />

      <WebsitesBanner />
      <Education />
      <Contact />
    </main>
  );
}
