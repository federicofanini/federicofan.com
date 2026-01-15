import BlurFade from "@/components/magicui/blur-fade";
import { FeedbackForm } from "./feedback-form";
import { FeedbackList } from "./feedback-list";
import { getFeedbacks } from "@/data/feedback";
import { IconArrowRight, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export async function HomepageFeedback() {
  const { data: feedbacks } = await getFeedbacks();

  // Show only the 3 most recent feedbacks on homepage
  const recentFeedbacks = feedbacks?.slice(0, 3) || [];

  return (
    <section id="feedback">
      <div className="mx-auto max-w-5xl space-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-md uppercase text-muted-foreground font-mono">
                Feedback
              </h2>
            </div>
            <Link
              href="/feedback"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
            >
              View all
              <IconArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              I&apos;m documenting my journey for the first time. If you have
              thoughts on what I share, I&apos;d genuinely appreciate hearing
              them.
            </p>

            <FeedbackForm />

            {recentFeedbacks.length > 0 && (
              <div className="space-y-3">
                <FeedbackList feedbacks={recentFeedbacks} />
              </div>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
