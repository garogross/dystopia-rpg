import React from "react";

import styles from "./GridlineMainGameOverModal.module.scss";
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

const GridlineMainGameOverModal: React.FC<Props> = ({
  show,
  score,
  onReset,
}) => {
  const language = useAppSelector((state) => state.ui.language);
  const handleRestart = () => {
    if (!show) return;
    onReset();
  };
  return (
    <ModalWithAdd
      show={show}
      onClose={handleRestart}
      title={titleText[language]}
      hideAd
      titleClass={styles.gridlineMainGameOverModal__title}
    >
      <div className={styles.gridlineMainGameOverModal}>
        <p className={styles.gridlineMainGameOverModal__scoreText}>
          {collectedScoreText[language]}: {score}
        </p>
        <MainBtn
          innerClass={styles.gridlineMainGameOverModal__btn}
          onClick={handleRestart}
        >
          {restartButtonText[language]}
        </MainBtn>
      </div>
    </ModalWithAdd>
  );
};

export default GridlineMainGameOverModal;
