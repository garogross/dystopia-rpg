import React from "react";

import styles from "./BubbleFrontMainGameOverModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  show: boolean;
  onReset: () => void;
  score: number;
}

const { titleText, collectedScoreText, restartButtonText } =
  TRANSLATIONS.bubbleFront.main.gameOverModal;

const BubbleFrontMainGameOverModal: React.FC<Props> = ({
  show,
  score,
  onReset,
}) => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <ModalWithAdd
      show={show}
      onClose={onReset}
      title={titleText[language]}
      hideAd
      titleClass={styles.bubbleFrontMainGameOverModal__title}
    >
      <div className={styles.bubbleFrontMainGameOverModal}>
        <p className={styles.bubbleFrontMainGameOverModal__scoreText}>
          {collectedScoreText[language]}: {score} (10 CP)
        </p>
        <MainBtn
          innerClass={styles.bubbleFrontMainGameOverModal__btn}
          onClick={onReset}
        >
          {restartButtonText[language]}
        </MainBtn>
      </div>
    </ModalWithAdd>
  );
};

export default BubbleFrontMainGameOverModal;
