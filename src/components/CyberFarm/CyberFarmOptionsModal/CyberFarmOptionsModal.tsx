import React from "react";

import styles from "./CyberFarmOptionsModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
  type: "plant" | "factory";
  slotId: string
}

const { titleText, plantTitleText } = TRANSLATIONS.cyberFarm.optionsModal;

const CyberFarmOptionsModal: React.FC<Props> = ({ show, onClose, type ,slotId}) => {
  const language = useAppSelector((state) => state.ui.language);



  
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={(type === "factory" ? titleText : plantTitleText)[language]}
    >
      <div
        className={`${styles.cyberFarmOptionsModal} ${
          type === "factory" ? styles.cyberFarmOptionsModal_factory : ""
        }`}
      >
        {Object.values(products)
          .filter((product) => product.type === type)
          .map((product) => (
            <button
              className={styles.cyberFarmOptionsModal__btn}
              key={product.name[language]}
            >
              <div className={styles.cyberFarmOptionsModal__btnInner}>
                <ImageWebp
                  srcSet={product.srcSet}
                  src={product.src}
                  alt={product.name[language]}
                  pictureClass={styles.cyberFarmOptionsModal__picture}
                  className={styles.cyberFarmOptionsModal__btnImg}
                />
                <span>{product.name[language]}</span>
              </div>
            </button>
          ))}
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmOptionsModal;
