import React from "react";
import styles from "./GameClanAbout.module.scss";
import GameClanAboutHeader from "./GameClanAboutHeader/GameClanAboutHeader";
import GameClanAboutParticipants from "./GameClanAboutParticipants/GameClanAboutParticipants";
import { IClan } from "../../../../models/IClan";

interface Props {
  clan?: IClan
}

const GameClanAbout: React.FC<Props> = ({clan}) => {

  if (!clan) {
    return null;
  }
  const { clanMessage, treasury,participants } = clan;
  return (
    <div className={styles.gameClanAbout}>
      <GameClanAboutHeader
      clanMessage={clanMessage}
      treasury={treasury}
      />
      <GameClanAboutParticipants participants={participants}/>
    </div>
  );
};

export default GameClanAbout;
