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
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

const { membersText, treasuryText, buildsText } =
  TRANSLATIONS.influence.myClan.tabs;
const tabs = [
  {
    name: membersText,
    icon: <MembersIcon />,
    component: <InfluenceMyClanMembers />,
  },
  {
    name: treasuryText,
    icon: <TressuryIcon />,
    component: <InfluenceMyClanTreasury />,
  },
  {
    name: buildsText,
    icon: <BuildsIcon />,
    component: <InfluenceMyClanBuids />,
  },
];

const InfluenceMyClanTabs = () => {
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const selectedTab = tabs[selectedTabIndex];
  return (
    <div className={styles.influenceMyClanTabs}>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomIn}
        className={styles.influenceMyClanTabs__bar}
      >
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
            <span>{tab.name[language]}</span>
          </button>
        ))}
      </TransitionProvider>
      {selectedTab?.component}
    </div>
  );
};

export default InfluenceMyClanTabs;
