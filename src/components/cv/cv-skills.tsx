import BlurFade from "@/components/magicui/blur-fade";
import { IconCode } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.0;

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "React",
      "Next.js",
      "Node.js",
      "MDX",
    ],
  },
  {
    title: "Backend & Infrastructure",
    skills: [
      "Supabase",
      "Postgres",
      "MySQL",
      "Prisma",
      "Drizzle ORM",
      "Redis",
      "Upstash",
      "AWS IoT",
      "AWS Lambda",
      "Cloudflare",
      "Podman",
    ],
  },
  {
    title: "AI & RAG",
    skills: [
      "Vercel AI SDK",
      "Vector Search",
      "Upstash Vector",
      "Multi-tenant LLM",
      "RAG Architecture",
    ],
  },
  {
    title: "DevOps & Tooling",
    skills: ["Vercel", "Turborepo", "GitHub Actions", "Trigger.dev", "Docker"],
  },
  {
    title: "IoT Engineering",
    skills: [
      "Raspberry Pi",
      "Serial Device Integration",
      "MQTT",
      "Remote Updates",
      "IoT Provisioning",
    ],
  },
  {
    title: "Security & Compliance",
    skills: [
      "Health Data (L-Data)",
      "Medical System Compliance",
      "Secure API Design",
      "AWS Secrets Manager",
    ],
  },
  {
    title: "Product & Founder Skills",
    skills: [
      "Zero-to-One Execution",
      "UX Design",
      "Multi-tenant SaaS",
      "Stripe Integration",
      "Growth Strategy",
    ],
  },
];

export function CVSkills() {
  return (
    <section id="cv-skills">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Core Skills
            <IconCode className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <div className="space-y-4">
          {skillCategories.map((category, catIndex) => (
            <BlurFade
              key={category.title}
              delay={BLUR_FADE_DELAY * 6 + catIndex * 0.1}
            >
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
