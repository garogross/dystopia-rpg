import React from "react";

interface DotsLineProps {
  width?: number;
  height?: number;
  className?: string;
  preserveAspectRatio?: boolean;
}

export const DotsLine: React.FC<DotsLineProps> = ({
  width = 89,
  height = 10,
  className,
  preserveAspectRatio,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 89 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio={preserveAspectRatio ? "none" : undefined}
  >
    <g style={{ mixBlendMode: "screen" }}>
      <path
        d="M89 4.99999H0"
        stroke="url(#paint0_linear_2001_114)"
        strokeWidth={9}
        strokeMiterlimit={10}
        strokeDasharray="1 4"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_2001_114"
        x1={-1.82099}
        y1={4.93137}
        x2={-1.79993}
        y2={7.06869}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4959EC" stopOpacity={0} />
        <stop offset={0.273861} stopColor="#545AE9" />
        <stop offset={0.447081} stopColor="#C161C9" />
        <stop offset={0.541673} stopColor="#4959EC" />
        <stop offset={1} stopColor="#4959EC" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
