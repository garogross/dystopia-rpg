import React, { useEffect, useRef } from "react";
import { claimAdReward } from "../../../../store/slices/tasksSlice";
import { initTraffyTasks } from "../../../../utils/initTraffyTasks";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { getLSItem, setLSItem } from "../../../../helpers/localStorage";

import styles from "./LoyalitySupportProjectTraffyContainer.module.scss";
import { ELSProps } from "../../../../constants/ELSProps";
import { EAdActionTypes } from "../../../../constants/EadActionTypes";
import { EadProviders } from "../../../../constants/EadProviders";

const { taskNotCompletedText } = TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectTraffyContainer = () => {
  const dispatch = useAppDispatch();
  const adRewardSettings = useAppSelector(
    (state) => state.tasks.adRewardSettings
  );

  const traffyTasks = useRef<HTMLDivElement | null>(null);
  const { show: showTooltip, openTooltip } = useTooltip();
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [hidden, setHidden] = React.useState(true);

  useEffect(() => {
    // Check if we should hide the container
    (async () => {
      try {
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
      } catch (error) {}
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hidden && gameInited) {
      initTraffyTasks(
        traffyTasks.current,
        (signedToken, _id) => {
          dispatch(
            claimAdReward({
              ad_type: EAdActionTypes.Subscription,
              provider: EadProviders.Traffy,
              identifier: signedToken,
            })
          );
          // hide tasks for 1 hour
          const hideUntil = Date.now() + 60 * 60 * 1000;
          setLSItem(ELSProps.hideTraffyContainerUntil, hideUntil);
          setHidden(true);
          setTimeout(() => setHidden(false), 60 * 60 * 1000);
        },
        openTooltip,
        adRewardSettings?.traffy?.boost.amount || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, gameInited]);

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
