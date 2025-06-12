import React, { useEffect, useState } from "react";

import styles from "./CyberFarmOptionsModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { produceSlot } from "../../../store/slices/cyberFarm/slotsSlice";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { getProducMissingText } from "../../../utils/getProducMissingText";
import { FarmMissingResourcesType } from "../../../types/FarmMissingResourcesType";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";

interface Props {
  show: boolean;
  onClose: () => void;
  type: EFarmSlotTypes;
  slotId: string;
}

const {
  titleText,
  plantTitleText,

  successText,
  plantSuccessText,
} = TRANSLATIONS.cyberFarm.optionsModal;

const CyberFarmOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  type,
  slotId,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { show: showTooltip, openTooltip } = useTooltip();

  useEffect(() => {
    if (!show) {
      setErrorText("");
      setErrored(false);
    }
  }, [show]);

  const onProduce = async (product: CyberFarmProductType) => {
    try {
      setLoading(true);
      setErrored(false);
      await dispatch(produceSlot({ id: slotId, product, type })).unwrap();
      await openTooltip();
      onClose();
    } catch (error: any) {
      if (error?.message?.missing) {
        const missingText = getProducMissingText(
          error?.message?.missing as FarmMissingResourcesType,
          language
        );
        setErrorText(missingText);
      } else {
        setErrorText("");
      }
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  const productType = type === EFarmSlotTypes.FACTORY ? "factory" : "plant";
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={
        (type === EFarmSlotTypes.FACTORY ? titleText : plantTitleText)[language]
      }
      loading={loading}
      errored={errored}
      errorText={errorText}
    >
      <div
        className={`${styles.cyberFarmOptionsModal} ${
          type === EFarmSlotTypes.FACTORY
            ? styles.cyberFarmOptionsModal_factory
            : ""
        }`}
      >
        {Object.entries(products)
          .filter(([_, product]) => product.type === productType)
          .map(([key, product]) => (
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
      <Tooltip
        show={showTooltip}
        text={
          (type === EFarmSlotTypes.FACTORY ? successText : plantSuccessText)[
            language
          ]
        }
      />
    </ModalWithAdd>
  );
};

export default CyberFarmOptionsModal;
