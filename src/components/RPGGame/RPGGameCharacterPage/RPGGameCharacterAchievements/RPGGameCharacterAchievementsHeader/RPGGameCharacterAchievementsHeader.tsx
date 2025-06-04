import React from "react";
import styles from "./RPGGameCharacterAchievementsHeader.module.scss";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";

const RPGGameCharacterAchievementsHeader = ({ shown }: { shown: boolean }) => {
  return (
    <TransitionProvider
      inProp={shown}
      style={TransitionStyleTypes.height}
      height={50}
      className="container"
    >
      <WrapperWithFrame
        className={styles.rpgGameCharacterAchievementsHeader}
        innerClassName={styles.rpgGameCharacterAchievementsHeader__inner}
      >
        <div className={styles.rpgGameCharacterAchievementsHeader__main}>
          <p className={styles.rpgGameCharacterAchievementsHeader__text}>
            Полученo достижении 18/56
          </p>
          <p className={styles.rpgGameCharacterAchievementsHeader__text}>
            PvP 10/30
          </p>
          <p className={styles.rpgGameCharacterAchievementsHeader__text}>
            PvE 10/20
          </p>
          <p className={styles.rpgGameCharacterAchievementsHeader__text}>
            Спец 1/6
          </p>
        </div>
      </WrapperWithFrame>
    </TransitionProvider>
  );
};

export default RPGGameCharacterAchievementsHeader;
