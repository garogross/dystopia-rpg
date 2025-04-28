import React from "react";

import styles from "./InventoryList.module.scss";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import GameClanDepotBlockIcon from "../icons/game/GameClanPage/GameClanDepot/GameClanDepotBlockIcon";
import SelectMarkIcon from "../icons/game/Common/SelectMarkIcon";

export interface InventoryListItem {
  id: string;
  count?: number;
  image?: string;
  blocked?: boolean;
  disabled?: boolean;
  active?: boolean;
  selected?: boolean;
}
interface Props {
  data: InventoryListItem[];
  onSelect?: (id: string) => void;
}

const InventoryList: React.FC<Props> = ({ data, onSelect }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.inventoryList}>
      {data.map((place, index) => (
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          delay={100 * index}
          key={index}
          className={styles.inventoryList__item}
        >
          <button
            disabled={place.disabled}
            className={`${styles.inventoryList__itemBtn} ${
              place.active || place.selected
                ? styles.inventoryList__itemBtn_active
                : ""
            }`}
            key={index}
            onClick={() => onSelect?.(place.id)}
          >
            {place.image && (
              <img
                src={place.image}
                alt="tool"
                className={styles.inventoryList__img}
              />
            )}
            {(place.count || 0) > 1 && (
              <span className={styles.inventoryList__countText}>
                {place.count}
              </span>
            )}
            {place.selected && (
              <span className={styles.inventoryList__selectedMark}>
                <SelectMarkIcon />
              </span>
            )}
            {place.blocked && <GameClanDepotBlockIcon />}
          </button>
        </TransitionProvider>
      ))}
    </div>
  );
};

export default InventoryList;
