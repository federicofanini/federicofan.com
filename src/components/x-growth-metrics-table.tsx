import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricData {
  month: string;
  followers: number | null;
  verifiedFollowers: number | null;
  impressions: number | null;
  engagementRate: number | null;
  engagements: number | null;
  profileVisits: number | null;
  replies: number | null;
  likes: number | null;
  reposts: number | null;
  bookmarks: number | null;
  shares: number | null;
}

interface GrowthMetricsTableProps {
  metrics: MetricData[];
  metricLabels: Record<string, string>;
}

export function GrowthMetricsTable({
  metrics,
  metricLabels,
}: GrowthMetricsTableProps) {
  const formatValue = (value: number | null, key: string): string => {
    if (value === null) return "-";

    if (key === "engagementRate") {
      return `${value}%`;
    }

    if (key === "impressions" && value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }

    return value.toLocaleString();
  };

  const getMetricKeys = (): (keyof Omit<MetricData, "month">)[] => [
    "followers",
    "verifiedFollowers",
    "impressions",
    "engagementRate",
    "engagements",
    "profileVisits",
    "replies",
    "likes",
    "reposts",
    "bookmarks",
    "shares",
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-mono">Growth Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                  Metric
                </th>
                {metrics.map((metric) => (
                  <th
                    key={metric.month}
                    className="text-center p-2 font-medium text-sm text-muted-foreground min-w-[80px]"
                  >
                    {metric.month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getMetricKeys().map((key) => (
                <tr
                  key={key}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-2 font-medium text-sm">
                    {metricLabels[key] || key}
                  </td>
                  {metrics.map((metric) => (
                    <td
                      key={`${metric.month}-${key}`}
                      className="text-center p-2 text-sm"
                    >
                      <span
                        className={
                          metric[key] !== null
                            ? "font-mono"
                            : "text-muted-foreground"
                        }
                      >
                        {formatValue(metric[key], key)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              Note
            </Badge>
            <span>
              Only August data available currently. Future months will be
              updated as data becomes available.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
