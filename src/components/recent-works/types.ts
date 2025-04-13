// Project data structure
export interface Project {
  id: number;
  title: string;
  company: string;
  year: string;
  thumbnail: string;
}

// Stacking animation type
export interface StackingAnimation {
  translateY: ({ progress }: { progress: number }) => string;
  scale: [number, number];
  transformOrigin: string;
}

// Sheet names
export enum SheetName {
  ProjectList = 'projectList',
  ProjectDetail = 'projectDetail',
}

// Detent size enum
export enum DetentSize {
  Small = 1, // 40vh
  Medium = 2, // 60vh
  Large = 3, // 90vh
}
