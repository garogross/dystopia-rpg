import React, { useEffect, useState } from "react";

import styles from "./CyberFarmProcessModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import { formatTime } from "../../../utils/formatTime";
import { adImage, cpImage, cpImageWebp } from "../../../assets/imageMaps";
import { CollectIcon } from "../../layout/icons/CyberFarm/CyberFarmProcessModal";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { harvest, speedUp } from "../../../store/slices/cyberFarm/slotsSlice";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { useTooltip } from "../../../hooks/useTooltip";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useFarmFieldProgress } from "../../../hooks/useFarmFieldProgress";
import { useGlobalAdController } from "../../../hooks/useGlobalAdController";
import { EAdTypes } from "../../../constants/EAdTypes";

interface Props {
  show: boolean;
  onClose: () => void;
  item: IFarmField;
}
const {
  titleText,
  readyToCollectText,
  timeRemainingText,
  collectButtonText,
  speedUpCpButtonText,
  speedUpAdButtonText,
  harvestCollectedText,
  speedUpCompleteText,
} = TRANSLATIONS.cyberFarm.processModal;
const { somethingWentWrong } = TRANSLATIONS.errors;

const CyberFarmProcessModal: React.FC<Props> = ({ show, onClose, item }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const speedUpCosts = useAppSelector(
    (state) => state.cyberfarm.slots.speedUpCosts
  );
  const onShowAd = useGlobalAdController(EAdTypes.ADSGRAM_V, "11778", () => {
    onSpeedUp(true);
  });

  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  const { show: showTooltip, openTooltip } = useTooltip();

  const productKey = item.factoryProduct || item.plant;
  const { progressPercent: progress, remainingTimeInSecs } =
    useFarmFieldProgress(item.process, [show]);
  const [tooltipText, setTooltipText] = useState(speedUpCompleteText);
  useEffect(() => {
    if (!show) {
      setErrored(false);
      setLoading(false);
    }
  }, [show]);

  const onHarvest = async () => {
    try {
      setLoading(true);
      setErrored(false);
      setTooltipText(harvestCollectedText);
      await dispatch(harvest({ id: item.id, clb: openTooltip })).unwrap();
      onClose();
    } catch (error) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };
  const onSpeedUp = async (byAd?: boolean) => {
    try {
      setLoading(true);
      setErrored(false);
      setTooltipText(speedUpCompleteText);
      await dispatch(speedUp({ id: item.id, clb: openTooltip, byAd })).unwrap();
      onHarvest();
    } catch (error) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  if (!productKey || !item.process) return null;

  const productdetails = products[productKey];
  const isReadyToCollect = progress && progress >= 100;
  const speedUpCost = speedUpCosts?.[item.type] || 0;

  return (
    <ModalWithAdd show={show} onClose={onClose} title={titleText[language]}>
      <div className={styles.cyberFarmProcessModal}>
        <div className={styles.cyberFarmProcessModal__inner}>
          <div className={styles.cyberFarmProcessModal__info}>
            <ImageWebp
              src={productdetails.src}
              srcSet={productdetails.srcSet}
              alt={productdetails.name[language]}
              className={styles.cyberFarmProcessModal__img}
            />
            <div className={styles.cyberFarmProcessModal__infoMain}>
              <p className={styles.cyberFarmProcessModal__text}>
                {productdetails.name[language]}
              </p>
              <div className={styles.cyberFarmProcessModal__progressBar}>
                <div
                  className={styles.cyberFarmProcessModal__progressBarWrapper}
                >
                  <div
                    style={{ width: `${progress}%` }}
                    className={styles.cyberFarmProcessModal__progressBarinner}
                  ></div>
                </div>
              </div>
              <p className={styles.cyberFarmProcessModal__text}>
                {isReadyToCollect
                  ? readyToCollectText[language]
                  : remainingTimeInSecs
                  ? `${timeRemainingText[language]} ${formatTime(
                      remainingTimeInSecs
                    )}`
                  : ""}
              </p>
            </div>
          </div>
          <div className={styles.cyberFarmProcessModal__actions}>
            {isReadyToCollect ? (
              <button
                onClick={onHarvest}
                className={styles.cyberFarmProcessModal__btn}
              >
                <div className={styles.cyberFarmProcessModal__btnInner}>
                  <span>{collectButtonText[language]}</span>
                  <CollectIcon />
                </div>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onSpeedUp()}
                  className={styles.cyberFarmProcessModal__btn}
                >
                  <div className={styles.cyberFarmProcessModal__btnInner}>
                    <span>
                      {speedUpCpButtonText[language].replace(
                        "NUMBER",
                        speedUpCost.toString()
                      )}
                    </span>
                    <ImageWebp
                      src={cpImage}
                      srcSet={cpImageWebp}
                      alt="cash point"
                      className={styles.cyberFarmProcessModal__btnImg}
                    />
                  </div>
                </button>
                <button
                  onClick={onShowAd}
                  className={styles.cyberFarmProcessModal__btn}
                >
                  <div className={styles.cyberFarmProcessModal__btnInner}>
                    <span>{speedUpAdButtonText[language]}</span>
                    <img
                      src={adImage}
                      alt="cash point"
                      className={styles.cyberFarmProcessModal__btnImg}
                    />
                  </div>
                </button>
              </>
            )}
          </div>
          <TransitionProvider
            inProp={errored}
            style={TransitionStyleTypes.height}
            height={40}
            className={styles.cyberFarmProcessModal__error}
          >
            <span>{somethingWentWrong[language]}</span>
          </TransitionProvider>
        </div>
        <Tooltip show={showTooltip} text={tooltipText[language]} />
      </div>
      <LoadingOverlay loading={loading} />
    </ModalWithAdd>
  );
};

export default CyberFarmProcessModal;
