import {
  ReactColorLogo,
  TsColorLogo,
  FirebaseColorLogo,
  BigqueryColorLogo,
  FigmaColorLogo,
  LottieLogo,
  FramerColorLogo,
  TailwindColorLogo,
  NextjsLogo,
} from '@/components/icons/logos';
import { LucideIcon } from 'lucide-react';

// Define the Tech interface with proper typing for icon
export interface Tech {
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

// Define the SkillCategory interface
export interface SkillCategory {
  name: string;
  level: number; // 1-5 scale
  years: string;
  technologies: Tech[];
}

// Define the skills data with associated technologies
export const skillsData: SkillCategory[] = [
  {
    name: 'Product design',
    level: 5,
    years: '5y',
    technologies: [
      { name: 'Figma', icon: FigmaColorLogo },
      { name: 'Lottie', icon: LottieLogo },
      { name: 'Framer', icon: FramerColorLogo },
    ]
  },
  {
    name: 'Engineering',
    level: 1.5,
    years: '1.5y',
    technologies: [
      { name: 'React', icon: ReactColorLogo },
      { name: 'Typescript', icon: TsColorLogo },
      { name: 'Next.js', icon: NextjsLogo },
      { name: 'Tailwind', icon: TailwindColorLogo },
      { name: 'Firebase', icon: FirebaseColorLogo },
      { name: 'Bigquery', icon: BigqueryColorLogo },
    ]
  },
]; 