import React from "react";

import styles from "./CyberFarmWarehouseSocialStoreModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import { products } from "../../../../constants/cyberfarm/products";
import { cpLgImage, cpLgImageWebp } from "../../../../assets/imageMaps";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { ConfirmIcon } from "../../../layout/icons/CyberFarm/CyberFarmWarehousePage";

interface Props {
  show: boolean;
  onClose: () => void;
}

const changeOptions = [
  {
    fromImg: products.MetalCactus,
    toImg: {
      src: cpLgImage,
      srcSet: cpLgImageWebp,
    },
    text: "-1 кактус на 1 CP",
  },
  {
    fromImg: products.MetalCactus,
    toImg: products.RepairKit,
    text: "-2 кактус на 10 ремкомплектов",
  },
  {
    fromImg: products.MetalCactus,
    toImg: products.Energy,
    text: "-3 кактус на 20 энергии",
  },
];

const CyberFarmWarehouseSocialStoreModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      withoutFrame
      titleLg="Социальный магазин"
      title="Выберите предмет для обмена"
    >
      <div className={styles.cyberFarmWarehouseSocialStoreModal}>
        <div className={styles.cyberFarmWarehouseSocialStoreModal__lsit}>
          {changeOptions.map((option, index) => (
            <button
              className={styles.cyberFarmWarehouseSocialStoreModal__listItem}
              key={index}
            >
              <div
                className={
                  styles.cyberFarmWarehouseSocialStoreModal__listItemInner
                }
              >
                <ImageWebp
                  src={option.fromImg.src}
                  alt="product"
                  srcSet={option.fromImg.srcSet}
                  className={
                    styles.cyberFarmWarehouseSocialStoreModal__listItemImg
                  }
                  pictureClass={
                    styles.cyberFarmWarehouseSocialStoreModal__listItemPicture
                  }
                />
                <span
                  className={styles.cyberFarmWarehouseSocialStoreModal__text}
                >
                  {option.text}
                </span>
                <ImageWebp
                  src={option.toImg.src}
                  alt="product"
                  srcSet={option.toImg.srcSet}
                  className={
                    styles.cyberFarmWarehouseSocialStoreModal__listItemImg
                  }
                  pictureClass={
                    styles.cyberFarmWarehouseSocialStoreModal__listItemPicture
                  }
                />
              </div>
            </button>
          ))}
        </div>
        <button
          className={styles.cyberFarmWarehouseSocialStoreModal__confirmBtn}
        >
          <div
            className={
              styles.cyberFarmWarehouseSocialStoreModal__confirmBtnInner
            }
          >
            <span>Потвердить обмен</span>
            <ConfirmIcon />
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmWarehouseSocialStoreModal;
