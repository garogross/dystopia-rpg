import React from "react";

import styles from "./GameChalangesHeader.module.scss";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";


const GameChalangesHeader = () => {
  const gameInited = useAppSelector(state => state.ui.gameInited)
  return (
    <TransitionProvider  className={styles.gameChalangesHeader} style={TransitionStyleTypes.bottom} inProp={gameInited} >
      <div className={styles.gameChalangesHeader__wrapper}>
        <h3 className={`${styles.gameChalangesHeader__title} gradientText`}>
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
    </TransitionProvider>
  );
};

export default GameChalangesHeader;
