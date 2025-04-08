import { SVGProps } from "react";

export interface BaseLogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export interface CustomizableLogoProps extends BaseLogoProps {
  color?: string;
}

export interface BrandLogoProps extends BaseLogoProps {
  // No color prop - uses brand colors only
}

export const BRAND_COLORS = {
  typescript: "#3178C6",
  react: "#61DAFB",
  nextjs: "#000000",
  tailwind: "#38BDF8",
  firebase: "#FFCA28",
  figma: "#F24E1E",
  framer: "#0055FF",
  bigquery: "#4285F4",
  lottie: "#00D1C1",
  whop: "#FF6243",
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;
