import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useVideoAd } from "../../../../hooks/useVideoAd";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";

const { watchAdAndGetCpText, watchAdText } = TRANSLATIONS.common;

const LoyalitySupportProjectVideoTaskItem = ({
  gameInited,
  language,
}: {
  language: ELanguages;
  gameInited: boolean;
}) => {
  const { onShowAd, showTooltip, tooltipText } = useVideoAd();

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
                onClick={onShowAd}
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
