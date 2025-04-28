import React from "react";

import styles from "./WrapperWithFrame.module.scss";
import ImageFrame from "../icons/game/Common/ImageFrame";
import ImageFrameBig from "../icons/game/Common/ImageFrameBig";
import ImageFrameMd from "../icons/game/Common/ImageFrameMd";

interface Props {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  withoutBorder?: boolean;
  size?: "md" | "lg";
}

const WrapperWithFrame: React.FC<Props> = ({
  children,
  className,
  innerClassName,
  withoutBorder,
  size,
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
        {size === "lg" ? (
          <ImageFrameBig />
        ) : size === "md" ? (
          <ImageFrameMd />
        ) : (
          <ImageFrame />
        )}
      </div>
    </div>
  );
};

export default WrapperWithFrame;
