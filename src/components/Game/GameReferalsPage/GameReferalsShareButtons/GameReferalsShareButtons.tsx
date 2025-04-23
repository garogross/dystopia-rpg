import React from "react";

import styles from "./GameReferalsShareButtons.module.scss";
import GameReferalsCopyIcon from "../../../layout/icons/game/GameReferalsPage/GameReferalsCopyIcon";
import GameReferalsInviteIcon from "../../../layout/icons/game/GameReferalsPage/GameReferalsInviteIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
const GameReferalsShareButtons = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.gameReferalsShareButtons}
    >
      <button className={styles.gameReferalsShareButtons__button}>
        <div className={styles.gameReferalsShareButtons__buttonInner}>
          <GameReferalsCopyIcon />
          <span>Копиробать ссылку</span>
        </div>
      </button>
      <button className={styles.gameReferalsShareButtons__button}>
        <div className={styles.gameReferalsShareButtons__buttonInner}>
          <GameReferalsInviteIcon />
          <span>Пригласить друга</span>
        </div>
      </button>
    </TransitionProvider>
  );
};

export default GameReferalsShareButtons;
