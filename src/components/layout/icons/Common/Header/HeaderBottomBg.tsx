import React from "react";

interface HeaderBottomBgProps {
  width?: number;
  height?: number;
  className?: string;
}

export const HeaderBottomBg: React.FC<HeaderBottomBgProps> = ({
  width = 353,
  height = 11,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 353 11"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M296 0L300.775 4.58033H317.511L324.202 11H353L345.412 3.72677L341.53 0H296Z"
      fill="#2A1E54"
    />
    <path
      d="M321 11L317.168 7.33333H298.002L290.334 0H229L232.834 3.66666H290.334L298.002 11H321Z"
      fill="#7F5CFF"
    />
    <path
      d="M57 0L52.2254 4.58033H35.4894L28.7979 11H0L7.5883 3.72677L11.4702 0H57Z"
      fill="#2A1E54"
    />
    <path
      d="M32 11L35.8317 7.33333H54.9984L62.666 0H124L120.166 3.66666H62.666L54.9984 11H32Z"
      fill="#7F5CFF"
    />
  </svg>
);
