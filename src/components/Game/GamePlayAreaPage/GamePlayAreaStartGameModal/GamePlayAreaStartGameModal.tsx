import React from "react";

import styles from "./GamePlayAreaStartGameModal.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";

interface Props {
  show: boolean;
  onStart: () => void;
}

const GamePlayAreaStartGameModal: React.FC<Props> = ({ show, onStart }) => {
  return (
    <TransitionProvider
      className={styles.gamePlayAreaStartGameModal}
      style={TransitionStyleTypes.opacity}
      inProp={show}
    >
      <WrapperWithFrame className={styles.gamePlayAreaStartGameModal__wrapper}>
        <div className={styles.gamePlayAreaStartGameModal__main}>
          <h6 className={styles.gamePlayAreaStartGameModal__title}>
            Нажмите «Готов», когда будете готовы
          </h6>
          <button
            className={styles.gamePlayAreaStartGameModal__btn}
            onClick={onStart}
          >
            <span className={styles.gamePlayAreaStartGameModal__btnInner}>
              Готов
            </span>
          </button>
        </div>
      </WrapperWithFrame>
    </TransitionProvider>
  );
};

export default GamePlayAreaStartGameModal;
