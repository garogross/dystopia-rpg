import React from "react";

interface ToggleArrowIconProps {
  rotated?: boolean;
}

export const ToggleArrowIcon: React.FC<ToggleArrowIconProps> = ({
  rotated = false,
}) => {
  return (
    <svg
      width="26"
      height="7"
      viewBox="0 0 26 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
      }}
    >
      <path d="M13 7L25.9904 0.25H0.00961876L13 7Z" fill="#7F5CFF" />
    </svg>
  );
};
