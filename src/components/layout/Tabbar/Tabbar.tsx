import React, { ReactNode } from "react";

import styles from "./Tabbar.module.scss";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";

export interface TabBarItem {
  icon: ReactNode;
  id: string;
  isIconStroke?: boolean;
}

interface Props {
  tabs: TabBarItem[];
  onChange: (id: string) => void;
  activeTabId: string;
  className?: string;
}

const Tabbar: React.FC<Props> = ({
  tabs,
  onChange,
  activeTabId,
  className,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <nav className={`${styles.tabbar} ${className || ""}`}>
      {tabs.map((tab, index) => (
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.left}
          delay={100 * index}
          className={styles.tabbar__item}
        >
          <button
            onClick={() => onChange(tab.id)}
            className={`${styles.tabbar__itemBtn} ${
              activeTabId === tab.id ? styles.tabbar__itemBtn_active : ""
            } ${tab.isIconStroke ? styles.tabbar__itemBtn_stroked : ""}`}
            key={tab.id}
          >
            {tab.icon}
          </button>
        </TransitionProvider>
      ))}
    </nav>
  );
};

export default Tabbar;
