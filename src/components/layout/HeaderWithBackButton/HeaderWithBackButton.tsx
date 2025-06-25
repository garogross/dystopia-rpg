import React from "react";
import styles from "./HeaderWithBackButton.module.scss";
import { BackIcon } from "../icons/Common";
interface Props {
  onClose: () => void;
  className?: string;
  title?: string;
}
const HeaderWithBackButton: React.FC<Props> = ({ onClose, className,title }) => {
  return (
    <div className={`${styles.headerWithBackButton} ${className}`}>
      <button
        className={styles.headerWithBackButton__backBtn}
        onClick={onClose}
      >
        <div className={styles.headerWithBackButton__backBtnInner}>
          <BackIcon />
        </div>
      </button>
      {title && <h3 className="titleH3 typeAnimation">{title}</h3>}
      <div className={styles.headerWithBackButton__wind}></div>
    </div>
  );
};

export default HeaderWithBackButton;
