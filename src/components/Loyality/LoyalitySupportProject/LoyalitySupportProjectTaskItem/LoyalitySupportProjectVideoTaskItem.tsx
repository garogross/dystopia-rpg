import { useEffect } from "react";
import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";
import { useSoltAd } from "../../../../hooks/useSlotAd";
import { EAdSlots } from "../../../../constants/EAdSlots";

const { watchAdAndGetCpText, watchAdText } = TRANSLATIONS.common;

const LoyalitySupportProjectVideoTaskItem = ({
  gameInited,
  language,
  onLoadingUpdate,
  disabled,
}: {
  language: ELanguages;
  gameInited: boolean;
  onLoadingUpdate: (loading: boolean) => void;
  disabled: boolean;
}) => {
  const { onShow, showTooltip, tooltipText, loading } = useSoltAd(
    EAdSlots.SupportProjectSlot
  );

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
            </div>
            <div className={styles.loyalitySupportProjectTaskItem__actions}>
              <button
                onClick={onShow}
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
