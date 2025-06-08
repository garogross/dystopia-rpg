import React from "react";

import styles from "./CyberFarmFieldsBuildModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import {
  BuildIcon,
  PlantIcon,
} from "../../../layout/icons/CyberFarm/CyberFarmFieldsPage";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
  onBuild: () => void;
  onPlant: () => void;
}

const {
  titleText,
plantButtonText,
buildButtonText,
} = TRANSLATIONS.cyberFarm.fields.buildModal

const CyberFarmFieldsBuildModal: React.FC<Props> = ({
  show,
  onClose,
  onBuild,
  onPlant,
}) => {
    const language = useAppSelector(state => state.ui.language)

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={titleText[language]}
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
            <span>{plantButtonText[language]}</span>
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
            <span>{buildButtonText[language]}</span>
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuildModal;
