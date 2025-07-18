import React from "react";

import styles from "./RPGGamePlayAreaErrorModal.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

interface Props {
  show: boolean;
  onRestart: () => void;
}

const RPGGamePlayAreaErrorModal: React.FC<Props> = ({ show, onRestart }) => {
  return (
    <TransitionProvider
      className={styles.rpgGamePlayAreaErrorModal}
      style={TransitionStyleTypes.opacity}
      inProp={show}
    >
      <h4>Что то прошло не так</h4>
      <button
        className={styles.rpgGamePlayAreaErrorModal__btn}
        onClick={onRestart}
      >
        Пробовать снова
      </button>
    </TransitionProvider>
  );
};

export default RPGGamePlayAreaErrorModal;
