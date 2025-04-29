import React from "react";
import styles from "./GameCharacterAchievementsHeader.module.scss";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";

const GameCharacterAchievementsHeader = ({ shown }: { shown: boolean }) => {
  return (
    <TransitionProvider
      inProp={shown}
      style={TransitionStyleTypes.height}
      height={50}
      className="container"
    >
      <WrapperWithFrame
        className={styles.gameCharacterAchievementsHeader}
        innerClassName={styles.gameCharacterAchievementsHeader__inner}
      >
        <div className={styles.gameCharacterAchievementsHeader__main}>
          <p className={styles.gameCharacterAchievementsHeader__text}>
            Полученo достижении 18/56
          </p>
          <p className={styles.gameCharacterAchievementsHeader__text}>
            PvP 10/30
          </p>
          <p className={styles.gameCharacterAchievementsHeader__text}>
            PvE 10/20
          </p>
          <p className={styles.gameCharacterAchievementsHeader__text}>
            Спец 1/6
          </p>
        </div>
      </WrapperWithFrame>
    </TransitionProvider>
  );
};

export default GameCharacterAchievementsHeader;
