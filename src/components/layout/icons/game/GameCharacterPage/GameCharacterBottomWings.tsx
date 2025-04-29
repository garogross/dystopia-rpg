import React from "react";

const GameCharacterBottomWings: React.FC<{ withCenterLine?: boolean }> = ({
  withCenterLine,
}) => {
  return (
    <svg viewBox="0 0 351 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M283 11L287.775 6.41967H304.511L311.202 -2.57905e-08H340L332.412 7.27323L328.53 11H283Z"
        fill="#2A1E54"
      />
      <path
        d="M68 11L63.2254 6.41967H46.4894L39.7979 -2.57905e-08H11L18.5883 7.27323L22.4702 11H68Z"
        fill="#2A1E54"
      />
      <path
        d="M308 -2.57905e-08L304.168 3.66667H285.002L277.334 11H216L219.834 7.33334H277.334L285.002 -2.57905e-08H308Z"
        fill="#7F5CFF"
      />
      <path
        d="M43 -2.57905e-08L46.8317 3.66667H65.9984L73.666 11H135L131.166 7.33334H73.666L65.9984 -2.57905e-08H43Z"
        fill="#7F5CFF"
      />
      {withCenterLine && (
        <>
          <line
            x1="188"
            y1="10.5"
            x2="210"
            y2="10.5"
            stroke="url(#paint0_linear_2008_9631)"
          />
          <line
            y1="-0.5"
            x2="22"
            y2="-0.5"
            transform="matrix(-1 0 0 1 164 11)"
            stroke="url(#paint1_linear_2008_9631)"
          />
        </>
      )}

      <defs>
        <linearGradient
          id="paint0_linear_2008_9631"
          x1="188"
          y1="11.5"
          x2="210"
          y2="11.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7F5CFF" />
          <stop offset="1" stop-color="#0F0E10" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2008_9631"
          x1="0"
          y1="0.5"
          x2="22"
          y2="0.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7F5CFF" />
          <stop offset="1" stopColor="#0F0E10" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GameCharacterBottomWings;
