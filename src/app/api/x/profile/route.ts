import { NextResponse } from "next/server";
import { fetchXFullProfile, fetchXMonthlyMetrics } from "@/lib/x-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "FedericoFan";

    const profile = await fetchXFullProfile(username);

    if (!profile) {
      return NextResponse.json(
        { error: "Failed to fetch profile data" },
        { status: 500 }
      );
    }

    // Fetch current month metrics
    const metrics = await fetchXMonthlyMetrics(username, profile.userId);

    return NextResponse.json(
      {
        profile,
        metrics,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/x/profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
