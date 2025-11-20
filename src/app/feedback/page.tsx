import BlurFade from "@/components/magicui/blur-fade";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { FeedbackList } from "@/components/feedback/feedback-list";
import { getFeedbacks } from "@/data/feedback";

export const metadata = {
  title: "Feedback",
  description: "Leave your feedback, suggestions, or just say hello.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function FeedbackPage() {
  const { data: feedbacks } = await getFeedbacks();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl mx-auto py-12 px-4">
      <section id="header">
        <div className="mx-auto w-full max-w-2xl py-10">
          <div className="group flex flex-col gap-6 items-start">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="text-4xl font-museo font-semibold tracking-tight sm:text-4xl mb-2">
                Feedback
              </h1>
              <p className="text-muted-foreground text-lg font-medium max-w-2xl">
                In <span className="text-primary font-bold">26 years</span>{" "}
                I&apos;ve never documented my life before. Now things have
                changed.
                <br />
                If you have feedback on what I share — the story, the format,
                the way I tell it. I&apos;d love to hear you.
                <br />
                Maybe it&apos;s cringe at the beginning, but I&apos;ll improve
                based on what you tell me.{" "}
                <span className="text-primary font-bold">
                  Your feedback will help me grow and shape this journey.
                </span>
              </p>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="form">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <FeedbackForm />
        </BlurFade>
      </section>

      <section id="list">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold mb-4 font-museo">Recent Feedback</h2>
          <FeedbackList feedbacks={feedbacks || []} />
        </BlurFade>
      </section>
    </main>
  );
}
