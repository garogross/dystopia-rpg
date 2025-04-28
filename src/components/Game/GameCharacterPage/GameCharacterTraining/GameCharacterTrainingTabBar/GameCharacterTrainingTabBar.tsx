import React from "react";
import styles from "./GameCharacterTrainingTabBar.module.scss";
import GameCharacterTrainingRedistributionIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/tabbar/GameCharacterTrainingRedistributionIcon";
import GameCharacterTrainingCyberneticsIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/tabbar/GameCharacterTrainingCyberneticsIcon";
import GameCharacterTrainingDevelopmentIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/tabbar/GameCharacterTrainingDevelopmentIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { ETrainingTabs } from "../../../../../constants/ETrainingTabs";
import { useAppSelector } from "../../../../../hooks/redux";
interface Props {
  activeTab: ETrainingTabs;
  setActiveTab: (tab: ETrainingTabs) => void;
  isShown: boolean;
}

const GameCharacterTrainingTabBar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isShown,
}) => {
    const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={`${styles.gameCharacterTrainingTabBar} container`}
      inProp={isShown && gameInited}
      height={86}
      style={TransitionStyleTypes.height}
    >
      <div className={styles.gameCharacterTrainingTabBar__inner}>
        <button
          className={`${styles.gameCharacterTrainingTabBar__item} ${
            activeTab === ETrainingTabs.DEVELOPMENT &&
            styles.gameCharacterTrainingTabBar__item_active
          }`}
        onClick={() => setActiveTab(ETrainingTabs.DEVELOPMENT)}
      >
        <div className={styles.gameCharacterTrainingTabBar__itemInner}>
          <GameCharacterTrainingDevelopmentIcon />
          <span>Развитие</span>
        </div>
      </button>
      <button
        className={`${styles.gameCharacterTrainingTabBar__item} ${
          activeTab === ETrainingTabs.CYBERNETICS &&
          styles.gameCharacterTrainingTabBar__item_active
        }`}
        onClick={() => setActiveTab(ETrainingTabs.CYBERNETICS)}
      >
        <div className={styles.gameCharacterTrainingTabBar__itemInner}>
          <GameCharacterTrainingCyberneticsIcon />
          <span>Кибернетикa</span>
        </div>
      </button>
      <button
        className={`${styles.gameCharacterTrainingTabBar__item} ${
          activeTab === ETrainingTabs.REDISTRIBUTION &&
          styles.gameCharacterTrainingTabBar__item_active
        }`}
        onClick={() => setActiveTab(ETrainingTabs.REDISTRIBUTION)}
      >
        <div className={styles.gameCharacterTrainingTabBar__itemInner}>
          <GameCharacterTrainingRedistributionIcon />
          <span>Перераспределение</span>
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default GameCharacterTrainingTabBar;
