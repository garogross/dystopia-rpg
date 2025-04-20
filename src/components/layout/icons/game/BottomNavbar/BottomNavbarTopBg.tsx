import React from "react";
import { SvgProps } from "../../../../../models/Props/SvgProps";



export const BottomNavbarTopBg: React.FC<SvgProps> = ({
  width = 329,
  height = 11,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 329 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M57 0L52.2254 4.58033H35.4894L28.7979 11H0L7.5883 3.72677L11.4702 0H57Z"
      fill="#2A1E54"
    />
    <path
      d="M272 0L276.775 4.58033H293.511L300.202 11H329L321.412 3.72677L317.53 0H272Z"
      fill="#2A1E54"
    />
    <path
      d="M32 11L35.8317 7.33333H54.9984L62.666 0H124L120.166 3.66666H62.666L54.9984 11H32Z"
      fill="#7F5CFF"
    />
    <path
      d="M297 11L293.168 7.33333H274.002L266.334 0H205L208.834 3.66666H266.334L274.002 11H297Z"
      fill="#7F5CFF"
    />
  </svg>
);
