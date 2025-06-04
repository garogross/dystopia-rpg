import React from "react";

import styles from "./RPGGameReferalsShareButtons.module.scss";
import {RPGGameReferalsCopyIcon,RPGGameReferalsInviteIcon} from "../../../layout/icons/RPGGame/RPGGameReferalsPage";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
const RPGGameReferalsShareButtons = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.rpgGameReferalsShareButtons}
    >
      <button className={styles.rpgGameReferalsShareButtons__button}>
        <div className={styles.rpgGameReferalsShareButtons__buttonInner}>
          <RPGGameReferalsCopyIcon />
          <span>Копиробать ссылку</span>
        </div>
      </button>
      <button className={styles.rpgGameReferalsShareButtons__button}>
        <div className={styles.rpgGameReferalsShareButtons__buttonInner}>
          <RPGGameReferalsInviteIcon />
          <span>Пригласить друга</span>
        </div>
      </button>
    </TransitionProvider>
  );
};

export default RPGGameReferalsShareButtons;
