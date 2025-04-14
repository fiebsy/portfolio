import { BrandLogoProps } from './types';

export const FigmaColorLogo = ({ ...props }: BrandLogoProps) => {
  return (
    <svg
      // Use a default viewBox or extract from SVG if needed
      viewBox="0 0 24 24" // Figma seems to use a different transform, keeping 24x24 for now
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...props}
      width="100%"
      height="100%"
    >
      <g fill="none" fillRule="evenodd" transform="translate(4)">
        <circle cx="12" cy="12" fill="#19bcfe" r="4" />
        <path
          d="m4 24c2.209139 0 4-1.790861 4-4 0-.6030539 0-1.9363872 0-4-1.79696123 0-3.13029457 0-4 0-2.209139 0-4 1.790861-4 4s1.790861 4 4 4z"
          fill="#09cf83"
        />
        <path
          d="m4 16h4v-8c-1.930287 0-3.26362033 0-4 0-2.209139 0-4 1.790861-4 4s1.790861 4 4 4z"
          fill="#a259ff"
        />
        <path
          d="m4 8h4v-8c-1.930287 0-3.26362033 0-4 0-2.209139 0-4 1.790861-4 4s1.790861 4 4 4z"
          fill="#f24e1e"
        />
        <path d="m12 8h-4v-8h4c2.209139 0 4 1.790861 4 4s-1.790861 4-4 4z" fill="#ff7262" />
      </g>
    </svg>
  );
};

export default FigmaColorLogo;
