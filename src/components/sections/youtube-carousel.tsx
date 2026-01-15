"use client";

import { useState } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBrandYoutube,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
}

const VIDEOS: Video[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Video 1",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Video 2",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Video 3",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Video 4",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Video 5",
  },
];

export function YoutubeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? VIDEOS.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === VIDEOS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl">
        {/* Carousel Container */}
        <div className="relative">
          {/* Video Display */}
          <div className="rounded-lg border border-border/50 bg-background/50 overflow-hidden">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                key={VIDEOS[currentIndex].id}
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEOS[currentIndex].id}`}
                title={VIDEOS[currentIndex].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110 group"
            aria-label="Previous video"
          >
            <IconChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110 group"
            aria-label="Next video"
          >
            <IconChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {VIDEOS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-foreground"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                )}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Video Counter */}
          <div className="text-center mt-3">
            <span className="text-xs text-muted-foreground font-mono">
              {currentIndex + 1} / {VIDEOS.length}
            </span>
          </div>

          {/* Subscribe Button */}
          <div className="flex justify-center mt-6">
            <Link
              href="https://youtube.com/@federicofanini?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            >
              <IconBrandYoutubeFilled className="h-5 w-5 " />
              <span>Subscribe to my channel</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
