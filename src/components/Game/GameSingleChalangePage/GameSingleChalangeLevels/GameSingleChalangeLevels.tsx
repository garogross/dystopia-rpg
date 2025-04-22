import React, { useState } from "react";

import styles from "./GameSingleChalangeLevels.module.scss";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import GameSingleChalangeCubeIcon from "../../../layout/icons/game/GameSingleChalangePage/GameSingleChalangeCubeIcon";
import GameSingleChalangeLevelsBottomBg from "../../../layout/icons/game/GameSingleChalangePage/GameSingleChalangeLevelsBottomBg";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
const levels = [
  {
    id: 1,
    isCompleted: true,
    isAvailable: true,
  },
  {
    id: 2,
    isCompleted: true,
    isAvailable: true,
  },
  {
    id: 3,
    isCompleted: true,
    isAvailable: true,
  },
  {
    id: 4,
    isCompleted: true,
    isAvailable: true,
  },
  {
    id: 5,
    isCompleted: false,
    isAvailable: true,
  },
  {
    id: 6,
    isCompleted: false,
    isAvailable: false,
  },
  {
    id: 7,
    isCompleted: false,
    isAvailable: false,
  },
  {
    id: 8,
    isCompleted: false,
    isAvailable: false,
  },
  {
    id: 9,
    isCompleted: false,
    isAvailable: false,
  },
  {
    id: 10,
    isCompleted: false,
    isAvailable: false,
  },
];

const GameSingleChalangeLevels = () => {
  const [firstLevelIndex, setFirstLevelIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const onSlide = (direction: "left" | "right") => {
    setIsUpdating(true);

    setTimeout(() => {
      if (direction === "left") {
        setFirstLevelIndex(firstLevelIndex - 1);
      } else {
        setFirstLevelIndex(firstLevelIndex + 1);
      }
    }, 200);
    setTimeout(() => {
      setIsUpdating(false);
    }, 400);
  };

  return (
    <TransitionProvider
      style={TransitionStyleTypes.bottom}
      inProp={gameInited}
      delay={400}
      className={styles.gameSingleChalangeLevels}
    >
      <div className={styles.gameSingleChalangeLevels__dotsLine}>
        <DotsLine />
      </div>
      <div className={styles.gameSingleChalangeLevels__main}>
        <button
          disabled={firstLevelIndex === 0}
          onClick={() => onSlide("left")}
          className={`${styles.gameSingleChalangeLevels__slideBtn} ${styles.gameSingleChalangeLevels__slideBtn_left}`}
        >
          <div className={styles.gameSingleChalangeLevels__slideBtnInner}>
            {/* <GameSingleChalangeSlideIcon /> */}
          </div>
        </button>
        <div className={styles.gameSingleChalangeLevels__list}>
          {Array.from({ length: 6 }).map((_, index) => (
            <button
              className={`${styles.gameSingleChalangeLevels__item} ${
                levels[firstLevelIndex + index].isCompleted
                  ? styles.gameSingleChalangeLevels__item_completed
                  : ""
              } ${
                levels[firstLevelIndex + index].isAvailable
                  ? styles.gameSingleChalangeLevels__item_available
                  : ""
              } ${
                isUpdating ? styles.gameSingleChalangeLevels__item_updating : ""
              }`}
              disabled={!levels[firstLevelIndex + index].isAvailable}
              key={index}
            >
              <div className={styles.gameSingleChalangeLevels__itemMain}>
                {levels[firstLevelIndex + index].id}
              </div>
            </button>
          ))}
          <div className={styles.gameSingleChalangeLevels__centerCube}>
            <GameSingleChalangeCubeIcon />
          </div>
        </div>
        <button
          onClick={() => onSlide("right")}
          disabled={firstLevelIndex === levels.length - 6}
          className={`${styles.gameSingleChalangeLevels__slideBtn} ${styles.gameSingleChalangeLevels__slideBtn_right}`}
        >
          <div className={styles.gameSingleChalangeLevels__slideBtnInner}></div>{" "}
        </button>
      </div>
      <div className={styles.gameSingleChalangeLevels__bottomBlock}>
        <GameSingleChalangeLevelsBottomBg />
      </div>
    </TransitionProvider>
  );
};

export default GameSingleChalangeLevels;
