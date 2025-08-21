import React from "react";

interface TopBtnBgProps {
  active?: boolean;
  reversed?: boolean;
}

export const TopBtnBg: React.FC<TopBtnBgProps> = ({ active, reversed }) => {
  // Choose gradient id based on active prop
  const gradientId = !active
    ? "paint0_radial_2158_21609"
    : "paint0_radial_2158_21608";

  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 122 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: reversed ? `rotateY(180deg)` : undefined }}
    >
      <mask
        id="path-1-outside-1_2158_21609"
        maskUnits="userSpaceOnUse"
        x="0.00585938"
        y="0"
        width="122"
        height="49"
        fill="black"
      >
        <rect fill="white" x="0.00585938" width="122" height="49" />
        <path d="M120.006 1C110.939 13.1902 105.262 29.7274 104.967 48H8.23145L7.93457 47.6826L2.33301 41.6826L2.00586 41.332L2.07324 40.8574L7.67578 1.85742L7.79883 1H120.006Z" />
      </mask>
      <path
        d="M120.006 1C110.939 13.1902 105.262 29.7274 104.967 48H8.23145L7.93457 47.6826L2.33301 41.6826L2.00586 41.332L2.07324 40.8574L7.67578 1.85742L7.79883 1H120.006Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M120.006 1L120.808 1.59679L121.996 0H120.006V1ZM104.967 48V49H105.951L105.967 48.0162L104.967 48ZM8.23145 48L7.50114 48.6831L7.79754 49H8.23145V48ZM7.93457 47.6826L7.20361 48.365L7.20426 48.3657L7.93457 47.6826ZM2.33301 41.6826L1.60188 42.3649L1.60205 42.365L2.33301 41.6826ZM2.00586 41.332L1.01579 41.1915L0.948591 41.6648L1.27474 42.0143L2.00586 41.332ZM2.07324 40.8574L1.0834 40.7152L1.08317 40.7169L2.07324 40.8574ZM7.67578 1.85742L8.66562 1.99962L8.66564 1.99947L7.67578 1.85742ZM7.79883 1V0H6.93209L6.80897 0.857947L7.79883 1ZM120.006 1L119.203 0.40321C110.002 12.7754 104.265 29.5199 103.967 47.9838L104.967 48L105.967 48.0162C106.259 29.935 111.877 13.605 120.808 1.59679L120.006 1ZM104.967 48V47H8.23145V48V49H104.967V48ZM8.23145 48L8.96175 47.3169L8.66488 46.9995L7.93457 47.6826L7.20426 48.3657L7.50114 48.6831L8.23145 48ZM7.93457 47.6826L8.66553 47.0002L3.06397 41.0002L2.33301 41.6826L1.60205 42.365L7.20361 48.365L7.93457 47.6826ZM2.33301 41.6826L3.06413 41.0004L2.73698 40.6498L2.00586 41.332L1.27474 42.0143L1.60188 42.3649L2.33301 41.6826ZM2.00586 41.332L2.99593 41.4726L3.06331 40.998L2.07324 40.8574L1.08317 40.7169L1.01579 41.1915L2.00586 41.332ZM2.07324 40.8574L3.06308 40.9996L8.66562 1.99962L7.67578 1.85742L6.68594 1.71523L1.0834 40.7152L2.07324 40.8574ZM7.67578 1.85742L8.66564 1.99947L8.78869 1.14205L7.79883 1L6.80897 0.857947L6.68592 1.71537L7.67578 1.85742ZM7.79883 1V2H120.006V1V0H7.79883V1Z"
        fill="#7F5CFF"
        mask="url(#path-1-outside-1_2158_21609)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2158_21609"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(61.0059 24.5) rotate(90) scale(41.7778 104.889)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="1" stopColor="#040010" />
        </radialGradient>
        <radialGradient
          id="paint0_radial_2158_21608"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(61 24.5) rotate(90) scale(33.7071 84.6263)"
        >
          <stop stopColor="#3D2B7E" />
          <stop offset="1" stopColor="#5A41B5" />
        </radialGradient>
      </defs>
    </svg>
  );
};
