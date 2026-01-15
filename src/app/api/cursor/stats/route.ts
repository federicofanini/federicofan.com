import { NextResponse } from "next/server";
import { fetchCursorStats, getCursorErrorMessage } from "@/lib/cursor-api";

export const dynamic = "force-dynamic";

/**
 * GET /api/cursor/stats
 *
 * Fetch comprehensive Cursor usage statistics
 * Combines data from Cursor Analytics API and AI Code Tracking API
 *
 * Requires: CURSOR_API_KEY environment variable
 * Cursor Plan: Enterprise (for Analytics API access)
 *
 * Documentation: https://cursor.com/docs/api
 */
export async function GET(request: Request) {
  try {
    const result = await fetchCursorStats();

    if (!result.success || !result.data) {
      const errorMessage = result.error
        ? getCursorErrorMessage(result.error)
        : "Failed to fetch Cursor stats";

      return NextResponse.json(
        {
          error: result.error || "CURSOR_FETCH_ERROR",
          message: errorMessage,
          data: null,
        },
        { status: result.error === "CURSOR_API_KEY_MISSING" ? 401 : 500 }
      );
    }

    // Transform the data into a format suitable for the frontend
    const stats = {
      usageSummary: result.data.usageSummary,
      dailyActiveUsers: result.data.dau,
      aiAcceptanceRate: result.data.aiAcceptanceRate,
      aiCodeStats: result.data.aiCodeStats,
      success: true,
    };

    return NextResponse.json(stats, {
      headers: {
        // Cache for 15 minutes (aligned with Cursor's cache-control)
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=900",
      },
    });
  } catch (error: any) {
    console.error("Error in /api/cursor/stats:", error);

    const errorMessage =
      error.message === "CURSOR_API_KEY_MISSING"
        ? "Cursor API key not configured"
        : "Internal server error";

    return NextResponse.json(
      {
        error: "CURSOR_API_ERROR",
        message: errorMessage,
        data: null,
      },
      { status: 500 }
    );
  }
}
