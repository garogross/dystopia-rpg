import React, { useState } from "react";
import styles from "./GameLoyality.module.scss";
import GameLoyalityHeader from "../GameLoyalityHeader/GameLoyalityHeader";
import GameLoyalityTabbar from "../GameLoyalityTabbar/GameLoyalityTabbar";
import GameLoyalityInfo from "../GameLoyalityInfo/GameLoyalityInfo";
import GameLoyalityActivity from "../GameLoyalityActivity/GameLoyalityActivity";
import GameLoyalityTasks from "../GameLoyalityTasks/GameLoyalityTasks";
import GameLoyalitySupportProject from "../GameLoyalitySupportProject/GameLoyalitySupportProject";
import GameLoyalityStore from "../GameLoyalityStore/GameLoyalityStore";
import GameLoyalityActivityIcon from "../../../layout/icons/game/GameLoyalityPage/tabbar/GameLoyalityActivityIcon";
import GameLoyalityTasksIcon from "../../../layout/icons/game/GameLoyalityPage/tabbar/GameLoyalityTasksIcon";
import GameLoyalitySupportProjectIcon from "../../../layout/icons/game/GameLoyalityPage/tabbar/GameLoyalitySupportProjectIcon";
import GameLoyalityStoreIcon from "../../../layout/icons/game/GameLoyalityPage/tabbar/GameLoyalityStoreIcon";
const tabs = [
  {
    name: "Активность",
    key: "activity",
    icon: <GameLoyalityActivityIcon />,
    component: <GameLoyalityActivity />,
    title: "Ежедневная активность",
    text: "Получаете бонусы за ежедневный вход.Система прогрессивная: чем больше дней подряд — тем выше награда.",
    statText: "Входов подряд: 1 день",
  },
  {
    name: "Задания",
    key: "tasks",
    icon: <GameLoyalityTasksIcon />,
    component: <GameLoyalityTasks />,
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
    icon: <GameLoyalitySupportProjectIcon />,
    component: <GameLoyalitySupportProject />,
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
    icon: <GameLoyalityStoreIcon />,
    component: <GameLoyalityStore />,
    title: "Магазин лояльности",
    text: "Обменивай свои очки лояльности (LP) на эксклюзивное оружие, броню и скины! Поддерживай проект — открывай доступ к уникальным наградам, недоступным за кредиты.",
    statText: "",
  },
];
const GameLoyality = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const activeTabDetails = tabs.find((tab) => tab.key === activeTab);
  return (
    <section className={`${styles.gameLoyality} container`}>
      <GameLoyalityHeader />
      <GameLoyalityTabbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      {activeTabDetails && <GameLoyalityInfo
        title={activeTabDetails?.title}
        text={activeTabDetails?.text}
        statText={activeTabDetails?.statText}
      />}
      {activeTabDetails && activeTabDetails.component}
    </section>
  );
};

export default GameLoyality;
