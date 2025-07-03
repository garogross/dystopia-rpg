import React, { useState } from "react";

import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { MINI_GAMES } from "../../../../constants/miniGames/miniGames";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { useAppSelector } from "../../../../hooks/redux";
import { DetailsIcon } from "../../../layout/icons/MiniGames/Achievments";
import { ArrowIcon, DotsLine } from "../../../layout/icons/RPGGame/Common";
import { HACK_TERMINAL_ACHIEVMENTS } from "../../../../constants/hackTerminal/hackTerminalAchievments";
import { EHackTerminalAchievments } from "../../../../constants/hackTerminal/EHackTerminalAchievments";
import styles from "./MiniGamesAchievments.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { EMiniGames } from "../../../../constants/miniGames/EMiniGames";
import { PUZZLE_ACHIEVMENTS } from "../../../../constants/puzzle/puzzleAchievments";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";

const { titleText, detailsText } = TRANSLATIONS.miniGames.achievments;

const TOTALS_LEVELS = 5;
const MiniGamesAchievments = () => {
  const hackterminalAchievments = useAppSelector(
    (state) => state.hackterminal.achievments.achievments
  );
  const puzzleAchievments = useAppSelector(
    (state) => state.puzzle.achievments.achievments
  );
  const language = useAppSelector((state) => state.ui.language);
  const [detailsOpenedIndex, setDetailsOpenedIndex] = useState(-1);

  const achievmentsList = {
    [EMiniGames.PUZZLE]: {
      details: PUZZLE_ACHIEVMENTS,
      achievments: puzzleAchievments,
    },
    [EMiniGames.HACK_TERMINAL]: {
      details: HACK_TERMINAL_ACHIEVMENTS,
      achievments: hackterminalAchievments,
    },
  };

  return (
    <div className={`container ${styles.miniGamesAchievments}`}>
      <TitleH3 wingsReverse={false}>{titleText[language]}</TitleH3>
      <div className={styles.miniGamesAchievments__list}>
        {MINI_GAMES.map(({ name, description, image, key }, index) => {
          const { achievments, details } = achievmentsList[key];

          const totalCompletedLevels = achievments
            ? Object.values(achievments).reduce(
                (acc, cur) => acc + cur.level,
                0
              )
            : 0;
          const totalLevels = achievments
            ? Object.values(achievments).length * TOTALS_LEVELS
            : 0;
          const percent = Object.values(achievments || {}).length
            ? (totalCompletedLevels / totalLevels) * 100
            : 0;

          const completed = percent >= 100;

          return (
            <div key={index} className={styles.miniGamesAchievments__listItem}>
              <div
                key={index}
                className={styles.miniGamesAchievments__listItemWrapper}
              >
                <div className={styles.miniGamesAchievments__listItemInner}>
                  <ImageWebp
                    src={image.src}
                    srcSet={image.srcSet}
                    alt={name[language]}
                    className={styles.miniGamesAchievments__listItemImg}
                  />
                  <div className={styles.miniGamesAchievments__listItemMain}>
                    <div
                      className={styles.miniGamesAchievments__listItemHeader}
                    >
                      <h4
                        className={
                          styles.miniGamesAchievments__listItemNameText
                        }
                      >
                        {name[language]}
                      </h4>
                    </div>
                    <p className={styles.miniGamesAchievments__descriptionText}>
                      {description[language]}
                    </p>
                    <div className={styles.miniGamesAchievments__progressBar}>
                      <div
                        className={
                          styles.miniGamesAchievments__progressBarInner
                        }
                        style={{
                          background: completed
                            ? "#7F5CFF"
                            : `linear-gradient(90deg, #7F5CFF ${
                                percent - 1
                              }%, #090419 ${percent + 1}%)`,
                        }}
                      >
                        <span
                          style={{
                            left: `${percent}%`,
                          }}
                          className={
                            styles.miniGamesAchievments__progressBarText
                          }
                        >
                          {percent}%
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setDetailsOpenedIndex((prev) =>
                          prev === index ? -1 : index
                        )
                      }
                      className={`${styles.miniGamesAchievments__detailsBtn} ${
                        detailsOpenedIndex === index
                          ? styles.miniGamesAchievments__detailsBtn_active
                          : ""
                      }`}
                    >
                      <DetailsIcon />
                      <span
                        className={styles.miniGamesAchievments__detailsText}
                      >
                        {detailsText[language]}
                      </span>
                      <div className={styles.miniGamesAchievments__dotLines}>
                        <DotsLine preserveAspectRatio />
                      </div>
                      <ArrowIcon rotate={detailsOpenedIndex === index} />
                    </button>
                  </div>
                </div>
                {achievments && (
                  <TransitionProvider
                    inProp={detailsOpenedIndex === index}
                    style={TransitionStyleTypes.height}
                    height={500}
                    className={styles.miniGamesAchievments__rewardList}
                  >
                    <div
                      className={styles.miniGamesAchievments__rewardListWrapper}
                    >
                      {Object.entries(details).map(([k, value]) => {
                        const key = k as EHackTerminalAchievments;
                        const curLevelAchievment = achievments[key];
                        const level = curLevelAchievment?.level || 0;
                        const curLevelAchievmentDetails = value[level];

                        return (
                          <div
                            className={
                              styles.miniGamesAchievments__rewardListItem
                            }
                          >
                            <span
                              className={
                                styles.miniGamesAchievments__rewardListNameText
                              }
                            >
                              <strong>
                                {curLevelAchievmentDetails.title[language]}
                              </strong>{" "}
                              -{" "}
                              {curLevelAchievmentDetails.description[language]}
                            </span>
                            <div
                              className={
                                styles.miniGamesAchievments__rewardListLevelIndicators
                              }
                            >
                              {Array.from({ length: TOTALS_LEVELS }).map(
                                (_, index) => (
                                  <div
                                    className={`${
                                      styles.miniGamesAchievments__rewardListLevelIndicatorItem
                                    } ${
                                      index < level
                                        ? styles.miniGamesAchievments__rewardListLevelIndicatorItem_completed
                                        : ""
                                    }`}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TransitionProvider>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniGamesAchievments;
