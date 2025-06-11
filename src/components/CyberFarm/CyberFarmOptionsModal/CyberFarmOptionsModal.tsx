import React, { useState } from "react";

import styles from "./CyberFarmOptionsModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { produceSlot } from "../../../store/slices/cyberFarm/slotsSlice";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";

interface Props {
  show: boolean;
  onClose: () => void;
  type: "plant" | "factory";
  slotId: string
}

const { titleText, plantTitleText } = TRANSLATIONS.cyberFarm.optionsModal;

const CyberFarmOptionsModal: React.FC<Props> = ({ show, onClose, type ,slotId}) => {
  const dispatch = useAppDispatch()
  const language = useAppSelector((state) => state.ui.language);

  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  
  const onProduce = async (product: CyberFarmProductType) => {
    try {
      setLoading(true);
      setErrored(false);
      await dispatch(produceSlot({ id: slotId, product  })).unwrap();
      onClose();
    } catch (error) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={(type === "factory" ? titleText : plantTitleText)[language]}
      loading={loading}
      errored={errored}
    >
      <div
        className={`${styles.cyberFarmOptionsModal} ${
          type === "factory" ? styles.cyberFarmOptionsModal_factory : ""
        }`}
      >
        {Object.entries(products)
          .filter(([_,product]) => product.type === type)
          .map(([key,product]) => (
            <button
              className={styles.cyberFarmOptionsModal__btn}
              key={product.name[language]}
              onClick={() => onProduce(key as CyberFarmProductType)}
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
