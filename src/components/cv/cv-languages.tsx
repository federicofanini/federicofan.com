import BlurFade from "@/components/magicui/blur-fade";
import { IconLanguage } from "@tabler/icons-react";

const BLUR_FADE_DELAY = 0.0;

const languages = [
  { language: "Italian", level: "Native" },
  { language: "English", level: "Fluent" },
];

export function CVLanguages() {
  return (
    <section id="cv-languages">
      <div className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <h2 className="text-lg font-bold font-museo flex items-center gap-2">
            Languages
            <IconLanguage className="size-5 text-primary" />
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="space-y-2">
            {languages.map((lang) => (
              <div
                key={lang.language}
                className="flex justify-between items-center"
              >
                <span className="text-sm font-medium">{lang.language}</span>
                <span className="text-sm text-muted-foreground">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
