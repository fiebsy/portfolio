import { CustomizableLogoProps } from './types';

export const FramerLogo = ({ color, ...props }: CustomizableLogoProps) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      {...props}
    >
      <path
        fill={color || 'currentColor'}
        d="m5.333 0h21.333v10.667h-10.667zm0 10.667h10.667l10.667 10.667h-21.333zm0 10.666h10.667v10.667z"
      />
    </svg>
  );
};

export default FramerLogo;
