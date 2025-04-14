import React from 'react';
import {
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';

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

interface TwitterCardProps {
  tweet: Tweet;
}

const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  return `${(num / 1000000).toFixed(1)}M`;
};

// Function to extract the filename from profile_image_url
const getLocalAvatarPath = (profileImageUrl: string): string => {
  const urlParts = profileImageUrl.split('/');
  const filename = urlParts[urlParts.length - 1];

  // Handle default profile image specially
  if (filename.includes('default_profile')) {
    return '/images/twitter-avatars/default_profile_400x400.png';
  }

  // For regular avatars, we need to extract the filename
  const filenameWithoutSize = filename
    .replace('.png', '_400x400.png')
    .replace('.jpg', '_400x400.jpg')
    .replace('.jpeg', '_400x400.jpg');
  return `/images/twitter-avatars/${filenameWithoutSize}`;
};

const TwitterCard: React.FC<TwitterCardProps> = ({ tweet }) => {
  const { author, text, metrics, url } = tweet;
  const avatarPath = getLocalAvatarPath(author.profile_image_url);

  // Process text to make links clickable and handle mentions
  const processedText = text
    .replace(/(https:\/\/t\.co\/\w+)/g, '<span class="font-medium text-gray-14">$1</span>')
    .replace(/@(\w+)/g, '<span class="font-medium text-gray-14">@$1</span>');

  return (
    <div
      className="relative bg-gray-2 rounded-2xl border border-gray-5 p-8 inline-block h-auto self-start cursor-pointer"
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
    >
      <div className="absolute top-4 right-4 text-gray-11">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      <div className="flex items-start space-x-5">
        <div>
          <img
            src={avatarPath}
            alt={`${author.name}'s avatar`}
            className="w-16 h-16 rounded-full object-cover"
            onError={(e) => {
              // Fallback to default image if the local image fails to load
              (e.target as HTMLImageElement).src =
                '/images/twitter-avatars/default_profile_400x400.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-16 truncate">{author.name}</span>
              <span className="text-gray-11 text-sm">@{author.username}</span>
            </div>
            <div
              className="mt-5 text-gray-14 whitespace-pre-line break-words"
              dangerouslySetInnerHTML={{ __html: processedText }}
            />
          </div>

          <div className="mt-6 flex justify-between gap-5 text-gray-11">
            <div className="flex items-center gap-2">
              <ChatBubbleOvalLeftIcon className="h-3 w-3 stroke-2" />
              <span className="text-xs">{formatNumber(metrics.reply_count)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowPathRoundedSquareIcon className="h-3 w-3 stroke-2" />
              <span className="text-xs">
                {formatNumber(metrics.retweet_count + metrics.quote_count)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HeartIcon className="h-3 w-3 stroke-2" />
              <span className="text-xs">{formatNumber(metrics.like_count)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookmarkIcon className="h-3 w-3 stroke-2" />
              <span className="text-xs">{formatNumber(metrics.bookmark_count)}</span>
            </div>
            {metrics.impression_count && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 12s3-9 10-9 10 9 10 9-3 9-10 9-10-9-10-9z"
                  />
                </svg>
                <span className="text-xs">{formatNumber(metrics.impression_count)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterCard;
