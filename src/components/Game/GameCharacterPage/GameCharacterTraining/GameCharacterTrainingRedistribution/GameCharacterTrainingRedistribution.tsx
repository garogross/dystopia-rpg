import React from "react";
import styles from "./GameCharacterTrainingRedistribution.module.scss";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import {
  darkMatterImage,
  darkMatterImageWebp,
} from "../../../../../assets/images";
import GameCharacterResetIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/redistribution/GameCharacterResetIcon";
import GameCharacterTrainingDotline from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/development/GameCharacterTrainingDotline";
import { useAppSelector } from "../../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import StatImg from "../../../../layout/StatImg/StatImg";
import { EStats } from "../../../../../constants/EStats";

interface Props {
  // Add props as needed
}

export const GameCharacterTrainingRedistribution: React.FC<Props> = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.gameCharacterTrainingRedistribution}>
      <TransitionProvider
        style={TransitionStyleTypes.top}
        inProp={gameInited}
        className={styles.gameCharacterTrainingRedistribution__item}
      >
        <div className={styles.gameCharacterTrainingRedistribution__itemMain}>
          <span className={styles.gameCharacterTrainingRedistribution__text}>
            Перераспределить развитие: 50
          </span>
     
          <StatImg stat={EStats.darkMatter} size={10}/>
        </div>
        <button
          className={styles.gameCharacterTrainingRedistribution__resetBtn}
        >
          <span>Сбросить всё</span>
          <GameCharacterResetIcon />
        </button>
      </TransitionProvider>
      <TransitionProvider
        style={TransitionStyleTypes.zoomIn}
        inProp={gameInited}
        delay={100}
        className={styles.gameCharacterTrainingRedistribution__dotLine}
      >
        <GameCharacterTrainingDotline />
      </TransitionProvider>
      <TransitionProvider
        style={TransitionStyleTypes.bottom}
        inProp={gameInited}
        delay={200}
        className={styles.gameCharacterTrainingRedistribution__item}
      >
        <div className={styles.gameCharacterTrainingRedistribution__itemMain}>
          <span className={styles.gameCharacterTrainingRedistribution__text}>
            Перераспределить кибернетики: 0.01{" "}
          </span>
          <div
            className={
              styles.gameCharacterTrainingRedistribution__statImageWrapper
            }
          >
            <ImageWebp
              src={darkMatterImage}
              srcSet={darkMatterImageWebp}
              alt="dark matter"
              className={styles.gameCharacterTrainingRedistribution__statImage}
            />
          </div>
        </div>
        <button
          className={styles.gameCharacterTrainingRedistribution__resetBtn}
        >
          <span>Сбросить всё</span>
          <GameCharacterResetIcon />
        </button>
      </TransitionProvider>
    </div>
  );
};

export default GameCharacterTrainingRedistribution;
