import React from "react";
import styles from "./GameLoyalityTabbar.module.scss";
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

const GameLoyalityTabbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.gameLoyalityTabbar}
      style={TransitionStyleTypes.top}
      inProp={gameInited}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.gameLoyalityTabbar__item} ${
            activeTab === tab.key ? styles.gameLoyalityTabbar__item_active : ""
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          <div className={styles.gameLoyalityTabbar__inner}>
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        </button>
      ))}
    </TransitionProvider>
  );
};

export default GameLoyalityTabbar;
