import { NextResponse } from "next/server";
import { fetchYouTubeSubscriberCount } from "@/lib/youtube-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get("channel");

    if (!channel) {
      return NextResponse.json(
        { error: "Channel parameter is required" },
        { status: 400 }
      );
    }

    const subscribers = await fetchYouTubeSubscriberCount(channel);

    if (subscribers === null) {
      return NextResponse.json(
        { error: "Failed to fetch subscriber count" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { subscribers, channel },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/yt/subs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
