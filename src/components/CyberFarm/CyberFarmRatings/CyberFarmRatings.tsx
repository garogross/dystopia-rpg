import React, { useEffect, useState } from "react";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import GradientInput from "../../layout/GradientInput/GradientInput";
import Table from "../../layout/Table/Table";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

import styles from "./CyberFarmRatings.module.scss";
import { SearchLupeLgIcon } from "../../layout/icons/Common";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getRatingsList } from "../../../store/slices/cyberFarm/ratingsSlice";
import SortList from "../../layout/SortList/SortList";
import { ELanguages } from "../../../constants/ELanguages";
import { useSort } from "../../../hooks/useSort";

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
const getSortItems = (
  language: ELanguages
): { name: string; id: "builings" | "technology" | "general" }[] => [
  { name: realEstateTabText[language], id: "builings" },
  { name: technologyTabText[language], id: "technology" },
  { name: overallTabText[language], id: "general" },
];
const CyberFarmRatings = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(
    (state) => state.cyberfarm.ratings.wealthRankData
  );
  const tgid = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const [searchQuery, setSearchQuery] = useState("");
  const sortItems = getSortItems(language);
  const { activeSort, handleSortChange } = useSort<(typeof sortItems)[0]["id"]>(
    sortItems[0].id
  );

  const data = [
    ...(ratings || []).map((item, index) => ({
      id: item.user_id,
      name: item.name,
      builings: item.structures_value,
      technology: 0,
      general: item.total_value,
    })),
  ]
    .sort((a, b) => {
      if (!activeSort) return 0;

      // Extract sort key and direction
      const match = activeSort.match(/^(\w+)([+-])$/);
      if (!match) return 0;
      const [, sortKey, direction] = match as [string, string, "+" | "-"];

      // @ts-ignore
      const aValue = a[sortKey];
      // @ts-ignore
      const bValue = b[sortKey];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "+" ? bValue - aValue : aValue - bValue;
      }
      // fallback to string comparison if not numbers
      return direction === "+"
        ? String(bValue).localeCompare(String(aValue))
        : String(aValue).localeCompare(String(bValue));
    })
    .map((item, index) => ({ ...item, index: index + 1 }));

  const curUserIndex = data?.findIndex((item) => item.id === tgid);

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
      <SortList
        items={sortItems}
        itemClassName={styles.cyberFarmRatings__sortItem}
        onChange={(id) => handleSortChange(id as (typeof sortItems)[0]["id"])}
        activeSort={activeSort}
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
