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
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
}

const {
  titleText,
farmButtonText,
factoryButtonText,
} = TRANSLATIONS.cyberFarm.fields.buildOptionsModal

const CyberFarmFieldsBuildOptionsModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
    const language = useAppSelector(state => state.ui.language)

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={titleText[language]}
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
            <span>{farmButtonText[language]}</span>
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
            <span>{factoryButtonText[language]}</span>
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuildOptionsModal;
