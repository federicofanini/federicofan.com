/**
 * Cursor IDE Stats Data
 *
 * This file contains configuration and sample data for the Cursor Stats component.
 * In the future, this could be replaced with actual Cursor API integration.
 */

export interface CursorStatsData {
  linesWritten: number;
  linesEdited: number;
  sessionsCount: number;
  averageSessionTime: number; // in minutes
  totalCodingTime: number; // in hours
  currentStreak: number; // days
  longestStreak: number; // days
  favoriteLanguages: {
    name: string;
    percentage: number;
    color: string;
  }[];
}

/**
 * Sample Cursor stats data
 *
 * TODO: Replace with real Cursor API data when available
 * Cursor doesn't have a public API yet, so this data is manually updated
 * or could be integrated with other code tracking tools like WakaTime
 */
export const CURSOR_STATS: CursorStatsData = {
  // Total lines of code written in Cursor
  linesWritten: 47823,

  // Total lines of code edited/refined
  linesEdited: 12456,

  // Number of coding sessions
  sessionsCount: 342,

  // Average duration of each coding session (minutes)
  averageSessionTime: 87,

  // Total time spent coding (hours)
  totalCodingTime: 234,

  // Current consecutive coding streak (days)
  currentStreak: 12,

  // Longest streak ever achieved (days)
  longestStreak: 28,

  // Programming languages distribution
  favoriteLanguages: [
    {
      name: "TypeScript",
      percentage: 45,
      color: "#3178c6",
    },
    {
      name: "Python",
      percentage: 28,
      color: "#3776ab",
    },
    {
      name: "JavaScript",
      percentage: 18,
      color: "#f7df1e",
    },
    {
      name: "Other",
      percentage: 9,
      color: "#6b7280",
    },
  ],
};

/**
 * Configuration for GitHub username
 * Used to fetch GitHub contributions and follower count
 */
export const GITHUB_USERNAME = "federicofanini"; // Replace with your GitHub username

/**
 * Helper function to format large numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Helper function to calculate total lines (written + edited)
 */
export function getTotalLines(stats: CursorStatsData): number {
  return stats.linesWritten + stats.linesEdited;
}

/**
 * Helper function to calculate average lines per session
 */
export function getAverageLinesPerSession(stats: CursorStatsData): number {
  if (stats.sessionsCount === 0) return 0;
  return Math.round(stats.linesWritten / stats.sessionsCount);
}

/**
 * Cursor API Integration
 *
 * This project now supports real-time stats from Cursor's official API!
 * Documentation: https://cursor.com/docs/api
 *
 * Setup Instructions:
 * 1. Navigate to https://cursor.com/settings
 * 2. Create an Analytics API key
 * 3. Add CURSOR_API_KEY to your .env file
 * 4. Requires: Enterprise team plan for full Analytics API access
 *
 * Available Cursor APIs:
 * - Analytics API: Usage summary, DAU, AI metrics (Enterprise)
 * - AI Code Tracking API: Track AI-generated code contributions (Enterprise)
 * - Admin API: Manage team members, settings, usage data (Enterprise)
 * - Cloud Agents API: Manage AI coding agents (All plans, Beta)
 *
 * Rate Limits:
 * - Team-level endpoints: 100 requests/minute
 * - By-user endpoints: 50 requests/minute
 * - Caching: 15 minutes (automatic with ETags)
 *
 * What you'll get:
 * - Real-time usage statistics
 * - AI acceptance rates
 * - Active user counts
 * - Model usage data
 * - Code tracking metrics
 *
 * Fallback: If CURSOR_API_KEY is not set, the component will use
 * the static data defined above in CURSOR_STATS.
 *
 * Alternative: WakaTime Integration
 *
 * If you don't have Cursor Enterprise, consider WakaTime API:
 * https://wakatime.com/developers
 *
 * WakaTime tracks:
 * - Time spent coding
 * - Languages used
 * - Projects worked on
 * - Daily/weekly stats
 * - Coding streaks
 *
 * You'll need to add WAKATIME_API_KEY to your .env file
 */
