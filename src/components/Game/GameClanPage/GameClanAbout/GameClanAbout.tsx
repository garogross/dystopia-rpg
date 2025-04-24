import React from "react";
import styles from "./GameClanAbout.module.scss";
import GameClanAboutHeader from "./GameClanAboutHeader/GameClanAboutHeader";
import GameClanAboutParticipants from "./GameClanAboutParticipants/GameClanAboutParticipants";

const GameClanAbout: React.FC = () => {
  return (
    <div className={styles.gameClanAbout}>
      <GameClanAboutHeader/>
      <GameClanAboutParticipants/>
    </div>
  );
};

export default GameClanAbout;
