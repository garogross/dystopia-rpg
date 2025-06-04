import React from "react";
import styles from "./RPGGameCharacterTrainingInfo.module.scss";
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

const RPGGameCharacterTrainingInfo: React.FC<Props> = ({ data }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div
      className={styles.rpgGameCharacterTrainingInfo}
    >
      {data.map((item, index) => (
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.bottom}
          delay={100 * index}
          className={styles.rpgGameCharacterTrainingInfo__item}
          key={item.title}
        >
          {item.title && index > 0 && (
            <h5 className={styles.rpgGameCharacterTrainingInfo__title}>
              {item.title}
            </h5>
          )}
          <p className={styles.rpgGameCharacterTrainingInfo__text}>{item.text}</p>
        </TransitionProvider>
      ))}
    </div>
  );
};

export default RPGGameCharacterTrainingInfo;
