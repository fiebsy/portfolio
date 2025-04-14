'use client';

import { useState, useEffect } from 'react';
import TwitterCard from '@/components/ui/twitter-card';

interface Author {
  id: string;
  username: string;
  name: string;
  profile_image_url: string;
}

interface Metrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
  bookmark_count: number;
  impression_count?: number;
}

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  metrics: Metrics;
  author: Author;
  url: string;
}

export default function TwitterCardsPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/twitter-posts-data/twitter-posts.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch tweets: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Twitter Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {tweets.map((tweet) => (
          <TwitterCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  );
}
