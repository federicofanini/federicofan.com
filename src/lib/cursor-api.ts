/**
 * Cursor Analytics API Integration
 * Documentation: https://cursor.com/docs/api
 *
 * Requires: Enterprise team plan for Analytics API access
 * API Key: Create from cursor.com/settings
 */

interface CursorAnalyticsCache {
  data: any;
  timestamp: number;
}

// In-memory cache for Cursor analytics data
const cursorCache = new Map<string, CursorAnalyticsCache>();

// Cache duration: 15 minutes (aligned with Cursor's cache-control)
const CACHE_DURATION = 15 * 60 * 1000;

/**
 * Get Cursor API key from environment
 */
function getCursorApiKey(): string | null {
  return process.env.CURSOR_API_KEY || null;
}

/**
 * Check if cached data is still valid
 */
function isCacheValid(cacheKey: string): boolean {
  const cached = cursorCache.get(cacheKey);
  if (!cached) return false;

  const now = Date.now();
  return now - cached.timestamp < CACHE_DURATION;
}

/**
 * Get cached data if available and valid
 */
function getCachedData(cacheKey: string): any | null {
  if (isCacheValid(cacheKey)) {
    const cached = cursorCache.get(cacheKey);
    return cached?.data || null;
  }
  return null;
}

/**
 * Cache analytics data
 */
function setCachedData(cacheKey: string, data: any): void {
  cursorCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Base fetch function for Cursor API with authentication
 */
async function fetchCursorAPI(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const apiKey = getCursorApiKey();

  if (!apiKey) {
    throw new Error("CURSOR_API_KEY is not set in environment variables");
  }

  // Cursor uses Basic Authentication with API key as username
  const auth = Buffer.from(`${apiKey}:`).toString("base64");

  const response = await fetch(`https://api.cursor.com${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("CURSOR_RATE_LIMIT_EXCEEDED");
    }
    if (response.status === 401) {
      throw new Error("CURSOR_INVALID_API_KEY");
    }
    if (response.status === 403) {
      throw new Error("CURSOR_ENTERPRISE_REQUIRED");
    }
    throw new Error(`CURSOR_API_ERROR: ${response.status}`);
  }

  return response;
}

/**
 * Fetch Daily Active Users (DAU) data
 * Endpoint: GET /analytics/team/dau
 */
export async function fetchCursorDAU(
  period: string = "30d"
): Promise<{ success: boolean; data: any; error: string | null }> {
  try {
    const cacheKey = `dau-${period}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return { success: true, data: cached, error: null };
    }

    const response = await fetchCursorAPI(
      `/analytics/team/dau?period=${period}`
    );
    const data = await response.json();

    setCachedData(cacheKey, data);
    return { success: true, data, error: null };
  } catch (error: any) {
    console.error("Error fetching Cursor DAU:", error);
    return { success: false, data: null, error: error.message };
  }
}

/**
 * Fetch team usage summary
 * Endpoint: GET /analytics/team/usage-summary
 */
export async function fetchCursorUsageSummary(
  period: string = "30d"
): Promise<{ success: boolean; data: any; error: string | null }> {
  try {
    const cacheKey = `usage-summary-${period}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return { success: true, data: cached, error: null };
    }

    const response = await fetchCursorAPI(
      `/analytics/team/usage-summary?period=${period}`
    );
    const data = await response.json();

    setCachedData(cacheKey, data);
    return { success: true, data, error: null };
  } catch (error: any) {
    console.error("Error fetching Cursor usage summary:", error);
    return { success: false, data: null, error: error.message };
  }
}

/**
 * Fetch AI acceptance rate
 * Endpoint: GET /analytics/team/ai-acceptance-rate
 */
export async function fetchCursorAIAcceptanceRate(
  period: string = "30d"
): Promise<{ success: boolean; data: any; error: string | null }> {
  try {
    const cacheKey = `ai-acceptance-${period}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return { success: true, data: cached, error: null };
    }

    const response = await fetchCursorAPI(
      `/analytics/team/ai-acceptance-rate?period=${period}`
    );
    const data = await response.json();

    setCachedData(cacheKey, data);
    return { success: true, data, error: null };
  } catch (error: any) {
    console.error("Error fetching Cursor AI acceptance rate:", error);
    return { success: false, data: null, error: error.message };
  }
}

