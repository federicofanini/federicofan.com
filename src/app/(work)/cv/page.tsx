import { CVHeader } from "@/components/cv/cv-header";
import { CVProfile } from "@/components/cv/cv-profile";
import { CVSkills } from "@/components/cv/cv-skills";
import { CVExperience } from "@/components/cv/cv-experience";
import { CVProjects } from "@/components/cv/cv-projects";
import { CVEducation } from "@/components/cv/cv-education";
import { CVStrengths } from "@/components/cv/cv-strengths";
import { CVLanguages } from "@/components/cv/cv-languages";
import { CVInterests } from "@/components/cv/cv-interests";
import { CVDownloadButton } from "@/components/cv/cv-download-button";
import { Metadata } from "next";
import "./print.css";
import "./pdf-export.css";

export const metadata: Metadata = {
  title: "CV - Federico Fanini",
  description:
    "Full-stack engineer and technical founder with experience in MedTech, SaaS, IoT, and AI systems.",
};

export default function CVPage() {
  return (
    <>
      <main className="flex flex-col min-h-[100dvh] space-y-10">
        <CVHeader />
        <CVProfile />
        <CVExperience />
        <CVSkills />
        <CVProjects />
        <CVEducation />
        <CVStrengths />
        <CVLanguages />
        <CVInterests />
      </main>
      <CVDownloadButton />
    </>
  );
}
