import React, { useEffect, useState } from "react";

import styles from "./LoyalitySupportProject.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { BquestCallbackDataType } from "../../../types/BquestCallbackDataType";
import {
  claimBarzhaReward,
  claimTaddyReward,
  claimTadsReward,
  getPromoTaskReward,
  getPromoTasks,
  setPromoTaskSubscribed,
} from "../../../store/slices/tasksSlice";
import { FeedItem } from "taddy-sdk-web";
import { useTaddy } from "../../../context/TaddyContext";
import { TadsWidget } from "react-tads-widget";
import LoyalitySupportProjectAdditionalTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectAdditionalTaskItem";
import LoyalitySupportProjectAdsgramTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectAdsgramTaskItem";
import LoyalitySupportProjectVideoTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectVideoTaskItem";
import LoyalitySupportProjectTaskItem from "./LoyalitySupportProjectTaskItem/LoyalitySupportProjectTaskItem";
import LoyalitySupportProjectTraffyContainer from "./LoyalitySupportProjectTraffyContainer/LoyalitySupportProjectTraffyContainer";
import { useTooltip } from "../../../hooks/useTooltip";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { EAdTypes } from "../../../constants/EAdTypes";

const { taskNotCompletedText, taskCompletedText } =
  TRANSLATIONS.loyality.supportProject;

const TADS_WIDGET_ID = "543";

const LoyalitySupportProject = () => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const { exchange, taddyTasks, fetchTaddyTasks, removeTaddyTask } = useTaddy();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const promoTasks = useAppSelector((state) => state.tasks.promoTasks);
  const [tooltipText, setTooltipText] = useState(taskCompletedText);
  const { show, openTooltip } = useTooltip();

  useEffect(() => {
    dispatch(getPromoTasks());

    // init wallgram
    // const wallgramPublicId = process.env.REACT_APP_WALLGRAM_PUBLIC_ID;

    // if (wallgramPublicId) {
    //   window.WallgramShowcase?.init(wallgramPublicId, {
    //     container: "#wallgram_showcase",
    //     onLoad: () => {
    //       // Ваш код при загрузке витрины
    //     },
    //     onFinishTask: (task: WallgramFinishTaskItemType) => {
    //       dispatch(
    //         claimWallgramReward({
    //           taskId: task.data.taskId,
    //           value: task.data.rewards[0].value,
    //         })
    //       );
    //       // Ваш код после успешного выполнения задания (обычно выдача вознаграждения пользователю)
    //     },
    //     onStartTask: (task) => {
    //       // Ваш код при начале выполнения задания (не обязательно)
    //     },
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tgId && exchange) {
      fetchTaddyTasks();
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
        ?.withElementIdAsModal("modal")
        ?.mount()
        ?.onReward(callback)
        ?.openModal();
    }
  };

  // const openOfferWall = () => {
  //   if (window.gigaOfferWallSDK) {
  //     window.gigaOfferWallSDK.open();
  //   }
  // };

  const onSubscribe = (item: FeedItem) => {
    exchange?.open(item).then(() => {
      dispatch(claimTaddyReward({ id: item?.id?.toString() }))
        .unwrap()
        .then(() => removeTaddyTask(item?.id));
    });
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
        />

        {/* button for barzha modal */}
        <LoyalitySupportProjectAdditionalTaskItem
          gameInited={gameInited}
          language={language}
          onOpen={onOpenBarzhaTasks}
          index={1}
        />
        {/* <LoyalitySupportProjectAdditionalTaskItem
          gameInited={gameInited}
          language={language}
          onOpen={openOfferWall}
          index={2}
        /> */}
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
        <LoyalitySupportProjectVideoTaskItem
          language={language}
          gameInited={gameInited}
          scsClb={(id) => {
            if (id) dispatch(claimTaddyReward({ id, task_type: "video" }));
          }}
          adType={EAdTypes.TADDY_V}
          index={1}
        />
        {taddyTasks?.map((task, index) => (
          <LoyalitySupportProjectTaskItem
            key={task?.id}
            task={{ ...task, taddyTasktype: task?.type, link: task?.link }}
            index={index}
            gameInited={gameInited}
            language={language}
            isTaddyTask={true}
            onSubscribe={onSubscribe}
          />
        ))}
        {promoTasks?.map(
          (
            { name, id, description, reward, target_url, subscription },
            index
          ) => (
            <LoyalitySupportProjectTaskItem
              key={id}
              task={{
                id: id,
                title: name,
                description: description,
                price: reward,
                subscription: !!subscription,
                byLink: target_url?.includes("t.me"),
                link: target_url,
              }}
              index={index}
              gameInited={gameInited}
              language={language}
              onSubscribe={(item) => dispatch(setPromoTaskSubscribed(item.id))}
              onGetReward={async (id) => {
                try {
                  const res = await dispatch(
                    getPromoTaskReward({ id })
                  ).unwrap();
                  if (res.status === "ok") {
                    setTooltipText(taskCompletedText);
                    openTooltip();
                  } else {
                    throw new Error("failed");
                  }
                } catch (error) {
                  setTooltipText(taskNotCompletedText);
                  openTooltip();
                }
              }}
            />
          )
        )}
        {/* <div id="wallgram_showcase"></div> */}
      </div>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.loyalitySupportProject__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
      <Tooltip show={show} text={tooltipText[language]} />
    </div>
  );
};

export default LoyalitySupportProject;