/**
 * Fetch AI code tracking stats
 * Endpoint: GET /ai-code-tracking/stats
 */
export async function fetchCursorAICodeStats(): Promise<{
  success: boolean;
  data: any;
  error: string | null;
}> {
  try {
    const cacheKey = "ai-code-stats";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return { success: true, data: cached, error: null };
    }

    const response = await fetchCursorAPI("/ai-code-tracking/stats");
    const data = await response.json();

    setCachedData(cacheKey, data);
    return { success: true, data, error: null };
  } catch (error: any) {
    console.error("Error fetching Cursor AI code stats:", error);
    return { success: false, data: null, error: error.message };
  }
}

/**
 * Fetch comprehensive Cursor stats for dashboard
 * Combines multiple API endpoints for a complete picture
 */
export async function fetchCursorStats(): Promise<{
  success: boolean;
  data: {
    usageSummary: any;
    dau: any;
    aiAcceptanceRate: any;
    aiCodeStats: any;
  } | null;
  error: string | null;
}> {
  try {
    const apiKey = getCursorApiKey();

    // If no API key, return error
    if (!apiKey) {
      return {
        success: false,
        data: null,
        error: "CURSOR_API_KEY_MISSING",
      };
    }

    // Fetch all stats in parallel
    const [usageSummary, dau, aiAcceptanceRate, aiCodeStats] =
      await Promise.all([
        fetchCursorUsageSummary("30d"),
        fetchCursorDAU("30d"),
        fetchCursorAIAcceptanceRate("30d"),
        fetchCursorAICodeStats(),
      ]);

    return {
      success: true,
      data: {
        usageSummary: usageSummary.data,
        dau: dau.data,
        aiAcceptanceRate: aiAcceptanceRate.data,
        aiCodeStats: aiCodeStats.data,
      },
      error: null,
    };
  } catch (error: any) {
    console.error("Error fetching Cursor stats:", error);
    return {
      success: false,
      data: null,
      error: error.message || "CURSOR_FETCH_ERROR",
    };
  }
}

/**
 * Get user-friendly error message based on error type
 */
export function getCursorErrorMessage(error: string): string {
  switch (error) {
    case "CURSOR_API_KEY_MISSING":
      return "Cursor API key not configured. Add CURSOR_API_KEY to your environment variables.";
    case "CURSOR_INVALID_API_KEY":
      return "Invalid Cursor API key. Please check your API key in environment variables.";
    case "CURSOR_ENTERPRISE_REQUIRED":
      return "Cursor Analytics API requires an Enterprise team plan.";
    case "CURSOR_RATE_LIMIT_EXCEEDED":
      return "Cursor API rate limit exceeded. Please try again in a minute.";
    case "CURSOR_API_ERROR":
      return "Unable to fetch Cursor data. API error occurred.";
    case "CURSOR_FETCH_ERROR":
      return "Failed to fetch Cursor data. Please try again later.";
    default:
      return "Unable to load Cursor data at this time.";
  }
}

/**
 * Clear cache for specific endpoint or all endpoints
 */
export function clearCursorCache(cacheKey?: string): void {
  if (cacheKey) {
    cursorCache.delete(cacheKey);
  } else {
    cursorCache.clear();
  }
}

/**
 * Get cache statistics
 */
export function getCursorCacheStats(): {
  size: number;
  entries: string[];
} {
  return {
    size: cursorCache.size,
    entries: Array.from(cursorCache.keys()),
  };
}
