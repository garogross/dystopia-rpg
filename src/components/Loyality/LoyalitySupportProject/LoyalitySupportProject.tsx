import React, { useEffect, useRef } from "react";

import {
  lpImage,
  supportTask1Image,
  supportTask2Image,
  supportTask3Image,
  supportTask4Image,
  supportTask5Image,
} from "../../../assets/imageMaps";
import styles from "./LoyalitySupportProject.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { ELanguages } from "../../../constants/ELanguages";

const {
  availableInText,
  subscribeText,
  subscribedText,
  visitText,
  getText,
  task1NameText,
  task1DescriptionText,
  task2NameText,
  task2DescriptionText,
  task3NameText,
  task3DescriptionText,
  task4NameText,
  task4DescriptionText,
  task5NameText,
  task5DescriptionText,
} = TRANSLATIONS.loyality.supportProject;

type TraffyTask = {
  id: string;
  title: string;
  image_url: string | null;
  link: string;
};

const tasks = (language: ELanguages) => [
  {
    id: "1",
    name: task1NameText[language],
    description: task1DescriptionText[language],
    image: supportTask1Image,
    price: 5,
    subscription: true,
  },
  {
    id: "2",
    name: task2NameText[language],
    description: task2DescriptionText[language],
    image: supportTask2Image,
    price: 7,
    subscription: false,
  },
  {
    id: "3",
    name: task3NameText[language],
    description: task3DescriptionText[language],
    image: supportTask3Image,
    price: 10,
    subscription: false,
  },
  {
    id: "4",
    name: task4NameText[language],
    description: task4DescriptionText[language],
    image: supportTask4Image,
    price: 3,
    subscription: false,
    byLink: true,
  },
  {
    id: "5",
    name: task5NameText[language],
    description: task5DescriptionText[language],
    image: supportTask5Image,
    price: 3,
    subscription: false,
  },
];

const LoyalitySupportProject = () => {
  const traffyTasks = useRef(null);

  useEffect(() => {
    const traffyTasksVal = traffyTasks.current;
    console.log("traffyTasksVal, window.Traffy",traffyTasksVal, window.Traffy);

    if (traffyTasksVal && window.Traffy) {
      function onTaskLoad(tasks: TraffyTask[]) {console.log("traffy tasks",tasks)}
      function onTaskRender(
        changeReward: (str: string) => void,
        changeCardTitle: (str: string) => void,
        changeDescription: (str: string) => void,
        changeButtonCheckText: (str: string) => void
      ) {
        changeReward("200K");
        changeCardTitle("Subscribe on: ");
        changeButtonCheckText("Check");
      }
      function onTaskReward(task: TraffyTask, signedToken: string) {}
      function onTaskReject(task: TraffyTask) {}
      window.Traffy.renderTasks(traffyTasksVal, {
        max_tasks: 3,
        onTaskLoad,
        onTaskRender,
        onTaskReward,
        onTaskReject,
      });
    }
  }, []);

  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.loyalitySupportProject}>
      <div
        className={styles.loyalitySupportProject__traffyContainer}
        ref={traffyTasks}
      ></div>
      <div className={styles.loyalitySupportProject__list}>
        {tasks(language).map((task, index) => (
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            delay={index * 100}
            className={`${styles.loyalitySupportProject__listItem} ${
              task.subscription
                ? styles.loyalitySupportProject__listItem_completed
                : ""
            }`}
            key={task.id}
          >
            <div className={styles.loyalitySupportProject__listItemInner}>
              <div className={styles.loyalitySupportProject__listItemMain}>
                <img
                  src={task.image}
                  alt={task.name}
                  className={styles.loyalitySupportProject__listItemImg}
                />
                <div className={styles.loyalitySupportProject__listItemTexts}>
                  <p className={styles.loyalitySupportProject__listItemName}>
                    {task.name}
                  </p>
                  <p
                    className={
                      styles.loyalitySupportProject__listItemDescription
                    }
                  >
                    {task.description}
                  </p>
                </div>
                <div className={styles.loyalitySupportProject__listItemActions}>
                  <button
                    disabled={task.subscription}
                    className={styles.loyalitySupportProject__subscribeBtn}
                  >
                    {task.subscription
                      ? subscribedText[language]
                      : task.byLink
                      ? visitText[language]
                      : subscribeText[language]}
                  </button>
                  <button
                    disabled={!task.subscription}
                    className={styles.loyalitySupportProject__getBtn}
                  >
                    <div className={styles.loyalitySupportProject__getBtnInner}>
                      <span>
                        {getText[language]} {task.price}LP
                      </span>
                      <img
                        src={lpImage}
                        alt="LP"
                        className={styles.loyalitySupportProject__getBtnImg}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </TransitionProvider>
        ))}
      </div>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.loyalitySupportProject__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.loyalitySupportProject__availableInText}
      >
        {availableInText[language]}
      </TransitionProvider>
    </div>
  );
};

export default LoyalitySupportProject;
