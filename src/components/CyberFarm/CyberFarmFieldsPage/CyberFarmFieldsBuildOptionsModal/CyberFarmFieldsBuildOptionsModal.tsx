import React, { useEffect, useState } from "react";

import styles from "./CyberFarmFieldsBuildOptionsModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  cyberFarmFactoryImage,
  cyberFarmFactoryImageWebp,
  cyberFarmFarmImage,
  cyberFarmFarmImageWebp,
} from "../../../../assets/imageMaps";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { buySlot } from "../../../../store/slices/cyberFarm/slotsSlice";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";
import { useSlotCost } from "../../../../hooks/useSlotCost";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import { useNavigate } from "react-router-dom";
import {
  cyberFarmFactoriesPagePath,
  cyberFarmFarmsPagePath,
} from "../../../../router/constants";

interface Props {
  show: boolean;
  onClose: () => void;
  slotId: string;
}

const { titleText, farmButtonText, factoryButtonText, successText } =
  TRANSLATIONS.cyberFarm.fields.buildOptionsModal;
const CyberFarmFieldsBuildOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  slotId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.ui.language);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const getSlotCostTexts = useSlotCost();
  const [errorText, setErrorText] = useState("");
  const { show: showtooltip, openTooltip } = useTooltip();

  useEffect(() => {
    if (show) {
      setErrorText("");
      setErrored(false);
    }
  }, [show]);

  const onBuild = async (type: EFarmSlotTypes) => {
    const { notEnoughResourcesText, errored } = getSlotCostTexts(type);

    if (errored) {
      setErrorText(notEnoughResourcesText);
      return;
    }

    try {
      setLoading(true);
      setErrored(false);
      await dispatch(buySlot({ id: slotId, type })).unwrap();
      await openTooltip();
      onClose();
      navigate(
        type === EFarmSlotTypes.FACTORY
          ? cyberFarmFactoriesPagePath
          : cyberFarmFarmsPagePath
      );
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
      errored={errored || !!errorText}
      errorText={errorText}
    >
      <div className={styles.cyberFarmFieldsBuildOptionsModal}>
        <button
          onClick={() => onBuild(EFarmSlotTypes.FARM)}
          className={styles.cyberFarmFieldsBuildOptionsModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuildOptionsModal__btnInner}>
            <ImageWebp
              srcSet={cyberFarmFarmImageWebp}
              src={cyberFarmFarmImage}
              alt={"farm"}
              pictureClass={styles.cyberFarmFieldsBuildOptionsModal__picture}
              className={styles.cyberFarmFieldsBuildOptionsModal__btnImg}
            />
            <span>{farmButtonText[language]}</span>
          </div>
        </button>
        <button
          onClick={() => onBuild(EFarmSlotTypes.FACTORY)}
          className={styles.cyberFarmFieldsBuildOptionsModal__btn}
        >
          <div className={styles.cyberFarmFieldsBuildOptionsModal__btnInner}>
            <ImageWebp
              srcSet={cyberFarmFactoryImage}
              src={cyberFarmFactoryImageWebp}
              alt={"factory"}
              pictureClass={styles.cyberFarmFieldsBuildOptionsModal__picture}
              className={styles.cyberFarmFieldsBuildOptionsModal__btnImg}
            />
            <span>{factoryButtonText[language]}</span>
          </div>
        </button>
      </div>
      <Tooltip show={showtooltip} text={successText[language]} />
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuildOptionsModal;
