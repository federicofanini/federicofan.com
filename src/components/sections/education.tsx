import BlurFade from "../magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ResumeCard } from "../resume-card";
import { IconBackpack } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

export function Education() {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Education
            <IconBackpack className="size-5 text-primary" />
          </h2>
        </BlurFade>
        {DATA.education.map((education, id) => (
          <BlurFade
            key={education.school}
            delay={BLUR_FADE_DELAY * 13 + id * 0.05}
          >
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} - ${education.end}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
