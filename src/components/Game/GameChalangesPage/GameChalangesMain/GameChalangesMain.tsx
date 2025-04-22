import React from "react";

import styles from "./GameChalangesMain.module.scss";
import GameChalangesHeader from "../GameChalangesHeader/GameChalangesHeader";
import GameChalangesList from "../GameChalangesList/GameChalangesList";

interface Props {}

const GameChalangesMain: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.gameChalangesMain} container`}>
      <GameChalangesHeader />
      <GameChalangesList />
    </div>
  );
};

export default GameChalangesMain;
