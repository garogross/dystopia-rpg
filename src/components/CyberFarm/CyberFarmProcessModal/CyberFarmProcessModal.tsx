import React from "react";

import styles from "./CyberFarmProcessModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import { getFarmFieldProgress } from "../../../utils/getFarmFieldProgress";
import { formatTime } from "../../../utils/formatTime";
import { adImage, cpImage, cpImageWebp } from "../../../assets/imageMaps";
import { CollectIcon } from "../../layout/icons/CyberFarm/CyberFarmProcessModal";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
  item: IFarmField;
}
const {
  titleText,
  readyToCollectText,
  timeRemainingText,
  collectButtonText,
  speedUpCpButtonText,
  speedUpAdButtonText,
} = TRANSLATIONS.cyberFarm.processModal;

const CyberFarmProcessModal: React.FC<Props> = ({ show, onClose, item }) => {
  const language = useAppSelector((state) => state.ui.language);

  const productKey = item.factoryProduct || item.plant;
  if (!productKey || !item.process) return null;
  const { progress, remainingTimeInSecs } = getFarmFieldProgress(
    item.process.startDate,
    item.process.endDate
  );
  const productdetails = products[productKey];
  const isReadyToCollect = progress >= 100;
  return (
    <ModalWithAdd show={show} onClose={onClose} title={titleText[language]}>
      <div className={styles.cyberFarmProcessModal}>
        <div className={styles.cyberFarmProcessModal__inner}>
          <div className={styles.cyberFarmProcessModal__info}>
            <ImageWebp
              src={productdetails.src}
              srcSet={productdetails.srcSet}
              alt={productdetails.name[language]}
              className={styles.cyberFarmProcessModal__img}
            />
            <div className={styles.cyberFarmProcessModal__infoMain}>
              <p className={styles.cyberFarmProcessModal__text}>
                {productdetails.name[language]}
              </p>
              <div className={styles.cyberFarmProcessModal__progressBar}>
                <div
                  className={styles.cyberFarmProcessModal__progressBarWrapper}
                >
                  <div
                    style={{ width: `${progress}%` }}
                    className={styles.cyberFarmProcessModal__progressBarinner}
                  ></div>
                </div>
              </div>
              <p className={styles.cyberFarmProcessModal__text}>
                {isReadyToCollect
                  ? readyToCollectText[language]
                  : `${timeRemainingText[language]} ${formatTime(
                      remainingTimeInSecs
                    )}`}
              </p>
            </div>
          </div>
          <div className={styles.cyberFarmProcessModal__actions}>
            {isReadyToCollect ? (
              <button className={styles.cyberFarmProcessModal__btn}>
                <div className={styles.cyberFarmProcessModal__btnInner}>
                  <span>{collectButtonText[language]}</span>
                  <CollectIcon />
                </div>
              </button>
            ) : (
              <>
                <button className={styles.cyberFarmProcessModal__btn}>
                  <div className={styles.cyberFarmProcessModal__btnInner}>
                    <span>{speedUpCpButtonText[language]}</span>
                    <ImageWebp
                      src={cpImage}
                      srcSet={cpImageWebp}
                      alt="cash point"
                      className={styles.cyberFarmProcessModal__btnImg}
                    />
                  </div>
                </button>
                <button className={styles.cyberFarmProcessModal__btn}>
                  <div className={styles.cyberFarmProcessModal__btnInner}>
                    <span>{speedUpAdButtonText[language]}</span>
                    <img
                      src={adImage}
                      alt="cash point"
                      className={styles.cyberFarmProcessModal__btnImg}
                    />
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmProcessModal;
