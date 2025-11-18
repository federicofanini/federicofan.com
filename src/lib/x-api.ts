import { TwitterApi } from "twitter-api-v2";

interface XUserCache {
  profileImageUrl: string;
  displayName: string;
  timestamp: number;
}

interface XFollowersCache {
  followers: number;
  timestamp: number;
}

// In-memory cache for X user profiles
const xUserCache = new Map<string, XUserCache>();

// In-memory cache for X follower counts
const xFollowersCache = new Map<string, XFollowersCache>();

// Cache duration: 1 day in milliseconds
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Cache duration for followers: 1 hour in milliseconds
const FOLLOWERS_CACHE_DURATION = 60 * 60 * 1000;

// Track pending requests to prevent concurrent API calls for the same username
const pendingRequests = new Map<string, Promise<number | null>>();

/**
 * Get X API client instance
 */
function getXClient() {
  const bearerToken = process.env.X_BEARER_TOKEN;

  if (!bearerToken) {
    throw new Error("X_BEARER_TOKEN is not set in environment variables");
  }

  return new TwitterApi(bearerToken);
}

/**
 * Check if cached data is still valid
 */
function isCacheValid(username: string): boolean {
  const cached = xUserCache.get(username.toLowerCase());
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < CACHE_DURATION;
}

/**
 * Get cached user data if available and valid
 */
function getCachedUser(username: string): XUserCache | null {
  const cached = xUserCache.get(username.toLowerCase());
  if (cached && isCacheValid(username)) {
    return cached;
  }
  return null;
}

/**
 * Cache user data
 */
function cacheUser(
  username: string,
  data: Omit<XUserCache, "timestamp">
): void {
  xUserCache.set(username.toLowerCase(), {
    ...data,
    timestamp: Date.now(),
  });
}

/**
 * Fetch X user profile image with caching
 * @param username - X/Twitter username (without @)
 * @returns Profile image URL and display name
 */
export async function fetchXUserProfile(username: string): Promise<{
  profileImageUrl: string;
  displayName: string;
} | null> {
  try {
    // Remove @ if present
    const cleanUsername = username.replace("@", "");

    // Check cache first
    const cached = getCachedUser(cleanUsername);
    if (cached) {
      return {
        profileImageUrl: cached.profileImageUrl,
        displayName: cached.displayName,
      };
    }

    // Fetch from X API
    const client = getXClient();
    const user = await client.v2.userByUsername(cleanUsername, {
      "user.fields": ["profile_image_url", "name"],
    });

    if (!user.data) {
      return null;
    }

    // Get high-res profile image (replace _normal with _400x400)
    const profileImageUrl =
      user.data.profile_image_url?.replace("_normal", "_400x400") ||
      user.data.profile_image_url ||
      "";

    const displayName = user.data.name || cleanUsername;

    // Cache the result
    cacheUser(cleanUsername, {
      profileImageUrl,
      displayName,
    });

    return {
      profileImageUrl,
      displayName,
    };
  } catch (error) {
    console.error(`Error fetching X profile for @${username}:`, error);
    return null;
  }
}

/**
 * Fetch multiple X user profiles in parallel with caching
 * @param usernames - Array of X/Twitter usernames
 * @returns Map of username to profile data
 */
export async function fetchMultipleXUserProfiles(
  usernames: string[]
): Promise<Map<string, { profileImageUrl: string; displayName: string }>> {
  const results = new Map();

  // Separate cached and uncached usernames
  const uncachedUsernames: string[] = [];

  for (const username of usernames) {
    const cleanUsername = username.replace("@", "");
    const cached = getCachedUser(cleanUsername);

    if (cached) {
      results.set(cleanUsername.toLowerCase(), {
        profileImageUrl: cached.profileImageUrl,
        displayName: cached.displayName,
      });
    } else {
      uncachedUsernames.push(cleanUsername);
    }
  }

  // Fetch uncached profiles in parallel
  if (uncachedUsernames.length > 0) {
    const promises = uncachedUsernames.map((username) =>
      fetchXUserProfile(username)
    );

    const fetchedResults = await Promise.allSettled(promises);

    fetchedResults.forEach((result, index) => {
      const username = uncachedUsernames[index];
      if (result.status === "fulfilled" && result.value) {
        results.set(username.toLowerCase(), result.value);
      }
    });
  }

  return results;
}

/**
 * Clear cache for specific user or all users
 */
export function clearXUserCache(username?: string): void {
  if (username) {
    xUserCache.delete(username.toLowerCase());
  } else {
    xUserCache.clear();
  }
}

/**
 * Check if cached follower data is still valid
 */
function isFollowersCacheValid(username: string): boolean {
  const cached = xFollowersCache.get(username.toLowerCase());
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < FOLLOWERS_CACHE_DURATION;
}

/**
 * Get cached follower count if available and valid
 */
function getCachedFollowers(username: string): XFollowersCache | null {
  const cached = xFollowersCache.get(username.toLowerCase());
  if (cached && isFollowersCacheValid(username)) {
    return cached;
  }
  return null;
}

/**
 * Cache follower count
 */
function cacheFollowers(username: string, followers: number): void {
  xFollowersCache.set(username.toLowerCase(), {
    followers,
    timestamp: Date.now(),
  });
}

/**
 * Fetch X user follower count with caching (1 hour cache)
 * @param username - X/Twitter username (without @)
 * @returns Follower count
 */
