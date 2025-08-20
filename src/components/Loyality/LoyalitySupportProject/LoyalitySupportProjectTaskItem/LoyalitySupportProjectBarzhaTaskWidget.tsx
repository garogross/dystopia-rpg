import React, { useEffect, useState } from "react";
import { IBarzhaTaskWidgetItem } from "../../../../models/api/IBarzhaTaskWidgetItem";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { claimAdReward } from "../../../../store/slices/tasksSlice";
import { EAdActionTypes } from "../../../../constants/EadActionTypes";
import { EadProviders } from "../../../../constants/EadProviders";

const BARZHA_WIDGET_ID = 60;

const LoyalitySupportProjectBarzhaTaskWidget = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const [widgetData, setWidgetData] = useState<IBarzhaTaskWidgetItem[]>([]);

  useEffect(() => {
    try {
      if (typeof TaskWidget !== "undefined") {
        // Callback для успешного получения данных
        const receiveTaskWidgetCallback = (data: IBarzhaTaskWidgetItem[]) => {
          setWidgetData(data); // Сохраняем данные в состояние
        };

        // Callback для обработки ошибок
        const receiveTaskWidgetErrorCallback = (error: unknown) => {
          console.error("Ошибка при загрузке виджета:", error);
        };

        // Инициализация виджета
        const taskWidget = new TaskWidget(BARZHA_WIDGET_ID, {
          receiveTaskWidgetCallback: receiveTaskWidgetCallback,
          receiveTaskWidgetErrorCallback: receiveTaskWidgetErrorCallback,
          receiveTaskWidgetWebSocket: (data) => {
            if (data.telegram_id === tgId) {
              dispatch(
                claimAdReward({
                  ad_type: EAdActionTypes.Subscription,
                  provider: EadProviders.Barzha,
                  identifier: data.notification_uuid,
                })
              );
            }
          },
        });

        taskWidget.initWidget();
      }
    } catch (error) {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {widgetData.map((task, index) => (
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.bottom}
          delay={index * 100}
          className={styles.loyalitySupportProjectTaskItem}
          key={task.ad_subscription_campaign_id}
        >
          <div className={styles.loyalitySupportProjectTaskItem__inner}>
            <div className={styles.loyalitySupportProjectTaskItem__main}>
              <div className={styles.loyalitySupportProjectTaskItem__texts}>
                <p className={styles.loyalitySupportProjectTaskItem__name}>
                  {task.title}
                </p>
                <p
                  className={styles.loyalitySupportProjectTaskItem__description}
                >
                  {task.description}
                </p>
              </div>
              <div className={styles.loyalitySupportProjectTaskItem__actions}>
                <button
                  data-sub-ad-campaign-id={task.ad_subscription_campaign_id}
                  className={styles.loyalitySupportProjectTaskItem__getBtn}
                >
                  <div
                    className={
                      styles.loyalitySupportProjectTaskItem__getBtnInner
                    }
                  >
                    {task.button_text}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </TransitionProvider>
      ))}
    </>
  );
};

export default LoyalitySupportProjectBarzhaTaskWidget;
