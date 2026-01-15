import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { FeedbackList } from "@/components/feedback/feedback-list";
import { getFeedbacks } from "@/data/feedback";
import { IconMessageCircle } from "@tabler/icons-react";

export const metadata = {
  title: "Feedback",
  description: "Leave your feedback, suggestions, or just say hello.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function FeedbackPage() {
  const { data: feedbacks } = await getFeedbacks();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="feedback">
        <div className="mx-auto w-full max-w-2xl py-14">
          <div className="flex flex-col space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="flex items-center gap-3">
                  <IconMessageCircle className="size-8 text-primary" />
                  <h1 className="text-4xl font-museo font-bold tracking-tight">
                    Feedback
                  </h1>
                </div>
              </BlurFade>

              <BlurFadeText
                delay={BLUR_FADE_DELAY * 2}
                className="text-xl text-muted-foreground leading-relaxed"
                yOffset={8}
                text="This is new territory for me. I'd love to hear what you think."
              />
            </div>

            {/* Description */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="space-y-4 pt-2">
                <p className="text-muted-foreground leading-relaxed">
                  In{" "}
                  <span className="text-foreground font-semibold">
                    26 years
                  </span>
                  , I&apos;ve never documented my journey like this. The story,
                  the format, the way I tell it — it&apos;s all evolving.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Maybe it&apos;s rough around the edges right now, but{" "}
                  <span className="text-foreground font-semibold">
                    your feedback will help me improve and shape this journey.
                  </span>
                </p>
              </div>
            </BlurFade>

            {/* Form */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="pt-4">
                <FeedbackForm />
              </div>
            </BlurFade>

            {/* Feedback List */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="pt-8 border-t space-y-4">
                <h2 className="text-lg font-semibold">Recent Feedback</h2>
                <FeedbackList feedbacks={feedbacks || []} />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
