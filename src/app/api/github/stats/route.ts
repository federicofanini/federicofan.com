import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/components/github-contribution/github-contribution";
import { fetchGitHubFollowerCount } from "@/lib/github-api";

export const dynamic = "force-dynamic";

const DEFAULT_USERNAME = "federicofanini"; // Replace with your GitHub username

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || DEFAULT_USERNAME;

    // Fetch both contributions and follower count in parallel
    const [contributionsResult, followerCount] = await Promise.all([
      fetchGitHubContributions(username),
      fetchGitHubFollowerCount(username),
    ]);

    // Get total contributions
    const totalContributions =
      contributionsResult.success && contributionsResult.data
        ? contributionsResult.data.totalContributions
        : 0;

    return NextResponse.json(
      {
        username,
        contributions: totalContributions,
        followers: followerCount || 0,
        success: contributionsResult.success,
      },
      {
        headers: {
          // Cache for 1 hour in CDN/browser, revalidate in background
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/github/stats:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        contributions: 0,
        followers: 0,
        success: false,
      },
      { status: 500 }
    );
  }
}
