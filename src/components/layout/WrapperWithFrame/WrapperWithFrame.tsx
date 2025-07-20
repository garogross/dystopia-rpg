import React from "react";

import styles from "./WrapperWithFrame.module.scss";
import {
  ImageFrame,
  ImageFrameBig,
  ImageFrameMd,
} from "../icons/RPGGame/Common";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  innerClassName?: string;
  withoutBorder?: boolean;
  frameColor?: string;
  size?: "md" | "lg";
}

const WrapperWithFrame: React.FC<Props> = ({
  children,
  className,
  innerClassName,
  withoutBorder,
  frameColor,
  size,
  ...attrs
}) => {
  return (
    <div className={`${styles.wrapperWithFrame} ${className || ""}`}>
      {withoutBorder ? (
        children
      ) : (
        <div
          {...attrs}
          className={`${styles.wrapperWithFrame__inner} ${innerClassName}`}
        >
          {children}
        </div>
      )}
      <div className={styles.wrapperWithFrame__frame}>
        {size === "lg" ? (
          <ImageFrameBig fill={frameColor} />
        ) : size === "md" ? (
          <ImageFrameMd fill={frameColor} />
        ) : (
          <ImageFrame fill={frameColor} />
        )}
      </div>
    </div>
  );
};

export default WrapperWithFrame;
