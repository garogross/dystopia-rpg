import React from "react";

import styles from "./SortList.module.scss";
import { ArrowIcon } from "../icons/Common";
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
  disabled?: boolean;
}

const SortList: React.FC<Props> = ({
  items,
  activeSort,
  onChange,
  className,
  disabled,
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
          onClick={() => {
            if (disabled) return;
            onChange(item.id);
          }}
          className={styles.sortList__item}
          key={item.id}
        >
          <span>{item.name}</span>
          {!disabled && (
            <ArrowIcon
              rotate={
                activeSort.startsWith(item.id) && activeSort.endsWith("+")
              }
            />
          )}{" "}
        </button>
      ))}
    </TransitionProvider>
  );
};

export default SortList;
