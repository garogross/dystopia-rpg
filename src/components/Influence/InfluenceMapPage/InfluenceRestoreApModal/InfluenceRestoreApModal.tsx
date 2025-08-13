import React, { useEffect, useState } from "react";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import Backdrop from "../../../layout/Backdrop/Backdrop";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  adImage,
  cpImage,
  cpImageWebp,
  influenceEnergyImage,
  influenceEnergyImageWebp,
} from "../../../../assets/imageMaps";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";

import styles from "./InfluenceRestoreApModal.module.scss";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  closeRestoreModal,
  restoreAP,
} from "../../../../store/slices/influence/influenceSlice";
import { useInfluenceRestoretimer } from "../../../../hooks/influence/useInfluenceRestoretimer";
import { formatTime } from "../../../../utils/formatTime";
import { useVideoAd } from "../../../../hooks/useVideoAd";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import LoadingOverlay from "../../../layout/LoadingOverlay/LoadingOverlay";
import { EAdPartners } from "../../../../constants/EAdPartners";
import { EadProviders } from "../../../../constants/EadProviders";

const COST_CP = 1;

const {
  titleText,
  subtitleText,
  restoreApText,
  watchAdButtonText,
  restoreCpButtonText,
  timerText,
  apsRestoredSuccessText,
} = TRANSLATIONS.influence.map.restoreApModal;
const { orText } = TRANSLATIONS.common;
const { somethingWentWrong } = TRANSLATIONS.errors;
const InfluenceRestoreApModal = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const show = useAppSelector(
    (state) => state.influence.influence.restoreModalOpened
  );
  const restoreModalOpenedType = useAppSelector(
    (state) => state.influence.influence.restoreModalOpenedType
  );
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const actionPointMax = useAppSelector(
    (state) => state.influence.settings.actionPointMax
  );
  const actionPointRestore = useAppSelector(
    (state) => state.influence.settings.actionPointRestore
  );
  const timeLeft = useInfluenceRestoretimer();
  const {
    onShowAd,
    showTooltip: adShowTooltip,
    tooltipText: adTooltipText,
    loading: adLoading,
  } = useVideoAd({
    scsClb: () =>
      dispatch(restoreAP({ method: "ad", partner: EAdPartners.Giga })),
    speedUpCompleteText: apsRestoredSuccessText,
    provider: EadProviders.Gigapub,
    index: 4,
    maxPerHourArg: -1,
    maxPerDayArg: -1,
    minPouseMsArg: 30,
  });
  const { show: showTooltip, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(
    apsRestoredSuccessText[language]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTooltipText(adTooltipText);
  }, [adTooltipText]);

  const onClose = () => dispatch(closeRestoreModal());

  const onRetore = async () => {
    setLoading(true);
    try {
      await dispatch(restoreAP({ method: "buy" })).unwrap();

      setTooltipText(apsRestoredSuccessText[language]);
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
    } finally {
      setLoading(false);
      openTooltip();
    }
  };

  return (
    <NewPortalProvider>
      <Backdrop inProp={show} onClose={onClose} />
      <TransitionProvider
        inProp={show}
        style={TransitionStyleTypes.opacity}
        className={styles.influenceRestoreApModal}
      >
        <WrapperWithFrame
          size="md"
          innerClassName={styles.influenceRestoreApModal__wrapper}
        >
          <div className={styles.influenceRestoreApModal__header}>
            <div className={styles.influenceRestoreApModal__headerMain}>
              <ImageWebp
                src={influenceEnergyImage}
                srcSet={influenceEnergyImageWebp}
                alt="action points"
                className={styles.influenceRestoreApModal__apImage}
              />
              <h4 className={styles.influenceRestoreApModal__titleText}>
                {titleText[language]}
              </h4>
            </div>
            <HeaderBtn type={"close"} onClick={onClose} />
          </div>
          <div className={styles.influenceRestoreApModal__main}>
            <h6 className={styles.influenceRestoreApModal__subtitleText}>
              {restoreModalOpenedType === "restore"
                ? subtitleText[language]
                : restoreApText[language]}
            </h6>
            <div className={styles.influenceRestoreApModal__btnsWrapper}>
              <button
                onClick={onShowAd}
                className={styles.influenceRestoreApModal__btn}
              >
                <div className={styles.influenceRestoreApModal__btnInner}>
                  <span>{watchAdButtonText[language]}</span>
                  <img src={adImage} alt={"watch ad"} />
                </div>
              </button>
              <h6 className={styles.influenceRestoreApModal__subtitleText}>
                {orText[language]}
              </h6>
              <button
                onClick={onRetore}
                className={styles.influenceRestoreApModal__btn}
              >
                <div className={styles.influenceRestoreApModal__btnInner}>
                  <span>
                    {restoreCpButtonText[language].replace(
                      "NUMBER",
                      COST_CP.toString()
                    )}
                  </span>
                  <ImageWebp
                    srcSet={cpImageWebp}
                    src={cpImage}
                    alt={"cash point"}
                  />
                </div>
              </button>
            </div>
          </div>
          {actionPoints < actionPointMax && (
            <p className={styles.influenceRestoreApModal__timerText}>
              {timerText[language]
                .replace("TIME", formatTime(timeLeft))
                .replace("AMOUNT", actionPointRestore.amount.toString())}
            </p>
          )}
        </WrapperWithFrame>
        <Tooltip show={showTooltip || adShowTooltip} text={tooltipText} />
        <LoadingOverlay loading={loading || adLoading} />
      </TransitionProvider>
    </NewPortalProvider>
  );
};

export default InfluenceRestoreApModal;
