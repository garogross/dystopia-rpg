import React from "react";

import styles from "./WrapperWithFrame.module.scss";
import ImageFrame from "../icons/game/Common/ImageFrame";
import ImageFrameBig from "../icons/game/Common/ImageFrameBig";

interface Props {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  withoutBorder?: boolean;
  isBig?: boolean;
}

const WrapperWithFrame: React.FC<Props> = ({
  children,
  className,
  innerClassName,
  withoutBorder,
  isBig,
}) => {
  return (
    <div className={`${styles.wrapperWithFrame} ${className || ""}`}>
      {withoutBorder ? (
        children
      ) : (
        <div className={`${styles.wrapperWithFrame__inner} ${innerClassName}`}>
          {children}
        </div>
      )}
      <div className={styles.wrapperWithFrame__frame}>
        {isBig ? <ImageFrameBig /> : <ImageFrame />}
      </div>
    </div>
  );
};

export default WrapperWithFrame;
