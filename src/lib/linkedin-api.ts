interface LinkedInFollowersCache {
  followers: number;
  timestamp: number;
}

// In-memory cache for LinkedIn follower counts
const linkedInFollowersCache = new Map<string, LinkedInFollowersCache>();

// Cache duration for followers: 1 hour in milliseconds
const FOLLOWERS_CACHE_DURATION = 60 * 60 * 1000;

// Track pending requests to prevent concurrent API calls for the same identifier
const pendingRequests = new Map<string, Promise<number | null>>();

/**
 * Get LinkedIn access token from environment
 */
function getLinkedInAccessToken(): string {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "LINKEDIN_ACCESS_TOKEN is not set in environment variables"
    );
  }

  return accessToken;
}

/**
 * Extract identifier from LinkedIn URL or handle
 * Supports formats:
 * - https://www.linkedin.com/in/username/
 * - https://linkedin.com/in/username
 * - https://www.linkedin.com/company/companyname
 * - username (for personal profiles)
 * - companyname (for company pages)
 */
function extractIdentifier(urlOrHandle: string): {
  type: "person" | "company";
  identifier: string;
} | null {
  const clean = urlOrHandle.trim();

  // Handle full LinkedIn URL
  if (clean.includes("linkedin.com")) {
    // Personal profile
    const personMatch = clean.match(/linkedin\.com\/in\/([^/?]+)/);
    if (personMatch) {
      return { type: "person", identifier: personMatch[1] };
    }

    // Company page
    const companyMatch = clean.match(/linkedin\.com\/company\/([^/?]+)/);
    if (companyMatch) {
      return { type: "company", identifier: companyMatch[1] };
    }
  }

  // If it's just a plain string, assume it's a personal profile username
  if (!clean.includes("/") && !clean.includes("http")) {
    return { type: "person", identifier: clean };
  }

  return null;
}

/**
 * Check if cached follower data is still valid
 */
function isFollowersCacheValid(identifier: string): boolean {
  const cached = linkedInFollowersCache.get(identifier.toLowerCase());
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < FOLLOWERS_CACHE_DURATION;
}

/**
 * Get cached follower count if available and valid
 */
function getCachedFollowers(identifier: string): LinkedInFollowersCache | null {
  const cached = linkedInFollowersCache.get(identifier.toLowerCase());
  if (cached && isFollowersCacheValid(identifier)) {
    return cached;
  }
  return null;
}

/**
 * Cache follower count
 */
function cacheFollowers(identifier: string, followers: number): void {
  linkedInFollowersCache.set(identifier.toLowerCase(), {
    followers,
    timestamp: Date.now(),
  });
}

/**
 * Fetch LinkedIn profile/company follower count with caching (1 hour cache)
 * Uses LinkedIn API v2
 * @param identifierOrUrl - LinkedIn username, company name, or full URL
 * @returns Follower count
 */
export async function fetchLinkedInFollowerCount(
  identifierOrUrl: string
): Promise<number | null> {
  try {
    const extracted = extractIdentifier(identifierOrUrl);

    if (!extracted) {
      throw new Error(`Invalid LinkedIn identifier: ${identifierOrUrl}`);
    }

    const cacheKey = `${extracted.type}:${extracted.identifier}`.toLowerCase();

    // Check cache first
    const cached = getCachedFollowers(cacheKey);
    if (cached) {
      return cached.followers;
    }

    // Check if there's already a pending request for this identifier
    const pendingRequest = pendingRequests.get(cacheKey);
    if (pendingRequest) {
      return pendingRequest;
    }

    // Create a new request
    const requestPromise = (async () => {
      try {
        const accessToken = getLinkedInAccessToken();

        // LinkedIn API v2 requires organization or person URN
        // First, we need to find the URN by searching or using the identifier
        // For now, we'll use the identifier directly in the API call

        let apiUrl: string;
        if (extracted.type === "company") {
          // For company pages, use the organization lookup
          // Note: This requires the organization to be associated with your app
          apiUrl = `https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=${encodeURIComponent(
            extracted.identifier
          )}`;
        } else {
          // For personal profiles, use person lookup
          // Note: LinkedIn API requires specific permissions and the person must be in your network
          // This is a simplified approach - you may need to adjust based on your use case
          apiUrl = `https://api.linkedin.com/v2/people/(vanityName:${encodeURIComponent(
            extracted.identifier
          )})`;
        }

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // If API call fails but we have expired cache, return it
          const expiredCache = linkedInFollowersCache.get(cacheKey);
          if (expiredCache) {
            return expiredCache.followers;
          }

          // LinkedIn API requires specific permissions and setup
          throw new Error(
            `LinkedIn API failed: ${response.statusText}. Note: LinkedIn API requires proper OAuth setup and permissions.`
          );
        }

        const data = await response.json();

        // Extract follower count based on response structure
        // The actual structure depends on the API endpoint used
        let followers = 0;

        if (extracted.type === "company") {
          // For organizations, follower count might be in different fields
          followers = data.followerCount || data.numFollowers || 0;
        } else {
          // For personal profiles, follower count might not be directly available
          // LinkedIn API v2 has limited access to follower counts for personal profiles
          followers = data.followerCount || 0;
        }

        // Cache the result
        cacheFollowers(cacheKey, followers);

        return followers;
      } catch (error: any) {
        console.error(
          `Error fetching LinkedIn follower count for ${identifierOrUrl}:`,
          error
        );

        // If we get a rate limit error (429), return expired cache if available
        if (error?.code === 429 || error?.status === 429) {
          const expiredCache = linkedInFollowersCache.get(cacheKey);
          if (expiredCache) {
            console.log(
              `Rate limited - returning cached value for ${identifierOrUrl} (age: ${Math.round(
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
        pendingRequests.delete(cacheKey);
      }
    })();

    // Store the pending request
    pendingRequests.set(cacheKey, requestPromise);

    return requestPromise;
  } catch (error) {
    console.error(
      `Error fetching LinkedIn follower count for ${identifierOrUrl}:`,
      error
    );
    return null;
  }
}

/**
 * Clear cache for specific identifier or all identifiers
 */
export function clearLinkedInFollowersCache(identifier?: string): void {
  if (identifier) {
    linkedInFollowersCache.delete(identifier.toLowerCase());
  } else {
    linkedInFollowersCache.clear();
  }
}

/**
 * Get cache statistics
 */
export function getLinkedInCacheStats(): {
  size: number;
  entries: string[];
} {
  return {
    size: linkedInFollowersCache.size,
    entries: Array.from(linkedInFollowersCache.keys()),
  };
}
