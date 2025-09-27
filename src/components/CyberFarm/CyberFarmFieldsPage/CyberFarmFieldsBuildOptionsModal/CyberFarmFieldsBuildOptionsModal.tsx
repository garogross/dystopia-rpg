import React, { useEffect, useState } from "react";

import styles from "./CyberFarmFieldsBuildOptionsModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  cpImage,
  cpImageWebp,
  cyberFarmFactoryImage,
  cyberFarmFactoryImageWebp,
  cyberFarmFarmImage,
  cyberFarmFarmImageWebp,
  metalImage,
  metalImageWebp,
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
  evoMode?: boolean;
}

const {
  titleText,
  farmButtonText,
  factoryButtonText,
  successText,
  buildByCpButtonText,
  buildByMetalButtonText,
} = TRANSLATIONS.cyberFarm.fields.buildOptionsModal;
const CyberFarmFieldsBuildOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  slotId,
  evoMode,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.ui.language);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const getSlotCostTexts = useSlotCost();
  const [errorText, setErrorText] = useState("");
  const { show: showtooltip, openTooltip } = useTooltip();
  const [type, setType] = useState<
    EFarmSlotTypes.FARM | EFarmSlotTypes.FACTORY
  >(EFarmSlotTypes.FARM);
  const { costTextInCp, costTextInMetal } = getSlotCostTexts(type);

  useEffect(() => {
    if (show) {
      setErrorText("");
      setErrored(false);
    }
  }, [show]);

  const onBuild = async (byCp?: boolean) => {
    const { notEnoughResourcesText, errored, cost } = getSlotCostTexts(
      type,
      byCp
    );

    if (errored) {
      setErrorText(notEnoughResourcesText);
      return;
    }

    try {
      setLoading(true);
      setErrored(false);
      await dispatch(buySlot({ id: slotId, type, cost, byCp })).unwrap();
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
      evoMode={evoMode}
    >
      <div className={styles.cyberFarmFieldsBuildOptionsModal}>
        <div className={styles.cyberFarmFieldsBuildOptionsModal__col}>
          <button
            onClick={() => setType(EFarmSlotTypes.FARM)}
            className={`${styles.cyberFarmFieldsBuildOptionsModal__typeBtn} ${
              type === EFarmSlotTypes.FARM
                ? styles.cyberFarmFieldsBuildOptionsModal__typeBtn_active
                : ""
            }`}
          >
            <div
              className={styles.cyberFarmFieldsBuildOptionsModal__typeBtnInner}
            >
              <ImageWebp
                srcSet={cyberFarmFarmImageWebp}
                src={cyberFarmFarmImage}
                alt={"farm"}
                pictureClass={styles.cyberFarmFieldsBuildOptionsModal__picture}
                className={styles.cyberFarmFieldsBuildOptionsModal__typeBtnImg}
              />
              <span>{farmButtonText[language]}</span>
            </div>
          </button>
          <button
            onClick={() => setType(EFarmSlotTypes.FACTORY)}
            className={`${styles.cyberFarmFieldsBuildOptionsModal__typeBtn} ${
              type === EFarmSlotTypes.FACTORY
                ? styles.cyberFarmFieldsBuildOptionsModal__typeBtn_active
                : ""
            }`}
          >
            <div
              className={styles.cyberFarmFieldsBuildOptionsModal__typeBtnInner}
            >
              <ImageWebp
                srcSet={cyberFarmFactoryImage}
                src={cyberFarmFactoryImageWebp}
                alt={"factory"}
                pictureClass={styles.cyberFarmFieldsBuildOptionsModal__picture}
                className={styles.cyberFarmFieldsBuildOptionsModal__typeBtnImg}
              />
              <span>{factoryButtonText[language]}</span>
            </div>
          </button>
        </div>
        <div className={styles.cyberFarmFieldsBuildOptionsModal__col}>
          <button
            onClick={() => onBuild(true)}
            disabled={loading}
            className={styles.cyberFarmFieldsBuildOptionsModal__btn}
          >
            <div className={styles.cyberFarmFieldsBuildOptionsModal__btnInner}>
              <div className={styles.cyberFarmFieldsBuildOptionsModal__btnMain}>
                <ImageWebp
                  srcSet={cpImageWebp}
                  src={cpImage}
                  alt={"CP"}
                  className={
                    styles.cyberFarmFieldsBuildOptionsModal__btnInnerImg
                  }
                />
                <span>{buildByCpButtonText[language]}</span>
              </div>
              <p className={styles.cyberFarmFieldsBuildOptionsModal__btnCost}>
                ({costTextInCp})
              </p>
            </div>
          </button>
          <button
            disabled={loading}
            onClick={() => onBuild()}
            className={styles.cyberFarmFieldsBuildOptionsModal__btn}
          >
            <div className={styles.cyberFarmFieldsBuildOptionsModal__btnInner}>
              <div className={styles.cyberFarmFieldsBuildOptionsModal__btnMain}>
                <ImageWebp
                  srcSet={metalImageWebp}
                  src={metalImage}
                  alt={"Metal"}
                  className={
                    styles.cyberFarmFieldsBuildOptionsModal__btnInnerImg
                  }
                />
                <span>{buildByMetalButtonText[language]}</span>
              </div>
              <p className={styles.cyberFarmFieldsBuildOptionsModal__btnCost}>
                ({costTextInMetal})
              </p>
            </div>
          </button>
        </div>
      </div>
      <Tooltip show={showtooltip} text={successText[language]} />
    </ModalWithAdd>
  );
};

export default CyberFarmFieldsBuildOptionsModal;
