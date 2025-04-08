import { BrandLogoProps } from "./types";

export const FramerColorLogo = ({ ...props }: BrandLogoProps) => {
  return (
    <svg
      // Use a default viewBox or extract from SVG if needed
      viewBox="0 0 32 32" // Framer seems closer to 32x32
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...props}
      width="100%"
      height="100%"
    >
      <path
        clipRule="evenodd"
        d="m16 30c7.732 0 14-6.268 14-14 0-7.73199-6.268-14-14-14-7.73199 0-14 6.26801-14 14 0 7.732 6.26801 14 14 14z"
        fill="#fff"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="m9 20.3335h7v6.6667z"
        fill="#05f"
        fillRule="evenodd"
      />
      <path d="m16 13.6665h-7v6.6667h14z" fill="#0af" />
      <path d="m9 7 7 6.6667h7v-6.6667z" fill="#8df" />
    </svg>
  );
};

export default FramerColorLogo;
