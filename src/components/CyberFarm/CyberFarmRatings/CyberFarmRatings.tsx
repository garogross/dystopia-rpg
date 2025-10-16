import React, { ReactNode, useEffect, useState } from "react";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import GradientInput from "../../layout/GradientInput/GradientInput";
import Table from "../../layout/Table/Table";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

import styles from "./CyberFarmRatings.module.scss";
import { SearchLupeLgIcon } from "../../layout/icons/Common";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getRatingsList } from "../../../store/slices/cyberFarm/ratingsSlice";
import { ELanguages } from "../../../constants/ELanguages";
import {
  BuildingsIcon,
  GeneralIcon,
} from "../../layout/icons/CyberFarmEvo/Ratings";

const {
  titleText,
  searchPlaceholder,
  playerTabText,
  realEstateTabText,
  pointsTabText,
  overallTabText,
} = TRANSLATIONS.cyberFarm.ratings;
const headers = ["№", playerTabText, pointsTabText];

const cols: {
  key: "name" | "index" | "score";
}[] = [{ key: "index" }, { key: "name" }, { key: "score" }];

const columnsTemplate = "0.5fr 2fr 1fr";
const getTabItems = (
  language: ELanguages
): {
  name: string;
  id: "builings" | "general"; // "technology" |
  icon: ReactNode;
}[] => [
  {
    name: realEstateTabText[language],
    id: "builings",
    icon: <BuildingsIcon />,
  },
  // { name: technologyTabText[language], id: "technology",icon: <TechnologyIcon/> },
  { name: overallTabText[language], id: "general", icon: <GeneralIcon /> },
];
const CyberFarmRatings = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(
    (state) => state.cyberfarm.ratings.wealthRankData
  );
  const myRank = useAppSelector((state) => state.cyberfarm.ratings.myRank);
  const tgid = useAppSelector((state) => state.profile.tgId);
  const username = useAppSelector((state) => state.profile.username);
  const language = useAppSelector((state) => state.ui.language);
  const [searchQuery, setSearchQuery] = useState("");
  const tabItems = getTabItems(language);
  const [activeTab, setActiveTab] = useState(tabItems[0].id);

  const data = [
    ...(ratings || []).map((item, index) => {
      const values = {
        builings: item.structures_value,
        general: item.total_value,
      };
      return {
        id: item.user_id,
        name: item.name,
        score: values[activeTab],
      };
    }),
  ]
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, index: index + 1 }));

  let curUserIndex = data?.findIndex((item) => item.id === tgid);
  const values = {
    builings: myRank?.structures?.structures_value,
    general: myRank?.structures?.total,
  };
  if (curUserIndex === -1) {
    data.push({
      id: +tgid,
      name: username,
      score: values[activeTab] || 0,
      index: myRank?.structures.rank || -1,
    });
    curUserIndex = data.length - 1;
  }

  useEffect(() => {
    dispatch(getRatingsList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`container ${styles.cyberFarmRatings}`}>
      <HeaderWithBackButton withDotlines title={titleText[language]} />
      <GradientInput
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        icon={<SearchLupeLgIcon />}
        placeholder={searchPlaceholder[language]}
      />
      <div className={styles.cyberFarmRatings__tabBar}>
        {tabItems.map((item) => (
          <button
            onClick={() => setActiveTab(item.id)}
            key={item.id}
            className={`${styles.cyberFarmRatings__taBtn} ${
              item.id === activeTab ? styles.cyberFarmRatings__taBtn_active : ""
            }`}
          >
            <span>{item.name}</span>
            {item.icon}
          </button>
        ))}
      </div>
      {data && (
        <div className={styles.cyberFarmRatings__tableWrapper}>
          <Table
            columnsTemplate={columnsTemplate}
            headers={headers}
            data={data}
            cols={cols}
            activeItemIndex={curUserIndex}
          />
        </div>
      )}
    </div>
  );
};

export default CyberFarmRatings;
