import Link from "next/link";
import { X_GROWTH_DATA } from "@/data/x-growth";

export function XGrowthSummary() {
  const latestData =
    X_GROWTH_DATA.metrics.find(
      (m) => m.followers !== null && m.month !== "Aug."
    ) || X_GROWTH_DATA.metrics[0];
  const previousData = X_GROWTH_DATA.metrics[0];
  const followerGrowth =
    latestData.followers && previousData.followers
      ? latestData.followers - previousData.followers
      : 0;

  return (
    <Link href="/x" className="block">
      <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
        Currently at{" "}
        <span className="font-mono font-semibold text-primary">
          {latestData.followers?.toLocaleString() || "884"}
        </span>{" "}
        followers
        {followerGrowth > 0 && (
          <span> (+{followerGrowth} this month)</span>
        )}{" "}
        with{" "}
        <span className="font-mono font-semibold text-primary">
          {latestData.engagementRate || "7.3"}%
        </span>{" "}
        engagement rate. Building audience on X through consistent content about
        startups and tech.
      </p>
    </Link>
  );
}
