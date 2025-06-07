import React from "react";
import styles from "./LoyalityTabbar.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: {
    name: string;
    key: string;
    component: React.ReactNode;
    icon: React.ReactNode;
    disabledForFarm?: boolean;
  }[];
  isFarm?: boolean;
}

const LoyalityTabbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  tabs,
  isFarm,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const filteredTabs = isFarm
    ? tabs.filter((tab) => !tab.disabledForFarm)
    : tabs;
  return (
    <TransitionProvider
      className={styles.loyalityTabbar}
      style={TransitionStyleTypes.top}
      inProp={gameInited}
    >
      {filteredTabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.loyalityTabbar__item} ${
            isFarm ? styles.loyalityTabbar__item_big : ""
          } ${activeTab === tab.key ? styles.loyalityTabbar__item_active : ""}`}
          onClick={() => setActiveTab(tab.key)}
        >
          <div className={styles.loyalityTabbar__inner}>
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        </button>
      ))}
    </TransitionProvider>
  );
};

export default LoyalityTabbar;
