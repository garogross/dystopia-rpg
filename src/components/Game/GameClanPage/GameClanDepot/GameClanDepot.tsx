import React, { useState } from "react";
import styles from "./GameClanDepot.module.scss";
import Tabbar, { TabBarItem } from "../../../layout/Tabbar/Tabbar";
import GameClanStorageIcon from "../../../layout/icons/game/GameClanPage/GameClanDepot/GameClanStorageIcon";
import GameClanSkinsIcon from "../../../layout/icons/game/GameClanPage/GameClanDepot/GameClanSkinsIcon";
import GameClanLevelsIcon from "../../../layout/icons/game/GameClanPage/GameClanDepot/GameClanLevelsIcon";
import GameClanRepairIcon from "../../../layout/icons/game/GameClanPage/GameClanDepot/GameClanRepairIcon";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import SortList, { SortItem } from "../../../layout/SortList/SortList";
import { useSort } from "../../../../hooks/useSort";
import GameClanDepotBlockIcon from "../../../layout/icons/game/GameClanPage/GameClanDepot/GameClanDepotBlockIcon";

import {
  tool13Image,
  tool14Image,
  tool10Image,
  tool6Image,
  tool4Image,
  tool11Image,
  tool17Image,
  tool2Image,
  tool8Image,
  tool1Image,
  tool15Image,
  tool16Image,
  tool7Image,
  tool12Image,
  tool19Image,
  tool3Image,
  tool5Image,
  tool9Image,
  tool18Image,
} from "../../../../assets/images";

interface StoragePlace {
  count?: number;
  image?: string;
  blocked?: boolean;
}

const storageData: StoragePlace[] = [
  { count: 1, image: tool13Image },
  { count: 1, image: tool14Image },
  { count: 1, image: tool10Image },
  { count: 1, image: tool6Image },
  { count: 1, image: tool4Image },
  { count: 1, image: tool11Image },
  { count: 1, image: tool17Image },
  { count: 1, image: tool2Image },
  { count: 1, image: tool8Image },
  { count: 1, image: tool1Image },
  { count: 1, image: tool15Image },
  { count: 1, image: tool16Image },
  { count: 1, image: tool7Image },
  { count: 1, image: tool12Image },
  { count: 6, image: tool19Image },
  { count: 10, image: tool3Image },
  { count: 2, image: tool5Image },
  { count: 3, image: tool9Image },
  { count: 9, image: tool18Image },
  {},
  {},
  {},
  {},
  {},
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
  { blocked: true },
];

const tabs: TabBarItem[] = [
  {
    icon: <GameClanStorageIcon />,
    id: "storage",
  },
  {
    icon: <GameClanSkinsIcon />,
    id: "skins",
  },
  {
    icon: <GameClanLevelsIcon />,
    id: "levels",
  },
  {
    icon: <GameClanRepairIcon />,
    id: "repair",
  },
];

const sortItems: SortItem[] = [
  {
    name: "Тип",
    id: "type",
  },
  {
    name: "Количество",
    id: "count",
  },
  {
    name: "Качество",
    id: "qualty",
  },
];

const GameClanDepot: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("storage");
  const { activeSort, handleSortChange } = useSort();
  return (
    <section className={styles.gameClanDepot}>
      <Tabbar
        tabs={tabs}
        activeTabId={activeTabId}
        onChange={(id) => setActiveTabId(id)}
      />

      <WrapperWithFrame className={styles.gameClanDepot__wrapper}>
        <div className={styles.gameClanDepot__main}>
          <SortList
            items={sortItems}
            onChange={handleSortChange}
            activeSort={activeSort}
          />
          <div className={styles.gameClanDepot__list}>
            {storageData.map((place, index) => (
              <button className={styles.gameClanDepot__listItem} key={index}>
                {place.image && (
                  <img src={place.image} alt="tool" className={styles.gameClanDepot__img} />
                )}
                {(place.count || 0) > 1 && (
                  <span className={styles.gameClanDepot__countText}></span>
                )}
                {place.blocked && <GameClanDepotBlockIcon />}
              </button>
            ))}
          </div>
        </div>
      </WrapperWithFrame>
    </section>
  );
};

export default GameClanDepot;
