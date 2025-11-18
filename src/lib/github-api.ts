interface GitHubFollowersCache {
  followers: number;
  timestamp: number;
}

// In-memory cache for GitHub follower counts
const githubFollowersCache = new Map<string, GitHubFollowersCache>();

// Cache duration for followers: 1 hour in milliseconds
const FOLLOWERS_CACHE_DURATION = 60 * 60 * 1000;

// Track pending requests to prevent concurrent API calls for the same username
const pendingRequests = new Map<string, Promise<number | null>>();

/**
 * Get GitHub personal access token from environment (optional, increases rate limit)
 */
function getGitHubToken(): string | null {
  return process.env.GITHUB_TOKEN || null;
}

/**
 * Extract username from GitHub URL or handle
 * Supports formats:
 * - https://github.com/username
 * - https://www.github.com/username
 * - @username
 * - username
 */
function extractUsername(urlOrHandle: string): string | null {
  const clean = urlOrHandle.trim();

  // Handle @username format
  if (clean.startsWith("@")) {
    return clean.substring(1);
  }

  // Handle full GitHub URL
  if (clean.includes("github.com")) {
    const match = clean.match(/github\.com\/([^/?]+)/);
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
  const cached = githubFollowersCache.get(username.toLowerCase());
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < FOLLOWERS_CACHE_DURATION;
}

/**
 * Get cached follower count if available and valid
 */
function getCachedFollowers(username: string): GitHubFollowersCache | null {
  const cached = githubFollowersCache.get(username.toLowerCase());
  if (cached && isFollowersCacheValid(username)) {
    return cached;
  }
  return null;
}

/**
 * Cache follower count
 */
function cacheFollowers(username: string, followers: number): void {
  githubFollowersCache.set(username.toLowerCase(), {
    followers,
    timestamp: Date.now(),
  });
}

/**
 * Fetch GitHub user follower count with caching (1 hour cache)
 * Uses GitHub REST API (no authentication required for public profiles)
 * @param usernameOrUrl - GitHub username or full URL
 * @returns Follower count
 */
export async function fetchGitHubFollowerCount(
  usernameOrUrl: string
): Promise<number | null> {
  try {
    const username = extractUsername(usernameOrUrl);

    if (!username) {
      throw new Error(`Invalid GitHub username: ${usernameOrUrl}`);
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
        const token = getGitHubToken();

        // GitHub REST API endpoint for user info
        const apiUrl = `https://api.github.com/users/${encodeURIComponent(
          username
        )}`;

        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };

        // Add token if available (increases rate limit from 60 to 5000 requests/hour)
        if (token) {
          headers.Authorization = `token ${token}`;
        }

        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
          // If API call fails but we have expired cache, return it
          const expiredCache = githubFollowersCache.get(cleanUsername);
          if (expiredCache) {
            return expiredCache.followers;
          }

          if (response.status === 404) {
            throw new Error(`GitHub user not found: ${username}`);
          }

          throw new Error(
            `GitHub API failed: ${response.statusText} (${response.status})`
          );
        }

        const data = await response.json();

        if (data.followers === undefined) {
          // If API call fails but we have expired cache, return it
          const expiredCache = githubFollowersCache.get(cleanUsername);
          if (expiredCache) {
            return expiredCache.followers;
          }
          return null;
        }

        const followers = data.followers || 0;

        // Cache the result
        cacheFollowers(cleanUsername, followers);

        return followers;
      } catch (error: any) {
        console.error(
          `Error fetching GitHub follower count for ${usernameOrUrl}:`,
          error
        );

        // If we get a rate limit error (429), return expired cache if available
        if (error?.code === 429 || error?.status === 429) {
          const expiredCache = githubFollowersCache.get(cleanUsername);
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
      `Error fetching GitHub follower count for ${usernameOrUrl}:`,
      error
    );
    return null;
  }
}

/**
 * Clear cache for specific user or all users
 */
export function clearGitHubFollowersCache(username?: string): void {
  if (username) {
    githubFollowersCache.delete(username.toLowerCase());
  } else {
    githubFollowersCache.clear();
  }
}

/**
 * Get cache statistics
 */
export function getGitHubCacheStats(): {
  size: number;
  entries: string[];
} {
  return {
    size: githubFollowersCache.size,
    entries: Array.from(githubFollowersCache.keys()),
  };
}
