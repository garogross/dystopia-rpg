import React from "react";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

import styles from "./InfluenceMapSteptimer.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useFreshDateStateUpdate } from "../../../../hooks/useFreshDateStateUpdate";

const { nextStepInText } = TRANSLATIONS.influence.map;

const InfluenceMapSteptimer = () => {
  const language = useAppSelector((state) => state.ui.language);
  const nextAttackTs = useAppSelector(
    (state) => state.influence.map.nextAttackTs
  );
  const freshDate = useAppSelector((state) => state.ui.freshDate);
  const availableInSecs = Math.floor((nextAttackTs - Date.now()) / 1000);
  const isAvailable = availableInSecs <= 0;

  useFreshDateStateUpdate(!isAvailable);
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
