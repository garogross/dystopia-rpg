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
import { products } from "../../../../constants/cyberfarm/products";

interface Props {
  show: boolean;
  buyingSlotId: string;
  onClose: () => void;
}

const { titleText, buyButtonText, cancelButtonText,notEnoughResourcesText: notEnoughText } =
  TRANSLATIONS.cyberFarm.fields.buyModal;
const CyberFarmFieldsBuyModal: React.FC<Props> = ({
  show,
  onClose,
  buyingSlotId,
}) => {
  const dispath = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const slotCosts = useAppSelector((state) => state.cyberfarm.slots.slotCosts);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const resources = useAppSelector((state) => state.cyberfarm.resources.resources);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  const newSlotIndex = slots ? Object.keys(slots).length + 1 : 1;
  console.log({ slotCosts, newSlotIndex });

  const newSlotCost = slotCosts
    ? slotCosts?.fields.find(
        (cost) => cost.range[0] <= newSlotIndex && cost.range[1] >= newSlotIndex
      )
    : null;
  let costText = "";

  let notEnoughResourcesText = ""
  
  if (newSlotCost) {
    for (const [k, value] of Object.entries(newSlotCost)) {
      console.log(value);
      const key = k as keyof typeof newSlotCost;
      
      if (key === "range" || !value) {
        continue;
      }
      const costValue = value as number
      
      if (key === "cash_point") {
        costText += `${value} cp, `;
        if(cp < costValue) {
          notEnoughResourcesText += `${costValue - cp} cp, `
        }
      } else {
        costText += `${value} ${products[key].name[language]}, `;
        if(resources[key] < costValue) {
          notEnoughResourcesText += `${ costValue - resources[key]} ${products[key].name[language]}, `
        }      }
    }
    
    costText = costText.length ? costText.slice(0, costText.length - 2) : costText;
    notEnoughResourcesText = notEnoughResourcesText.length ? notEnoughResourcesText.slice(0, notEnoughResourcesText.length - 2) : notEnoughResourcesText;
  }
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
      errored={errored || !!notEnoughResourcesText}
      errorText={`${notEnoughText[language]} ${notEnoughResourcesText}`}
    >
      <div className={styles.cyberFarmFieldsBuyModal}>
        <button onClick={onBuy} disabled={!!notEnoughResourcesText || loading} className={styles.cyberFarmFieldsBuyModal__btn}>
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
