"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createFeedback } from "@/data/feedback";
import { Loader2, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { IconEyeClosed, IconSend } from "@tabler/icons-react";

export function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState<"X" | "IG" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await createFeedback({
        message,
        username: username || undefined,
        platform: platform || undefined,
      });
      setMessage("");
      setUsername("");
      setPlatform(null);
    } catch (error) {
      console.error("Failed to submit feedback", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-8 border rounded-xl p-3 bg-background/50 backdrop-blur-sm shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-border/40">
        <div className="flex items-center gap-1 bg-secondary/50 rounded-md p-1">
          <button
            type="button"
            onClick={() => {
              setPlatform(null);
              setUsername(""); // Clear username when switching to anonymous
            }}
            className={cn(
              "p-1.5 rounded-sm text-muted-foreground transition-all hover:bg-background hover:text-foreground",
              platform === null &&
                "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            )}
            title="Anonymous"
          >
            <IconEyeClosed className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setPlatform("X")}
            className={cn(
              "p-1.5 rounded-sm text-muted-foreground transition-all hover:bg-background hover:text-foreground",
              platform === "X" &&
                "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            )}
            title="Connect X"
          >
            <Icons.x className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setPlatform("IG")}
            className={cn(
              "p-1.5 rounded-sm text-muted-foreground transition-all hover:bg-background hover:text-foreground",
              platform === "IG" &&
                "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            )}
            title="Connect Instagram"
          >
            <Icons.instagram className="size-3.5" />
          </button>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={platform ? username : "anonymous"}
            onChange={(e) => {
              if (platform) {
                setUsername(e.target.value);
              }
            }}
            disabled={platform === null}
            placeholder={
              platform
                ? `your ${platform === "X" ? "X" : "Instagram"} username`
                : "Anonymous"
            }
            className={cn(
              "flex-1 bg-transparent border-none text-xs sm:text-sm h-8 px-2 focus:outline-none font-medium w-full",
              platform === null &&
                "text-muted-foreground cursor-not-allowed opacity-70"
            )}
          />
        </div>
      </div>

      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your feedback here..."
          className="w-full min-h-[60px] bg-transparent border-none p-2 text-sm resize-none focus:outline-none placeholder:text-muted-foreground/60"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            size="icon"
            className="h-8 w-8 rounded-lg"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <IconSend className="size-4" />
            )}
            <span className="sr-only">Send feedback</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
