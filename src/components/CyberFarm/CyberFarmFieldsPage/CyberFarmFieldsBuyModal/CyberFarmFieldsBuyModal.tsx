import React from "react";

import styles from "./CyberFarmFieldsBuyModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import {
  BuyIcon,
  CancelIcon,
} from "../../../layout/icons/CyberFarm/CyberFarmFieldsPage";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
}

const {
  titleText,
buyButtonText,
cancelButtonText,
} = TRANSLATIONS.cyberFarm.fields.buyModal

const CyberFarmFieldsBuyModal: React.FC<Props> = ({ show, onClose }) => {
    const language = useAppSelector(state => state.ui.language)

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={titleText[language]}
    >
      <div className={styles.cyberFarmFieldsBuyModal}>
        <button className={styles.cyberFarmFieldsBuyModal__btn}>
          <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
            <BuyIcon />
            <span>{buyButtonText[language]}</span>
          </div>
        </button>
        <button
          onClick={onClose}
          className={styles.cyberFarmFieldsBuyModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
            <CancelIcon />
            <span>{cancelButtonText[language]}</span>
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuyModal;
