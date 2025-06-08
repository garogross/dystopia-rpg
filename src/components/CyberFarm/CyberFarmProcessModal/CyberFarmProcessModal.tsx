import React from "react";

import styles from "./CyberFarmProcessModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { IFarmField } from "../../../models/IFarmField";
import { getFarmFieldProgress } from "../../../utils/getFarmFieldProgress";
import { formatTime } from "../../../utils/formatTime";
import {
  adImage,
  cpImage,
  cpImageWebp,
} from "../../../assets/imageMaps";
import { CollectIcon } from "../../layout/icons/CyberFarm/CyberFarmProcessModal";

interface Props {
  show: boolean;
  onClose: () => void;
  item: IFarmField;
}

const CyberFarmProcessModal: React.FC<Props> = ({ show, onClose, item }) => {
  const productKey = item.factoryProduct || item.plant;
  if (!productKey || !item.process) return null;
  const { progress, remainingTimeInSecs } = getFarmFieldProgress(
    item.process.startDate,
    item.process.endDate
  );
  const productdetails = products[productKey];
const isReadyToCollect = progress >= 100
  return (
    <ModalWithAdd show={show} onClose={onClose} title="Производство в процессе">
      <div className={styles.cyberFarmProcessModal}>
        <div className={styles.cyberFarmProcessModal__inner}>
          <div className={styles.cyberFarmProcessModal__info}>
            <ImageWebp
              src={productdetails.src}
              srcSet={productdetails.srcSet}
              alt={productdetails.name}
              className={styles.cyberFarmProcessModal__img}
            />
            <div className={styles.cyberFarmProcessModal__infoMain}>
              <p className={styles.cyberFarmProcessModal__text}>
                {productdetails.name}
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
                {isReadyToCollect ? "Урожай готов к сбору!" : `{Осталось: ${formatTime(remainingTimeInSecs)}}`}
              </p>
            </div>
          </div>
          <div className={styles.cyberFarmProcessModal__actions}>
            {
              isReadyToCollect ? (
                <button className={styles.cyberFarmProcessModal__btn}>
              <div className={styles.cyberFarmProcessModal__btnInner}>
                <span>Собрать ураожай</span>
                <CollectIcon/>
              </div>
              </button>
              ) : (
                <>
                <button className={styles.cyberFarmProcessModal__btn}>
              <div className={styles.cyberFarmProcessModal__btnInner}>
                <span>Ускорить за 0,1CP</span>
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
                <span>Ускорить за рекламу</span>
                <img
                  src={adImage}
                  alt="cash point"
                  className={styles.cyberFarmProcessModal__btnImg}
                />
              </div>
            </button></>
              )
            }
            
          </div>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmProcessModal;
