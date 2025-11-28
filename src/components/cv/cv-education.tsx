import BlurFade from "@/components/magicui/blur-fade";
import { IconBackpack } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

const education = [
  {
    degree: "Master's Degree in Blockchain Technology",
    school: "The Blockchain Management School",
    year: "2022",
  },
  {
    degree: "Master's Degree in Corporate Finance",
    school: "LUISS Guido Carli University",
    year: "2021–2023",
  },
  {
    degree: "Bachelor's Degree in Business & Management",
    school: "LUISS Guido Carli University",
    year: "2018–2021",
  },
];

export function CVEducation() {
  return (
    <section id="cv-education">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Education
            <IconBackpack className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <div className="space-y-3">
          {education.map((edu, index) => (
            <BlurFade
              key={edu.degree}
              delay={BLUR_FADE_DELAY * 12 + index * 0.1}
            >
              <div>
                <h3 className="text-sm font-semibold">{edu.degree}</h3>
                <p className="text-sm text-primary">{edu.school}</p>
                <p className="text-xs text-muted-foreground">{edu.year}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
