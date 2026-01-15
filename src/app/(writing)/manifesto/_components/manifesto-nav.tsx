"use client";

import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

export function ManifestoNav() {
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Extract h2 headings from the document
    const headings = document.querySelectorAll("article h2");
    const extractedSections = Array.from(headings).map((heading) => {
      const title = heading.textContent || "";
      const id = heading.id || slugify(title);
      // Ensure the heading has an ID
      if (!heading.id) {
        heading.id = id;
      }
      return { id, title };
    });

    setSections(extractedSections);

    // Set up intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const slugify = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  if (sections.length === 0) return null;

  const activeTitle =
    sections.find((s) => s.id === activeSection)?.title || "Navigate";

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
        <div className="relative">
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute bottom-full mb-2 w-full bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
              <div className="max-h-[60vh] overflow-y-auto">
                {/* Top of page option */}
                <button
                  onClick={scrollToTop}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors border-b border-border"
                >
                  <span className="font-medium font-mono text-xs text-muted-foreground">
                    ↑ Top
                  </span>
                </button>

                {/* Section options */}
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors border-b border-border/50 last:border-b-0 ${
                      activeSection === section.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono text-muted-foreground mt-0.5 min-w-[1.5rem]">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className={`line-clamp-2 ${
                          activeSection === section.id
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {section.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted transition-colors shadow-lg"
          >
            <span className="text-sm font-mono text-muted-foreground truncate">
              {activeTitle}
            </span>
            <IconChevronDown
              className={`size-4 text-muted-foreground transition-transform flex-shrink-0 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
