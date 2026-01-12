"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X_GROWTH_DATA } from "@/data/x-growth";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Script from "next/script";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

// Format number with shorter format
const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

interface SocialsFooterProps {
  youtubeVideos?: string[]; // Array of video IDs
  tweets?: string[]; // Array of tweet IDs
}

export function SocialsFooter({
  youtubeVideos = [],
  tweets = [],
}: SocialsFooterProps) {
  const socials = Object.values(DATA.contact.social);

  const [xFollowerCount, setXFollowerCount] = useState<number>(
    X_GROWTH_DATA.profile.followers || 1480
  );
  const [ytFollowerCount, setYtFollowerCount] = useState<number>(0);
  const [twitterLoaded, setTwitterLoaded] = useState(false);

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

  // Load Twitter widgets
  useEffect(() => {
    if (tweets.length > 0 && twitterLoaded) {
      // @ts-ignore - Twitter widgets API
      if (window.twttr?.widgets) {
        // @ts-ignore
        window.twttr.widgets.load();
      }
    }
  }, [tweets, twitterLoaded]);

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
    <section className="mt-16 pt-12 border-t border-border">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold font-museo">
            Enjoyed this? Let&apos;s stay connected 👋
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            I share my journey building products, insights on tech, and lessons
            learned along the way. Join the community!
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {socials.map((social) => {
            const count = getSocialCount(social.name);
            const countLabel = getCountLabel(social.name);

            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col items-center justify-center p-4 rounded-xl border bg-card text-card-foreground transition-all duration-300",
                  "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:-translate-y-1",
                  "relative overflow-hidden"
                )}
                aria-label={`Follow on ${social.name}`}
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col items-center gap-2 w-full">
                  <div className="flex size-10 items-center justify-center rounded-lg border bg-background group-hover:scale-110 transition-transform duration-300">
                    <social.icon className="size-5" />
                  </div>
                  <div className="flex flex-col items-center text-center">
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
                  <ArrowUpRight className="size-3 text-muted-foreground/50 group-hover:text-foreground absolute top-2 right-2 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Content Previews */}
        {(youtubeVideos.length > 0 || tweets.length > 0) && (
          <div className="space-y-6 pt-6">
            {/* YouTube Videos */}
            {youtubeVideos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-museo flex items-center gap-2">
                    <IconBrandYoutubeFilled className="size-5 text-red-500" />{" "}
                    Latest Videos
                  </h3>
                  <Link
                    href={DATA.contact.social.Youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    View all
                    <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {youtubeVideos.slice(0, 3).map((videoId, index) => (
                    <div
                      key={videoId}
                      className="group relative rounded-lg overflow-hidden border border-border/50 bg-background/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`YouTube video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tweets */}
            {tweets.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-museo flex items-center gap-2">
                    𝕏 Recent Posts
                  </h3>
                  <Link
                    href={DATA.contact.social.X.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    View all
                    <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {tweets.slice(0, 3).map((tweetId) => (
                    <div
                      key={tweetId}
                      className="overflow-hidden flex items-center justify-center"
                    >
                      <blockquote
                        className="twitter-tweet"
                        data-conversation="none"
                        data-dnt="true"
                      >
                        <a
                          href={`https://twitter.com/${username}/status/${tweetId}`}
                        >
                          Loading tweet...
                        </a>
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground font-mono">
            Building in public • Sharing the journey • Let&apos;s connect 🚀
          </p>
        </div>
      </div>

      {/* Twitter widget script */}
      {tweets.length > 0 && (
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onLoad={() => setTwitterLoaded(true)}
        />
      )}
    </section>
  );
}
