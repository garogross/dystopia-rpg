import React from "react";
import styles from "./RPGGameLoyalityTasks.module.scss";
import RPGGameLoyalityCollectReward from "../RPGGameLoyalityCollectReward/RPGGameLoyalityCollectReward";
import {
  lpImage,
  lpImageWebp,
  task1Image,
  task1ImageWebp,
  task2Image,
  task2ImageWebp,
  task3Image,
  task3ImageWebp,
} from "../../../../assets/imageMaps";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

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

const RPGGameLoyalityTasks = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.rpgGameLoyalityTasks}>
      <div className={styles.rpgGameLoyalityTasks__list}>
        {tasks.map((task, index) => {
          const progressInPercent = (task.progress[0] / task.progress[1]) * 100;
          return (
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              className={`${styles.rpgGameLoyalityTasks__listItem} ${
                progressInPercent === 100
                  ? styles.rpgGameLoyalityTasks__listItem_completed
                  : ""
              }`}
              key={index}
            >
              <div className={styles.rpgGameLoyalityTasks__listItemInner}>
                <ImageWebp
                  srcSet={task.imageWebp}
                  src={task.image}
                  alt={task.description}
                  className={styles.rpgGameLoyalityTasks__itemImg}
                />
                <div className={styles.rpgGameLoyalityTasks__itemMain}>
                  <p
                    className={
                      styles.rpgGameLoyalityTasks__listItemDescriptionText
                    }
                  >
                    {task.description}
                  </p>
                  <div className={styles.rpgGameLoyalityTasks__progressBar}>
                    <div className={styles.rpgGameLoyalityTasks__progressBarMain}>
                      <div
                        style={{
                          width: `${progressInPercent}%`,
                        }}
                        className={styles.rpgGameLoyalityTasks__progressBarInner}
                      ></div>
                    </div>
                    <span className={styles.rpgGameLoyalityTasks__progressBarText}>
                      {task.progress[0]}/{task.progress[1]}
                    </span>
                  </div>
                </div>
                <div className={styles.rpgGameLoyalityTasks__listItemIncome}>
                  <ImageWebp
                    src={lpImage}
                    srcSet={lpImageWebp}
                    alt=""
                    className={styles.rpgGameLoyalityTasks__listItemIncomeImg}
                  />
                  <span
                    className={styles.rpgGameLoyalityTasks__listItemIncomeText}
                  >
                    {task.income}LP
                  </span>
                </div>
              </div>
            </TransitionProvider>
          );
        })}
      </div>
      <RPGGameLoyalityCollectReward />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.rpgGameLoyalityTasks__availableIn}
      >
        Все доступные задания будут обновляться через: <br /> 22ч 25м
      </TransitionProvider>
    </div>
  );
};

export default RPGGameLoyalityTasks;
