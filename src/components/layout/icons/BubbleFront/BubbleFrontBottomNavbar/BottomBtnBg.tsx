import React from "react";

const BottomBtnBg = ({
  reversed,
  active,
}: {
  reversed?: boolean;
  active?: boolean;
}) => {
  // Choose gradient id based on active prop
  const gradientId = !active
    ? "paint0_radial_2158_21619"
    : "paint0_radial_2158_21606";

  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 122 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: reversed ? `rotateY(180deg)` : undefined }}
    >
      <mask
        id="path-1-outside-1_2158_21606"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="122"
        height="49"
        fill="black"
      >
        <rect fill="white" width="122" height="49" />
        <path d="M17.0391 1C16.7438 19.2726 11.0666 35.8098 2 48H114.207L114.33 47.1426L119.933 8.14258L120 7.66797L119.673 7.31738L114.071 1.31738L113.774 1H17.0391Z" />
      </mask>
      <path
        d="M17.0391 1C16.7438 19.2726 11.0666 35.8098 2 48H114.207L114.33 47.1426L119.933 8.14258L120 7.66797L119.673 7.31738L114.071 1.31738L113.774 1H17.0391Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M17.0391 1L16.0392 0.983841L16.0551 0H17.0391V1ZM2 48V49H0.00997162L1.1976 47.4032L2 48ZM114.207 48L115.197 48.1421L115.074 49H114.207V48ZM114.33 47.1426L113.34 47.0005L113.34 47.0004L114.33 47.1426ZM119.933 8.14258L120.923 8.28314L120.922 8.28477L119.933 8.14258ZM120 7.66797L120.731 6.98572L121.057 7.33523L120.99 7.80853L120 7.66797ZM119.673 7.31738L120.404 6.63496L120.404 6.63514L119.673 7.31738ZM114.071 1.31738L114.802 0.634264L114.802 0.634963L114.071 1.31738ZM113.774 1V0H114.208L114.505 0.316882L113.774 1ZM17.0391 1L18.0389 1.01616C17.7405 19.4802 12.0044 36.2246 2.8024 48.5968L2 48L1.1976 47.4032C10.1288 35.395 15.747 19.0651 16.0392 0.983841L17.0391 1ZM2 48V47H114.207V48V49H2V48ZM114.207 48L113.217 47.8579L113.34 47.0005L114.33 47.1426L115.32 47.2846L115.197 48.1421L114.207 48ZM114.33 47.1426L113.34 47.0004L118.943 8.00038L119.933 8.14258L120.922 8.28477L115.32 47.2848L114.33 47.1426ZM119.933 8.14258L118.943 8.00201L119.01 7.5274L120 7.66797L120.99 7.80853L120.923 8.28314L119.933 8.14258ZM120 7.66797L119.269 8.35021L118.942 7.99963L119.673 7.31738L120.404 6.63514L120.731 6.98572L120 7.66797ZM119.673 7.31738L118.942 7.9998L113.34 1.9998L114.071 1.31738L114.802 0.634963L120.404 6.63496L119.673 7.31738ZM114.071 1.31738L113.341 2.0005L113.044 1.68312L113.774 1L114.505 0.316882L114.802 0.634264L114.071 1.31738ZM113.774 1V2H17.0391V1V0H113.774V1Z"
        fill="#7F5CFF"
        mask="url(#path-1-outside-1_2158_21606)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2158_21619"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(61.0059 24.5) rotate(90) scale(41.7778 104.889)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="1" stopColor="#040010" />
        </radialGradient>
        <radialGradient
          id="paint0_radial_2158_21606"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(61 24.5) rotate(90) scale(33.7071 84.6263)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="1" stopColor="#5A41B5" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default BottomBtnBg;
