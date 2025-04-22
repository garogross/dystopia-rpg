import React from "react";

import styles from "./GameChalangesHeader.module.scss";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";

interface Props {}

const GameChalangesHeader: React.FC<Props> = (props) => {
  return (
    <header className={styles.gameChalangesHeader}>
      <div className={styles.gameChalangesHeader__wrapper}>
        <h3 className={styles.gameChalangesHeader__title}>
          Тактика — это роскошь.
          <br /> Остальное — инстинкт и сталь.
        </h3>
        <div className={styles.gameChalangesHeader__bottomBlock}>
          <DotsLine />
          <DotsLine />
        </div>
      </div>
      <div className={styles.gameChalangesHeader__bg}>
        <HeaderWings />
      </div>
    </header>
  );
};

export default GameChalangesHeader;
