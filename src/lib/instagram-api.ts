interface InstagramFollowersCache {
  followers: number;
  timestamp: number;
}

// In-memory cache for Instagram follower counts
const instagramFollowersCache = new Map<string, InstagramFollowersCache>();

// Cache duration for followers: 1 hour in milliseconds
const FOLLOWERS_CACHE_DURATION = 60 * 60 * 1000;

// Track pending requests to prevent concurrent API calls for the same username
const pendingRequests = new Map<string, Promise<number | null>>();

/**
 * Get Instagram access token from environment
 */
function getInstagramAccessToken(): string {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "INSTAGRAM_ACCESS_TOKEN is not set in environment variables"
    );
  }

  return accessToken;
}

/**
 * Extract username from Instagram URL or handle
 * Supports formats:
 * - https://www.instagram.com/username/
 * - https://instagram.com/username
 * - @username
 * - username
 */
function extractUsername(urlOrHandle: string): string | null {
  const clean = urlOrHandle.trim();

  // Handle @username format
  if (clean.startsWith("@")) {
    return clean.substring(1);
  }

  // Handle full Instagram URL
  if (clean.includes("instagram.com")) {
    const match = clean.match(/instagram\.com\/([^/?]+)/);
    if (match) {
      return match[1];
    }
  }

  // If it's just a plain string without special characters, assume it's a username
  if (!clean.includes("/") && !clean.includes("http") && !clean.includes("@")) {
    return clean;
  }

  return null;
}

/**
 * Check if cached follower data is still valid
 */
function isFollowersCacheValid(username: string): boolean {
  const cached = instagramFollowersCache.get(username.toLowerCase());
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < FOLLOWERS_CACHE_DURATION;
}

/**
 * Get cached follower count if available and valid
 */
function getCachedFollowers(username: string): InstagramFollowersCache | null {
  const cached = instagramFollowersCache.get(username.toLowerCase());
  if (cached && isFollowersCacheValid(username)) {
    return cached;
  }
  return null;
}

/**
 * Cache follower count
 */
function cacheFollowers(username: string, followers: number): void {
  instagramFollowersCache.set(username.toLowerCase(), {
    followers,
    timestamp: Date.now(),
  });
}

/**
 * Fetch Instagram user follower count with caching (1 hour cache)
 * Uses Instagram Graph API
 * @param usernameOrUrl - Instagram username or full URL
 * @returns Follower count
 */
export async function fetchInstagramFollowerCount(
  usernameOrUrl: string
): Promise<number | null> {
  try {
    const username = extractUsername(usernameOrUrl);

    if (!username) {
      throw new Error(`Invalid Instagram username: ${usernameOrUrl}`);
    }

    const cleanUsername = username.toLowerCase();

    // Check cache first
    const cached = getCachedFollowers(cleanUsername);
    if (cached) {
      return cached.followers;
    }

    // Check if there's already a pending request for this username
    const pendingRequest = pendingRequests.get(cleanUsername);
    if (pendingRequest) {
      return pendingRequest;
    }

    // Create a new request
    const requestPromise = (async () => {
      try {
        const accessToken = getInstagramAccessToken();

        // First, get the Instagram Business Account ID using the username
        // Note: This requires the user to be connected via Instagram Graph API
        // You'll need to get the Instagram Business Account ID first
        // For now, we'll try to use the username directly

        // Try to get user info using Instagram Graph API
        // Note: Instagram Graph API requires a Business Account and proper setup
        const response = await fetch(
          `https://graph.instagram.com/${cleanUsername}?fields=username,followers_count&access_token=${accessToken}`
        );

        if (!response.ok) {
          // If the Graph API doesn't work, try alternative approach
          // Instagram Basic Display API or scraping (not recommended)
          throw new Error(
            `Instagram API failed: ${response.statusText}. Note: Instagram Graph API requires a Business Account.`
          );
        }

        const data = await response.json();

        if (!data.followers_count) {
          // If API call fails but we have expired cache, return it
          const expiredCache = instagramFollowersCache.get(cleanUsername);
          if (expiredCache) {
            return expiredCache.followers;
          }
          return null;
        }

        const followers = data.followers_count || 0;

        // Cache the result
        cacheFollowers(cleanUsername, followers);

        return followers;
      } catch (error: any) {
        console.error(
          `Error fetching Instagram follower count for ${usernameOrUrl}:`,
          error
        );

        // If we get a rate limit error (429), return expired cache if available
        if (error?.code === 429 || error?.status === 429) {
          const expiredCache = instagramFollowersCache.get(cleanUsername);
          if (expiredCache) {
            console.log(
              `Rate limited - returning cached value for ${usernameOrUrl} (age: ${Math.round(
                (Date.now() - expiredCache.timestamp) / 1000 / 60
              )} minutes)`
            );
            return expiredCache.followers;
          }
        }

        // If no cache available, return null
        return null;
      } finally {
        // Remove from pending requests
        pendingRequests.delete(cleanUsername);
      }
    })();

    // Store the pending request
    pendingRequests.set(cleanUsername, requestPromise);

    return requestPromise;
  } catch (error) {
    console.error(
      `Error fetching Instagram follower count for ${usernameOrUrl}:`,
      error
    );
    return null;
  }
}

/**
 * Clear cache for specific user or all users
 */
export function clearInstagramFollowersCache(username?: string): void {
  if (username) {
    instagramFollowersCache.delete(username.toLowerCase());
  } else {
    instagramFollowersCache.clear();
  }
}

/**
 * Get cache statistics
 */
export function getInstagramCacheStats(): {
  size: number;
  entries: string[];
} {
  return {
    size: instagramFollowersCache.size,
    entries: Array.from(instagramFollowersCache.keys()),
  };
}
