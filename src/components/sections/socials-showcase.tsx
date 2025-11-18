"use client";

import { DATA } from "@/data/resume";
import BlurFade from "../magicui/blur-fade";
import Link from "next/link";
import { X_GROWTH_DATA } from "@/data/x-growth";
import { useEffect, useState } from "react";
import { SocialsSmall } from "./socials";

const BLUR_FADE_DELAY = 0.0;
const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

interface SocialsShowcaseProps {
  tweetUrl?: string;
  tweetId?: string;
  youtubeVideoId?: string;
  youtubeFollowers?: number;
  youtubeChannel?: string;
  xFollowers?: number;
  xUsername?: string;
}

export function SocialsShowcase({
  tweetUrl,
  tweetId,
  youtubeVideoId,
  youtubeFollowers: initialYoutubeFollowers,
  youtubeChannel,
  xFollowers: initialXFollowers,
  xUsername,
}: SocialsShowcaseProps) {
  const xSocial = DATA.contact.social.X;
  const youtubeSocial = DATA.contact.social.Youtube;
  const [xFollowerCount, setXFollowerCount] = useState<number>(
    initialXFollowers || X_GROWTH_DATA.profile.followers || 1480
  );
  const [ytFollowerCount, setYtFollowerCount] = useState<number>(
    initialYoutubeFollowers || 0
  );

  // Extract username from X_GROWTH_DATA or use provided username
  const username =
    xUsername ||
    X_GROWTH_DATA.profile.username.replace("@", "") ||
    "FedericoFan";

  // Extract YouTube channel identifier
  const channelIdentifier =
    youtubeChannel || "https://www.youtube.com/@federicofanini";

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
          // Rate limited - don't retry immediately, wait longer
          console.warn("Rate limited, will retry after cache expires");
          // Clear interval and set a longer one
          if (intervalId) {
            clearInterval(intervalId);
          }
          // Retry after 2 hours instead of 1 hour
          intervalId = setInterval(fetchFollowers, REFRESH_INTERVAL * 2);
        }
      } catch (error) {
        console.error("Failed to fetch X follower count:", error);
        // Keep the existing count on error
      }
    };

    // Fetch immediately
    fetchFollowers();

    // Set up interval to refresh every hour
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
        // Keep the existing count on error
      }
    };

    // Fetch immediately
    fetchSubscribers();

    // Set up interval to refresh every hour
    const interval = setInterval(fetchSubscribers, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [channelIdentifier]);

  // Extract YouTube video ID from URL if full URL is provided
  const getYouTubeVideoId = (idOrUrl?: string): string | null => {
    if (!idOrUrl) return null;
    if (idOrUrl.includes("youtube.com") || idOrUrl.includes("youtu.be")) {
      const match =
        idOrUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/) ||
        idOrUrl.match(/youtube\.com\/embed\/([^&\n?#]+)/);
      return match ? match[1] : null;
    }
    return idOrUrl;
  };

  const videoId = getYouTubeVideoId(youtubeVideoId);

  return (
    <section id="socials-showcase">
      <div className="space-y-6 w-full max-w-4xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY} className="flex flex-col gap-3">
          <h3 className="text-lg font-bold font-mono">
            Documenting my journey on:
          </h3>
          <SocialsSmall />
        </BlurFade>

        {/* Embeddings Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* YouTube Video Embed */}
          {videoId && (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="rounded-lg border border-border/50 bg-background/50 overflow-hidden">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </BlurFade>
          )}
        </div>
      </div>
    </section>
  );
}
