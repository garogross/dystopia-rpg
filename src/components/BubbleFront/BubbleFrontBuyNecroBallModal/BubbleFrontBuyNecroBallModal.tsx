import React from "react";

import styles from "./BubbleFrontBuyNecroBallModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  buyNecroballImage,
  buyNecroballImageWebp,
} from "../../../assets/imageMaps";
import {
  BuyByCpIcon,
  WatchAdIcon,
} from "../../layout/icons/BubbleFront/BubbleFrontBuyNecroBallModal";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
  onBuy: () => void;
}

const {
  titleText,
  descriptionText,
  chooseMethodText,
  watchAdText,
  buyForCpText,
} = TRANSLATIONS.bubbleFront.buyNecroballModal;

const BubbleFrontBuyNecroBallModal: React.FC<Props> = ({
  show,
  onClose,
  onBuy,
}) => {
  const language = useAppSelector((state) => state.ui.language);

  const onBuyBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy();
    onClose();
  };

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={titleText[language]}
      hideAd
      titleClass={styles.bubbleFrontBuyNecroBallModal__title}
    >
      <div className={styles.bubbleFrontBuyNecroBallModal}>
        <p className={styles.bubbleFrontBuyNecroBallModal__text}>
          {descriptionText[language]}
        </p>
        <ImageWebp
          srcSet={buyNecroballImage}
          src={buyNecroballImageWebp}
          className={styles.bubbleFrontBuyNecroBallModal__img}
          alt={"necro ball"}
        />
        <p className={styles.bubbleFrontBuyNecroBallModal__text}>
          {chooseMethodText[language]}
        </p>
        <div className={styles.bubbleFrontBuyNecroBallModal__btnsWrapper}>
          <button
            className={styles.bubbleFrontBuyNecroBallModal__btn}
            onClick={onBuyBall}
          >
            <div className={styles.bubbleFrontBuyNecroBallModal__btnInner}>
              <WatchAdIcon />
              <span>{watchAdText[language]}</span>
            </div>
          </button>
          <button
            className={styles.bubbleFrontBuyNecroBallModal__btn}
            onClick={onBuyBall}
          >
            <div className={styles.bubbleFrontBuyNecroBallModal__btnInner}>
              <BuyByCpIcon />
              <span>{buyForCpText[language]}</span>
            </div>
          </button>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default BubbleFrontBuyNecroBallModal;
