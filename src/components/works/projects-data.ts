export interface Project {
  id: number;
  title: string;
  company: string;
  companyUrl: string;
  year: string;
  thumbnail: string;
  fullVideo: string;
  featureVideo: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  keyFeatures: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  role: string;
  roles: string[];
  liveUrl?: string;
  formattedSummary?: {
    firstPart: string;
    secondPart: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Leaderboards',
    company: 'Whop',
    companyUrl: 'https://www.whop.com',
    year: '2025',
    thumbnail: '/videos/leaderboard/thumbnail-numberflow.mp4',
    fullVideo: '/videos/leaderboard/numberflow.mp4',
    featureVideo: '/videos/leaderboard/hover-card.mp4',
    summary: "Built a dynamic leaderboard into Whop's side panel for user rankings.",
    formattedSummary: {
      firstPart: 'A dynamic leaderboard',
      secondPart: "integrated into Whop's side panel to rank user earnings.",
    },
    problem: 'User directory lacked competitive features to track engagement.',
    solution: 'A leaderboard with real-time rankings and interactive animations.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    keyFeatures: [
      'Dynamic rank calculations',
      'User-specific positioning',
      'Interactive number flow animations',
      'Performance optimizations for large datasets',
    ],
    metrics: [
      { label: 'User Engagement', value: '+35%' },
      { label: 'Avg. Session Time', value: '+18min' },
      { label: 'Implementation', value: '4 weeks' },
    ],
    role: "I built the leaderboard prototype, collaborated with design team on final UI design, and developed the leaderboard's front-end logic. I collaborated with back-end engineers to address complex tie scenarios and user rank calculations. I also implemented a hovering social profile to encourage deeper interaction.",
    roles: ['Product Design', 'Engineering'],
  },
  {
    id: 2,
    title: 'Content rewards',
    company: 'Whop',
    companyUrl: 'https://www.whop.com',
    year: '2025',
    thumbnail: '/videos/content-rewards/thumbnail-card-2.mp4',
    fullVideo: '/videos/content-rewards/full-flow.mp4',
    featureVideo: '/videos/content-rewards/approvals-flow-card.mp4',
    summary: "Updated the submission review system for Whop's Content Rewards program.",
    formattedSummary: {
      firstPart: 'A submission review system',
      secondPart: "for Whop's Content Rewards program.",
    },
    problem: 'Moderators faced clunky, multi-step reviews',
    solution: 'A unified card-based layout cut clutter and improved submission checks.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    keyFeatures: [
      'Consolidated review cards with inline charts',
      'Custom thumbnail system for consistent video display',
      'Simplified approval/rejection workflow',
      'Visual analytics for campaign performance',
    ],
    metrics: [
      { label: 'Review Time', value: '-40%' },
      { label: 'Client Satisfaction', value: '+92%' },
      { label: 'UI Elements', value: '-25' },
    ],
    role: 'I designed a minimal UI with embedded video players and real-time metric charts. I introduced a streamlined approval/reject modal for power users. I gathered feedback from moderators to fine-tune the final experience.',
    roles: ['Front-end Engineering', 'Product Design'],
  },
  {
    id: 3,
    title: 'Crypto analytics',
    company: 'Stride',
    companyUrl: 'https://www.stride.zone',
    year: '2024',
    thumbnail: '/videos/Bnocs/thumbnail-flow2.mp4',
    fullVideo: '/videos/Bnocs/169-flow.mp4',
    featureVideo: '/videos/Bnocs/169chart.mp4',
    summary: 'An LLM-powered dashboard for Stride protocol analytics and news summaries.',
    formattedSummary: {
      firstPart: 'An LLM-powered dashboard',
      secondPart: 'for Stride protocol analytics and news summaries.',
    },
    problem: 'Fragmented data sources made tracking yield and TVL cumbersome',
    solution:
      'A unified dashboard that consolidated metrics, charts, and community updates in one platform.',
    techStack: ['React', 'Firebase', 'BigQuery', 'OpenAI API', 'Tailwind CSS', 'Figma'],
    keyFeatures: [
      'Custom TVL tracking charts',
      'LLM-powered news summaries',
      'Protocol performance metrics',
      'Team and community activity tracking',
    ],
    metrics: [
      { label: 'Funding Secured', value: '$10K' },
      { label: 'Data Sources', value: '7+' },
      { label: 'Daily Users', value: '350+' },
    ],
    role: 'I architected the React front-end and integrated BigQuery, Firebase, and OpenAI for data and summarization. I designed intuitive chart views and news modals. I ensured real-time automated data scrapes and updates.',
    roles: ['Front-end Engineering', 'Back-end Engineering', 'Product Design'],
    liveUrl: 'https://bnocs.com',
  },
  {
    id: 4,
    title: 'Staking dashboard',
    company: 'Züs',
    companyUrl: 'https://www.zus.network',
    year: '2024',
    thumbnail: '/videos/zcn.fun/thumbnail-chart-2.mp4',
    fullVideo: '/videos/zcn.fun/chart-16-9.mp4',
    featureVideo: '/videos/zcn.fun/zcnfunsearch169.mp4',
    summary: 'A real-time profitability and yield tracker for the Züs platform.',
    formattedSummary: {
      firstPart: 'A real-time profitability and yield tracker',
      secondPart: 'for the Züs platform.',
    },
    problem: 'No easy way to find profitable Blobbers (decentralized storage provider nodes)',
    solution:
      'A visualization platform that displayed returns and enabled data-driven staking decisions.',
    techStack: ['React', 'BigQuery', 'Firebase', 'Tailwind CSS', 'Figma'],
    keyFeatures: [
      'Yield calculation for all staking options',
      'Blobber performance tracking',
      'Visual APR comparisons',
      'Historical performance charts',
    ],
    metrics: [
      { label: 'Funding Secured', value: '$20K' },
      { label: 'Community Adoption', value: '75%' },
      { label: 'Data Points', value: '100K+' },
    ],
    role: 'I created the front-end in React, integrating chart components for yield visualization. I connected multiple data sources via BigQuery and Firebase for real-time updates. I handled design iterations to ensure quick scanning of Blobber performance.',
    roles: ['Front-end Engineering', 'Back-end Engineering', 'Product Design'],
    liveUrl: 'https://zcn.fun',
  },
];
