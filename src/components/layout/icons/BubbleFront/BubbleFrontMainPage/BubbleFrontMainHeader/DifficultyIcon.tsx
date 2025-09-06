import React from "react";

interface Props {
  hidden?: boolean;
}

export const DifficultyIcon: React.FC<Props> = ({ hidden = false }) => (
  <svg
    width="7"
    height="10"
    viewBox="0 0 7 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      opacity: hidden ? 0 : 1,
      transition: "opacity 0.3s ease",
    }}
  >
    <path
      d="M1.74999 2.18793C1.74999 4.06286 3.49998 4.37552 3.49998 5.9378C3.49998 6.56278 2.91665 7.50008 2.04181 7.50008C1.16697 7.50008 0.583641 6.56245 1.16666 5.00017C0.291509 5.62515 0 6.25012 0 6.8751C0 8.43772 1.45817 10 3.49998 10C5.54179 10 6.99996 9.0627 6.99996 7.18743C7.01302 4.41419 4.01735 3.48755 3.20816 2.18759C2.62483 1.24996 2.91665 0.624979 3.49967 0C2.33301 0.312656 1.74968 1.18763 1.74968 2.18759L1.74999 2.18793Z"
      fill="#7F5CFF"
    />
  </svg>
);
