import React, { useState } from "react";

import styles from "./RPGGameCharacterWrapper.module.scss";
import { RPGGameSideBarProps } from "../../../../models/Props/RPGGameSideBarProps";
import {
  RPGGameCharacterAchievementsIcon,
  RPGGameCharacterMainIcon,
  RPGGameCharacterInventoryIcon,
  RPGGameCharacterShopIcon,
  RPGGameCharacterTrainingIcon,
  RPGGameCharacterSkinsIcon,
} from "../../../layout/icons/RPGGame/RPGGameCharacterPage/sidebar";
import RPGGameCharacterMain from "../RPGGameCharacterMain/RPGGameCharacterMain";
import WrapperWithSidebar from "../../WrapperWithSidebar/WrapperWithSidebar";
import RPGGameCharacterInventory from "../RPGGameCharacterInventory/RPGGameCharacterInventory";
import RPGGameCharacterShop from "../RPGGameCharacterShop/RPGGameCharacterShop";
import RPGGameCharacterTraining from "../RPGGameCharacterTraining/RPGGameCharacterTraining";
import RPGGameCharacterSkins from "../RPGGameCharacterSkins/RPGGameCharacterSkins";
import RPGGameCharacterAchievements from "../RPGGameCharacterAchievements/RPGGameCharacterAchievements";
import RPGGameCharacterBottomWings from "../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterBottomWings";
import { useLocation } from "react-router-dom";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import RPGGameCharacterTrainingTabBar from "../RPGGameCharacterTraining/RPGGameCharacterTrainingTabBar/RPGGameCharacterTrainingTabBar";
import { ETrainingTabs } from "../../../../constants/ETrainingTabs";
import { CubeArrowIcon } from "../../../layout/icons/RPGGame/Common";
import RPGGameCharacterAchievementsHeader from "../RPGGameCharacterAchievements/RPGGameCharacterAchievementsHeader/RPGGameCharacterAchievementsHeader";

const RPGGameCharacterWrapper: React.FC = () => {
  const location = useLocation();
  const isMainPage = location.hash === "#main" || location.hash === "";
  const isTrainingPage = location.hash === "#training";
  const [activeTrainingTab, setActiveTrainingTab] = useState<ETrainingTabs>(
    ETrainingTabs.DEVELOPMENT
  );
  const [skinsListOpened, setSkinsListOpened] = useState(false);

  const sidebarItems: RPGGameSideBarProps["items"] = [
    {
      link: "main",
      icon: <RPGGameCharacterMainIcon />,
      name: "Персонаж",
      component: <RPGGameCharacterMain />,
    },
    {
      link: "inventory",
      icon: <RPGGameCharacterInventoryIcon />,
      name: "Инвентарь",
      component: <RPGGameCharacterInventory />,
    },
    {
      link: "shop",
      icon: <RPGGameCharacterShopIcon />,
      name: "Магазин",
      component: <RPGGameCharacterShop />,
    },
    {
      link: "training",
      icon: <RPGGameCharacterTrainingIcon />,
      name: "Тренировка",
      component: <RPGGameCharacterTraining activeTab={activeTrainingTab} />,
    },
    {
      link: "skins",
      icon: <RPGGameCharacterSkinsIcon />,
      name: "Скины",
      component: <RPGGameCharacterSkins opened={skinsListOpened} />,
    },
    {
      link: "achievements",
      icon: <RPGGameCharacterAchievementsIcon />,
      name: "Достижения",
      component: <RPGGameCharacterAchievements />,
    },
  ];

  const currentSidebarItem =
    sidebarItems.find((item) => item.link === location.hash.replace("#", "")) ||
    sidebarItems[0];

  const isSkinsPage = currentSidebarItem.link === "skins";
  const isAchievementsPage = currentSidebarItem.link === "achievements";

  return (
    <div
      className={`${styles.rpgGameCharacterWrapper} ${
        styles[`rpgGameCharacterWrapper_${currentSidebarItem.link}`]
      }`}
    >
      <RPGGameCharacterTrainingTabBar
        activeTab={activeTrainingTab}
        setActiveTab={setActiveTrainingTab}
        isShown={isTrainingPage}
      />
      <RPGGameCharacterAchievementsHeader shown={isAchievementsPage} />
      <WrapperWithSidebar items={sidebarItems} />
      <TransitionProvider
        style={TransitionStyleTypes.height}
        className={`${styles.rpgGameCharacterWrapper__bottomWings} container`}
        inProp={!isMainPage}
        height={100}
      >
        {isSkinsPage && (
          <button
            onClick={() => {
              setSkinsListOpened((prevState) => !prevState);
            }}
            className={styles.rpgGameCharacterWrapper__bottomWingsButton}
          >
            <CubeArrowIcon rotated={skinsListOpened} />
          </button>
        )}
        <RPGGameCharacterBottomWings withCenterLine={isSkinsPage} />
      </TransitionProvider>
    </div>
  );
};

export default RPGGameCharacterWrapper;
