import React, { useState } from "react";
import styles from "./Loyality.module.scss";
import LoyalityHeader from "../LoyalityHeader/LoyalityHeader";
import LoyalitySupportProject from "../LoyalitySupportProject/LoyalitySupportProject";
import { LoyalitySupportProjectIcon } from "../../layout/icons/Loyality/tabbar";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";
import { TranslationItemType } from "../../../types/TranslationItemType";

interface Props {
  isRpg?: boolean;
}
const { supportProject } = TRANSLATIONS.loyality.tabs;

const tabs: {
  name: TranslationItemType;
  key: string;
  icon: JSX.Element;
  component: JSX.Element;
  title: TranslationItemType;
  text: TranslationItemType;
  statText?: TranslationItemType;
  statValue?: number;
  total?: number;
}[] = [
  {
    name: supportProject.name,
    key: "support-project",
    icon: <LoyalitySupportProjectIcon />,
    component: <LoyalitySupportProject />,
    title: supportProject.title,
    text: supportProject.text,
  },
  // {
  //   name: activity.name,
  //   key: "activity",
  //   icon: <LoyalityActivityIcon />,
  //   component: <LoyalityActivity />,
  //   title: activity.title,
  //   text: activity.text,
  //   statText: activity.statText,
  //   statValue: 0,
  // },
  // {
  //   name: tasks.name,
  //   key: "tasks",
  //   icon: <LoyalityTasksIcon />,
  //   component: <LoyalityTasks />,
  //   title: tasks.title,
  //   text: tasks.text,
  //   statText: tasks.statText,
  //   disabledForFarm: true,
  //   total: 50,
  // },

  // {
  //   name: store.name,
  //   key: "store",
  //   icon: <LoyalityStoreIcon />,
  //   component: <LoyalityStore />,
  //   title: store.title,
  //   text: store.text,
  //   statText: store.statText,
  //   disabledForFarm: true,
  //   total: 50,
  // },
];

const Loyality: React.FC<Props> = ({ isRpg }) => {
  const dailyRewardAvailableDay = useAppSelector(
    (state) => state.cyberfarm.activity.dailyRewardAvailableDay
  );
  const [activeTab] = useState<string>(tabs[0].key);
  const updatedTabs = tabs.map((tab, index) =>
    tab.key === "activity"
      ? { ...tab, statValue: dailyRewardAvailableDay }
      : tab
  );
  const activeTabDetails = updatedTabs.find((tab) => tab.key === activeTab);

  return (
    <section className={`${styles.loyality} container`}>
      <LoyalityHeader />
      {/* <LoyalityTabbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={updatedTabs}
        isRpg={isRpg}
      /> */}
      {/* {activeTabDetails && (
        <LoyalityInfo
          title={activeTabDetails?.title[language]}
          text={activeTabDetails?.text[language]}
          statText={
            activeTabDetails?.statText
              ? activeTabDetails?.statText[language]
              : ""
          }
          statValue={activeTabDetails.statValue}
          total={activeTabDetails.total}
        />
      )} */}
      {activeTabDetails && activeTabDetails.component}
    </section>
  );
};

export default Loyality;
