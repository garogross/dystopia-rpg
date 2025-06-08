import React from "react";

import styles from "./HeaderBtn.module.scss";
import { InfoIcon, CloseIcon } from "../icons/RPGGame/Common";

interface Props {
  className?: string;
  onClick?: () => void;
  type: "info" | "close";
}

const HeaderBtn: React.FC<Props> = ({ className, onClick, type }) => {
  let icon = null;

  switch (type) {
    case "info":
      icon = <InfoIcon />;
      break;
    case "close":
      icon = <CloseIcon />;
      break;
    default:
      icon = null;
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.headerBtn} ${className || ""}`}
    >
      {icon}
    </button>
  );
};

export default HeaderBtn;
