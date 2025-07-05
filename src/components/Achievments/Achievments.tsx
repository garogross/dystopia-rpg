import React from "react";
import TitleH3 from "../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../hooks/redux";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { AchievmentsFrame } from "../layout/icons/Achievments";

import styles from "./Achievments.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";
import { AchievmentsType } from "../../types/Achievments/AchievmentsType";
import { AchievmentDetailsType } from "../../types/Achievments/AchievmentDetailsType";
import { AchievmentSettingsType } from "../../types/Achievments/AchievmentSettingsType";

const { titleText } = TRANSLATIONS.achievments;

const levelColors = ["#7F5CFF", "#48A7FF", "#00FF88", "#EEFF00", "#E20000"];
const { progressText } = TRANSLATIONS.achievments;

interface Props<T extends string> {
  achievments: AchievmentsType<T> | null;
  details: AchievmentDetailsType<T>;
  settings: AchievmentSettingsType<T> | null;
}

const Achievments = <T extends string>({
  achievments,
  settings,
  details,
}: Props<T>) => {
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.achievments}>
      <TitleH3>{titleText[language]}</TitleH3>
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
              settings &&
              Object.entries(details).map(([k, levelsInfo], index) => {
                const key = k as keyof AchievmentsType<T>;

                const achievmentCurState = achievments[key];
                const level = achievmentCurState?.level || 0;
                const count = achievmentCurState?.count || 0;
                const curSettings = settings[key];

                const limit = curSettings.levels[level];
                const curAchievmentDetails = details[key][level];
                return (
                  <div
                    key={index}
                    className={styles.achievments__listItem}
                    style={{ borderColor: levelColors[level] }}
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
                        style={{ color: levelColors[level] }}
                        className={styles.achievments__processText}
                      >
                        {progressText[language]}: {count}/{limit}
                      </p>
                    </div>
                  </div>
                );
              })}
          </TransitionProvider>
        </div>
      </div>
    </div>
  );
};

export default Achievments;
