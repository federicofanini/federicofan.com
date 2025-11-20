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

  return (
    <section id="socials">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socials.map((social, index) => {
          const count = getSocialCount(social.name);
          const countLabel = getCountLabel(social.name);

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
                  "group flex items-center justify-between p-4 rounded-xl border bg-card text-card-foreground transition-all duration-300",
                  "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:-translate-y-0.5",
                  "h-full"
                )}
                aria-label={social.name}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border bg-background">
                    <social.icon className="size-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold font-geist leading-none mb-1">
                      {social.name}
                    </span>
                    {count !== null ? (
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatCount(count)} {countLabel}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Follow
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
