import React from "react";

import styles from "./CyberFarmFieldsBuildOptionsModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  cyberFarmFactoryImage,
  cyberFarmFactoryImageWebp,
  cyberFarmFarmImage,
  cyberFarmFarmImageWebp,
} from "../../../../assets/imageMaps";

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmFieldsBuildOptionsModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title="Выберите что построить"
    >
      <div className={styles.cyberFarmFieldsBuildOptionsModal}>
        <button className={styles.cyberFarmFieldsBuildOptionsModal__btn}>
          <div className={styles.cyberFarmFieldsBuildOptionsModal__btnInner}>
            <ImageWebp
              srcSet={cyberFarmFarmImageWebp}
              src={cyberFarmFarmImage}
              alt={"farm"}
              pictureClass={styles.cyberFarmFieldsBuildOptionsModal__picture}
              className={styles.cyberFarmFieldsBuildOptionsModal__btnImg}
            />
            <span>Ферма</span>
          </div>
        </button>
        <button className={styles.cyberFarmFieldsBuildOptionsModal__btn}>
          <div className={styles.cyberFarmFieldsBuildOptionsModal__btnInner}>
            <ImageWebp
              srcSet={cyberFarmFactoryImage}
              src={cyberFarmFactoryImageWebp}
              alt={"factory"}
              pictureClass={styles.cyberFarmFieldsBuildOptionsModal__picture}
              className={styles.cyberFarmFieldsBuildOptionsModal__btnImg}
            />
            <span>Завод</span>
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuildOptionsModal;
