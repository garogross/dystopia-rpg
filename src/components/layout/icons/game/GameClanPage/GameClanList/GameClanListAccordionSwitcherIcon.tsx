import React from "react";

const GameClanListAccordionSwitcherIcon = ({open}: {open?: boolean}) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <path
        d="M2.33333 1L5 3.66667L7.66667 1L9 2.33333L6.33333 5L9 7.66667L7.66667 9L5 6.33333L2.33333 9L1 7.66667L3.66667 5L1 2.33333L2.33333 1Z"
        fill="#7958F4"
        stroke="#1F1347"
      />
    </svg>
  );
};

export default GameClanListAccordionSwitcherIcon;
