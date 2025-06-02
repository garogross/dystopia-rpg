import React from "react";

import styles from "./GamePlayAreaErrorModal.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

interface Props {
  show: boolean;
  onRestart: () => void;
}

const GamePlayAreaErrorModal: React.FC<Props> = ({ show, onRestart }) => {
  return (
    <TransitionProvider
      className={styles.gamePlayAreaErrorModal}
      style={TransitionStyleTypes.opacity}
      inProp={show}
    >
      <h4>Что то прошло не так</h4>
      <button
        className={styles.gamePlayAreaErrorModal__btn}
        onClick={onRestart}
      >
        Пробовать снова
      </button>
    </TransitionProvider>
  );
};

export default GamePlayAreaErrorModal;
