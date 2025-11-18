import { NextResponse } from "next/server";
import { fetchXFollowerCount } from "@/lib/x-api";

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

    const followers = await fetchXFollowerCount(username);

    if (followers === null) {
      return NextResponse.json(
        { error: "Failed to fetch follower count" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { followers, username },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/x/followers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
