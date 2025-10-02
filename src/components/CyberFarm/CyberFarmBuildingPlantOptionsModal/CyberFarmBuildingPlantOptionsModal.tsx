import React from "react";

import styles from "./CyberFarmBuildingPlantOptionsModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";
import {
  BuildIcon,
  PlantIcon,
} from "../../layout/icons/CyberFarm/CyberFarmFieldsPage";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";

interface Props {
  show: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onPlant: () => void;
  evoMode?: boolean;
  level: number | undefined;
  type: EFarmSlotTypes; // farm or factory
}

const {
  titleText,
  plantButtonText,
  upgradeButtonText,
  farmText,
  factoryText,
  levelText,
} = TRANSLATIONS.cyberFarm.buildingPlantOptionsModal;

const typeTexts = {
  [EFarmSlotTypes.FIELDS]: farmText, // this is for avoid type error
  [EFarmSlotTypes.FARM]: farmText,
  [EFarmSlotTypes.FACTORY]: factoryText,
};

const CyberFarmBuildingPlantOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  onUpgrade,
  onPlant,
  evoMode,
  level,
  type,
}) => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <ModalWithAdd
      evoMode={evoMode}
      show={show}
      onClose={onClose}
      title={titleText[language]}
      titleLg={`${typeTexts[type][language]}, ${levelText[language]}: ${
        level || 1
      }`}
    >
      <div className={styles.cyberFarmBuildingPlantOptionsModal}>
        <button
          onClick={() => {
            onClose();
            onPlant();
          }}
          className={styles.cyberFarmBuildingPlantOptionsModal__btn}
        >
          <div className={styles.cyberFarmBuildingPlantOptionsModal__btnInner}>
            <PlantIcon />
            <span>{plantButtonText[language]}</span>
          </div>
        </button>
        <button
          onClick={() => {
            onClose();
            onUpgrade();
          }}
          className={styles.cyberFarmBuildingPlantOptionsModal__btn}
        >
          <div className={styles.cyberFarmBuildingPlantOptionsModal__btnInner}>
            <BuildIcon />
            <span>{upgradeButtonText[language]}</span>
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmBuildingPlantOptionsModal;
