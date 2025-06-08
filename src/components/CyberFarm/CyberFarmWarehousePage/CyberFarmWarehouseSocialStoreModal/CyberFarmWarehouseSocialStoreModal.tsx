import React from "react";

import styles from "./CyberFarmWarehouseSocialStoreModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import { products } from "../../../../constants/cyberfarm/products";
import { cpLgImage, cpLgImageWebp } from "../../../../assets/imageMaps";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { ConfirmIcon } from "../../../layout/icons/CyberFarm/CyberFarmWarehousePage";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  show: boolean;
  onClose: () => void;
}


const {
  titleLgText,
titleText,
confirmButtonText,
exchangeOptions
} = TRANSLATIONS.cyberFarm.warehouse.socialStoreModal

const {
  cactusToCp,
cactusToRepairKit,
cactusToEnergy,
} = exchangeOptions
const changeOptions = [
  {
    fromImg: products.MetalCactus,
    toImg: {
      src: cpLgImage,
      srcSet: cpLgImageWebp,
    },
    text: cactusToCp,
  },
  {
    fromImg: products.MetalCactus,
    toImg: products.RepairKit,
    text: cactusToRepairKit,
  },
  {
    fromImg: products.MetalCactus,
    toImg: products.Energy,
    text: cactusToEnergy,
  },
];

const CyberFarmWarehouseSocialStoreModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
    const language = useAppSelector(state => state.ui.language)

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      withoutFrame
      titleLg={titleLgText[language]}
      title={titleText[language]}
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
                  {option.text[language]}
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
            <span>{confirmButtonText[language]}</span>
            <ConfirmIcon />
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmWarehouseSocialStoreModal;
