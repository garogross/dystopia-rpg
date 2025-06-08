import React from "react";

import styles from "./CyberFarmFieldsBuyModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import {
  BuyIcon,
  CancelIcon,
} from "../../../layout/icons/CyberFarm/CyberFarmFieldsPage";

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmFieldsBuyModal: React.FC<Props> = ({ show, onClose }) => {
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title="Вы точно хотите купить этот участок 
за 1 CP?"
    >
      <div className={styles.cyberFarmFieldsBuyModal}>
        <button className={styles.cyberFarmFieldsBuyModal__btn}>
          <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
            <BuyIcon />
            <span>Купить</span>
          </div>
        </button>
        <button
          onClick={onClose}
          className={styles.cyberFarmFieldsBuyModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
            <CancelIcon />
            <span>Отмена</span>
          </div>{" "}
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuyModal;
