import React from "react";

export const DropDownArrowIcon = ({ rotated }: { rotated?: boolean }) => {
  return (
    <svg
      width="25"
      height="18"
      viewBox="0 0 25 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotated ? "rotate(180deg)" : undefined,
        transition: "transform 0.2s",
        display: "block",
      }}
    >
      <path
        d="M12.5 0L1.67468 13.5H23.3253L12.5 0Z"
        fill="url(#paint0_linear_3392_26318)"
      />
      <path
        d="M4.4541 13.75H20.5459L12.5 3.79492L4.4541 13.75Z"
        fill="url(#paint1_linear_3392_26318)"
        stroke="#090419"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3392_26318"
          x1="12.5"
          y1="0"
          x2="12.5"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A1E54" />
          <stop offset="1" stopColor="#5D42BA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3392_26318"
          x1="12.5"
          y1="3"
          x2="12.5"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A1E54" />
          <stop offset="1" stopColor="#5D42BA" />
        </linearGradient>
      </defs>
    </svg>
  );
};
