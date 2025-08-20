import { useEffect } from "react";
import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useVideoAd } from "../../../../hooks/useVideoAd";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";
import { EadProviders } from "../../../../constants/EadProviders";
import { EAdActionTypes } from "../../../../constants/EadActionTypes";

const { watchAdAndGetCpText, watchAdText } = TRANSLATIONS.common;
const { perDayText } = TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectVideoTaskItem = ({
  gameInited,
  language,
  scsClb,
  provider,
  index,
  onLoadingUpdate,
  disabled,
  adId,
  adType,
}: {
  language: ELanguages;
  gameInited: boolean;
  scsClb?: (id?: string) => void;
  provider: EadProviders;
  index?: number;
  onLoadingUpdate: (loading: boolean) => void;
  disabled: boolean;
  adId?: string;
  adType?: EAdActionTypes;
}) => {
  const {
    onShowAd,
    showTooltip,
    tooltipText,
    maxPerDay,
    viewsInDay,
    loading,
    amount,
  } = useVideoAd({
    scsClb,
    provider,
    index,
    adId,
    adType,
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
                {watchAdAndGetCpText[language].replace(
                  "NUMBER",
                  amount.toString()
                )}
              </p>
              <p className={styles.loyalitySupportProjectTaskItem__description}>
                {viewsInDay}/{maxPerDay} {perDayText[language]}
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
