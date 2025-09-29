import React, { useEffect, useState } from "react";

import styles from "./CyberFarmFieldsBuyModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";
import { CancelIcon } from "../../../layout/icons/Common";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { buySlot } from "../../../../store/slices/cyberFarm/slotsSlice";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";
import { useSlotCost } from "../../../../hooks/useSlotCost";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { cpImage, cpImageWebp } from "../../../../assets/imageMaps";
import CloneFixedElementProvider from "../../../../providers/CloneFixedElementProvider";
import { ECyberfarmTutorialActions } from "../../../../constants/cyberfarm/tutorial";

interface Props {
  show: boolean;
  buyingSlotId: string;
  onClose: () => void;
  evoMode?: boolean;
}

const { titleText, buyByCpButtonText, cancelButtonText, successText } =
  TRANSLATIONS.cyberFarm.fields.buyModal;
const CyberFarmFieldsBuyModal: React.FC<Props> = ({
  show,
  onClose,
  buyingSlotId,
  evoMode,
}) => {
  const dispath = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const tutorialInProgress = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialInProgress
  );
  const { show: showTooltip, openTooltip } = useTooltip();
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [errorText, setErrorText] = useState("");

  const getSlotCostTexts = useSlotCost();
  const { costTextInCp } = getSlotCostTexts(EFarmSlotTypes.FIELDS);

  useEffect(() => {
    if (!show) {
      setErrored(false);
      setErrorText("");
    }
  }, [show]);

  const onBuy = async () => {
    const byCp = true;
    const { notEnoughResourcesText, errored, cost } = getSlotCostTexts(
      EFarmSlotTypes.FIELDS,
      byCp
    );
    if (errored && !tutorialInProgress) {
      setErrorText(notEnoughResourcesText);
      return;
    }
    try {
      setLoading(true);
      setErrored(false);
      await dispath(
        buySlot({
          id: buyingSlotId,
          type: EFarmSlotTypes.FIELDS,
          byCp: byCp,
          cost,
          tutorial: tutorialInProgress,
        })
      ).unwrap();
      await openTooltip();
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
      title={titleText(costTextInCp ? costTextInCp : undefined)[language]}
      loading={loading}
      errored={errored}
      errorText={errorText}
      evoMode={evoMode}
    >
      <div className={styles.cyberFarmFieldsBuyModal}>
        <div className={styles.cyberFarmFieldsBuyModal__btnsWrapper}>
          <button
            onClick={() => onBuy()}
            disabled={loading}
            className={`${styles.cyberFarmFieldsBuyModal__btn} ${styles.cyberFarmFieldsBuyModal__btn_byCp}`}
          >
            <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
              <ImageWebp
                srcSet={cpImageWebp}
                src={cpImage}
                alt={"CP"}
                className={styles.cyberFarmFieldsBuyModal__btnInnerImg}
              />
              <span>{buyByCpButtonText[language]}</span>
            </div>
          </button>
          <button
            onClick={onClose}
            className={`${styles.cyberFarmFieldsBuyModal__btn} ${styles.cyberFarmFieldsBuyModal__btn_cancel}`}
          >
            <div className={styles.cyberFarmFieldsBuyModal__btnInner}>
              <CancelIcon />
              <span>{cancelButtonText[language]}</span>
            </div>
          </button>
        </div>
      </div>
      <Tooltip show={showTooltip} text={successText[language]} />
      {show && (
        <CloneFixedElementProvider
          id={ECyberfarmTutorialActions.buySlot}
          onClick={onBuy}
        />
      )}
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuyModal;
