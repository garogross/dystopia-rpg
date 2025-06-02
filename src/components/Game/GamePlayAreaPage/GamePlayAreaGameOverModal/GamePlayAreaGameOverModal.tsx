import React from "react";

import styles from "./GamePlayAreaGameOverModal.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import { useNavigate } from "react-router-dom";
import { GameStatusType } from "../../../../types/GameStatusType";

interface Props {
  gameStatus: GameStatusType;
  onReStart: () => void;
}

const GamePlayAreaGameOverModal: React.FC<Props> = ({
  gameStatus,
  onReStart,
}) => {
  const navigate = useNavigate();
  return (
    <TransitionProvider
      className={styles.gamePlayAreaGameOverModal}
      style={TransitionStyleTypes.opacity}
      inProp={gameStatus !== "playing"}
    >
      <WrapperWithFrame className={styles.gamePlayAreaGameOverModal__wrapper}>
        <div className={styles.gamePlayAreaGameOverModal__main}>
          <h6 className={styles.gamePlayAreaGameOverModal__title}>
            Игра окончена
            <br />
            <span className="primaryText">
              {gameStatus === "win"
                ? "Поздравляем, вы победили!"
                : "К сожалению, вы проиграли."}
            </span>
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
