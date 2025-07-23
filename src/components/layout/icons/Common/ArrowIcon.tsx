import React from "react";

export const ArrowIcon = ({rotate}: {rotate?: boolean}) => {
  return (
    <svg
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      style={{ 
        transform: rotate ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease'
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L5.5 5L10 1" stroke="#C6B7FF" strokeLinecap="round" />
    </svg>
  );
};

