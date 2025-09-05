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

interface Props {
  show: boolean;
  onClose: () => void;
  onBuy: () => void;
}

const BubbleFrontBuyNecroBallModal: React.FC<Props> = ({
  show,
  onClose,
  onBuy,
}) => {
  const onBuyBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy();
    onClose();
  };

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title="Некрабомба готова к запуску!"
      hideAd
      titleClass={styles.bubbleFrontBuyNecroBallModal__title}
    >
      <div className={styles.bubbleFrontBuyNecroBallModal}>
        <p className={styles.bubbleFrontBuyNecroBallModal__text}>
          Мощнее стандартного некроснаряда. Радиус поражения — три шара.
        </p>
        <ImageWebp
          srcSet={buyNecroballImage}
          src={buyNecroballImageWebp}
          className={styles.bubbleFrontBuyNecroBallModal__img}
          alt={"necro ball"}
        />
        <p className={styles.bubbleFrontBuyNecroBallModal__text}>
          Выберите способ получения супер снаряда.
        </p>
        <div className={styles.bubbleFrontBuyNecroBallModal__btnsWrapper}>
          <button
            className={styles.bubbleFrontBuyNecroBallModal__btn}
            onClick={onBuyBall}
          >
            <div className={styles.bubbleFrontBuyNecroBallModal__btnInner}>
              <WatchAdIcon />
              <span>Смотреть рекламу</span>
            </div>
          </button>
          <button
            className={styles.bubbleFrontBuyNecroBallModal__btn}
            onClick={onBuyBall}
          >
            <div className={styles.bubbleFrontBuyNecroBallModal__btnInner}>
              <BuyByCpIcon />
              <span>Купить за 1CP</span>
            </div>
          </button>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default BubbleFrontBuyNecroBallModal;
