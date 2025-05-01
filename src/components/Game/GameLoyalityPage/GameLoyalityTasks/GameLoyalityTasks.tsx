import React from "react";
import styles from "./GameLoyalityTasks.module.scss";
import GameLoyalityCollectReward from "../GameLoyalityCollectReward/GameLoyalityCollectReward";
import {
  lpImage,
  lpImageWebp,
  task1Image,
  task1ImageWebp,
  task2Image,
  task2ImageWebp,
  task3Image,
  task3ImageWebp,
} from "../../../../assets/images";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";

const tasks = [
  {
    image: task1Image,
    imageWebp: task1ImageWebp,
    description: "Проведите PvP боев: 1",
    progress: [1, 1],
    income: 1,
  },
  {
    image: task2Image,
    imageWebp: task2ImageWebp,
    description: "Проведите PvE боев: 5",
    progress: [1, 5],
    income: 3,
  },
  {
    image: task3Image,
    imageWebp: task3ImageWebp,
    description: "Проведите победных клановых захватов территории: 1",
    progress: [0, 1],
    income: 3,
  },
];

const GameLoyalityTasks = () => {
  return (
    <div className={styles.gameLoyalityTasks}>
      <div className={styles.gameLoyalityTasks__list}>
        {tasks.map((task, index) => {
          const progressInPercent = (task.progress[0] / task.progress[1]) * 100;
          return (
            <div
              className={`${styles.gameLoyalityTasks__listItem} ${
                progressInPercent === 100
                  ? styles.gameLoyalityTasks__listItem_completed
                  : ""
              }`}
              key={index}
            >
              <div className={styles.gameLoyalityTasks__listItemInner}>
                <ImageWebp
                  srcSet={task.imageWebp}
                  src={task.image}
                  alt={task.description}
                  className={styles.gameLoyalityTasks__itemImg}
                />
                <div className={styles.gameLoyalityTasks__itemMain}>
                  <p
                    className={
                      styles.gameLoyalityTasks__listItemDescriptionText
                    }
                  >
                    {task.description}
                  </p>
                  <div className={styles.gameLoyalityTasks__progressBar}>
                    <div className={styles.gameLoyalityTasks__progressBarMain}>
                      <div
                        style={{
                          width: `${progressInPercent}%`,
                        }}
                        className={styles.gameLoyalityTasks__progressBarInner}
                      ></div>
                    </div>
                    <span className={styles.gameLoyalityTasks__progressBarText}>
                      {task.progress[0]}/{task.progress[1]}
                    </span>
                  </div>
                </div>
                <div className={styles.gameLoyalityTasks__listItemIncome}>
                  <ImageWebp
                    src={lpImage}
                    srcSet={lpImageWebp}
                    alt=""
                    className={styles.gameLoyalityTasks__listItemIncomeImg}
                  />
                  <span
                    className={styles.gameLoyalityTasks__listItemIncomeText}
                  >
                    {task.income}LP
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <GameLoyalityCollectReward />
      <p className={styles.gameLoyalityTasks__availableIn}>
        Все доступные задания будут обновляться через: <br /> 22ч 25м
      </p>
    </div>
  );
};

export default GameLoyalityTasks;
