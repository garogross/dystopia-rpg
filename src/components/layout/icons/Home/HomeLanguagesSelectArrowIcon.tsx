import React from "react";

const HomeLanguagesSelectArrowIcon = ({rotate}: {rotate: boolean}) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
       style={{ 
        transform: rotate ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease'
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 8L0.937822 0.5H13.0622L7 8Z" fill="#C6B7FF" />
    </svg>
  );
};

export default HomeLanguagesSelectArrowIcon;