export async function fetchXFollowerCount(
  username: string
): Promise<number | null> {
  // Remove @ if present
  const cleanUsername = username.replace("@", "");

  // Check cache first - return cached value if still valid
  const cached = getCachedFollowers(cleanUsername);
  if (cached) {
    return cached.followers;
  }

  // Check if there's already a pending request for this username
  const pendingRequest = pendingRequests.get(cleanUsername.toLowerCase());
  if (pendingRequest) {
    return pendingRequest;
  }

  // Create a new request
  const requestPromise = (async () => {
    try {
      // Fetch from X API
      const client = getXClient();
      const user = await client.v2.userByUsername(cleanUsername, {
        "user.fields": ["public_metrics"],
      });

      if (!user.data) {
        // If API call fails but we have expired cache, return it
        const expiredCache = xFollowersCache.get(cleanUsername.toLowerCase());
        if (expiredCache) {
          return expiredCache.followers;
        }
        return null;
      }

      const followers = user.data.public_metrics?.followers_count || 0;

      // Cache the result
      cacheFollowers(cleanUsername, followers);

      return followers;
    } catch (error: any) {
      console.error(`Error fetching X follower count for @${username}:`, error);

      // If we get a rate limit error (429), return expired cache if available
      if (error?.code === 429 || error?.status === 429) {
        const expiredCache = xFollowersCache.get(cleanUsername.toLowerCase());
        if (expiredCache) {
          console.log(
            `Rate limited - returning cached value for @${username} (age: ${Math.round(
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
      pendingRequests.delete(cleanUsername.toLowerCase());
    }
  })();

  // Store the pending request
  pendingRequests.set(cleanUsername.toLowerCase(), requestPromise);

  return requestPromise;
}

/**
 * Fetch recent tweets and calculate engagement metrics for the current month
 * @param username - X/Twitter username (without @)
 * @param userId - User ID from the profile
 * @returns Aggregated metrics for the current month
 */
export async function fetchXMonthlyMetrics(
  username: string,
  userId: string
): Promise<{
  followers: number;
  likes: number;
  replies: number;
  reposts: number;
  engagements: number;
} | null> {
  try {
    const cleanUsername = username.replace("@", "");
    const client = getXClient();

    // Get current month's start date
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startTime = startOfMonth.toISOString();

    // Fetch tweets from the current month
    // Note: Twitter API v2 has rate limits, so we'll fetch recent tweets
    const tweets = await client.v2.userTimeline(userId, {
      max_results: 100,
      "tweet.fields": ["created_at", "public_metrics"],
      start_time: startTime,
    });

    if (!tweets.data?.data) {
      return null;
    }

    // Aggregate metrics
    let totalLikes = 0;
    let totalReplies = 0;
    let totalReposts = 0;

    for (const tweet of tweets.data.data) {
      const metrics = tweet.public_metrics || {};
      totalLikes += metrics.like_count || 0;
      totalReplies += metrics.reply_count || 0;
      totalReposts += metrics.retweet_count || 0;
    }

    const totalEngagements = totalLikes + totalReplies + totalReposts;

    // Get current follower count
    const followers = await fetchXFollowerCount(cleanUsername);

    return {
      followers: followers || 0,
      likes: totalLikes,
      replies: totalReplies,
      reposts: totalReposts,
      engagements: totalEngagements,
    };
  } catch (error) {
    console.error(`Error fetching X monthly metrics for @${username}:`, error);
    return null;
  }
}

/**
 * Fetch full X user profile data
 * @param username - X/Twitter username (without @)
 * @returns Full profile data including bio, location, website, metrics, etc.
 */
export async function fetchXFullProfile(username: string): Promise<{
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  location: string | null;
  website: string | null;
  joinDate: string;
  following: number;
  followers: number;
  userId: string;
} | null> {
  try {
    // Remove @ if present
    const cleanUsername = username.replace("@", "");

    // Fetch from X API with all available fields
    const client = getXClient();
    const user = await client.v2.userByUsername(cleanUsername, {
      "user.fields": [
        "name",
        "username",
        "description",
        "profile_image_url",
        "verified",
        "location",
        "url",
        "created_at",
        "public_metrics",
        "id",
      ],
    });

    if (!user.data) {
      return null;
    }

    // Get high-res profile image (replace _normal with _400x400)
    const profileImageUrl =
      user.data.profile_image_url?.replace("_normal", "_400x400") ||
      user.data.profile_image_url ||
      "";

    // Format join date
    let joinDate = "Unknown";
    if (user.data.created_at) {
      const date = new Date(user.data.created_at);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      joinDate = `${month} ${year}`;
    }

    // Extract website domain from URL if available
    let website: string | null = null;
    if (user.data.url) {
      try {
        const url = new URL(user.data.url);
        website = url.hostname.replace("www.", "");
      } catch {
        website = user.data.url;
      }
    }

    return {
      name: user.data.name || cleanUsername,
      username: `@${user.data.username || cleanUsername}`,
      bio: user.data.description || "",
      avatarUrl: profileImageUrl,
      verified: user.data.verified || false,
      location: user.data.location || null,
      website,
      joinDate,
      following: user.data.public_metrics?.following_count || 0,
      followers: user.data.public_metrics?.followers_count || 0,
      userId: user.data.id || "",
    };
  } catch (error) {
    console.error(`Error fetching X full profile for @${username}:`, error);
    return null;
  }
}

/**
 * Get cache statistics
 */
export function getXCacheStats(): {
  size: number;
  entries: string[];
  followersSize: number;
  followersEntries: string[];
} {
  return {
    size: xUserCache.size,
    entries: Array.from(xUserCache.keys()),
    followersSize: xFollowersCache.size,
    followersEntries: Array.from(xFollowersCache.keys()),
  };
}
