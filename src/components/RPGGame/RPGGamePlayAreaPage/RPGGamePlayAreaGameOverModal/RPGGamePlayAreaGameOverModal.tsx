import React from "react";

import styles from "./RPGGamePlayAreaGameOverModal.module.scss";
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

const RPGGamePlayAreaGameOverModal: React.FC<Props> = ({
  gameStatus,
  onReStart,
}) => {
  const navigate = useNavigate();
  return (
    <TransitionProvider
      className={styles.rpgGamePlayAreaGameOverModal}
      style={TransitionStyleTypes.opacity}
      inProp={gameStatus !== "playing"}
    >
      <WrapperWithFrame className={styles.rpgGamePlayAreaGameOverModal__wrapper}>
        <div className={styles.rpgGamePlayAreaGameOverModal__main}>
          <h6 className={styles.rpgGamePlayAreaGameOverModal__title}>
            Игра окончена
            <br />
            <span className="primaryText">
              {gameStatus === "win"
                ? "Поздравляем, вы победили!"
                : "К сожалению, вы проиграли."}
            </span>
          </h6>
          <div className={styles.rpgGamePlayAreaGameOverModal__btnsWrapper}>
            <button
              className={`${styles.rpgGamePlayAreaGameOverModal__btn} ${styles.rpgGamePlayAreaGameOverModal__backBtn}`}
              onClick={() => navigate(-1)}
            >
              <span className={styles.rpgGamePlayAreaGameOverModal__btnInner}>
                Назад
              </span>
            </button>
            <button
              className={`${styles.rpgGamePlayAreaGameOverModal__btn} ${styles.rpgGamePlayAreaGameOverModal__restartBtn}`}
              onClick={onReStart}
            >
              <span className={styles.rpgGamePlayAreaGameOverModal__btnInner}>
                Начать заново
              </span>
            </button>
          </div>
        </div>
      </WrapperWithFrame>
    </TransitionProvider>
  );
};

export default RPGGamePlayAreaGameOverModal;
