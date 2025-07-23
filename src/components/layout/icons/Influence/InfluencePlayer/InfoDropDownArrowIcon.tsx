import React from "react";

export const InfoDropDownArrowIcon = ({ rotated }: { rotated?: boolean }) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      <g filter="url(#filter0_d_2629_22281)">
        <path
          d="M10 1L5.66987 8.5H14.3301L10 1Z"
          fill="url(#paint0_radial_2629_22281)"
        />
        <path
          d="M10 0.5C9.82143 0.5 9.65672 0.5954 9.56738 0.75L5.2373 8.25C5.14799 8.4047 5.14799 8.5953 5.2373 8.75C5.32665 8.90459 5.49136 9 5.66992 9H14.3301C14.5086 9 14.6734 8.90459 14.7627 8.75C14.852 8.5953 14.852 8.4047 14.7627 8.25L10.4326 0.75L10.3965 0.695312C10.3026 0.573142 10.1565 0.5 10 0.5Z"
          stroke="#7F5CFF"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2629_22281"
          x="0.669922"
          y="0"
          width="18.6602"
          height="17.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2629_22281"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2629_22281"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_2629_22281"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 6) rotate(90) scale(8.88889)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="1" stopColor="#040010" />
        </radialGradient>
      </defs>
    </svg>
  );
};
