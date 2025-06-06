import React from "react";

interface HeaderRatingIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const HeaderRatingIcon: React.FC<HeaderRatingIconProps> = ({
  width = 11,
  height = 11,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 11 11"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M1.1 11H2.2C2.805 11 3.3 10.505 3.3 9.9V8.8C3.3 8.195 2.805 7.7 2.2 7.7H1.1C0.495 7.7 0 8.195 0 8.8V9.9C0 10.505 0.495 11 1.1 11Z" />
    <path d="M4.94985 11H6.04985C6.65485 11 7.14985 10.505 7.14985 9.9V6.05C7.14985 5.445 6.65485 4.95 6.04985 4.95H4.94985C4.34485 4.95 3.84985 5.445 3.84985 6.05V9.9C3.84985 10.505 4.34485 11 4.94985 11Z" />
    <path d="M8.79995 11H9.89995C10.505 11 11 10.505 11 9.9V1.1C11 0.495 10.505 0 9.89995 0H8.79995C8.19495 0 7.69995 0.495 7.69995 1.1V9.9C7.69995 10.505 8.19495 11 8.79995 11Z" />
  </svg>
); 