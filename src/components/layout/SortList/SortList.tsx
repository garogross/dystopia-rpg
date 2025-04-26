import React from "react";

import styles from "./SortList.module.scss";
import SortArrow from "../icons/game/Common/SortArrow";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";

export interface SortItem {
  name: string;
  id: string;
}

interface Props {
  items: SortItem[];
  onChange: (id: string) => void;
  activeSort: string;
  className?: string;
}

const SortList: React.FC<Props> = ({
  items,
  activeSort,
  onChange,
  className,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={`${styles.sortList} ${className || ""}`}
    >
      {items.map((item) => (
        <button
          onClick={() => onChange(item.id)}
          className={`${styles.sortList__item} ${
            activeSort.startsWith(item.id) && activeSort.endsWith("+")
              ? styles.sortList__item_up
              : ""
          }`}
          key={item.id}
        >
          <span>{item.name}</span>
          <SortArrow />
        </button>
      ))}
    </TransitionProvider>
  );
};

export default SortList;
