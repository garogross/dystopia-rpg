import React from "react";
import TitleH3 from "../layout/TitleH3/TitleH3";
import { CYBER_FARM_ACHIEVMENTS } from "../../constants/cyberfarm/achievments";
import { useAppSelector } from "../../hooks/redux";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { AchievmentsFrame } from "../layout/icons/Achievments";

import styles from "./Achievments.module.scss";

const levelColors = ["#7F5CFF", "#48A7FF", "#00FF88", "#EEFF00", "#E20000"];
const { progressText } = TRANSLATIONS.achievments;
const dummyAchievments = [
  { level: 1, progress: [0, 14] },
  { level: 2, progress: [0, 30] },
  { level: 3, progress: [0, 28] },
  { level: 4, progress: [0, 22] },
];

const Achievments = () => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <div className={styles.achievments}>
      <TitleH3>Достижения</TitleH3>
      <div className={styles.achievments__wrapper}>
        <div className={styles.achievments__main}>
          <div className={styles.achievments__frame}>
            <AchievmentsFrame />
          </div>
          <div className={styles.achievments__list}>
            {dummyAchievments.map(({ level, progress }, index) => {
              const curAchievmentDetails =
                CYBER_FARM_ACHIEVMENTS[index][level - 1];
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
                      {curAchievmentDetails.description[language]}
                    </p>
                    <p
                      style={{ color: levelColors[level - 1] }}
                      className={styles.achievments__processText}
                    >
                      {progressText[language]}: {progress.join("/")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievments;
