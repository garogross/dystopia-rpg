import React from "react";

import styles from "./GamePlayAreaGameOverModal.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import { useNavigate } from "react-router-dom";

interface Props {
  show: boolean;
  onReStart: () => void;
}

const GamePlayAreaGameOverModal: React.FC<Props> = ({ show, onReStart }) => {
  const navigate = useNavigate()
  return (
    <TransitionProvider
      className={styles.gamePlayAreaGameOverModal}
      style={TransitionStyleTypes.opacity}
      inProp={show}
    >
      <WrapperWithFrame className={styles.gamePlayAreaGameOverModal__wrapper}>
        <div className={styles.gamePlayAreaGameOverModal__main}>
          <h6 className={styles.gamePlayAreaGameOverModal__title}>
            Игра окончена
            <br />
            <span className="primaryText">Вы проиграли</span>
          </h6>
          <div className={styles.gamePlayAreaGameOverModal__btnsWrapper}>

          <button
            className={`${styles.gamePlayAreaGameOverModal__btn} ${styles.gamePlayAreaGameOverModal__backBtn}`}
            onClick={() => navigate(-1)}
            >
            <span className={styles.gamePlayAreaGameOverModal__btnInner}>
              Назад
            </span>
          </button>
          <button
            className={`${styles.gamePlayAreaGameOverModal__btn} ${styles.gamePlayAreaGameOverModal__restartBtn}`}
            onClick={onReStart}
            >
            <span className={styles.gamePlayAreaGameOverModal__btnInner}>
              Начать заново
            </span>
          </button>
            </div>
        </div>
      </WrapperWithFrame>
    </TransitionProvider>
  );
};

export default GamePlayAreaGameOverModal;
