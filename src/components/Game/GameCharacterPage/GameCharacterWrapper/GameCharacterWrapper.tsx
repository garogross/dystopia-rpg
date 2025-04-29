import React, { useState } from "react";

import styles from "./GameCharacterWrapper.module.scss";
import { GameSideBarProps } from "../../../../models/Props/GameSideBarProps";
import GameCharacterAchievementsIcon from "../../../layout/icons/game/GameCharacterPage/sidebar/GameCharacterAchievementsIcon";
import GameCharacterMain from "../GameCharacterMain/GameCharacterMain";
import WrapperWithSidebar from "../../WrapperWithSidebar/WrapperWithSidebar";
import GameCharacterMainIcon from "../../../layout/icons/game/GameCharacterPage/sidebar/GameCharacterMainIcon";
import GameCharacterInventoryIcon from "../../../layout/icons/game/GameCharacterPage/sidebar/GameCharacterInventoryIcon";
import GameCharacterInventory from "../GameCharacterInventory/GameCharacterInventory";
import GameCharacterShopIcon from "../../../layout/icons/game/GameCharacterPage/sidebar/GameCharacterShopIcon";
import GameCharacterShop from "../GameCharacterShop/GameCharacterShop";
import GameCharacterTraining from "../GameCharacterTraining/GameCharacterTraining";
import GameCharacterTrainingIcon from "../../../layout/icons/game/GameCharacterPage/sidebar/GameCharacterTrainingIcon";
import GameCharacterSkinsIcon from "../../../layout/icons/game/GameCharacterPage/sidebar/GameCharacterSkinsIcon";
import GameCharacterSkins from "../GameCharacterSkins/GameCharacterSkins";
import GameCharacterAchievements from "../GameCharacterAchievements/GameCharacterAchievements";
import GameCharacterBottomWings from "../../../layout/icons/game/GameCharacterPage/GameCharacterBottomWings";
import { useLocation } from "react-router-dom";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import GameCharacterTrainingTabBar from "../GameCharacterTraining/GameCharacterTrainingTabBar/GameCharacterTrainingTabBar";
import { ETrainingTabs } from "../../../../constants/ETrainingTabs";
import CubeArrowIcon from "../../../layout/icons/game/Common/CubeArrowIcon";

const GameCharacterWrapper: React.FC = () => {
  const location = useLocation();
  const isMainPage = location.hash === "#main" || location.hash === "";
  const isTrainingPage = location.hash === "#training";
  const [activeTrainingTab, setActiveTrainingTab] = useState<ETrainingTabs>(
    ETrainingTabs.DEVELOPMENT
  );
  const [skinsListOpened, setSkinsListOpened] = useState(false);

  const sidebarItems: GameSideBarProps["items"] = [
    {
      link: "main",
      icon: <GameCharacterMainIcon />,
      name: "Персонаж",
      component: <GameCharacterMain />,
    },
    {
      link: "inventory",
      icon: <GameCharacterInventoryIcon />,
      name: "Инвентарь",
      component: <GameCharacterInventory />,
    },
    {
      link: "shop",
      icon: <GameCharacterShopIcon />,
      name: "Магазин",
      component: <GameCharacterShop />,
    },
    {
      link: "training",
      icon: <GameCharacterTrainingIcon />,
      name: "Тренировка",
      component: <GameCharacterTraining activeTab={activeTrainingTab} />,
    },
    {
      link: "skins",
      icon: <GameCharacterSkinsIcon />,
      name: "Скины",
      component: <GameCharacterSkins opened={skinsListOpened} />,
    },
    {
      link: "achievements",
      icon: <GameCharacterAchievementsIcon />,
      name: "Достижения",
      component: <GameCharacterAchievements />,
    },
  ];

  const currentSidebarItem =
    sidebarItems.find((item) => item.link === location.hash.replace("#", "")) ||
    sidebarItems[0];

  const isSkinsPage = currentSidebarItem.link === "skins";

  return (
    <div
      className={`${styles.gameCharacterWrapper} ${
        styles[`gameCharacterWrapper_${currentSidebarItem.link}`]
      }`}
    >
      <GameCharacterTrainingTabBar
        activeTab={activeTrainingTab}
        setActiveTab={setActiveTrainingTab}
        isShown={isTrainingPage}
      />
      <WrapperWithSidebar items={sidebarItems} />
      <TransitionProvider
        style={TransitionStyleTypes.height}
        className={`${styles.gameCharacterWrapper__bottomWings} container`}
        inProp={!isMainPage}
        height={100}
      >
        {isSkinsPage && (
          <button 
            onClick={() => {
              setSkinsListOpened((prevState) => !prevState);
            }}
            className={styles.gameCharacterWrapper__bottomWingsButton}
          >
            <CubeArrowIcon rotated={skinsListOpened} />
          </button>
        )}
        <GameCharacterBottomWings withCenterLine={isSkinsPage} />
      </TransitionProvider>
    </div>
  );
};

export default GameCharacterWrapper;
