import React from "react";

interface Props {
  rotate?: boolean;
}

const HomeSliderArrow: React.FC<Props> = ({ rotate }) => {
  return (
    <svg
     
      viewBox="0 0 79 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotate ? "rotate(180deg)" : undefined,
        transition: "transform 0.2s",
        display: "block",
      }}
    >
      <path
        d="M0 80L46.9042 160H79L32.0958 80L79 0H46.9042L0 80Z"
        fill="url(#paint0_linear_1193_8314)"
        fillOpacity="0.9"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1193_8314"
          x1="39.5"
          y1="0"
          x2="39.5"
          y2="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A1E54" />
          <stop offset="1" stopColor="#5D42BA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HomeSliderArrow;
