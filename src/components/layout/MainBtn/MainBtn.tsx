import React, { FC, memo, ReactNode } from "react";

import styles from "./MainBtn.module.scss";

interface Props extends React.ButtonHTMLAttributes<any> {
  className?: string;
  innerClass?: string;
  children: ReactNode;
  position?: "right" | "left";
}

const MainBtn: FC<Props> = memo(
  ({ className, children, innerClass, position, ...properties }) => {
    return (
      <button
        className={`${styles.mainBtn} ${
          position ? styles[`mainBtn_${position}`] : ""
        } ${className ? className : ""}`}
        {...properties}
      >
        <div className={`${styles.mainBtn__inner} ${innerClass || ""}`}>
          {children}
        </div>
      </button>
    );
  }
);

export default MainBtn;
