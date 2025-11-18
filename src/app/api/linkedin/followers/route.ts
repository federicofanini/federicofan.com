import { NextResponse } from "next/server";
import { fetchLinkedInFollowerCount } from "@/lib/linkedin-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("identifier");

    if (!identifier) {
      return NextResponse.json(
        { error: "Identifier parameter is required" },
        { status: 400 }
      );
    }

    const followers = await fetchLinkedInFollowerCount(identifier);

    if (followers === null) {
      return NextResponse.json(
        { error: "Failed to fetch follower count" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { followers, identifier },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/linkedin/followers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
