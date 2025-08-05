import { useEffect } from "react";
import { EAdTypes } from "../../../../constants/EAdTypes";
import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useVideoAd } from "../../../../hooks/useVideoAd";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";

const { watchAdAndGetCpText, watchAdText } = TRANSLATIONS.common;
const { perDayText } = TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectVideoTaskItem = ({
  gameInited,
  language,
  scsClb,
  adType,
  index,
  onLoadingUpdate,
  disabled,
  adId,
  maxPerHourArg,
  maxPerDayArg,
  minPouseMsArg,
}: {
  language: ELanguages;
  gameInited: boolean;
  scsClb?: (id?: string) => void;
  adType?: EAdTypes;
  index?: number;
  onLoadingUpdate: (loading: boolean) => void;
  disabled: boolean;
  adId?: string;
  maxPerHourArg?: number;
  maxPerDayArg?: number;
  minPouseMsArg?: number;
}) => {
  const { onShowAd, showTooltip, tooltipText, maxPerDay, viewsInDay, loading } =
    useVideoAd({
      scsClb,
      adType,
      index,
      adId,
      maxPerHourArg,
      maxPerDayArg,
      minPouseMsArg,
    });

  useEffect(() => {
    onLoadingUpdate(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.loyalitySupportProjectTaskItem}
      >
        <div className={styles.loyalitySupportProjectTaskItem__inner}>
          <div className={styles.loyalitySupportProjectTaskItem__main}>
            <div className={styles.loyalitySupportProjectTaskItem__texts}>
              <p className={styles.loyalitySupportProjectTaskItem__name}>
                {watchAdAndGetCpText[language]}
              </p>
              <p className={styles.loyalitySupportProjectTaskItem__description}>
                {viewsInDay}/{maxPerDayArg || maxPerDay} {perDayText[language]}
              </p>
            </div>
            <div className={styles.loyalitySupportProjectTaskItem__actions}>
              <button
                onClick={onShowAd}
                disabled={loading || disabled}
                className={styles.loyalitySupportProjectTaskItem__getBtn}
              >
                <div
                  className={styles.loyalitySupportProjectTaskItem__getBtnInner}
                >
                  {watchAdText[language]}
                </div>
              </button>
            </div>
          </div>
        </div>
      </TransitionProvider>
      <Tooltip show={showTooltip} text={tooltipText} />
    </>
  );
};

export default LoyalitySupportProjectVideoTaskItem;
