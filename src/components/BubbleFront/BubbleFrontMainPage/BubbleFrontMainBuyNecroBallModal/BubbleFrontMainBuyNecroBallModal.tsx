import React from "react";

import styles from "./BubbleFrontMainBuyNecroBallModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  buyNecroballImage,
  buyNecroballImageWebp,
} from "../../../../assets/imageMaps";
import {
  BuyByCpIcon,
  WatchAdIcon,
} from "../../../layout/icons/BubbleFront/BubbleFrontMainBuyNecroBallModal";

interface Props {
  show: boolean;
  onClose: () => void;
  onBuy: () => void;
}

const BubbleFrontMainBuyNecroBallModal: React.FC<Props> = ({
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
      titleClass={styles.bubbleFrontMainBuyNecroBallModal__title}
    >
      <div className={styles.bubbleFrontMainBuyNecroBallModal}>
        <p className={styles.bubbleFrontMainBuyNecroBallModal__text}>
          Мощнее стандартного некроснаряда. Радиус поражения — три шара.
        </p>
        <ImageWebp
          srcSet={buyNecroballImage}
          src={buyNecroballImageWebp}
          className={styles.bubbleFrontMainBuyNecroBallModal__img}
          alt={"necro ball"}
        />
        <p className={styles.bubbleFrontMainBuyNecroBallModal__text}>
          Выберите способ получения супер снаряда.
        </p>
        <div className={styles.bubbleFrontMainBuyNecroBallModal__btnsWrapper}>
          <button
            className={styles.bubbleFrontMainBuyNecroBallModal__btn}
            onClick={onBuyBall}
          >
            <div className={styles.bubbleFrontMainBuyNecroBallModal__btnInner}>
              <WatchAdIcon />
              <span>Смотреть рекламу</span>
            </div>
          </button>
          <button
            className={styles.bubbleFrontMainBuyNecroBallModal__btn}
            onClick={onBuyBall}
          >
            <div className={styles.bubbleFrontMainBuyNecroBallModal__btnInner}>
              <BuyByCpIcon />
              <span>Купить за 1CP</span>
            </div>
          </button>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default BubbleFrontMainBuyNecroBallModal;
