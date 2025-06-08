import React from "react";

import styles from "./CyberFarmOptionsModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";

interface Props {
  show: boolean;
  onClose: () => void;
  type: "plant" | "factory"
}

const CyberFarmOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  type
}) => {
  return (
    <ModalWithAdd show={show} onClose={onClose} title="Выберите что посадить">
      <div className={`${styles.cyberFarmOptionsModal} ${type === "factory" ? styles.cyberFarmOptionsModal_factory : ""}`}>
        {Object.values(products).filter((product) => product.type === type).map((product) => (
          <button
            className={styles.cyberFarmOptionsModal__btn}
            key={product.name}
          >
            <div className={styles.cyberFarmOptionsModal__btnInner}>
              <ImageWebp
                srcSet={product.srcSet}
                src={product.src}
                alt={product.name}
                pictureClass={styles.cyberFarmOptionsModal__picture}
                className={styles.cyberFarmOptionsModal__btnImg}
              />
              <span>{product.name}</span>
            </div>
          </button>
        ))}
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmOptionsModal;
