import React from "react";

import {
  lpImage,
  supportTask1Image,
  supportTask2Image,
  supportTask3Image,
  supportTask4Image,
  supportTask5Image,
} from "../../../../assets/imageMaps";
import styles from "./RPGGameLoyalitySupportProject.module.scss";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

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

const RPGGameLoyalitySupportProject = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.rpgGameLoyalitySupportProject}>
      <div className={styles.rpgGameLoyalitySupportProject__list}>
        {tasks.map((task, index) => (
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            delay={index * 100}
            className={`${styles.rpgGameLoyalitySupportProject__listItem} ${
              task.subscription
                ? styles.rpgGameLoyalitySupportProject__listItem_completed
                : ""
            }`}
            key={task.id}
          >
            <div className={styles.rpgGameLoyalitySupportProject__listItemInner}>
              <div className={styles.rpgGameLoyalitySupportProject__listItemMain}>
                <img
                  src={task.image}
                  alt={task.name}
                  className={styles.rpgGameLoyalitySupportProject__listItemImg}
                />
                <div
                  className={styles.rpgGameLoyalitySupportProject__listItemTexts}
                >
                  <p
                    className={styles.rpgGameLoyalitySupportProject__listItemName}
                  >
                    {task.name}
                  </p>
                  <p
                    className={
                      styles.rpgGameLoyalitySupportProject__listItemDescription
                    }
                  >
                    {task.description}
                  </p>
                </div>
                <div
                  className={styles.rpgGameLoyalitySupportProject__listItemActions}
                >
                  <button
                    disabled={task.subscription}
                    className={styles.rpgGameLoyalitySupportProject__subscribeBtn}
                  >
                    {task.subscription
                      ? "Подписан"
                      : task.byLink
                      ? "Посетить"
                      : "Подписаться"}
                  </button>
                  <button
                    disabled={!task.subscription}
                    className={styles.rpgGameLoyalitySupportProject__getBtn}
                  >
                    <div
                      className={styles.rpgGameLoyalitySupportProject__getBtnInner}
                    >
                      <span>Получить : {task.price}LP</span>
                      <img
                        src={lpImage}
                        alt="LP"
                        className={styles.rpgGameLoyalitySupportProject__getBtnImg}
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
        className={styles.rpgGameLoyalitySupportProject__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.rpgGameLoyalitySupportProject__availableInText}
      >
        Все доступные задания будут обновляться через: 6д 12ч
      </TransitionProvider>
    </div>
  );
};

export default RPGGameLoyalitySupportProject;
