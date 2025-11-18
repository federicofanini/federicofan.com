import BlurFade from "../magicui/blur-fade";
import { DATA } from "@/data/resume";
import { Badge } from "../ui/badge";

const BLUR_FADE_DELAY = 0.0;

export function Skills() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <h2 className="text-lg font-bold font-mono">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-1">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
              <Badge key={skill} variant="secondary" className="rounded-sm">
                {skill}
              </Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
