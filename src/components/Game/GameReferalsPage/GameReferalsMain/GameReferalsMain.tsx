import React from "react";

import styles from "./GameReferalsMain.module.scss";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import GameReferalsTotalEarnings from "../GameReferalsTotalEarnings/GameReferalsTotalEarnings";
import GameReferalsTotalCount from "../GameReferalsTotalCount/GameReferalsTotalCount";
import GameReferalsInfo from "../GameReferalsInfo/GameReferalsInfo";
import GameReferalsShareButtons from "../GameReferalsShareButtons/GameReferalsShareButtons";


const GameReferalsMain = () => {
  return (
    <div className={`${styles.gameReferalsMain} container`}>
      <TitleH3>друзья</TitleH3>
      <GameReferalsTotalEarnings />
      <GameReferalsTotalCount />
      <GameReferalsShareButtons />
      <GameReferalsInfo />
      
    </div>
  );
};

export default GameReferalsMain;
