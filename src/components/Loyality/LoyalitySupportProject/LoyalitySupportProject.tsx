import React, { useEffect } from "react";

import styles from "./LoyalitySupportProject.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { BquestCallbackDataType } from "../../../types/BquestCallbackDataType";
import {
  claimBarzhaReward,
  claimTadsReward,
  claimWallgramReward,
} from "../../../store/slices/tasksSlice";
import { FeedItem } from "taddy-sdk-web";
import { WallgramFinishTaskItemType } from "../../../types/WallgramFinishTaskItemType";
import { useTaddy } from "../../../context/TaddyContext";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { TadsWidget } from "react-tads-widget";
import LoyalitySupportProjectAdditionalTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectAdditionalTaskItem";
import LoyalitySupportProjectAdsgramTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectAdsgramTaskItem";
import LoyalitySupportProjectVideoTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectVideoTaskItem";
import LoyalitySupportProjectTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectTaskItem";
import LoyalitySupportProjectTraffyContainer from "./LoyalitySupportProjectTraffyContainer/LoyalitySupportProjectTraffyContainer";

const { taskNotCompletedText } = TRANSLATIONS.loyality.supportProject;

const TADS_WIDGET_ID = "543";

const LoyalitySupportProject = () => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const { show: showTooltip, openTooltip } = useTooltip();
  const { exchange, taddyTasks } = useTaddy();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const language = useAppSelector((state) => state.ui.language);

  useEffect(() => {
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

  return (
    <div className={styles.loyalitySupportProject}>
      <LoyalitySupportProjectTraffyContainer />
      <div className={styles.loyalitySupportProject__list}>
        <TadsWidget
          id={TADS_WIDGET_ID}
          type="static"
          debug={process.env.NODE_ENV === "development"}
          onClickReward={(id) => {
            dispatch(claimTadsReward({ id }));
          }}
          onAdsNotFound={() => {
            openTooltip();
          }}
        />

        {/* button for barzha modal */}
        <LoyalitySupportProjectAdditionalTaskItem
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
        <LoyalitySupportProjectAdsgramTaskItem
          gameInited={gameInited}
          language={language}
        />
        <LoyalitySupportProjectVideoTaskItem
          language={language}
          gameInited={gameInited}
        />
        {taddyTasks.map((task, index) => (
          <LoyalitySupportProjectTaskItem
            key={task.id}
            task={{ ...task, taddyTasktype: task.type, link: task.link }}
            index={index}
            gameInited={gameInited}
            language={language}
            isTaddyTask={true}
            onSubscribe={onSubscribe}
          />
        ))}
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
