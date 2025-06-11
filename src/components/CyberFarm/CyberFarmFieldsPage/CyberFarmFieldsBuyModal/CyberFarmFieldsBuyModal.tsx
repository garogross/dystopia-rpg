import React, { useEffect, useState } from "react";

import styles from "./CyberFarmFieldsBuyModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import {
  BuyIcon,
  CancelIcon,
} from "../../../layout/icons/CyberFarm/CyberFarmFieldsPage";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { buySlot } from "../../../../store/slices/cyberFarm/slotsSlice";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";
import { useSlotCost } from "../../../../hooks/useSlotCost";

interface Props {
  show: boolean;
  buyingSlotId: string;
  onClose: () => void;
}

const {
  titleText,
  buyButtonText,
  cancelButtonText,
} = TRANSLATIONS.cyberFarm.fields.buyModal;
const CyberFarmFieldsBuyModal: React.FC<Props> = ({
  show,
  onClose,
  buyingSlotId,
}) => {
  const dispath = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  const getSlotCostTexts = useSlotCost();
const { costText, notEnoughResourcesText,errored: notEnoughResources } = getSlotCostTexts(EFarmSlotTypes.FIELDS)
  useEffect(() => {
    if (!show) setErrored(false);
  }, [show]);

  const onBuy = async () => {
    try {
      setLoading(true);
      setErrored(false);
      await dispath(
        buySlot({ id: buyingSlotId, type: EFarmSlotTypes.FIELDS })
      ).unwrap();
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
      title={`${titleText[language]} ${costText}?`}
      loading={loading}
      errored={errored || !!notEnoughResources}
      errorText={notEnoughResourcesText}
    >
      <div className={styles.cyberFarmFieldsBuyModal}>
        <button
          onClick={onBuy}
          disabled={!!notEnoughResourcesText || loading}
          className={styles.cyberFarmFieldsBuyModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
            <BuyIcon />
            <span>{buyButtonText[language]}</span>
          </div>
        </button>
        <button
          onClick={onClose}
          className={styles.cyberFarmFieldsBuyModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
            <CancelIcon />
            <span>{cancelButtonText[language]}</span>
          </div>
        </button>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuyModal;
