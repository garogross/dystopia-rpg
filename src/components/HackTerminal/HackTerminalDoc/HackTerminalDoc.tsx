import React, { ReactNode } from "react";

import styles from "./HackTerminalDoc.module.scss";

interface Props {
  children: ReactNode;
  title: string;
}

const HackTerminalDoc: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.hackTerminalDoc}>
      <h3 className={styles.hackTerminalDoc__title}>{title}</h3>
      {children}
    </div>
  );
};

export default HackTerminalDoc;
