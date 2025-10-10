import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";

const { watchAdText } = TRANSLATIONS.common;

interface ViewProps {
  gameInited: boolean;
  language: ELanguages;
  onShow: () => void;
  loading: boolean;
  disabled: boolean;
  showTooltip: boolean;
  tooltipText: string;
  // Text content
  titleText: string;
  amount?: number;
  descriptionText?: string; // e.g., "3/10 per day"
}

const LoyalitySupportProjectVideoTaskItemView = ({
  gameInited,
  language,
  onShow,
  loading,
  disabled,
  showTooltip,
  tooltipText,
  titleText,
  descriptionText,
  amount,
}: ViewProps) => {
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
                {titleText}
              </p>
              {descriptionText && (
                <p
                  className={styles.loyalitySupportProjectTaskItem__description}
                >
                  {descriptionText}
                </p>
              )}
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

export default LoyalitySupportProjectVideoTaskItemView;
