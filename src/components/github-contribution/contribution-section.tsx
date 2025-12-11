"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ContributionChart } from "./contribution-chart";
import { GitHubContribution } from "./github-contribution";

interface ContributionSectionProps {
  contributions?: GitHubContribution[] | null;
  loading?: boolean;
  error?: string | null;
  className?: string;
  showConnectPrompt?: boolean;
  isPublic?: boolean;
  username?: string; // Optional: defaults to federicofanini
}

const DEFAULT_USERNAME = "federicofanini";

export function ContributionSection({
  contributions: propContributions,
  loading: propLoading = false,
  error: propError = null,
  className = "",
  showConnectPrompt = true,
  isPublic = false,
  username = DEFAULT_USERNAME,
}: ContributionSectionProps) {
  const [contributions, setContributions] = useState<
    GitHubContribution[] | null
  >(propContributions || null);
  const [loading, setLoading] = useState(propLoading);
  const [error, setError] = useState<string | null>(propError);

  const fetchContributions = useCallback(async () => {
    // If contributions are provided as props, use them
    if (propContributions !== undefined) {
      setContributions(propContributions);
      setLoading(propLoading);
      setError(propError);
      return;
    }

    // Otherwise, fetch them
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/github/contributions?username=${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contributions");
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setContributions(null);
      } else {
        setContributions(data.contributions || []);
      }
    } catch (err) {
      console.error("Error fetching contributions:", err);
      setError("Failed to load GitHub contributions");
      setContributions(null);
    } finally {
      setLoading(false);
    }
  }, [username, propContributions, propLoading, propError]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  // If no GitHub data available
  if (!contributions && !loading) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="bg-card border rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">No GitHub Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error ||
              (isPublic
                ? "This user hasn't connected their GitHub account"
                : "Connect your GitHub account to see contribution statistics")}
          </p>
          {!isPublic && showConnectPrompt && (
            <button
              onClick={fetchContributions}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* GitHub Variation */}
      <ContributionChart
        contributions={contributions || []}
        loading={loading}
        error={error}
        variant="github"
        className="w-full"
      />

      {/* Add revenues ?
      <ContributionChart
        contributions={contributions || []}
        loading={loading}
        error={error}
        variant="commits"
        title="Daily Commits"
        className="w-full"
      />*/}

      {/* Add health data ?\ 
      <ContributionChart
        contributions={contributions || []}
        loading={loading}
        error={error}
        variant="activity"
        className="w-full"
      />*/}

      {/* Add streak on socials ?
      <ContributionChart
        contributions={contributions || []}
        loading={loading}
        error={error}
        variant="streak"
        className="w-full"
      />*/}
    </div>
  );
}

// Cursor rules applied correctly.
