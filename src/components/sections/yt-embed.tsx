"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { IconBrandYoutube, IconVideo } from "@tabler/icons-react";
import Link from "next/link";

interface YouTubeEmbedProps {
  videoId?: string;
}

export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
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

  const id = getYouTubeVideoId(videoId);

  if (!id) {
    return (
      <div className="w-full aspect-video bg-card rounded-xl border border-border flex flex-col items-center justify-center text-muted-foreground gap-4 p-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
            <IconBrandYoutube className="size-8 text-[#FF0000]" />
          </div>
          <h3 className="text-lg font-bold font-museo flex items-center gap-2 text-foreground">
            Starting soon...
          </h3>
          <div className="flex flex-col items-center justify-center gap-2 w-full max-w-xs">
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground w-full text-center">
              <span className="flex flex-row items-center gap-1">
                I&apos;m
                <span className="font-semibold text-primary flex flex-row items-center gap-1">
                  <IconVideo className="size-4" />
                  recording
                </span>
                my first video.
              </span>
              <span className="block w-full sm:w-auto">
                Subscribe to get notified when it drops!
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-[#FF0000]/20 hover:bg-[#FF0000]/5 hover:text-[#FF0000] transition-all group"
          asChild
        >
          <Link
            href={DATA.contact.social.Youtube.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.youtube className="size-4 text-[#FF0000] group-hover:scale-110 transition-transform" />
            <span className="font-medium">Subscribe</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 bg-background/50 overflow-hidden shadow-sm">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
