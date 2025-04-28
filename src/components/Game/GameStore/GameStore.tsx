import React, { useState } from "react";
import styles from "./GameStore.module.scss";
import Tabbar, { TabBarItem } from "../../layout/Tabbar/Tabbar";
import GameClanGunIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanGunIcon";
import GameClanColdWeaponIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanColdWeaponIcon";
import GameClanHelmetIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanHelmetIcon";
import GameClanBroneIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanBroneIcon";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { useSort } from "../../../hooks/useSort";
import SortList, { SortItem } from "../../layout/SortList/SortList";

import {
  gun2Image,
  gun3Image,
  gun5Image,
  gun4Image,
  gun1Image,
  helmet3Image,
  helmet1Image,
  helmet2Image,
  helmet4Image,
} from "../../../assets/images";
import { EStats } from "../../../constants/EStats";
import GameClanLevelIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanLevelIcon";
import { statImages } from "../../../constants/statImages";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import GameClanHeadSkinIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanHeadSkinIcon";
import GameClanBodySkinIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanBodySkinIcon";
import GameClanHandSkinIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanHandSkinIcon";
import GameClanFootSkinIcon from "../../layout/icons/game/GameClanPage/GameClanStore/GameClanFootSkinIcon";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";

const tabs: TabBarItem[] = [
  {
    icon: <GameClanGunIcon />,
    id: "gun",
  },
  {
    icon: <GameClanColdWeaponIcon />,
    id: "coldWeapon",
  },
  {
    icon: <GameClanHelmetIcon />,
    id: "helmet",
  },
  {
    icon: <GameClanBroneIcon />,
    id: "brone",
  },
];

const sortItems: SortItem[] = [
  {
    name: "Стоимость",
    id: "price",
  },
  {
    name: "Валюта",
    id: "currency",
  },
  {
    name: "Уровень",
    id: "level",
  },
];

const data: {
  image: string;
  name: string;
  type: string;
  level: number;
  price: {
    [key in EStats]?: number;
  };
}[] = [
  {
    image: gun1Image,
    name: "KSD-RF",
    type: "gun",
    level: 7,
    price: { [EStats.darkMatter]: 100 },
  },
  {
    image: gun2Image,
    name: "ZEUS-SG",
    type: "gun",
    level: 4,
    price: { [EStats.darkMatter]: 70 },
  },
  {
    image: gun3Image,
    name: "ALDUIN",
    type: "gun",
    level: 4,
    price: { [EStats.darkMatter]: 1000 },
  },
  {
    image: gun4Image,
    name: "HORNET",
    type: "gun",
    level: 4,
    price: { [EStats.darkMatter]: 1000 },
  },
  {
    image: gun5Image,
    name: "RHINO",
    type: "gun",
    level: 2,
    price: { [EStats.darkMatter]: 350 },
  },
  {
    image: helmet1Image,
    name: "STALKER",
    type: "helmet",
    level: 7,
    price: { [EStats.darkMatter]: 100 },
  },
  {
    image: helmet2Image,
    name: "BARD",
    type: "helmet",
    level: 4,
    price: { [EStats.darkMatter]: 70 },
  },
  {
    image: helmet3Image,
    name: "NUAR-X",
    type: "helmet",
    level: 4,
    price: { [EStats.darkMatter]: 1000 },
  },
  {
    image: helmet4Image,
    name: "HORNET",
    type: "helmet",
    level: 4,
    price: { [EStats.darkMatter]: 1000 },
  },
  {
    image: helmet4Image,
    name: "GHOST",
    type: "helmet",
    level: 2,
    price: { [EStats.darkMatter]: 350 },
  },
];

const skinFilters = [
  { icon: <GameClanHeadSkinIcon />, id: "head" },
  { icon: <GameClanBodySkinIcon />, id: "body" },
  { icon: <GameClanHandSkinIcon />, id: "hand" },
  { icon: <GameClanFootSkinIcon />, id: "foot" },
];

const GameStore: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("gun");
  const [activeskinSort, setActiveskinSort] = useState("head");
  const { activeSort, handleSortChange } = useSort();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.gameStore}>
      <Tabbar
        tabs={tabs}
        activeTabId={activeTabId}
        onChange={(id) => setActiveTabId(id)}
      />
      <WrapperWithFrame className={styles.gameStore__wrapper} size="lg">
        <div className={styles.gameStore__main}>
          {activeTabId === "helmet" && (
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              className={styles.gameStore__skinFilter}
            >
              {skinFilters.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveskinSort(item.id)}
                  className={`${styles.gameStore__skinFilter__button} ${
                    activeskinSort === item.id
                      ? styles.gameStore__skinFilter__button_active
                      : ""
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </TransitionProvider>
          )}
          <SortList
            className={styles.gameStore__sortList}
            activeSort={activeSort}
            onChange={handleSortChange}
            items={sortItems}
          />
          <div className={styles.gameStore__list}>
            {data
              .filter((item) => item.type === activeTabId)
              .map((item, index) => (
                <TransitionProvider
                  inProp={gameInited}
                  style={TransitionStyleTypes.bottom}
                  delay={100 * index}
                  key={index}
                  className={styles.gameStore__listItem}
                >
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className={styles.gameStore__listItemImg}
                  />
                  <div className={styles.gameStore__name}>{item.name}</div>
                  <div className={styles.gameStore__level}>
                    <GameClanLevelIcon />
                    {item.level}
                  </div>
                  <div className={styles.gameStore__prices}>
                    {Object.keys(item.price).map((k) => {
                      const key = k as EStats;

                      return (
                        <div key={key} className={styles.gameStore__price}>
                          <span>{item.price[key]}</span>
                          <div
                            className={styles.gameStore__priceImgWrapper}
                          >
                            <ImageWebp
                              src={statImages[key].img}
                              srcSet={statImages[key].imgWebp}
                              alt={key}
                              className={styles.gameStore__priceImg}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TransitionProvider>
              ))}
          </div>
        </div>
      </WrapperWithFrame>
    </div>
  );
};

export default GameStore;
