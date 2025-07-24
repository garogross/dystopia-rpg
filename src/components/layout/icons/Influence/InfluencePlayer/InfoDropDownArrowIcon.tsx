import React from "react";

export const InfoDropDownArrowIcon = ({ rotated }: { rotated?: boolean }) => {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      <g clipPath="url(#clip0_4010_29600)">
        <g filter="url(#filter0_d_4010_29600)">
          <path
            d="M6 9L10.3301 1.5H1.66987L6 9Z"
            fill="url(#paint0_radial_4010_29600)"
          />
          <path
            d="M6 9.5C6.17857 9.5 6.34328 9.4046 6.43262 9.25L10.7627 1.75C10.852 1.5953 10.852 1.4047 10.7627 1.25C10.6734 1.09541 10.5086 1 10.3301 1H1.66992C1.49136 1 1.32665 1.09541 1.2373 1.25C1.14799 1.4047 1.14799 1.5953 1.2373 1.75L5.56738 9.25L5.60352 9.30469C5.69737 9.42686 5.84349 9.5 6 9.5Z"
            stroke="#7F5CFF"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_4010_29600"
          x="-3.33008"
          y="0.5"
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
            result="effect1_dropShadow_4010_29600"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4010_29600"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_4010_29600"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6 4) rotate(-90) scale(8.88889)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="1" stopColor="#040010" />
        </radialGradient>
        <clipPath id="clip0_4010_29600">
          <rect width="12" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
