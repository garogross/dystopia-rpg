import React, { useEffect, useRef } from "react";

import {
  cpImage,
  // supportTask1Image,
  // supportTask2Image,
  // supportTask3Image,
  // supportTask4Image,
  // supportTask5Image,
} from "../../../assets/imageMaps";
import styles from "./LoyalitySupportProject.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { ELanguages } from "../../../constants/ELanguages";
import { BquestCallbackDataType } from "../../../types/BquestCallbackDataType";
import {
  claimBarzhaReward,
  claimTraffyReward,
  claimWallgramReward,
} from "../../../store/slices/tasksSlice";
import { initTraffyTasks } from "../../../utils/initTraffyTasks";
import { FeedItem } from "taddy-sdk-web";
import { WallgramFinishTaskItemType } from "../../../types/WallgramFinishTaskItemType";
import { useTaddy } from "../../../context/TaddyContext";

const {
  subscribeText,
  subscribedText,
  visitText,
  getText,
  // task1NameText,
  // task1DescriptionText,
  // task2NameText,
  // task2DescriptionText,
  // task3NameText,
  // task3DescriptionText,
  // task4NameText,
  // task4DescriptionText,
  // task5NameText,
  // task5DescriptionText,
  partnerTasksText,
  openText,
} = TRANSLATIONS.loyality.supportProject;

// const tasks = (language: ELanguages) => [
//   {
//     id: "1",
//     name: task1NameText[language],
//     description: task1DescriptionText[language],
//     image: supportTask1Image,
//     price: 5,
//     subscription: true,
//   },
//   {
//     id: "2",
//     name: task2NameText[language],
//     description: task2DescriptionText[language],
//     image: supportTask2Image,
//     price: 7,
//     subscription: false,
//   },
//   {
//     id: "3",
//     name: task3NameText[language],
//     description: task3DescriptionText[language],
//     image: supportTask3Image,
//     price: 10,
//     subscription: false,
//   },
//   {
//     id: "4",
//     name: task4NameText[language],
//     description: task4DescriptionText[language],
//     image: supportTask4Image,
//     price: 3,
//     subscription: false,
//     byLink: true,
//   },
//   {
//     id: "5",
//     name: task5NameText[language],
//     description: task5DescriptionText[language],
//     image: supportTask5Image,
//     price: 3,
//     subscription: false,
//   },
// ];

const TADDY_TASK_PRICE = 1;

interface TaskItemProps {
  task: {
    id: string | number;
    title?: string;
    name?: string;
    description: string;
    image: string;
    price?: number;
    subscription?: boolean;
    byLink?: boolean;
    taddyTasktype?: FeedItem["type"];
    link?: string;
  };
  index: number;
  gameInited: boolean;
  language: ELanguages;
  isTaddyTask?: boolean;
  onSubscribe: (item: FeedItem) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  gameInited,
  language,
  isTaddyTask,
  onSubscribe,
}) => {
  const title = task.title || task.name;
  const price = isTaddyTask ? TADDY_TASK_PRICE : task.price;

  return (
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
            alt={title}
            className={styles.loyalitySupportProject__listItemImg}
          />
          <div className={styles.loyalitySupportProject__listItemTexts}>
            <p className={styles.loyalitySupportProject__listItemName}>
              {title}
            </p>
            <p className={styles.loyalitySupportProject__listItemDescription}>
              {task.description}
            </p>
          </div>
          <div className={styles.loyalitySupportProject__listItemActions}>
            <button
              onClick={() =>
                onSubscribe({
                  id: task.id,
                  title: task.title || "",
                  description: task.description,
                  image: task.image,
                  type: task.taddyTasktype || "app",
                  link: task.link || "",
                })
              }
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
                  {getText[language]} {price}CP
                </span>
                <img
                  src={cpImage}
                  alt="CP"
                  className={styles.loyalitySupportProject__getBtnImg}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </TransitionProvider>
  );
};

