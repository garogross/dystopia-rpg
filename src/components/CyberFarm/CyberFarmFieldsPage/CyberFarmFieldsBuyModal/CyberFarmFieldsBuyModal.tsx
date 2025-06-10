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

interface Props {
  show: boolean;
  buyingSlotId: string;
  onClose: () => void;
}

const { titleText, buyButtonText, cancelButtonText } =
  TRANSLATIONS.cyberFarm.fields.buyModal;
const CyberFarmFieldsBuyModal: React.FC<Props> = ({
  show,
  onClose,
  buyingSlotId,
}) => {
  const dispath = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

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
      title={titleText[language]}
      loading={loading}
      errored={errored}
    >
      <div className={styles.cyberFarmFieldsBuyModal}>
        <button onClick={onBuy} className={styles.cyberFarmFieldsBuyModal__btn}>
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
