import React from "react";

import styles from "./GameCharacterInventoryList.module.scss";
import Tabbar, { TabBarItem } from "../../../../layout/Tabbar/Tabbar";
import GameCharacterInventoryDepotIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterInventory/tabbar/GameCharacterInventoryDepotIcon";
import GameCharacterInventoryUpgradeIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterInventory/tabbar/GameCharacterInventoryUpgradeIcon";
import GameCharacterInventoryRepairIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterInventory/tabbar/GameCharacterInventoryRepairIcon";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import SortList, { SortItem } from "../../../../layout/SortList/SortList";
import InventoryList, { InventoryListItem } from "../../../../layout/InventoryList/InventoryList";
import { tool10Image, tool11Image, tool13Image, tool14Image, tool17Image, tool1Image, tool2Image, tool4Image, tool6Image, tool8Image } from "../../../../../assets/images";
import { tool15Image, tool16Image, tool12Image, tool7Image, tool19Image, tool3Image, tool5Image, tool9Image } from "../../../../../assets/images";
import { tool18Image } from "../../../../../assets/images";

const tabs: TabBarItem[] = [
  {
    id: "depot",
    icon: <GameCharacterInventoryDepotIcon />,
  },
  {
    id: "upgrade",
    icon: <GameCharacterInventoryUpgradeIcon />,
  },
  {
    id: "repair",
    icon: <GameCharacterInventoryRepairIcon />,
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
    id: "quality",
  },
];

const storageData: InventoryListItem[] = [
  { id: "tool13", count: 1, image: tool13Image, selected: true },
  { id: "tool14", count: 1, image: tool14Image },
  { id: "tool10", count: 1, image: tool10Image },
  { id: "tool6", count: 1, image: tool6Image },
  { id: "tool4", count: 1, image: tool4Image },
  { id: "tool11", count: 1, image: tool11Image },
  { id: "tool17", count: 1, image: tool17Image, selected: true },
  { id: "tool2", count: 1, image: tool2Image },
  { id: "tool8", count: 1, image: tool8Image },
  { id: "tool1", count: 1, image: tool1Image },
  { id: "tool15", count: 1, image: tool15Image },
  { id: "tool16", count: 1, image: tool16Image },
  { id: "tool7", count: 1, image: tool7Image },
  { id: "tool12", count: 1, image: tool12Image, selected: true },
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
];

const GameCharacterInventoryList = () => {
  return (
    <div style={{ flex: 1 }} className={styles.gameCharacterInventoryList}>
      <Tabbar tabs={tabs} onChange={() => {}} activeTabId={tabs[0].id} />
      <WrapperWithFrame size="md" className={styles.gameCharacterInventoryList__wrapper}>
        <div className={styles.gameCharacterInventoryList__main}>
          <SortList items={sortItems} onChange={() => {}} activeSort={""} />
          <InventoryList data={storageData} />
        </div>
      </WrapperWithFrame>
    </div>
  );
};

export default GameCharacterInventoryList;
