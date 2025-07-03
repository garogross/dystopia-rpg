import React from "react";

export const ArrowIcon = ({ rotated }: { rotated?: boolean }) => {
  return (
    <svg
      width="9"
      height="3"
      viewBox="0 0 9 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.3s",
        ...(rotated ? { transform: "rotate(180deg)" } : {}),
      }}
    >
      <path d="M4.5 0L8.39711 3H0.602886L4.5 0Z" fill="#7F5CFF" />
    </svg>
  );
};
