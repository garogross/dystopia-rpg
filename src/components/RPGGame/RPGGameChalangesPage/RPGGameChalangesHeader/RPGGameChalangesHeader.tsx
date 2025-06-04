import React from "react";

import styles from "./RPGGameChalangesHeader.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
import {DotsLine,HeaderWings} from "../../../layout/icons/RPGGame/Common";

const RPGGameChalangesHeader = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.rpgGameChalangesHeader}
      style={TransitionStyleTypes.bottom}
      inProp={gameInited}
    >
      <div className={styles.rpgGameChalangesHeader__wrapper}>
        <h3 className={`${styles.rpgGameChalangesHeader__title} gradientText`}>
          Тактика — это роскошь.
          <br /> Остальное — инстинкт и сталь.
        </h3>
        <div className={styles.rpgGameChalangesHeader__bottomBlock}>
          <DotsLine />
          <DotsLine />
        </div>
      </div>
      <div className={styles.rpgGameChalangesHeader__bg}>
        <HeaderWings />
      </div>
    </TransitionProvider>
  );
};

export default RPGGameChalangesHeader;
