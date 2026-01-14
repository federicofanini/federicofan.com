"use client";

import { DATA } from "@/data/resume";
import BlurFade from "../magicui/blur-fade";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X_GROWTH_DATA } from "@/data/x-growth";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.0;
const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds
const SHOW_FOLLOWER_COUNTS = false; // Set to false to disable follower counts and API calls

// Format number with shorter format for mobile
const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export function SocialsSmall() {
  const socials = Object.values(DATA.contact.social);

  const [xFollowerCount, setXFollowerCount] = useState<number>(
    X_GROWTH_DATA.profile.followers || 1480
  );
  const [ytFollowerCount, setYtFollowerCount] = useState<number>(0);

  // Extract username from X_GROWTH_DATA
  const username =
    X_GROWTH_DATA.profile.username.replace("@", "") || "FedericoFan";

  // Extract YouTube channel identifier
  const channelIdentifier = "https://www.youtube.com/@federicofanini";

  // Fetch X follower count
  useEffect(() => {
    if (!SHOW_FOLLOWER_COUNTS) return;

    let isMounted = true;
    let intervalId: NodeJS.Timeout | null = null;

    const fetchFollowers = async () => {
      try {
        const response = await fetch(
          `/api/x/followers?username=${encodeURIComponent(username)}`
        );

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          if (data.followers !== undefined) {
            setXFollowerCount(data.followers);
          }
        } else if (response.status === 429) {
          console.warn("Rate limited, will retry after cache expires");
          if (intervalId) {
            clearInterval(intervalId);
          }
          intervalId = setInterval(fetchFollowers, REFRESH_INTERVAL * 2);
        }
      } catch (error) {
        console.error("Failed to fetch X follower count:", error);
      }
    };

    fetchFollowers();
    intervalId = setInterval(fetchFollowers, REFRESH_INTERVAL);

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [username]);

  // Fetch YouTube subscriber count
  useEffect(() => {
    if (!SHOW_FOLLOWER_COUNTS) return;

    const fetchSubscribers = async () => {
      try {
        const response = await fetch(
          `/api/yt/subs?channel=${encodeURIComponent(channelIdentifier)}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.subscribers !== undefined) {
            setYtFollowerCount(data.subscribers);
          }
        }
      } catch (error) {
        console.error("Failed to fetch YouTube subscriber count:", error);
      }
    };

    fetchSubscribers();
    const interval = setInterval(fetchSubscribers, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [channelIdentifier]);

  // Get count for a social platform
  const getSocialCount = (socialName: string): number | null => {
    if (!SHOW_FOLLOWER_COUNTS) return null;
    if (socialName === "X") return xFollowerCount;
    if (socialName === "YouTube")
      return ytFollowerCount > 0 ? ytFollowerCount : null;
    return null;
  };

  // Get label for count
  const getCountLabel = (socialName: string): string => {
    if (socialName === "X") return "Followers";
    if (socialName === "YouTube") return "Subscribers";
    return "";
  };

  // Define colors for each social platform - subtle ink colors
  const getAccentColor = (socialName: string) => {
    const colors = {
      X: "border-l-blue-400/40",
      GitHub: "border-l-purple-400/40",
      YouTube: "border-l-rose-400/40",
      LinkedIn: "border-l-cyan-400/40",
    };
    return colors[socialName as keyof typeof colors] || "border-l-secondary/40";
  };

  const getIconColor = (socialName: string) => {
    const colors = {
      X: "text-blue-600 dark:text-blue-400",
      GitHub: "text-purple-600 dark:text-purple-400",
      YouTube: "text-rose-600 dark:text-rose-400",
      LinkedIn: "text-cyan-600 dark:text-cyan-400",
    };
    return colors[socialName as keyof typeof colors] || "text-secondary";
  };

  // Slight rotation for handmade feel
  const rotations = [
    "rotate-[-0.5deg]",
    "rotate-[0.5deg]",
    "rotate-[-0.3deg]",
    "rotate-[0.3deg]",
  ];

  return (
    <section id="socials">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {socials.map((social, index) => {
          const count = getSocialCount(social.name);

          return (
            <BlurFade
              key={social.name}
              delay={BLUR_FADE_DELAY * 4 + index * 0.05}
            >
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative block p-4 rounded-sm border border-border/60 bg-background transition-all duration-300",
                  "hover:border-foreground/20 hover:shadow-sm hover:-translate-y-0.5",
                  "border-l-2",
                  getAccentColor(social.name),
                  rotations[index % rotations.length]
                )}
                aria-label={social.name}
              >
                <div className="flex items-start justify-between">
                  {/* Left: icon and name */}
                  <div className="flex items-center gap-2">
                    <social.icon
                      className={cn(
                        "size-5 stroke-[1.5]",
                        getIconColor(social.name)
                      )}
                    />
                    <span className="font-mono text-sm font-medium tracking-tight">
                      {social.name}
                    </span>
                  </div>

                  {/* Right: count */}
                  {SHOW_FOLLOWER_COUNTS && count !== null && (
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-mono font-semibold tabular-nums leading-none">
                        {formatCount(count)}
                      </span>
                      <span className="text-[9px] text-muted-foreground/60 font-mono mt-0.5">
                        {social.name === "X"
                          ? "followers"
                          : social.name === "YouTube"
                          ? "subs"
                          : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtle hover indicator */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="size-3 text-muted-foreground/50" />
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
