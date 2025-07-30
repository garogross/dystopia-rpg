import React, { FC, memo, ReactNode } from "react";

import styles from "./MainBtn.module.scss";

interface Props extends React.ButtonHTMLAttributes<any> {
  className?: string;
  children: ReactNode;
}

const MainBtn: FC<Props> = memo(({ className, children, ...properties }) => {
  return (
    <button
      className={`${styles.mainBtn} ${className ? className : ""}`}
      {...properties}
    >
      <div className={styles.mainBtn__inner}>{children}</div>
    </button>
  );
});

export default MainBtn;
