import BlurFade from "@/components/magicui/blur-fade";
import { IconBriefcase } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

const experiences = [
  {
    title: "Founder & COO",
    company: "SnakeMed.it (MedTech IoT Platform)",
    period: "2022 – now",
    description:
      "Built a full IoT-enabled medical data platform connecting edge devices in clinics to a cloud-based dashboard for real-time diagnostics.",
    highlights: [
      "Designed and implemented compliant data flows to securely handle health and L‑Data",
      "Built a modular IoT hypervisor for multiple medical devices (WBC, HB, etc.), with MQTT, AWS IoT Jobs, and remote code updates",
      "Engineered secure remote management for IoT edges using AWS IoT, Cloudflare, and Next.js APIs",
      "Created a doctor-facing app (Snake) with multi-tenant logic, role-based access, and secure data retrieval",
      "Architected infrastructure using Next.js App Router, Supabase, AWS, Upstash, and Trigger.dev",
    ],
  },
  {
    title: "Founder",
    company: "Uara.ai (Search Engine for Health Data)",
    period: "2025 - now",
    description: "Search engine for your health data. Under development.",
    highlights: [
      "Built a full SaaS stack: Next.js, Supabase, Redis, Stripe, App Router",
      "Designed ai agents for search engine, shot list generation, and more",
    ],
  },
  {
    title: "Founder",
    company: "GymBrah.com (Fitness SaaS Platform)",
    period: "2025",
    description: "A rag-first gym and athlete management platform.",
    highlights: [
      "Built full SaaS stack: Next.js, Supabase, Redis, Stripe, App Router",
      "Designed RAG-ready blogging and marketing tooling (upstash vector, openai, nextjs, shadcn)",
    ],
  },
  {
    title: "Business Financial Analyst",
    company: "RE‑HASH",
    period: "2021",
    highlights: [
      "Financial analysis, reporting, budgeting",
      "Strategic planning and operational insights",
    ],
  },
];

export function CVExperience() {
  return (
    <section id="cv-experience">
      <div className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Experience
            <IconBriefcase className="size-5 text-primary" />
          </h2>
        </BlurFade>
        {experiences.map((exp, index) => (
          <BlurFade key={exp.company} delay={BLUR_FADE_DELAY * 8 + index * 0.1}>
            <div className="space-y-2">
              <div>
                <h3 className="text-md font-semibold">{exp.title}</h3>
                <p className="text-sm text-primary font-medium">
                  {exp.company}
                </p>
                <p className="text-xs text-muted-foreground">{exp.period}</p>
              </div>
              {exp.description && (
                <p className="text-sm text-muted-foreground">
                  {exp.description}
                </p>
              )}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
