import React from "react";
import styles from "./LoyalityTabbar.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TranslationItemType } from "../../../types/TranslationItemType";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: {
    name: TranslationItemType;
    key: string;
    component: React.ReactNode;
    icon: React.ReactNode;
    disabledForFarm?: boolean;
  }[];
  isRpg?: boolean;
}

const LoyalityTabbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  tabs,
  isRpg,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  const filteredTabs = !isRpg
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
            !isRpg ? styles.loyalityTabbar__item_big : ""
          } ${activeTab === tab.key ? styles.loyalityTabbar__item_active : ""}`}
          onClick={() => setActiveTab(tab.key)}
        >
          <div className={styles.loyalityTabbar__inner}>
            {tab.icon}
            <span>{tab.name[language]}</span>
          </div>
        </button>
      ))}
    </TransitionProvider>
  );
};

export default LoyalityTabbar;
