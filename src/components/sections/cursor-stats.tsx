"use client";

import { useEffect, useState } from "react";
import BlurFade from "../magicui/blur-fade";
import { Separator } from "../ui/separator";
import {
  IconCode,
  IconBrandGithub,
  IconFlame,
  IconChartLine,
  IconClock,
  IconTerminal2,
} from "@tabler/icons-react";
import {
  CURSOR_STATS,
  type CursorStatsData,
  formatNumber as formatNum,
} from "@/data/cursor-stats";

const BLUR_FADE_DELAY = 0.04;

interface GitHubStats {
  contributions: number;
  followers: number;
}

export function CursorStatsSection() {
  const [cursorStats, setCursorStats] = useState<CursorStatsData>(CURSOR_STATS);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [useCursorAPI, setUseCursorAPI] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch both Cursor and GitHub stats in parallel
        const [cursorRes, githubRes] = await Promise.all([
          fetch("/api/cursor/stats").catch(() => null),
          fetch("/api/github/stats").catch(() => null),
        ]);

        // Handle Cursor API response
        if (cursorRes && cursorRes.ok) {
          const cursorData = await cursorRes.json();
          if (cursorData.success && cursorData.usageSummary) {
            setUseCursorAPI(true);
            // Transform Cursor API data to match our interface
            // Note: Actual data structure depends on Cursor's API response
            // Update this based on actual API response format
            console.log("Cursor API data:", cursorData);

            // Keep using fallback data for now, but you can update this
            // when you have access to real Cursor API data
          }
        }

        // Handle GitHub API response
        if (githubRes && githubRes.ok) {
          const data = await githubRes.json();
          setGithubStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const formatNumber = (num: number): string => {
    return formatNum(num);
  };

  if (loading) {
    return (
      <section id="cursor-stats">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="h-8 w-32 bg-muted/20 animate-pulse rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-muted/20 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cursor-stats">
      <div className="mx-auto max-w-5xl space-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This is how much I&apos;m building.
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Separator />
        </BlurFade>

        {/* Main Stats Grid */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Lines Written */}
            <div className="group relative border border-border rounded-lg p-4 hover:border-blue-400/60 transition-all duration-200 hover:bg-muted/20">
              <div className="flex items-start justify-between mb-2">
                <IconCode className="size-4 text-blue-400" />
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-mono font-bold">
                  {cursorStats ? formatNumber(cursorStats.linesWritten) : "—"}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  lines written
                </p>
              </div>
            </div>

            {/* GitHub Contributions */}
            <div className="group relative border border-border rounded-lg p-4 hover:border-purple-400/60 transition-all duration-200 hover:bg-muted/20">
              <div className="flex items-start justify-between mb-2">
                <IconBrandGithub className="size-4 text-purple-400" />
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-mono font-bold">
                  {githubStats ? formatNumber(githubStats.contributions) : "—"}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  contributions
                </p>
              </div>
            </div>

            {/* Current Streak */}
            <div className="group relative border border-border rounded-lg p-4 hover:border-amber-400/60 transition-all duration-200 hover:bg-muted/20">
              <div className="flex items-start justify-between mb-2">
                <IconFlame className="size-4 text-amber-400" />
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-mono font-bold">
                  {cursorStats ? cursorStats.currentStreak : "—"}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  day streak
                </p>
              </div>
            </div>

            {/* Coding Time */}
            <div className="group relative border border-border rounded-lg p-4 hover:border-rose-400/60 transition-all duration-200 hover:bg-muted/20">
              <div className="flex items-start justify-between mb-2">
                <IconClock className="size-4 text-rose-400" />
                <div className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-mono font-bold">
                  {cursorStats
                    ? formatNumber(cursorStats.totalCodingTime)
                    : "—"}
                  h
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  coding time
                </p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Secondary Stats */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sessions */}
            <div className="border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconChartLine className="size-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Sessions
                </p>
              </div>
              <p className="text-xl font-mono font-semibold">
                {cursorStats ? formatNumber(cursorStats.sessionsCount) : "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                avg {cursorStats?.averageSessionTime}min per session
              </p>
            </div>

            {/* Longest Streak */}
            <div className="border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconFlame className="size-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Best Streak
                </p>
              </div>
              <p className="text-xl font-mono font-semibold">
                {cursorStats ? cursorStats.longestStreak : "—"} days
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                longest consecutive streak
              </p>
            </div>

            {/* Lines Edited */}
            <div className="border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconCode className="size-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Edited
                </p>
              </div>
              <p className="text-xl font-mono font-semibold">
                {cursorStats ? formatNumber(cursorStats.linesEdited) : "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                lines refined
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Language Distribution */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="border border-border/50 rounded-lg p-6">
            <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">
              Language Distribution
            </h3>
            <div className="space-y-3">
              {cursorStats?.favoriteLanguages.map((lang, index) => (
                <div key={lang.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-sm font-mono">{lang.name}</span>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 ease-out rounded-full"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Bottom Note */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex items-start gap-3 p-4 rounded-lg border border-border/30 bg-muted/10">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse mt-2" />
            <p className="text-sm text-muted-foreground flex-1">
              <span className="text-foreground font-semibold">Live stats:</span>{" "}
              Updated every hour from GitHub.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
