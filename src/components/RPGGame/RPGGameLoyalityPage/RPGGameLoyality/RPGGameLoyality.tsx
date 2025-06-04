import React, { useState } from "react";
import styles from "./RPGGameLoyality.module.scss";
import RPGGameLoyalityHeader from "../RPGGameLoyalityHeader/RPGGameLoyalityHeader";
import RPGGameLoyalityTabbar from "../RPGGameLoyalityTabbar/RPGGameLoyalityTabbar";
import RPGGameLoyalityInfo from "../RPGGameLoyalityInfo/RPGGameLoyalityInfo";
import RPGGameLoyalityActivity from "../RPGGameLoyalityActivity/RPGGameLoyalityActivity";
import RPGGameLoyalityTasks from "../RPGGameLoyalityTasks/RPGGameLoyalityTasks";
import RPGGameLoyalitySupportProject from "../RPGGameLoyalitySupportProject/RPGGameLoyalitySupportProject";
import RPGGameLoyalityStore from "../RPGGameLoyalityStore/RPGGameLoyalityStore";
import {RPGGameLoyalityActivityIcon,
RPGGameLoyalityTasksIcon,
RPGGameLoyalitySupportProjectIcon,
RPGGameLoyalityStoreIcon,

} from "../../../layout/icons/RPGGame/RPGGameLoyalityPage/tabbar";
const tabs = [
  {
    name: "Активность",
    key: "activity",
    icon: <RPGGameLoyalityActivityIcon />,
    component: <RPGGameLoyalityActivity />,
    title: "Ежедневная активность",
    text: "Получаете бонусы за ежедневный вход.Система прогрессивная: чем больше дней подряд — тем выше награда.",
    statText: "Входов подряд: 1 день",
  },
  {
    name: "Задания",
    key: "tasks",
    icon: <RPGGameLoyalityTasksIcon />,
    component: <RPGGameLoyalityTasks />,
    title: "Ежедневные задания",
    text: (
      <>
        Выполняете PvE, PvP и клановые миссии — получаете LP. <br /> Чем больше
        задач — тем выше награда.
      </>
    ),
    statText: "Выполнено заданий: 1",
  },
  {
    name: "Поддержка проекта",
    key: "supportProject",
    icon: <RPGGameLoyalitySupportProjectIcon />,
    component: <RPGGameLoyalitySupportProject />,
    title: "Поддержка проекта",
    text: (
      <>
        Участвуй в развитии вселенной Dystopia — получай очки лояльности (LP).{" "}
        <br /> Подписывайся, следи за проектами, забирай награды
      </>
    ),
    statText: "Выполнено: 1 из 7",
  },
  {
    name: "Магазин",
    key: "store",
    icon: <RPGGameLoyalityStoreIcon />,
    component: <RPGGameLoyalityStore />,
    title: "Магазин лояльности",
    text: "Обменивай свои очки лояльности (LP) на эксклюзивное оружие, броню и скины! Поддерживай проект — открывай доступ к уникальным наградам, недоступным за кредиты.",
    statText: "",
  },
];
const RPGGameLoyality = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const activeTabDetails = tabs.find((tab) => tab.key === activeTab);
  return (
    <section className={`${styles.rpgGameLoyality} container`}>
      <RPGGameLoyalityHeader />
      <RPGGameLoyalityTabbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      {activeTabDetails && (
        <RPGGameLoyalityInfo
          title={activeTabDetails?.title}
          text={activeTabDetails?.text}
          statText={activeTabDetails?.statText}
        />
      )}
      {activeTabDetails && activeTabDetails.component}
    </section>
  );
};

export default RPGGameLoyality;
