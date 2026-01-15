import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";
import {
  IconBrandYoutube,
  IconBrandX,
  IconBrandInstagram,
  IconWriting,
  IconMail,
  IconExternalLink,
} from "@tabler/icons-react";

export function DocumentationHubSection() {
  const platforms = [
    {
      name: "YouTube",
      icon: IconBrandYoutube,
      description: "Long-form thinking and building",
      subtext: "Watch from the beginning",
      href: "https://youtube.com/@federicofantini",
      color: "rgb(239, 68, 68)", // red-500
      external: true,
    },
    {
      name: "X",
      icon: IconBrandX,
      description: "Daily thoughts while building",
      subtext: "Unfiltered. In progress",
      href: "https://x.com/federicofan",
      color: "rgb(0, 0, 0)", // white
      external: true,
    },
    {
      name: "Instagram",
      icon: IconBrandInstagram,
      description: "Visual journey and highlights",
      subtext: "Behind the scenes",
      href: "https://instagram.com/federicofan",
      color: "rgb(236, 72, 153)", // pink-500
      external: true,
    },
    {
      name: "Writing",
      icon: IconWriting,
      description: "Essays and decision logs",
      subtext: "Higher signal",
      href: "/journey",
      color: "rgb(59, 130, 246)", // blue-500
      external: false,
    },
    {
      name: "Newsletter",
      icon: IconMail,
      description: "Monthly building updates",
      subtext: "No lead magnets",
      href: "#newsletter",
      color: "rgb(16, 185, 129)", // emerald-500
      external: false,
    },
  ];

  return (
    <section>
      <div className="py-24 md:pt-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-md uppercase text-muted-foreground font-mono pb-4">
            <Highlighter action="underline" color="#F59E0B">
              Documentation
            </Highlighter>{" "}
            hub
          </h1>

          <p className="text-muted-foreground text-base mb-10">
            This is where the work is documented as it happens.
          </p>

          {/* Documentation Platforms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Link
                  key={platform.name}
                  href={platform.href}
                  target={platform.external ? "_blank" : undefined}
                  className="group relative overflow-hidden rounded-lg border border-border bg-background/40 backdrop-blur-sm p-4 transition-all duration-300 hover:border-border/60 hover:bg-background/60 hover:scale-[1.02]"
                  style={
                    {
                      "--platform-color": platform.color,
                    } as React.CSSProperties
                  }
                >
                  {/* Subtle gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${platform.color}, transparent 70%)`,
                    }}
                  />

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-20 transition-all duration-300 blur-2xl"
                    style={{ backgroundColor: platform.color }}
                  />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${platform.color}15`,
                          }}
                        >
                          <Icon
                            className="h-4 w-4 transition-colors duration-300"
                            style={{ color: platform.color }}
                          />
                        </div>
                        <h3 className="text-sm font-museo font-semibold text-foreground">
                          {platform.name}
                        </h3>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">
                      {platform.description}
                    </p>

                    {/* Subtext */}
                    <p className="text-xs text-muted-foreground/60 italic font-light">
                      {platform.subtext}
                    </p>

                    {/* Bottom border indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
