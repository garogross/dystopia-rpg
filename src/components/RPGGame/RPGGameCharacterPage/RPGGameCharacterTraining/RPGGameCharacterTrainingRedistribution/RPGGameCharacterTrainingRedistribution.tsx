import React from "react";
import styles from "./RPGGameCharacterTrainingRedistribution.module.scss";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import {
  darkMatterImage,
  darkMatterImageWebp,
} from "../../../../../assets/imageMaps";
import {RPGGameCharacterResetIcon} from "../../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterTraining/redistribution";
import {RPGGameCharacterTrainingDotline} from "../../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterTraining/development";
import { useAppSelector } from "../../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import StatImg from "../../../../layout/StatImg/StatImg";
import { EStats } from "../../../../../constants/EStats";

interface Props {
  // Add props as needed
}

export const RPGGameCharacterTrainingRedistribution: React.FC<Props> = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.rpgGameCharacterTrainingRedistribution}>
      <TransitionProvider
        style={TransitionStyleTypes.top}
        inProp={gameInited}
        className={styles.rpgGameCharacterTrainingRedistribution__item}
      >
        <div className={styles.rpgGameCharacterTrainingRedistribution__itemMain}>
          <span className={styles.rpgGameCharacterTrainingRedistribution__text}>
            Перераспределить развитие: 50
          </span>

          <StatImg stat={EStats.darkMatter} size={10} />
        </div>
        <button
          className={styles.rpgGameCharacterTrainingRedistribution__resetBtn}
        >
          <span>Сбросить всё</span>
          <RPGGameCharacterResetIcon />
        </button>
      </TransitionProvider>
      <TransitionProvider
        style={TransitionStyleTypes.zoomIn}
        inProp={gameInited}
        delay={100}
        className={styles.rpgGameCharacterTrainingRedistribution__dotLine}
      >
        <RPGGameCharacterTrainingDotline />
      </TransitionProvider>
      <TransitionProvider
        style={TransitionStyleTypes.bottom}
        inProp={gameInited}
        delay={200}
        className={styles.rpgGameCharacterTrainingRedistribution__item}
      >
        <div className={styles.rpgGameCharacterTrainingRedistribution__itemMain}>
          <span className={styles.rpgGameCharacterTrainingRedistribution__text}>
            Перераспределить кибернетики: 0.01{" "}
          </span>
          <div
            className={
              styles.rpgGameCharacterTrainingRedistribution__statImageWrapper
            }
          >
            <ImageWebp
              src={darkMatterImage}
              srcSet={darkMatterImageWebp}
              alt="dark matter"
              className={styles.rpgGameCharacterTrainingRedistribution__statImage}
            />
          </div>
        </div>
        <button
          className={styles.rpgGameCharacterTrainingRedistribution__resetBtn}
        >
          <span>Сбросить всё</span>
          <RPGGameCharacterResetIcon />
        </button>
      </TransitionProvider>
    </div>
  );
};

export default RPGGameCharacterTrainingRedistribution;
