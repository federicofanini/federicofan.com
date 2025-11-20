"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createFeedback } from "@/data/feedback";
import { Loader2 } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import {
  IconArrowDown,
  IconArrowUp,
  IconArrowUpRight,
  IconMessage,
  IconSend,
} from "@tabler/icons-react";
import Link from "next/link";
import BlurFade from "../magicui/blur-fade";

interface HomepageFeedbackProps {
  topFeedbacks: {
    id: string;
    message: string;
    upvotes: number;
    createdAt: Date;
    username: string | null;
  }[];
}

const BLUR_FADE_DELAY = 0.04;

export function HomepageFeedback({ topFeedbacks }: HomepageFeedbackProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await createFeedback({
        message,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to submit feedback", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 10} className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-museo flex items-center gap-2">
              Feedbacks
            </h2>
            <Button
              variant="secondary"
              className="rounded-full py-2 gap-2 items-center"
              size="sm"
            >
              <Link href="/feedback" className="flex items-center gap-2">
                View All
                <IconArrowUpRight className="size-5 bg-white text-black rounded-full p-1" />
              </Link>
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="w-full p-4 border rounded-2xl bg-card/30">
            {topFeedbacks.length > 0 && (
              <div className="space-y-2">
                {topFeedbacks.map((fb) => (
                  <Link
                    href={"/feedback"}
                    key={fb.id}
                    className="flex items-start gap-3 text-xs p-2 rounded-lg hover:bg-secondary/30 transition-colors group"
                  >
                    <div className="flex flex-col items-center gap-0.5 min-w-[24px] text-muted-foreground">
                      <IconArrowUp className="size-3" />
                      <span className="font-medium tabular-nums">
                        {fb.upvotes}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-2 text-foreground/90 leading-relaxed">
                        {fb.message}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="font-medium opacity-70">
                          {fb.username || "Anonymous"}
                        </span>
                        <span>·</span>
                        <span>{formatDate(fb.createdAt.toString())}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
