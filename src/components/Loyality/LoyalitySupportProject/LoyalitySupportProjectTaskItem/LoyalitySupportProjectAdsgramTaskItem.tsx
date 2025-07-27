import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux";
import { ELanguages } from "../../../../constants/ELanguages";
import { getPlatformType } from "../../../../utils/getPlatformType";
import React from "react";
import { getLSItem, setLSItem } from "../../../../helpers/localStorage";
import { ELSProps } from "../../../../constants/ELSProps";
import { claimAdsgramReward } from "../../../../store/slices/tasksSlice";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";

const HIDE_DURATION_MS = 60 * 60 * 1000; // 1 hour

const { openText, claimAdText, doneText, supportProjectText } =
  TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectAdsgramTaskItem = ({
  gameInited,
  language,
}: {
  gameInited: boolean;
  language: ELanguages;
}) => {
  const dispatch = useAppDispatch();
  const taskRef = useRef<HTMLElement>(null);
  const isMobile = getPlatformType();
  const [hidden, setHidden] = useState(true);

  // Check if the task should be hidden on mount
  useEffect(() => {
    (async () => {
      try {
        const hideUntil = await getLSItem(ELSProps.adsgramLastClickDate);
        setHidden(!!hideUntil && Date.now() < Number(hideUntil));
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handler = (event: any) => {
      dispatch(claimAdsgramReward({ taskId: event.detail }));
      // Hide the task for 1 hour
      const hideUntil = Date.now() + HIDE_DURATION_MS;
      setLSItem(ELSProps.adsgramLastClickDate, hideUntil?.toString());
      setHidden(true);
    };
    const task = taskRef.current;

    if (task) {
      task.addEventListener("reward", handler);
    }

    return () => {
      if (task) {
        task.removeEventListener("reward", handler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMobile || hidden) return null;

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.loyalitySupportProjectTaskItem}
    >
      <div className={styles.loyalitySupportProjectTaskItem__adsgramWrapper}>
        <adsgram-task
          data-block-id="task-12038"
          data-debug="false"
          ref={taskRef}
        >
          <div
            className={styles.loyalitySupportProjectTaskItem__texts}
            slot="reward"
          >
            <p className={styles.loyalitySupportProjectTaskItem__name}>
              {supportProjectText[language]}
            </p>
          </div>
          <div slot="button">
            <button
              className={styles.loyalitySupportProjectTaskItem__getBtn}
              type="button"
            >
              <div
                className={styles.loyalitySupportProjectTaskItem__getBtnInner}
              >
                {openText[language]}
              </div>
            </button>
          </div>
          <div slot="claim">
            <button
              className={styles.loyalitySupportProjectTaskItem__getBtn}
              type="button"
            >
              <div
                className={styles.loyalitySupportProjectTaskItem__getBtnInner}
              >
                {claimAdText[language]}
              </div>
            </button>
          </div>
          <div slot="done">
            <button
              className={styles.loyalitySupportProjectTaskItem__getBtn}
              type="button"
            >
              <div
                className={styles.loyalitySupportProjectTaskItem__getBtnInner}
              >
                {doneText[language]}
              </div>
            </button>
          </div>
        </adsgram-task>
      </div>
    </TransitionProvider>
  );
};

export default LoyalitySupportProjectAdsgramTaskItem;
