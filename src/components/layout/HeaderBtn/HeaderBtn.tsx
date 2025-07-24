import React from "react";

import styles from "./HeaderBtn.module.scss";
import { InfoIcon, CloseIcon } from "../icons/RPGGame/Common";

interface Props {
  className?: string;
  onClick?: () => void;
  type: "info" | "close";
  fill?: string;
}

const HeaderBtn: React.FC<Props> = ({ className, onClick, type, fill }) => {
  let icon = null;

  switch (type) {
    case "info":
      icon = <InfoIcon />;
      break;
    case "close":
      icon = <CloseIcon fill={fill} />;
      break;
    default:
      icon = null;
      break;
  }

  return (
    <button
      onClick={onClick}
      style={{ borderColor: fill || undefined }}
      className={`${styles.headerBtn} ${className || ""}`}
    >
      {icon}
    </button>
  );
};

export default HeaderBtn;
