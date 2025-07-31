import React from "react";
import Table from "../../../../layout/Table/Table";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import { cpImage, cpImageWebp } from "../../../../../assets/imageMaps";
import styles from "./InfluenceMyClanTreasuryStatistics.module.scss";
import { TRANSLATIONS } from "../../../../../constants/TRANSLATIONS";
import { getElapsedTime } from "../../../../../utils/getElapsedTime";
import { useAppSelector } from "../../../../../hooks/redux";

const headers = Object.values(
  TRANSLATIONS.influence.myClan.tressury.statistics
);
const statisticsData = [
  ...Array.from({ length: 10 }, (_, i) => ({
    username: [
      "ShadowWolf",
      "IronFist",
      "NightHawk",
      "StormRider",
      "FireBlade",
      "SilverFox",
      "DarkKnight",
      "ThunderCat",
      "FrostMage",
      "SunWarrior",
    ][i],
    cp: Math.floor(Math.random() * 100) + 1,
    date: Date.now() - 5 * 24 * 60 * 60 * 1000,
  })),
];

const InfluenceMyClanTreasuryStatistics = () => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <Table
      withoutBorder
      columnsTemplate={"1fr 1fr 1fr"}
      headers={headers}
      data={statisticsData}
      cols={[
        {
          key: "username",
        },
        {
          key: "cp",
          render: (item) => (
            <>
              <span>{item.cp}</span>
              <ImageWebp
                className={styles.influenceMyClanTreasuryStatistics__cpImage}
                src={cpImage}
                srcSet={cpImageWebp}
                alt="cp"
              />{" "}
            </>
          ),
        },
        {
          key: "date",
          render: (item) => getElapsedTime(item.date, language),
        },
      ]}
    />
  );
};

export default InfluenceMyClanTreasuryStatistics;
