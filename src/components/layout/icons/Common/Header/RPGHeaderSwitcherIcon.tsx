import React from "react";

interface HeaderSwitcherIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const RPGHeaderSwitcherIcon: React.FC<HeaderSwitcherIconProps> = ({
  width = 22,
  height = 12,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14.0744 5.17007V10.1804H5.82735V12L0 7.67497L5.82735 3.35051V5.17007H14.0744Z"
      fill="#0F0E10"
    />
    <path d="M14.0744 5.16998H7.2688V7.49036H14.0744V5.16998Z" fill="#7F5CFF" />
    <path
      d="M22.0001 4.32472L16.173 0V1.81973H7.9259V6.82967H16.173V8.6494L22.0001 4.32472Z"
      fill="#0F0E10"
    />
  </svg>
);
