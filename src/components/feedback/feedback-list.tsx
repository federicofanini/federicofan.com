"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { upvoteFeedback } from "@/data/feedback";
import { cn, formatDate } from "@/lib/utils";
import { ThumbsUp, User } from "lucide-react";
import { Icons } from "@/components/icons";

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
    if (platform === "X") return <Icons.x className="size-3" />;
    if (platform === "IG") return <Icons.instagram className="size-3" />;
    return null;
  };

  return (
    <Card className="mb-4 border bg-card/50 hover:bg-card/80 transition-colors overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-start gap-3 space-y-0">
        <Avatar className="h-8 w-8 border">
          <AvatarFallback className="bg-muted text-muted-foreground">
            {feedback.username ? (
              feedback.username[0].toUpperCase()
            ) : (
              <User className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-sm font-semibold truncate">
                {feedback.username || "Anonymous"}
              </span>
              {feedback.platform && (
                <div className="flex items-center justify-center size-5 rounded-full bg-muted text-muted-foreground shrink-0">
                  {getPlatformIcon(feedback.platform)}
                </div>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">
              {formatDate(feedback.createdAt.toString())}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed break-words">
            {feedback.message}
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 px-2 gap-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-full",
            hasUpvoted && "text-primary bg-primary/10"
          )}
          onClick={handleUpvote}
          disabled={hasUpvoted}
        >
          <ThumbsUp className={cn("size-3.5", hasUpvoted && "fill-current")} />
          <span className="text-xs font-medium tabular-nums">
            {optimisticUpvotes}
          </span>
        </Button>
      </CardContent>
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
