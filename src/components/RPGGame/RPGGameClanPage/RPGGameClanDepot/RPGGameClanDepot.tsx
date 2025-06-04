import React, { useState } from "react";
import styles from "./RPGGameClanDepot.module.scss";
import Tabbar, { TabBarItem } from "../../../layout/Tabbar/Tabbar";
import {RPGGameClanStorageIcon,
  RPGGameClanSkinsIcon,
RPGGameClanLevelsIcon,
RPGGameClanRepairIcon,
} from "../../../layout/icons/RPGGame/RPGGameClanPage/RPGGameClanDepot";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import SortList, { SortItem } from "../../../layout/SortList/SortList";
import { useSort } from "../../../../hooks/useSort";

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
} from "../../../../assets/imageMaps";
import InventoryList, {
  InventoryListItem,
} from "../../../layout/InventoryList/InventoryList";

const storageData: InventoryListItem[] = [
  { id: "tool13", count: 1, image: tool13Image },
  { id: "tool14", count: 1, image: tool14Image },
  { id: "tool10", count: 1, image: tool10Image },
  { id: "tool6", count: 1, image: tool6Image },
  { id: "tool4", count: 1, image: tool4Image },
  { id: "tool11", count: 1, image: tool11Image },
  { id: "tool17", count: 1, image: tool17Image },
  { id: "tool2", count: 1, image: tool2Image },
  { id: "tool8", count: 1, image: tool8Image },
  { id: "tool1", count: 1, image: tool1Image },
  { id: "tool15", count: 1, image: tool15Image },
  { id: "tool16", count: 1, image: tool16Image },
  { id: "tool7", count: 1, image: tool7Image },
  { id: "tool12", count: 1, image: tool12Image },
  { id: "tool19", count: 6, image: tool19Image },
  { id: "tool3", count: 10, image: tool3Image },
  { id: "tool5", count: 2, image: tool5Image },
  { id: "tool9", count: 3, image: tool9Image },
  { id: "tool18", count: 9, image: tool18Image },
  { id: "empty1" },
  { id: "empty2" },
  { id: "empty3" },
  { id: "empty4" },
  { id: "empty5" },
  { id: "blocked1", blocked: true },
  { id: "blocked2", blocked: true },
  { id: "blocked3", blocked: true },
  { id: "blocked4", blocked: true },
  { id: "blocked5", blocked: true },
  { id: "blocked6", blocked: true },
  { id: "blocked7", blocked: true },
  { id: "blocked8", blocked: true },
  { id: "blocked9", blocked: true },
  { id: "blocked10", blocked: true },
  { id: "blocked11", blocked: true },
  { id: "blocked12", blocked: true },
];

const tabs: TabBarItem[] = [
  {
    icon: <RPGGameClanStorageIcon />,
    id: "storage",
  },
  {
    icon: <RPGGameClanSkinsIcon />,
    id: "skins",
  },
  {
    icon: <RPGGameClanLevelsIcon />,
    id: "levels",
  },
  {
    icon: <RPGGameClanRepairIcon />,
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

const RPGGameClanDepot: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("storage");
  const { activeSort, handleSortChange } = useSort();
  return (
    <section className={styles.rpgGameClanDepot}>
      <Tabbar
        tabs={tabs}
        activeTabId={activeTabId}
        onChange={(id) => setActiveTabId(id)}
      />

      <WrapperWithFrame className={styles.rpgGameClanDepot__wrapper}>
        <div className={styles.rpgGameClanDepot__main}>
          <SortList
            items={sortItems}
            onChange={handleSortChange}
            activeSort={activeSort}
          />
          <InventoryList data={storageData} />
        </div>
      </WrapperWithFrame>
    </section>
  );
};

export default RPGGameClanDepot;
