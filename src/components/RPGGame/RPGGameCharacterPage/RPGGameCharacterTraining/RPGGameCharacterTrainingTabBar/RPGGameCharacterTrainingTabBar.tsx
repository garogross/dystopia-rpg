import React from "react";
import styles from "./RPGGameCharacterTrainingTabBar.module.scss";
import {
  RPGGameCharacterTrainingRedistributionIcon,
  RPGGameCharacterTrainingCyberneticsIcon,
  RPGGameCharacterTrainingDevelopmentIcon,
} from "../../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterTraining/tabbar";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { ETrainingTabs } from "../../../../../constants/cyberfarm/ETrainingTabs";
import { useAppSelector } from "../../../../../hooks/redux";
interface Props {
  activeTab: ETrainingTabs;
  setActiveTab: (tab: ETrainingTabs) => void;
  isShown: boolean;
}

const RPGGameCharacterTrainingTabBar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isShown,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={`${styles.rpgGameCharacterTrainingTabBar} container`}
      inProp={isShown && gameInited}
      height={86}
      style={TransitionStyleTypes.height}
    >
      <div className={styles.rpgGameCharacterTrainingTabBar__inner}>
        <button
          className={`${styles.rpgGameCharacterTrainingTabBar__item} ${
            activeTab === ETrainingTabs.DEVELOPMENT &&
            styles.rpgGameCharacterTrainingTabBar__item_active
          }`}
          onClick={() => setActiveTab(ETrainingTabs.DEVELOPMENT)}
        >
          <div className={styles.rpgGameCharacterTrainingTabBar__itemInner}>
            <RPGGameCharacterTrainingDevelopmentIcon />
            <span>Развитие</span>
          </div>
        </button>
        <button
          className={`${styles.rpgGameCharacterTrainingTabBar__item} ${
            activeTab === ETrainingTabs.CYBERNETICS &&
            styles.rpgGameCharacterTrainingTabBar__item_active
          }`}
          onClick={() => setActiveTab(ETrainingTabs.CYBERNETICS)}
        >
          <div className={styles.rpgGameCharacterTrainingTabBar__itemInner}>
            <RPGGameCharacterTrainingCyberneticsIcon />
            <span>Кибернетикa</span>
          </div>
        </button>
        <button
          className={`${styles.rpgGameCharacterTrainingTabBar__item} ${
            activeTab === ETrainingTabs.REDISTRIBUTION &&
            styles.rpgGameCharacterTrainingTabBar__item_active
          }`}
          onClick={() => setActiveTab(ETrainingTabs.REDISTRIBUTION)}
        >
          <div className={styles.rpgGameCharacterTrainingTabBar__itemInner}>
            <RPGGameCharacterTrainingRedistributionIcon />
            <span>Перераспределение</span>
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default RPGGameCharacterTrainingTabBar;
