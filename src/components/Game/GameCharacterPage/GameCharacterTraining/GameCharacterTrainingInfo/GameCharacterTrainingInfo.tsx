import React from "react";
import styles from "./GameCharacterTrainingInfo.module.scss";
import { useAppSelector } from "../../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";

interface TrainingItem {
  title: string;
  text: string;
}

interface Props {
  data: TrainingItem[];
}

const GameCharacterTrainingInfo: React.FC<Props> = ({ data }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div
      className={styles.gameCharacterTrainingInfo}
    >
      {data.map((item, index) => (
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.bottom}
          delay={100 * index}
          className={styles.gameCharacterTrainingInfo__item}
          key={item.title}
        >
          {item.title && index > 0 && (
            <h5 className={styles.gameCharacterTrainingInfo__title}>
              {item.title}
            </h5>
          )}
          <p className={styles.gameCharacterTrainingInfo__text}>{item.text}</p>
        </TransitionProvider>
      ))}
    </div>
  );
};

export default GameCharacterTrainingInfo;
