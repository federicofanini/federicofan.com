interface YouTubeSubscribersCache {
  subscribers: number;
  timestamp: number;
}

// In-memory cache for YouTube subscriber counts
const youtubeSubscribersCache = new Map<string, YouTubeSubscribersCache>();

// Cache duration for subscribers: 1 hour in milliseconds
const SUBSCRIBERS_CACHE_DURATION = 60 * 60 * 1000;

/**
 * Get YouTube API key from environment
 */
function getYouTubeApiKey(): string {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not set in environment variables");
  }

  return apiKey;
}

/**
 * Extract channel ID or handle from YouTube URL
 * Supports formats:
 * - https://www.youtube.com/@federicofanini
 * - https://www.youtube.com/channel/UCxxxxx
 * - https://www.youtube.com/c/ChannelName
 * - @federicofanini
 * - federicofanini
 */
function extractChannelIdentifier(urlOrHandle: string): {
  type: "handle" | "channelId" | "username";
  value: string;
} | null {
  const clean = urlOrHandle.trim();

  // Handle @username format
  if (clean.startsWith("@")) {
    return { type: "handle", value: clean.substring(1) };
  }

  // Handle full YouTube URL
  if (clean.includes("youtube.com")) {
    // Handle @username format in URL
    const handleMatch = clean.match(/youtube\.com\/@([^/?]+)/);
    if (handleMatch) {
      return { type: "handle", value: handleMatch[1] };
    }

    // Handle channel ID format
    const channelMatch = clean.match(/youtube\.com\/channel\/([^/?]+)/);
    if (channelMatch) {
      return { type: "channelId", value: channelMatch[1] };
    }

    // Handle custom URL format
    const customMatch = clean.match(/youtube\.com\/c\/([^/?]+)/);
    if (customMatch) {
      return { type: "username", value: customMatch[1] };
    }
  }

  // If it's just a plain string, assume it's a handle
  if (!clean.includes("/") && !clean.includes("http")) {
    return { type: "handle", value: clean };
  }

  return null;
}

/**
 * Check if cached subscriber data is still valid
 */
function isSubscribersCacheValid(identifier: string): boolean {
  const cached = youtubeSubscribersCache.get(identifier.toLowerCase());
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < SUBSCRIBERS_CACHE_DURATION;
}

/**
 * Get cached subscriber count if available and valid
 */
function getCachedSubscribers(
  identifier: string
): YouTubeSubscribersCache | null {
  const cached = youtubeSubscribersCache.get(identifier.toLowerCase());
  if (cached && isSubscribersCacheValid(identifier)) {
    return cached;
  }
  return null;
}

/**
 * Cache subscriber count
 */
function cacheSubscribers(identifier: string, subscribers: number): void {
  youtubeSubscribersCache.set(identifier.toLowerCase(), {
    subscribers,
    timestamp: Date.now(),
  });
}

/**
 * Fetch YouTube channel subscriber count with caching (1 hour cache)
 * @param channelIdentifier - YouTube channel handle (e.g., "federicofanini" or "@federicofanini") or full URL
 * @returns Subscriber count
 */
export async function fetchYouTubeSubscriberCount(
  channelIdentifier: string
): Promise<number | null> {
  try {
    const identifier = extractChannelIdentifier(channelIdentifier);

    if (!identifier) {
      throw new Error(
        `Invalid YouTube channel identifier: ${channelIdentifier}`
      );
    }

    const cacheKey = `${identifier.type}:${identifier.value}`;

    // Check cache first
    const cached = getCachedSubscribers(cacheKey);
    if (cached) {
      return cached.subscribers;
    }

    // Fetch from YouTube API
    const apiKey = getYouTubeApiKey();
    let channelId: string;

    // If we have a handle, use channels.list with forHandle parameter
    if (identifier.type === "handle") {
      // Try to get channel by handle first (YouTube Data API v3)
      const handleUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(
        identifier.value
      )}&key=${apiKey}`;
      const handleResponse = await fetch(handleUrl);

      if (handleResponse.ok) {
        const handleData = await handleResponse.json();
        if (handleData.items?.[0]?.id) {
          channelId = handleData.items[0].id;
        } else {
          // Fallback to search if handle lookup fails
          const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            `@${identifier.value}`
          )}&type=channel&key=${apiKey}`;
          const searchResponse = await fetch(searchUrl);

          if (!searchResponse.ok) {
            throw new Error(
              `YouTube API search failed: ${searchResponse.statusText}`
            );
          }

          const searchData = await searchResponse.json();

          // Find the channel that matches the handle
          const channel = searchData.items?.find(
            (item: any) =>
              item.snippet?.customUrl === `@${identifier.value}` ||
              item.snippet?.channelHandle === `@${identifier.value}`
          );

          if (!channel) {
            throw new Error(
              `Channel not found for handle: ${identifier.value}`
            );
          }

          channelId = channel.id.channelId;
        }
      } else {
        // Fallback to search if handle endpoint fails
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          `@${identifier.value}`
        )}&type=channel&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl);

        if (!searchResponse.ok) {
          throw new Error(
            `YouTube API search failed: ${searchResponse.statusText}`
          );
        }

        const searchData = await searchResponse.json();

        // Find the channel that matches the handle
        const channel = searchData.items?.find(
          (item: any) =>
            item.snippet?.customUrl === `@${identifier.value}` ||
            item.snippet?.channelHandle === `@${identifier.value}`
        );

        if (!channel) {
          throw new Error(`Channel not found for handle: ${identifier.value}`);
        }

        channelId = channel.id.channelId;
      }
    } else if (identifier.type === "channelId") {
      channelId = identifier.value;
    } else {
      // For username/custom URL, try to search
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        identifier.value
      )}&type=channel&key=${apiKey}`;
      const searchResponse = await fetch(searchUrl);

      if (!searchResponse.ok) {
        throw new Error(
          `YouTube API search failed: ${searchResponse.statusText}`
        );
      }

      const searchData = await searchResponse.json();
      if (!searchData.items?.[0]) {
        throw new Error(`Channel not found for: ${identifier.value}`);
      }

      channelId = searchData.items[0].id.channelId;
    }

    // Now fetch channel statistics
    const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    const statsResponse = await fetch(statsUrl);

    if (!statsResponse.ok) {
      throw new Error(`YouTube API stats failed: ${statsResponse.statusText}`);
    }

    const statsData = await statsResponse.json();

    if (!statsData.items?.[0]?.statistics) {
      throw new Error("Channel statistics not found");
    }

    const subscribers = parseInt(
      statsData.items[0].statistics.subscriberCount || "0",
      10
    );

    // Cache the result
    cacheSubscribers(cacheKey, subscribers);

    return subscribers;
  } catch (error) {
    console.error(
      `Error fetching YouTube subscriber count for ${channelIdentifier}:`,
      error
    );
    return null;
  }
}

/**
 * Clear cache for specific channel or all channels
 */
export function clearYouTubeSubscribersCache(identifier?: string): void {
  if (identifier) {
    youtubeSubscribersCache.delete(identifier.toLowerCase());
  } else {
    youtubeSubscribersCache.clear();
  }
}

/**
 * Get cache statistics
 */
export function getYouTubeCacheStats(): {
  size: number;
  entries: string[];
} {
  return {
    size: youtubeSubscribersCache.size,
    entries: Array.from(youtubeSubscribersCache.keys()),
  };
}
