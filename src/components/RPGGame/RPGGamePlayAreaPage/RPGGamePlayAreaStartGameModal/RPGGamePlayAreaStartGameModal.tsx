import React from "react";

import styles from "./RPGGamePlayAreaStartGameModal.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";

interface Props {
  show: boolean;
  onStart: () => void;
}

const RPGGamePlayAreaStartGameModal: React.FC<Props> = ({ show, onStart }) => {
  return (
    <TransitionProvider
      className={styles.rpgGamePlayAreaStartGameModal}
      style={TransitionStyleTypes.opacity}
      inProp={show}
    >
      <WrapperWithFrame className={styles.rpgGamePlayAreaStartGameModal__wrapper}>
        <div className={styles.rpgGamePlayAreaStartGameModal__main}>
          <h6 className={styles.rpgGamePlayAreaStartGameModal__title}>
            Нажмите «Готов», когда будете готовы
          </h6>
          <button
            className={styles.rpgGamePlayAreaStartGameModal__btn}
            onClick={onStart}
          >
            <span className={styles.rpgGamePlayAreaStartGameModal__btnInner}>
              Готов
            </span>
          </button>
        </div>
      </WrapperWithFrame>
    </TransitionProvider>
  );
};

export default RPGGamePlayAreaStartGameModal;
