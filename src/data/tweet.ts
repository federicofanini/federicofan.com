import { cache } from "react";

type Tweet = {
  text: string;
  author: {
    name: string;
    username: string;
    profile_image_url: string;
  };
  created_at: string;
  public_metrics: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };
};

export const getTweet = cache(async (id: string): Promise<Tweet> => {
  // Load environment variable at runtime
  const twitterToken = process.env.TWITTER_BEARER_TOKEN;

  if (!twitterToken) {
    throw new Error(
      "TWITTER_BEARER_TOKEN is not defined. Please check your .env file."
    );
  }

  const response = await fetch(
    `https://api.twitter.com/2/tweets/${id}?tweet.fields=created_at,public_metrics&expansions=author_id&user.fields=name,username,profile_image_url`,
    {
      headers: {
        Authorization: `Bearer ${twitterToken}`,
      },
      next: {
        revalidate: 86400, // Cache for 24 hours
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tweet: ${response.statusText}`);
  }

  const json = await response.json();

  if (!json.data || !json.includes?.users?.length) {
    throw new Error("Invalid tweet data received");
  }

  return {
    text: json.data.text,
    author: {
      name: json.includes.users[0].name,
      username: json.includes.users[0].username,
      profile_image_url: json.includes.users[0].profile_image_url,
    },
    created_at: json.data.created_at,
    public_metrics: json.data.public_metrics,
  };
});
