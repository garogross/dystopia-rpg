import React from "react";

interface Props {
  rotated?: boolean;
}

export const LoyalityArrowIcon: React.FC<Props> = ({ rotated }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotated ? "rotateX(180deg)" : "rotateX(0deg)",
        transition: "transform 0.3s linear",
      }}
    >
      <path
        d="M9.66667 7L7 4.33333M7 4.33333L4.33333 7M7 4.33333V9.66667M4.2 13H9.8C10.9201 13 11.4801 13 11.908 12.782C12.2843 12.5903 12.5903 12.2843 12.782 11.908C13 11.4801 13 10.9201 13 9.8V4.2C13 3.07989 13 2.51984 12.782 2.09202C12.5903 1.71569 12.2843 1.40973 11.908 1.21799C11.4801 1 10.9201 1 9.8 1H4.2C3.07989 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V9.8C1 10.9201 1 11.4801 1.21799 11.908C1.40973 12.2843 1.71569 12.5903 2.09202 12.782C2.51984 13 3.07989 13 4.2 13Z"
        stroke="#C6B7FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

