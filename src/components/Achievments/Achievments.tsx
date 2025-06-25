import React from "react";
import TitleH3 from "../layout/TitleH3/TitleH3";
import { CYBER_FARM_ACHIEVMENTS } from "../../constants/cyberfarm/achievments";
import { useAppSelector } from "../../hooks/redux";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { AchievmentsFrame } from "../layout/icons/Achievments";

import styles from "./Achievments.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";
import { EFarmAchievments } from "../../constants/cyberfarm/EFarmAchievments";

const levelColors = ["#7F5CFF", "#48A7FF", "#00FF88", "#EEFF00", "#E20000"];
const { progressText } = TRANSLATIONS.achievments;

const Achievments = () => {
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const achievments = useAppSelector(
    (state) => state.cyberfarm.achievments.achievments
  );
  const achievmentSettings = useAppSelector(
    (state) => state.cyberfarm.achievments.achievmentSettings
  );
  return (
    <div className={styles.achievments}>
      <TitleH3>Достижения</TitleH3>
      <div className={styles.achievments__wrapper}>
        <div className={styles.achievments__main}>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.opacity}
            className={styles.achievments__frame}
          >
            <AchievmentsFrame />
          </TransitionProvider>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            className={styles.achievments__list}
          >
            {achievments &&
              achievmentSettings &&
              Object.entries(CYBER_FARM_ACHIEVMENTS).map(
                ([k, levelsInfo], index) => {
                  const key = k as EFarmAchievments;

                  const achievmentCurState = achievments[key];
                  const level = achievmentCurState?.level || 1;
                  const count = achievmentCurState?.count || 0;
                  const curSettings = achievmentSettings[key];

                  const limit = curSettings.levels[level - 1];
                  const curAchievmentDetails =
                    CYBER_FARM_ACHIEVMENTS[key][level - 1];
                  return (
                    <div
                      key={index}
                      className={styles.achievments__listItem}
                      style={{ borderColor: levelColors[level - 1] }}
                    >
                      {curAchievmentDetails.icon}
                      <div className={styles.achievments__listItemMain}>
                        <h6 className={styles.achievments__listItemtitle}>
                          {curAchievmentDetails.title[language]}
                        </h6>
                        <p className={styles.achievments__listItemDescription}>
                          {curAchievmentDetails.description[language].replace(
                            "NUMBER",
                            limit.toString()
                          )}
                        </p>
                        <p
                          style={{ color: levelColors[level - 1] }}
                          className={styles.achievments__processText}
                        >
                          {progressText[language]}: {count}/{limit}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
          </TransitionProvider>
        </div>
      </div>
    </div>
  );
};

export default Achievments;
