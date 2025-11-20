import { WebsitesBanner } from "@/components/websites";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { XGrowth } from "@/components/sections/x-growth";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { SocialsShowcase } from "@/components/sections/socials-showcase";
import { HomepageFeedback } from "@/components/feedback/homepage-feedback";
import { getTopFeedbacks } from "@/data/feedback";

export default async function Page() {
  const { data: topFeedbacks } = await getTopFeedbacks();
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />
      <HomepageFeedback topFeedbacks={topFeedbacks || []} />
      <Work />
      <SocialsShowcase youtubeVideoId="" youtubeFollowers={1000} />

      <Projects />

      <About />
      <WebsitesBanner />
      <Education />
      <Skills />
      <Contact />
    </main>
  );
}
