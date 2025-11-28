import BlurFade from "@/components/magicui/blur-fade";
import { IconRocket } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

const projects = [
  {
    title: "Multi‑tenant RAG Monorepo",
    description:
      "Built a Turborepo system with a landing page, tenant UI, admin app, and shared RAG engine using Upstash Vector & Supabase.",
  },
  {
    title: "WhatsApp & Telegram AI Bot Framework",
    description:
      "Modular message engine, dynamic prompting, vector-augmented retrieval for legal/incident assistance.",
  },
  {
    title: "Blockchain Advisory Work",
    description:
      "Provided strategic and technical input on token economics, smart contract analysis, and market dynamics.",
  },
  {
    title: "Portfolio & 3D Modeling Experiments",
    description: "Built 3D assets and interactive experiences.",
  },
];

export function CVProjects() {
  return (
    <section id="cv-projects">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Side Projects & Experiments
            <IconRocket className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <div className="space-y-3">
          {projects.map((project, index) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 10 + index * 0.1}
            >
              <div>
                <h3 className="text-sm font-semibold text-primary">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
