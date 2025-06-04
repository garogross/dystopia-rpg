import React from "react";
import styles from "./HeaderWithBackButton.module.scss";
import { RPGGameReferalsBackIcon } from "../icons/RPGGame/RPGGameReferalsPage";
interface Props {
  onClose: () => void;
  className?: string;
}
const HeaderWithBackButton: React.FC<Props> = ({ onClose, className }) => {
  return (
    <div className={`${styles.headerWithBackButton} ${className}`}>
      <button
        className={styles.headerWithBackButton__backBtn}
        onClick={onClose}
      >
        <div className={styles.headerWithBackButton__backBtnInner}>
          <RPGGameReferalsBackIcon />
        </div>
      </button>
      <div className={styles.headerWithBackButton__wind}></div>
    </div>
  );
};

export default HeaderWithBackButton;
