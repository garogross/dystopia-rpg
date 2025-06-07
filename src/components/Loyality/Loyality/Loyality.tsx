import React, { useState } from "react";
import styles from "./Loyality.module.scss";
import LoyalityHeader from "../LoyalityHeader/LoyalityHeader";
import LoyalityTabbar from "../LoyalityTabbar/LoyalityTabbar";
import LoyalityInfo from "../LoyalityInfo/LoyalityInfo";
import LoyalityActivity from "../LoyalityActivity/LoyalityActivity";
import LoyalityTasks from "../LoyalityTasks/LoyalityTasks";
import LoyalitySupportProject from "../LoyalitySupportProject/LoyalitySupportProject";
import LoyalityStore from "../LoyalityStore/LoyalityStore";
import {
  LoyalityActivityIcon,
  LoyalityTasksIcon,
  LoyalitySupportProjectIcon,
  LoyalityStoreIcon,
} from "../../layout/icons/Loyality/tabbar";

interface Props {
  isFarm?: boolean;
}

const tabs = [
  {
    name: "Активность",
    key: "activity",
    icon: <LoyalityActivityIcon />,
    component: <LoyalityActivity />,
    title: "Ежедневная активность",
    text: "Получаете бонусы за ежедневный вход.Система прогрессивная: чем больше дней подряд — тем выше награда.",
    statText: "Входов подряд: 1 день",
  },
  {
    name: "Задания",
    key: "tasks",
    icon: <LoyalityTasksIcon />,
    component: <LoyalityTasks />,
    title: "Ежедневные задания",
    text: (
      <>
        Выполняете PvE, PvP и клановые миссии — получаете LP. <br /> Чем больше
        задач — тем выше награда.
      </>
    ),
    statText: "Выполнено заданий: 1",
    disabledForFarm: true,
  },
  {
    name: "Поддержка проекта",
    key: "support-project",
    icon: <LoyalitySupportProjectIcon />,
    component: <LoyalitySupportProject />,
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
    icon: <LoyalityStoreIcon />,
    component: <LoyalityStore />,
    title: "Магазин лояльности",
    text: "Обменивай свои очки лояльности (LP) на эксклюзивное оружие, броню и скины! Поддерживай проект — открывай доступ к уникальным наградам, недоступным за кредиты.",
    statText: "",
    disabledForFarm: true,
  },
];
const Loyality: React.FC<Props> = ({ isFarm }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const activeTabDetails = tabs.find((tab) => tab.key === activeTab);
  return (
    <section className={`${styles.loyality} container`}>
      <LoyalityHeader />
      <LoyalityTabbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        isFarm={isFarm}
      />
      {activeTabDetails && (
        <LoyalityInfo
          title={activeTabDetails?.title}
          text={activeTabDetails?.text}
          statText={activeTabDetails?.statText}
        />
      )}
      {activeTabDetails && activeTabDetails.component}
    </section>
  );
};

export default Loyality;
