import React, { ReactNode } from "react";

import styles from "./TitleH3.module.scss";
import HeaderWings from "../icons/game/Common/HeaderWings";
import { DotsLine } from "../icons/game/Common/DotsLine";

interface Props {
  children: ReactNode;
}

const TitleH3: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.titleH3}>
      <h3 className={`titleH3 typeAnimation`}>{children}</h3>
      <div className={styles.titleH3__wings}>
        <HeaderWings />
      </div>
      <div className={styles.titleH3__dotline}>
        <DotsLine />
      </div>
    </div>
  );
};

export default TitleH3;
