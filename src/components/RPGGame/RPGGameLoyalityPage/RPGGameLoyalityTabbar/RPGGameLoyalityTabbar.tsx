import React from "react";
import styles from "./RPGGameLoyalityTabbar.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: {
    name: string;
    key: string;
    component: React.ReactNode;
    icon: React.ReactNode;
  }[];
}

const RPGGameLoyalityTabbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.rpgGameLoyalityTabbar}
      style={TransitionStyleTypes.top}
      inProp={gameInited}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.rpgGameLoyalityTabbar__item} ${
            activeTab === tab.key ? styles.rpgGameLoyalityTabbar__item_active : ""
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          <div className={styles.rpgGameLoyalityTabbar__inner}>
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        </button>
      ))}
    </TransitionProvider>
  );
};

export default RPGGameLoyalityTabbar;
