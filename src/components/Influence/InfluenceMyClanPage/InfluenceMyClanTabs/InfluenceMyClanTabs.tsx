import React, { useState } from "react";
import {
  BuildsIcon,
  MembersIcon,
  TressuryIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanTabs";
import InfluenceMyClanMembers from "../InfluenceMyClanMembers/InfluenceMyClanMembers";
import InfluenceMyClanTreasury from "../InfluenceMyClanTreasury/InfluenceMyClanTreasury";
import InfluenceMyClanBuids from "../InfluenceMyClanBuids/InfluenceMyClanBuids";

import styles from "./InfluenceMyClanTabs.module.scss";
const tabs = [
  {
    name: "СОСТАВ",
    icon: <MembersIcon />,
    component: <InfluenceMyClanMembers />,
  },
  {
    name: "КАЗНА",
    icon: <TressuryIcon />,
    component: <InfluenceMyClanTreasury />,
  },
  {
    name: "СТРОЕНИЯ",
    icon: <BuildsIcon />,
    component: <InfluenceMyClanBuids />,
  },
];

const InfluenceMyClanTabs = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const selectedTab = tabs[selectedTabIndex];
  return (
    <div className={styles.influenceMyClanTabs}>
      <div className={styles.influenceMyClanTabs__bar}>
        {tabs.map((tab, index) => (
          <button
            onClick={() => setSelectedTabIndex(index)}
            key={index}
            className={`${styles.influenceMyClanTabs__tabBtn} ${
              index === selectedTabIndex
                ? styles.influenceMyClanTabs__tabBtn_active
                : ""
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
      {selectedTab?.component}
    </div>
  );
};

export default InfluenceMyClanTabs;
