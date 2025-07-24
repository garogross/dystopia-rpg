import React, { ReactNode } from "react";

import styles from "./TitleH3.module.scss";
import { HeaderWings } from "../icons/RPGGame/Common";
import { DotsLine } from "../icons/RPGGame/Common/DotsLine";

interface Props {
  children: ReactNode;
  className?: string;
  wingsReverse?: boolean;
  hideDotline?: boolean;
}

const TitleH3: React.FC<Props> = ({
  children,
  className,
  hideDotline,
  wingsReverse = true,
}) => {
  return (
    <div className={styles.titleH3}>
      <div className={`${styles.titleH3__main} ${className || ""}`}>
        <h3 className={`titleH3 typeAnimation`}>{children}</h3>
        {!hideDotline && (
          <div className={styles.titleH3__dotline}>
            <DotsLine />
          </div>
        )}
      </div>
      <div className={styles.titleH3__wings}>
        <HeaderWings reversed={wingsReverse} />
      </div>
    </div>
  );
};

export default TitleH3;
