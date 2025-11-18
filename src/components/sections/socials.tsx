"use client";

import { DATA } from "@/data/resume";
import BlurFade from "../magicui/blur-fade";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X_GROWTH_DATA } from "@/data/x-growth";

const BLUR_FADE_DELAY = 0.0;
const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

// Format number with shorter format for mobile
const formatCount = (count: number, isMobile: boolean = false): string => {
  if (isMobile) {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  }
  return count.toLocaleString();
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
    if (socialName === "X") return "followers";
    if (socialName === "YouTube") return "subs";
    return "";
  };

  return (
    <section id="socials">
      <div className="flex min-h-0 flex-col gap-y-1">
        <BlurFade delay={BLUR_FADE_DELAY * 4.7}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 sm:gap-3 w-full auto-rows-fr">
            {socials.map((social, index) => {
              // Create bento grid pattern on mobile
              // First item spans full width, second spans 2 rows, rest fill space
              const isFirst = index === 0;
              const isSecond = index === 1;
              const colSpan = isFirst ? "col-span-2" : "";
              const rowSpan = isSecond ? "row-span-1" : "";

              const count = getSocialCount(social.name);
              const countLabel = getCountLabel(social.name);

              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colSpan} ${rowSpan} inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-3 sm:px-4 sm:py-3 rounded-lg border bg-background hover:bg-accent transition-all touch-manipulation active:scale-95 min-h-[60px] sm:min-h-[70px] md:min-h-[44px] md:min-w-[44px] w-full`}
                  aria-label={social.name}
                >
                  <social.icon className="size-5 sm:size-5 md:size-4 flex-shrink-0" />
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm md:text-xs font-mono whitespace-nowrap">
                      {social.name}
                    </span>
                    {count !== null && (
                      <span className="text-[9px] sm:text-[10px] md:text-[9px] font-mono text-muted-foreground">
                        <span className="hidden sm:inline">
                          {formatCount(count, false)}
                        </span>
                        <span className="sm:hidden">
                          {formatCount(count, true)}
                        </span>
                        {countLabel && (
                          <span className="hidden md:inline ml-1">
                            {countLabel}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
