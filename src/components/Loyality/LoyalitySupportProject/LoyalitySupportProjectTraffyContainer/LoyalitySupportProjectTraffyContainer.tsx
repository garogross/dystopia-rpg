import React, { useEffect, useRef } from "react";
import { claimTraffyReward } from "../../../../store/slices/tasksSlice";
import { initTraffyTasks } from "../../../../utils/initTraffyTasks";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { getLSItem, setLSItem } from "../../../../helpers/localStorage";

import styles from "./LoyalitySupportProjectTraffyContainer.module.scss";
import { ELSProps } from "../../../../constants/ELSProps";

const { taskNotCompletedText } = TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectTraffyContainer = () => {
  const dispatch = useAppDispatch();
  const traffyTasks = useRef<HTMLDivElement | null>(null);
  const { show: showTooltip, openTooltip } = useTooltip();
  const language = useAppSelector((state) => state.ui.language);
  const [hidden, setHidden] = React.useState(true);

  useEffect(() => {
    // Check if we should hide the container
    (async () => {
      const hideUntil = await getLSItem(ELSProps.hideTraffyContainerUntil);
      if (hideUntil && Number(hideUntil) > Date.now()) {
        setHidden(true);
        // Set a timeout to show again after the period ends
        const timeout = setTimeout(
          () => setHidden(false),
          Number(hideUntil) - Date.now()
        );
        return () => clearTimeout(timeout);
      } else {
        setHidden(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hidden) {
      initTraffyTasks(
        traffyTasks.current,
        (signedToken, id) => {
          dispatch(claimTraffyReward({ signedToken, id }));
          // hide tasks for 1 hour
          const hideUntil = Date.now() + 60 * 60 * 1000;
          setLSItem(ELSProps.hideTraffyContainerUntil, hideUntil);
          setHidden(true);
          setTimeout(() => setHidden(false), 60 * 60 * 1000);
        },
        openTooltip
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  return (
    <>
      {!hidden && (
        <div
          className={styles.loyalitySupportProjectTraffyContainer}
          ref={traffyTasks}
        ></div>
      )}
      <Tooltip show={showTooltip} text={taskNotCompletedText[language]} />
    </>
  );
};

export default LoyalitySupportProjectTraffyContainer;
