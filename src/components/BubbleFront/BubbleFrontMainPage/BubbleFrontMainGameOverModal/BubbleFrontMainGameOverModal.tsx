import React from "react";

import styles from "./BubbleFrontMainGameOverModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import MainBtn from "../../../layout/MainBtn/MainBtn";

interface Props {
  show: boolean;
  onReset: () => void;
  score: number;
}

const BubbleFrontMainGameOverModal: React.FC<Props> = ({
  show,
  score,
  onReset,
}) => {
  return (
    <ModalWithAdd
      show={show}
      onClose={onReset}
      title="Game over"
      hideAd
      titleClass={styles.bubbleFrontMainGameOverModal__title}
    >
      <div className={styles.bubbleFrontMainGameOverModal}>
        <p className={styles.bubbleFrontMainGameOverModal__scoreText}>
          Collected Score: {score} (10 CP)
        </p>
        <MainBtn
          innerClass={styles.bubbleFrontMainGameOverModal__btn}
          onClick={onReset}
        >
          Restart
        </MainBtn>
      </div>
    </ModalWithAdd>
  );
};

export default BubbleFrontMainGameOverModal;
