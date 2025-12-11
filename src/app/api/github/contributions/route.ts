import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/components/github-contribution/github-contribution";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    const result = await fetchGitHubContributions(username);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || "Failed to fetch contributions" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        contributions: result.data.contributions,
        totalContributions: result.data.totalContributions,
        username,
      },
      {
        headers: {
          // Cache for 1 hour in CDN/browser, revalidate in background
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/github/contributions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
