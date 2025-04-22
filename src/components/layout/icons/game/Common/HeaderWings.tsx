import React from "react";

const HeaderWings = ({reversed}: {reversed?: boolean}) => {
  return (
    <svg
      viewBox="0 0 353 8"
      preserveAspectRatio="none"
      fill="none"
      style={{ transform: reversed ? "rotate(180deg)" : undefined }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.08 0H6.27L0 7.08104H11.81L18.08 0ZM20.4399 0H26.1599L19.8899 7.08104H14.1599L20.4399 0ZM28.52 0H34.24L27.97 7.08104H22.24L28.52 0Z"
        fill="url(#paint0_linear_2003_9647)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M334.16 0H345.97L352.24 7.08104H340.43L334.16 0ZM331.8 0H326.08L332.35 7.08104H338.08L331.8 0ZM323.72 0H318L324.27 7.08104H330L323.72 0Z"
        fill="url(#paint1_linear_2003_9647)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2003_9647"
          x1="26"
          y1="32.581"
          x2="0.0825994"
          y2="-6.8488"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6145C5" />
          <stop offset="1" stop-color="#0F0727" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2003_9647"
          x1="326.24"
          y1="32.581"
          x2="352.157"
          y2="-6.8488"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6145C5" />
          <stop offset="1" stop-color="#0F0727" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HeaderWings;
