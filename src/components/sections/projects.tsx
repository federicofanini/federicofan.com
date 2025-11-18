import BlurFade from "../magicui/blur-fade";
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";
import { ProjectCard } from "../project-card";

const BLUR_FADE_DELAY = 0.0;

export function Projects() {
  return (
    <section id="projects">
      <div className="space-y-4 w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-lg font-bold font-mono">Highlights</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            I&apos;ve worked on a variety of projects, from simple websites to
            complex web applications. Here are a few of my favorites.
          </Markdown>
        </BlurFade>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {DATA.projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 9 + id * 0.05}
            >
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
