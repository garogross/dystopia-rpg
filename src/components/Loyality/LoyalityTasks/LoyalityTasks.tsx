import React from "react";
import styles from "./LoyalityTasks.module.scss";
import LoyalityCollectReward from "../LoyalityCollectReward/LoyalityCollectReward";
import {
  lpImage,
  lpImageWebp,
  task1Image,
  task1ImageWebp,
  task2Image,
  task2ImageWebp,
  task3Image,
  task3ImageWebp,
} from "../../../assets/imageMaps";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

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

const LoyalityTasks = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.loyalityTasks}>
      <div className={styles.loyalityTasks__list}>
        {tasks.map((task, index) => {
          const progressInPercent = (task.progress[0] / task.progress[1]) * 100;
          return (
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              className={`${styles.loyalityTasks__listItem} ${
                progressInPercent === 100
                  ? styles.loyalityTasks__listItem_completed
                  : ""
              }`}
              key={index}
            >
              <div className={styles.loyalityTasks__listItemInner}>
                <ImageWebp
                  srcSet={task.imageWebp}
                  src={task.image}
                  alt={task.description}
                  className={styles.loyalityTasks__itemImg}
                />
                <div className={styles.loyalityTasks__itemMain}>
                  <p
                    className={
                      styles.loyalityTasks__listItemDescriptionText
                    }
                  >
                    {task.description}
                  </p>
                  <div className={styles.loyalityTasks__progressBar}>
                    <div
                      className={styles.loyalityTasks__progressBarMain}
                    >
                      <div
                        style={{
                          width: `${progressInPercent}%`,
                        }}
                        className={
                          styles.loyalityTasks__progressBarInner
                        }
                      ></div>
                    </div>
                    <span
                      className={styles.loyalityTasks__progressBarText}
                    >
                      {task.progress[0]}/{task.progress[1]}
                    </span>
                  </div>
                </div>
                <div className={styles.loyalityTasks__listItemIncome}>
                  <ImageWebp
                    src={lpImage}
                    srcSet={lpImageWebp}
                    alt=""
                    className={styles.loyalityTasks__listItemIncomeImg}
                  />
                  <span
                    className={styles.loyalityTasks__listItemIncomeText}
                  >
                    {task.income}LP
                  </span>
                </div>
              </div>
            </TransitionProvider>
          );
        })}
      </div>
      <LoyalityCollectReward />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.loyalityTasks__availableIn}
      >
        Все доступные задания будут обновляться через: <br /> 22ч 25м
      </TransitionProvider>
    </div>
  );
};

export default LoyalityTasks;
