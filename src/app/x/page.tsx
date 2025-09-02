import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { TwitterProfileCard } from "@/components/x-profile-card";
import { GrowthMetricsTable } from "@/components/x-growth-metrics-table";
import { X_GROWTH_DATA } from "@/data/x-growth";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon, BarChart3Icon } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function XGrowthPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-12 max-w-4xl mx-auto">
      {/* Profile Card Section */}
      <section id="profile" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex justify-center">
            <TwitterProfileCard
              name={X_GROWTH_DATA.profile.name}
              username={X_GROWTH_DATA.profile.username}
              bio={X_GROWTH_DATA.profile.bio}
              avatarUrl={X_GROWTH_DATA.profile.avatarUrl}
              headerImageUrl={X_GROWTH_DATA.profile.headerImageUrl}
              verified={X_GROWTH_DATA.profile.verified}
              location={X_GROWTH_DATA.profile.location}
              website={X_GROWTH_DATA.profile.website}
              joinDate={X_GROWTH_DATA.profile.joinDate}
              following={X_GROWTH_DATA.profile.following}
              followers={X_GROWTH_DATA.profile.followers}
            />
          </div>
        </BlurFade>
      </section>

      {/* Metrics Table */}
      <section id="metrics" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <GrowthMetricsTable
            metrics={X_GROWTH_DATA.metrics}
            metricLabels={X_GROWTH_DATA.metricLabels}
          />
        </BlurFade>
      </section>
    </main>
  );
}
