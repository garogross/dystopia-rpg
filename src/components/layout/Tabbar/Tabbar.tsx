import React, { ReactNode } from "react";

import styles from "./Tabbar.module.scss";

export interface TabBarItem {
  icon: ReactNode;
  id: string;
  isIconStroke?: boolean
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
  return (
    <nav className={`${styles.tabbar} ${className || ""}`}>
      {tabs.map((tab) => (
        <button
          onClick={() => onChange(tab.id)}
          className={`${styles.tabbar__item} ${
            activeTabId === tab.id ? styles.tabbar__item_active : ""
          } ${tab.isIconStroke ? styles.tabbar__item_stroked : ""}`}
          key={tab.id}
        >
          {tab.icon}
        </button>
      ))}
    </nav>
  );
};

export default Tabbar;