const AdditionalTaskItem = ({
  gameInited,
  language,
  onOpen,
  index,
}: {
  gameInited: boolean;
  language: ELanguages;
  onOpen: () => void;
  index: number;
}) => (
  <TransitionProvider
    inProp={gameInited}
    style={TransitionStyleTypes.bottom}
    className={styles.loyalitySupportProject__listItem}
  >
    <div className={styles.loyalitySupportProject__listItemInner}>
      <div className={styles.loyalitySupportProject__listItemMain}>
        <div className={styles.loyalitySupportProject__listItemTexts}>
          <p className={styles.loyalitySupportProject__listItemName}>
            {partnerTasksText[language]} №{index}
          </p>
        </div>
        <div className={styles.loyalitySupportProject__listItemActions}>
          <button
            onClick={onOpen}
            className={styles.loyalitySupportProject__getBtn}
          >
            <div className={styles.loyalitySupportProject__getBtnInner}>
              {openText[language]}
            </div>
          </button>
        </div>
      </div>
    </div>
  </TransitionProvider>
);

const LoyalitySupportProject = () => {
  const dispatch = useAppDispatch();
  const traffyTasks = useRef<HTMLDivElement | null>(null);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const { exchange, taddyTasks } = useTaddy();
  useEffect(() => {
    // init traffy
    initTraffyTasks(traffyTasks.current, (signedToken, id) =>
      dispatch(claimTraffyReward({ signedToken, id }))
    );

    // init wallgram
    const wallgramPublicId = process.env.REACT_APP_WALLGRAM_PUBLIC_ID;
    console.log({ wallgramPublicId });

    if (wallgramPublicId) {
      window.WallgramShowcase?.init(wallgramPublicId, {
        container: "#wallgram_showcase",
        onLoad: () => {
          // Ваш код при загрузке витрины
        },
        onFinishTask: (task: WallgramFinishTaskItemType) => {
          dispatch(
            claimWallgramReward({
              taskId: task.data.taskId,
              value: task.data.rewards[0].value,
            })
          );
          // Ваш код после успешного выполнения задания (обычно выдача вознаграждения пользователю)
        },
        onStartTask: (task) => {
          // Ваш код при начале выполнения задания (не обязательно)
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tgId && exchange) {
      exchange
        .feed({
          limit: 8,
          imageFormat: "png",
          autoImpressions: true,
        })
        .then((items) => {
          console.log("taddy items", items);
          // render(items)
          exchange.impressions(items);
        })
        .catch((err) => console.log({ err }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchange, tgId]);

  // const onShowWallgramTasks = () => {
  //   console.log("onShowWallgramTasks", window.WallgramShowcase);

  //   window.WallgramShowcase?.show();
  // };

  const onOpenBarzhaTasks = () => {
    if (window.bQuest) {
      const callback = (data: BquestCallbackDataType) => {
        console.log("callback", { data });
        dispatch(claimBarzhaReward(data));
      };

      window.bQuestInstance = new window.bQuest()
        .withElementIdAsModal("modal")
        .mount()
        .onReward(callback)
        .openModal();
    }
  };

  const onSubscribe = (item: FeedItem) => {
    exchange?.open(item).then(() => {});
  };

  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.loyalitySupportProject}>
      <div
        className={styles.loyalitySupportProject__traffyContainer}
        ref={traffyTasks}
      ></div>
      <div className={styles.loyalitySupportProject__list}>
        {/* button for barzha modal */}
        <AdditionalTaskItem
          gameInited={gameInited}
          language={language}
          onOpen={onOpenBarzhaTasks}
          index={1}
        />
        {/* <AdditionalTaskItem
          gameInited={gameInited}
          language={language}
          onOpen={onShowWallgramTasks}
          index={2}
        /> */}

        {taddyTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={{ ...task, taddyTasktype: task.type, link: task.link }}
            index={index}
            gameInited={gameInited}
            language={language}
            isTaddyTask={true}
            onSubscribe={onSubscribe}
          />
        ))}
        {/* {tasks(language).map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            gameInited={gameInited}
            language={language}
          />
        ))} */}

        <div id="wallgram_showcase"></div>
      </div>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.loyalitySupportProject__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
    </div>
  );
};

export default LoyalitySupportProject;
