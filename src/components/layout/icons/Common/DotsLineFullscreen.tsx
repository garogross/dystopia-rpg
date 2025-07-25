import React from "react";

export const DotsLineFullscreen = ({
  preserveAspectRatio,
}: {
  preserveAspectRatio?: boolean;
}) => {
  return (
    <svg
      width="336"
      height="10"
      viewBox="0 0 336 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio ? "none" : undefined}
    >
      <g style={{ mixBlendMode: "screen" }}>
        <path
          d="M336 4.99997L0 5"
          stroke="url(#paint0_linear_2710_23344)"
          strokeWidth="9"
          strokeMiterlimit="10"
          strokeDasharray="1 4"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2710_23344"
          x1="-6.87473"
          y1="4.93138"
          x2="-6.86916"
          y2="7.06889"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4959EC" stopOpacity="0" />
          <stop offset="0.273861" stopColor="#545AE9" />
          <stop offset="0.447081" stopColor="#C161C9" />
          <stop offset="0.541673" stopColor="#4959EC" />
          <stop offset="1" stopColor="#4959EC" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
