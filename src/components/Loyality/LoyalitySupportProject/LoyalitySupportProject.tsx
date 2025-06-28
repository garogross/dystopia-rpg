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
  claimAdsgramReward,
  claimBarzhaReward,
  claimTraffyReward,
  claimWallgramReward,
} from "../../../store/slices/tasksSlice";
import { initTraffyTasks } from "../../../utils/initTraffyTasks";
import { FeedItem } from "taddy-sdk-web";
import { WallgramFinishTaskItemType } from "../../../types/WallgramFinishTaskItemType";
import { useTaddy } from "../../../context/TaddyContext";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { getPlatformType } from "../../../utils/getPlatformType";
import { useVideoAd } from "../../../hooks/useVideoAd";

const {
  subscribeText,
  subscribedText,
  visitText,
  getText,
  partnerTasksText,
  openText,
  claimAdText,
  doneText,
  taskNotCompletedText,
  supportProjectText,
} = TRANSLATIONS.loyality.supportProject;
const { watchAdAndGetCpText, watchAdText } = TRANSLATIONS.common;
const { loadAdText } = TRANSLATIONS.errors;
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

const VideoTaskItem = ({
  gameInited,
  language,
}: {
  language: ELanguages;
  gameInited: boolean;
}) => {
  const { onShowAd, showTooltip } = useVideoAd();

  return (
    <>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.loyalitySupportProject__listItem}
      >
        <div className={styles.loyalitySupportProject__listItemInner}>
          <div className={styles.loyalitySupportProject__listItemMain}>
            <div className={styles.loyalitySupportProject__listItemTexts}>
              <p className={styles.loyalitySupportProject__listItemName}>
                {watchAdAndGetCpText[language]}
              </p>
            </div>
            <div className={styles.loyalitySupportProject__listItemActions}>
              <button
                onClick={onShowAd}
                className={styles.loyalitySupportProject__getBtn}
              >
                <div className={styles.loyalitySupportProject__getBtnInner}>
                  {watchAdText[language]}
                </div>
              </button>
            </div>
          </div>
        </div>
      </TransitionProvider>
      <Tooltip show={showTooltip} text={loadAdText[language]} />
    </>
  );
};

const AdsgramTaskItem = ({
  gameInited,
  language,
}: {
  gameInited: boolean;
  language: ELanguages;
}) => {
  const dispatch = useAppDispatch();
  const taskRef = useRef<HTMLElement>(null);
  const isMobile = getPlatformType();

  useEffect(() => {
    if (!isMobile) return;

    const handler = (event: any) => {
      dispatch(claimAdsgramReward({ taskId: event.detail }));
      // event.detail contains your block id
    };
    const task = taskRef.current;

    if (task) {
      task.addEventListener("reward", handler);
    }

    return () => {
      if (task) {
        task.removeEventListener("reward", handler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMobile) return null;

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.loyalitySupportProject__listItem}
    >
      <div className={styles.loyalitySupportProject__adsgramWrapper}>
        <adsgram-task
          data-block-id="task-12038"
          data-debug="false"
          ref={taskRef}
        >
          <div
            className={styles.loyalitySupportProject__listItemTexts}
            slot="reward"
          >
            <p className={styles.loyalitySupportProject__listItemName}>
              {supportProjectText[language]}
            </p>
          </div>
          <div slot="button">
            <button
              className={styles.loyalitySupportProject__getBtn}
              type="button"
            >
              <div className={styles.loyalitySupportProject__getBtnInner}>
                {openText[language]}
              </div>
            </button>
          </div>
          <div slot="claim">
            <button
              className={styles.loyalitySupportProject__getBtn}
              type="button"
            >
              <div className={styles.loyalitySupportProject__getBtnInner}>
                {claimAdText[language]}
              </div>
            </button>
          </div>
          <div slot="done">
            <button
              className={styles.loyalitySupportProject__getBtn}
              type="button"
            >
              <div className={styles.loyalitySupportProject__getBtnInner}>
                {doneText[language]}
              </div>
            </button>
          </div>
        </adsgram-task>
      </div>
    </TransitionProvider>
  );
};

const LoyalitySupportProject = () => {
  const dispatch = useAppDispatch();
  const traffyTasks = useRef<HTMLDivElement | null>(null);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const { show: showTooltip, openTooltip } = useTooltip();
  const { exchange, taddyTasks } = useTaddy();

  useEffect(() => {
    // init traffy
    initTraffyTasks(
      traffyTasks.current,
      (signedToken, id) => dispatch(claimTraffyReward({ signedToken, id })),
      openTooltip
    );

    // init wallgram
    const wallgramPublicId = process.env.REACT_APP_WALLGRAM_PUBLIC_ID;

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
          exchange.impressions(items);
        })
        .catch((err) => console.log({ err }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchange, tgId]);

  // const onShowWallgramTasks = () => {
  //   window.WallgramShowcase?.show();
  // };

  const onOpenBarzhaTasks = () => {
    if (window.bQuest) {
      const callback = (data: BquestCallbackDataType) => {
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
        <AdsgramTaskItem gameInited={gameInited} language={language} />
        <VideoTaskItem language={language} gameInited={gameInited} />
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
      <Tooltip show={showTooltip} text={taskNotCompletedText[language]} />
    </div>
  );
};

export default LoyalitySupportProject;
