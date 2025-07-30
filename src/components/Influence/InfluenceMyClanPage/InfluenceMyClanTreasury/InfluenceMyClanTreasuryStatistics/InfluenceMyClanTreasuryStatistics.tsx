import React from "react";
import Table from "../../../../layout/Table/Table";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import { cpImage, cpImageWebp } from "../../../../../assets/imageMaps";
import styles from "./InfluenceMyClanTreasuryStatistics.module.scss";
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
    date: `${Math.floor(Math.random() * 59) + 1} мин. назад`,
  })),
];

const InfluenceMyClanTreasuryStatistics = () => {
  return (
    <Table
      withoutBorder
      columnsTemplate={"1fr 1fr 1fr"}
      headers={["Участник", "Вложено[CP]", "Дата пополнений"]}
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
        },
      ]}
    />
  );
};

export default InfluenceMyClanTreasuryStatistics;
