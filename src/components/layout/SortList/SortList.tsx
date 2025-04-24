import React from "react";

import styles from "./SortList.module.scss";
import SortArrow from "../icons/game/Common/SortArrow";

export interface SortItem {
  name: string;
  id: string;
}

interface Props {
  items: SortItem[];
  onChange: (id: string) => void;
  activeSort: string;
}

const SortList: React.FC<Props> = ({ items, activeSort, onChange }) => {
  return (
    <div className={styles.sortList}>
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
    </div>
  );
};

export default SortList;
