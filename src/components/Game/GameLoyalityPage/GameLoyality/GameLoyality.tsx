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
  },
  {
    name: "Задания",
    key: "tasks",
    icon: <GameLoyalityTasksIcon />,
    component: <GameLoyalityTasks />,
  },
  {
    name: "Поддержка проекта",
    key: "supportProject",
    icon: <GameLoyalitySupportProjectIcon />,
    component: <GameLoyalitySupportProject />,
  },
  {
    name: "Магазин",
    key: "store",
    icon: <GameLoyalityStoreIcon />,
    component: <GameLoyalityStore />,
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
      <GameLoyalityInfo
        title="Ежедневная активность"
        text="Получаете бонусы за ежедневный вход.Система прогрессивная:
чем больше дней подряд — тем выше награда."
        statText="Входов подряд: 1 день"
      />
      {activeTabDetails && activeTabDetails.component}
    </section>
  );
};

export default GameLoyality;
