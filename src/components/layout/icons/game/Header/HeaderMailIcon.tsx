import React from "react";

interface HeaderMailIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const HeaderMailIcon: React.FC<HeaderMailIconProps> = ({
  width = 14,
  height = 11,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 6.83364L5.54925 5.57421L0.487808 11H13.3836L8.41531 5.56506L7 6.83364ZM9.13938 4.98918L13.9527 10.2299C13.9803 10.1282 14 10.0228 14 9.91145V0.853061L9.13938 4.98918ZM0 0.831991V9.91145C0 10.0228 0.0196882 10.1282 0.0472507 10.2299L4.87681 5.00612L0 0.831991ZM13.5625 0H0.4375L7 5.50642L13.5625 0Z"
      fill="#0F0E10"
    />
  </svg>
);
