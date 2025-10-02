import React, { useEffect, useState } from "react";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import GradientInput from "../../layout/GradientInput/GradientInput";
import Table from "../../layout/Table/Table";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

import styles from "./CyberFarmRatings.module.scss";
import { SearchLupeLgIcon } from "../../layout/icons/Common";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getRatingsList } from "../../../store/slices/cyberFarm/ratingsSlice";

const {
  titleText,
  searchPlaceholder,
  playerTabText,
  realEstateTabText,
  technologyTabText,
  overallTabText,
} = TRANSLATIONS.cyberFarm.ratings;
const headers = [
  "№",
  playerTabText,
  realEstateTabText,
  technologyTabText,
  overallTabText,
];

const cols: {
  key: "name" | "builings" | "technology" | "general" | "index";
}[] = [
  { key: "index" },
  { key: "name" },
  { key: "builings" },
  { key: "technology" },
  { key: "general" },
];

const columnsTemplate = "0.5fr 2fr 1fr 1fr 1fr";

const CyberFarmRatings = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(
    (state) => state.cyberfarm.ratings.wealthRankData
  );
  const tgid = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const [searchQuery, setSearchQuery] = useState("");

  const data = ratings?.map((item, index) => ({
    id: item.user_id,
    index: index + 1,
    name: item.name,
    builings: item.structures_value,
    technology: 0,
    general: item.total_value,
  }));

  const curUserIndex = ratings?.findIndex((item) => item.user_id === tgid);

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
