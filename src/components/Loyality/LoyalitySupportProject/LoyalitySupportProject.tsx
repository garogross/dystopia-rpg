import React from "react";

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

const tasks = [
  {
    id: "1",
    name: "Подпишитесь на канал CryptoZver",
    description: "Канал про крипту",
    image: supportTask1Image,
    price: 5,
    subscription: true,
  },
  {
    id: "2",
    name: "Подпишитесь на канал KARIMOV",
    description: "Путь со 100$ до 500k$",
    image: supportTask2Image,
    price: 7,
    subscription: false,
  },
  {
    id: "3",
    name: "Поделитесь игрой в Telegram",
    description: "Расскажи друзьям и получи бонус",
    image: supportTask3Image,
    price: 10,
    subscription: false,
  },
  {
    id: "4",
    name: "Посетите сайт партнёров",
    description: "Один клик — и ты помог проекту",
    image: supportTask4Image,
    price: 3,
    subscription: false,
    byLink: true,
  },
  {
    id: "5",
    name: "Подпишитесь на All COMBO TAP X",
    description: "Один клик — и ты помог проекту",
    image: supportTask5Image,
    price: 3,
    subscription: false,
  },
];

const LoyalitySupportProject = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.loyalitySupportProject}>
      <div className={styles.loyalitySupportProject__list}>
        {tasks.map((task, index) => (
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
            <div
              className={styles.loyalitySupportProject__listItemInner}
            >
              <div
                className={styles.loyalitySupportProject__listItemMain}
              >
                <img
                  src={task.image}
                  alt={task.name}
                  className={styles.loyalitySupportProject__listItemImg}
                />
                <div
                  className={
                    styles.loyalitySupportProject__listItemTexts
                  }
                >
                  <p
                    className={
                      styles.loyalitySupportProject__listItemName
                    }
                  >
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
                <div
                  className={
                    styles.loyalitySupportProject__listItemActions
                  }
                >
                  <button
                    disabled={task.subscription}
                    className={
                      styles.loyalitySupportProject__subscribeBtn
                    }
                  >
                    {task.subscription
                      ? "Подписан"
                      : task.byLink
                      ? "Посетить"
                      : "Подписаться"}
                  </button>
                  <button
                    disabled={!task.subscription}
                    className={styles.loyalitySupportProject__getBtn}
                  >
                    <div
                      className={
                        styles.loyalitySupportProject__getBtnInner
                      }
                    >
                      <span>Получить : {task.price}LP</span>
                      <img
                        src={lpImage}
                        alt="LP"
                        className={
                          styles.loyalitySupportProject__getBtnImg
                        }
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
        Все доступные задания будут обновляться через: 6д 12ч
      </TransitionProvider>
    </div>
  );
};

export default LoyalitySupportProject;
