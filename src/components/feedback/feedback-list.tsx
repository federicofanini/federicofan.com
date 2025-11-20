"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { upvoteFeedback } from "@/data/feedback";
import { cn, formatDate } from "@/lib/utils";
import { ThumbsUp, User } from "lucide-react";
import { Icons } from "@/components/icons";
import Link from "next/link";
import {
  IconEyeClosed,
  IconSquareRoundedArrowUp,
  IconSquareRoundedArrowUpFilled,
} from "@tabler/icons-react";

// Define type locally based on Prisma model to avoid import issues with generated client
interface FeedbackItemType {
  id: string;
  message: string;
  username: string | null;
  platform: string | null;
  upvotes: number;
  createdAt: Date;
}

interface FeedbackListProps {
  feedbacks: FeedbackItemType[];
}

function FeedbackItem({ feedback }: { feedback: FeedbackItemType }) {
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(feedback.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = async () => {
    if (hasUpvoted) return;

    setOptimisticUpvotes((prev) => prev + 1);
    setHasUpvoted(true);

    try {
      await upvoteFeedback(feedback.id);
    } catch (error) {
      console.error("Failed to upvote", error);
      setOptimisticUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    }
  };

  const getPlatformIcon = (platform: string | null) => {
    if (platform === "X") return <Icons.x className="size-3.5" />;
    if (platform === "IG") return <Icons.instagram className="size-3.5" />;
    return <IconEyeClosed className="size-4" />;
  };

  const getProfileLink = () => {
    if (!feedback.username) return null;
    if (feedback.platform === "X") return `https://x.com/${feedback.username}`;
    if (feedback.platform === "IG")
      return `https://instagram.com/${feedback.username}`;
    return null;
  };

  const profileLink = getProfileLink();

  return (
    <Card className="mb-4 border bg-card/50 hover:bg-card/80 transition-colors overflow-hidden">
      <CardHeader className="p-4 flex flex-col gap-2 space-y-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 overflow-hidden">
            {feedback.username && profileLink ? (
              <Link
                href={profileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold truncate hover:underline underline-offset-2 flex items-center gap-2 font-museo"
              >
                {getPlatformIcon(feedback.platform)}
                {feedback.username}
              </Link>
            ) : (
              <span className="text-sm font-semibold truncate flex items-center gap-2 font-museo">
                <IconEyeClosed className="size-4" />
                Anonymous
              </span>
            )}
            <span className="text-[10px] text-secondary shrink-0 font-semibold">
              · {formatDate(feedback.createdAt.toString())}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed break-words flex-1">
            {feedback.message}
          </p>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-6 px-1.5 gap-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-full shrink-0",
              hasUpvoted && "text-primary bg-primary/10"
            )}
            onClick={handleUpvote}
            disabled={hasUpvoted}
          >
            {hasUpvoted ? (
              <IconSquareRoundedArrowUpFilled className="size-3.5" />
            ) : (
              <IconSquareRoundedArrowUp className="size-3.5" />
            )}
            <span className="text-xs font-medium tabular-nums">
              {optimisticUpvotes}
            </span>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No feedback yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {feedbacks.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
}
