import React from "react";

import styles from "./GameCharacterWrapper.module.scss";
import { GameSideBarProps } from "../../../../models/Props/GameSideBarProps";
import GameCharacterAchievementsIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterAchievementsIcon";
import GameCharacterMain from "../GameCharacterMain/GameCharacterMain";
import WrapperWithSidebar from "../../WrapperWithSidebar/WrapperWithSidebar";
import GameCharacterMainIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterMainIcon";
import GameCharacterInventoryIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterInventoryIcon";
import GameCharacterInventory from "../GameCharacterInventory/GameCharacterInventory";
import GameCharacterShopIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterShopIcon";
import GameCharacterShop from "../GameCharacterShop/GameCharacterShop";
import GameCharacterTraining from "../GameCharacterTraining/GameCharacterTraining";
import GameCharacterTrainingIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterTrainingIcon";
import GameCharacterSkinsIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterSkinsIcon";
import GameCharacterSkins from "../GameCharacterSkins/GameCharacterSkins";
import GameCharacterAchievements from "../GameCharacterAchievements/GameCharacterAchievements";

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
    component: <GameCharacterTraining />,
  },
  {
    link: "skins",
    icon: <GameCharacterSkinsIcon />,
    name: "Скины",
    component: <GameCharacterSkins />,
  },
  {
    link: "achievements",
    icon: <GameCharacterAchievementsIcon />,
    name: "Достижения",
    component: <GameCharacterAchievements />,
  },
];

const GameCharacterWrapper: React.FC = () => {
  return (
    <div className={styles.gameCharacterWrapper}>
      <WrapperWithSidebar items={sidebarItems} />
    </div>
  );
};

export default GameCharacterWrapper;
