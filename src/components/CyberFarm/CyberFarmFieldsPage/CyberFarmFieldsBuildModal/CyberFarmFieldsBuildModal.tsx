import React from "react";

import styles from "./CyberFarmFieldsBuildModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import {
  BuildIcon,
  PlantIcon,
} from "../../../layout/icons/CyberFarm/CyberFarmFieldsPage";

interface Props {
  show: boolean;
  onClose: () => void;
  onBuild: () => void;
  onPlant: () => void;
}

const CyberFarmFieldsBuildModal: React.FC<Props> = ({
  show,
  onClose,
  onBuild,
  onPlant,
}) => {
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title="Выберите способ использования поля"
    >
      <div className={styles.cyberFarmFieldsBuildModal}>
        <button
          onClick={() => {
            onClose();
            onPlant();
          }}
          className={styles.cyberFarmFieldsBuildModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuildModal__btnInner}>
            <PlantIcon />
            <span>Посадить</span>
          </div>
        </button>
        <button
          onClick={() => {
            onClose();
            onBuild();
          }}
          className={styles.cyberFarmFieldsBuildModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuildModal__btnInner}>
            <BuildIcon />
            <span>Построить</span>
          </div>{" "}
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuildModal;
