import React, { useState } from "react";
import styles from "./RPGGameStore.module.scss";
import Tabbar, { TabBarItem } from "../../layout/Tabbar/Tabbar";
import {RPGGameStoreGunIcon,
RPGGameStoreColdWeaponIcon,
RPGGameStoreHelmetIcon,
RPGGameStoreAssetIcon,
RPGGameStoreLevelIcon
} from "../../layout/icons/RPGGame/RPGGameStore";
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
  asset1Image,
  asset2Image,
  asset3Image,
  asset6Image,
  asset4Image,
  asset5Image,
} from "../../../assets/imageMaps";
import { EStats } from "../../../constants/EStats";
import { statImages } from "../../../constants/statImages";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {RPGGameStoreHeadSkinIcon,
  RPGGameStoreBodySkinIcon,
RPGGameStoreHandSkinIcon,
RPGGameStoreFootSkinIcon,
} from "../../layout/icons/RPGGame/RPGGameStore/skins";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import {RPGGameStoreDrugIcon,
  RPGGameStoreEnergyIcon,
RPGGameStoreBombIcon,
RPGGameStoreDronsIcon,
} from "../../layout/icons/RPGGame/RPGGameStore/assets";

interface Props {
  isDualColumns?: boolean;
}

const tabs: TabBarItem[] = [
  {
    icon: <RPGGameStoreGunIcon />,
    id: "gun",
  },
  {
    icon: <RPGGameStoreColdWeaponIcon />,
    id: "coldWeapon",
  },
  {
    icon: <RPGGameStoreHelmetIcon />,
    id: "helmet",
  },
  {
    icon: <RPGGameStoreAssetIcon />,
    id: "asset",
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
  {
    image: asset1Image,
    name: "FRAG",
    type: "asset",
    level: 2,
    price: { [EStats.lp]: 350 },
  },
  {
    image: asset2Image,
    name: "GASBALL",
    type: "asset",
    level: 2,
    price: { [EStats.lp]: 350 },
  },
  {
    image: asset3Image,
    name: "CRYO-2",
    type: "asset",
    level: 2,
    price: { [EStats.lp]: 350 },
  },
  {
    image: asset4Image,
    name: "NAPALM",
    type: "asset",
    level: 2,
    price: { [EStats.lp]: 350 },
  },
  {
    image: asset5Image,
    name: "EMP-4",
    type: "asset",
    level: 2,
    price: { [EStats.lp]: 350 },
  },
  {
    image: asset6Image,
    name: "FLASH",
    type: "asset",
    level: 2,
    price: { [EStats.lp]: 350 },
  },
];
const skinFilters = [
  { icon: <RPGGameStoreHeadSkinIcon />, id: "head" },
  { icon: <RPGGameStoreBodySkinIcon />, id: "body" },
  { icon: <RPGGameStoreHandSkinIcon />, id: "hand" },
  { icon: <RPGGameStoreFootSkinIcon />, id: "foot" },
];
const assetFilters = [
  { icon: <RPGGameStoreDrugIcon />, id: "drug" },
  { icon: <RPGGameStoreBombIcon />, id: "bomb" },
  { icon: <RPGGameStoreEnergyIcon />, id: "energy" },
  { icon: <RPGGameStoreDronsIcon />, id: "drons" },
];

const RPGGameStore: React.FC<Props> = ({ isDualColumns = false }) => {
  const [activeTabId, setActiveTabId] = useState("gun");
  const [activeskinSort, setActiveskinSort] = useState("head");
  const [activeAssetSort, setActiveAssetSort] = useState("drug");
  const { activeSort, handleSortChange } = useSort();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.rpgGameStore}>
      <Tabbar
        tabs={tabs}
        activeTabId={activeTabId}
        onChange={(id) => setActiveTabId(id)}
      />
      <WrapperWithFrame className={styles.rpgGameStore__wrapper} size="lg">
        <div className={styles.rpgGameStore__main}>
          {activeTabId === "helmet" && (
            <TransitionProvider
              inProp={gameInited}
              height={30}
              style={TransitionStyleTypes.height}
              className={styles.rpgGameStore__skinFilter}
            >
              {skinFilters.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveskinSort(item.id)}
                  className={`${styles.rpgGameStore__skinFilter__button} ${
                    activeskinSort === item.id
                      ? styles.rpgGameStore__skinFilter__button_active
                      : ""
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </TransitionProvider>
          )}
          {activeTabId === "asset" && (
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.height}
              height={30}
              className={styles.rpgGameStore__skinFilter}
            >
              {assetFilters.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveAssetSort(item.id)}
                  className={`${styles.rpgGameStore__skinFilter__button} ${
                    activeAssetSort === item.id
                      ? styles.rpgGameStore__skinFilter__button_active
                      : ""
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </TransitionProvider>
          )}
          <SortList
            className={styles.rpgGameStore__sortList}
            activeSort={activeSort}
            onChange={handleSortChange}
            items={sortItems}
          />
          <div
            className={`${styles.rpgGameStore__list} ${
              isDualColumns ? styles.rpgGameStore__list_dualColumns : ""
            }`}
          >
            {data
              .filter((item) => item.type === activeTabId)
              .map((item, index) => (
                <TransitionProvider
                  inProp={gameInited}
                  style={TransitionStyleTypes.bottom}
                  delay={100 * index}
                  key={index}
                  className={styles.rpgGameStore__listItem}
                >
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className={styles.rpgGameStore__listItemImg}
                  />
                  <div className={styles.rpgGameStore__name}>{item.name}</div>
                  <div className={styles.rpgGameStore__level}>
                    <RPGGameStoreLevelIcon />
                    {item.level}
                  </div>
                  <div className={styles.rpgGameStore__prices}>
                    {Object.keys(item.price).map((k) => {
                      const key = k as EStats;

                      return (
                        <div key={key} className={styles.rpgGameStore__price}>
                          <span>{item.price[key]}</span>
                          <div className={styles.rpgGameStore__priceImgWrapper}>
                            <ImageWebp
                              src={statImages[key].img}
                              srcSet={statImages[key].imgWebp}
                              alt={key}
                              className={styles.rpgGameStore__priceImg}
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

export default RPGGameStore;
