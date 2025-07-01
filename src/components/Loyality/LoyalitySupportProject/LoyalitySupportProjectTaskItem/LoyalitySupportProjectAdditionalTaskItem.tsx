import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";

const { partnerTasksText, openText } = TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectAdditionalTaskItem = ({
  gameInited,
  language,
  onOpen,
  index,
}: {
  gameInited: boolean;
  language: ELanguages;
  onOpen: () => void;
  index: number;
}) => (
  <TransitionProvider
    inProp={gameInited}
    style={TransitionStyleTypes.bottom}
    className={styles.loyalitySupportProjectTaskItem}
  >
    <div className={styles.loyalitySupportProjectTaskItem__inner}>
      <div className={styles.loyalitySupportProjectTaskItem__main}>
        <div className={styles.loyalitySupportProjectTaskItem__texts}>
          <p className={styles.loyalitySupportProjectTaskItem__name}>
            {partnerTasksText[language]} №{index}
          </p>
        </div>
        <div className={styles.loyalitySupportProjectTaskItem__actions}>
          <button
            onClick={onOpen}
            className={styles.loyalitySupportProjectTaskItem__getBtn}
          >
            <div className={styles.loyalitySupportProjectTaskItem__getBtnInner}>
              {openText[language]}
            </div>
          </button>
        </div>
      </div>
    </div>
  </TransitionProvider>
);

export default LoyalitySupportProjectAdditionalTaskItem;
