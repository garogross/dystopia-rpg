import React from "react";

export const OnBoardingSaveSelectBlockWing = ({
  rotated,
}: {
  rotated?: boolean;
}) => {
  return (
    <svg
      preserveAspectRatio={"none"}
      viewBox="0 0 55 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: rotated ? "rotateY(180deg)" : undefined }}
    >
      <path
        d="M0 24.69L25.328 111H55L25.328 23.125L52.4771 0H25.328L0 24.69Z"
        fill="url(#paint0_radial_1491_11099)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1491_11099"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(26.2385 55.5) rotate(90) scale(94.9666 44.8971)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="0.980769" stopColor="#040010" />
        </radialGradient>
      </defs>
    </svg>
  );
};
