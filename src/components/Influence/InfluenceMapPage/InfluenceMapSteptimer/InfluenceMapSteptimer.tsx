import React, { useEffect } from "react";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import styles from "./InfluenceMapSteptimer.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { setFreshDateUpdating } from "../../../../store/slices/uiSlice";

const { nextStepInText } = TRANSLATIONS.influence.map;

const InfluenceMapSteptimer = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const nextAttackTs = useAppSelector(
    (state) => state.influence.map.nextAttackTs
  );
  const freshDate = useAppSelector((state) => state.ui.freshDate);
  const isAvailable = freshDate > nextAttackTs;
  const availableInSecs = Math.ceil((nextAttackTs - freshDate) / 1000);

  useEffect(() => {
    if (!isAvailable) {
      dispatch(setFreshDateUpdating(true));
    } else {
      dispatch(setFreshDateUpdating(false));
    }

    return () => {
      dispatch(setFreshDateUpdating(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAvailable]);

  return (
    <TransitionProvider
      className={styles.influenceMapSteptimer}
      style={TransitionStyleTypes.opacity}
      inProp={!isAvailable}
    >
      <div className={styles.influenceMapSteptimer__inner}>
        {nextStepInText[language].replace(
          "SECONDS",
          availableInSecs.toString()
        )}
      </div>
    </TransitionProvider>
  );
};

export default InfluenceMapSteptimer;
