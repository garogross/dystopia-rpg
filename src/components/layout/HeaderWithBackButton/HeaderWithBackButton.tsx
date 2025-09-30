import React, { ReactNode } from "react";
import styles from "./HeaderWithBackButton.module.scss";
import { BackIcon } from "../icons/Common";
import { DotsLine } from "../icons/RPGGame/Common";
interface Props {
  onClose?: () => void;
  className?: string;
  title?: string;
  withDotlines?: boolean;
  rightBtn?: {
    icon: ReactNode;
    onClick?: () => void;
  };
}
const HeaderWithBackButton: React.FC<Props> = ({
  onClose,
  className,
  title,
  withDotlines,
  rightBtn,
}) => {
  return (
    <div className={`${styles.headerWithBackButton} ${className}`}>
      <button
        disabled={!onClose}
        className={`${styles.headerWithBackButton__btn} ${styles.headerWithBackButton__backBtn}`}
        onClick={onClose}
      >
        <div
          className={`${styles.headerWithBackButton__btnInner} ${styles.headerWithBackButton__backBtnInner}`}
        >
          {!!onClose && <BackIcon />}
        </div>
      </button>
      {title && (
        <div className={styles.headerWithBackButton__titleWrapper}>
          <h3 className="titleH3 typeAnimation">{title}</h3>
          <div className={styles.headerWithBackButton__dotsLineWrapper}>
            {withDotlines && (
              <>
                <DotsLine />
                <DotsLine />
              </>
            )}
          </div>
        </div>
      )}
      {!rightBtn ? (
        <div className={styles.headerWithBackButton__wind}></div>
      ) : (
        <button
          className={`${styles.headerWithBackButton__btn} ${styles.headerWithBackButton__rightBtn}`}
          onClick={rightBtn.onClick}
        >
          <div
            className={`${styles.headerWithBackButton__btnInner} ${styles.headerWithBackButton__rightBtnInner}`}
          >
            {rightBtn?.icon}
          </div>
        </button>
      )}
    </div>
  );
};

export default HeaderWithBackButton;
