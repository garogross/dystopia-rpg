import React from "react";
import Accordion from "../../../layout/Accordion/Accordion";
import Table from "../../../layout/Table/Table";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { cpImageWebp } from "../../../../assets/imageMaps";

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

const InfluenceMyClanTreasury = () => {
  return (
    <div className="influenceMyClanTreasury">
      <div className="influenceMyClanTreasury__header">
        <div className="influenceMyClanTreasury__headerInner">
          <div className="influenceMyClanTreasury__curBalance">
            <span className="influenceMyClanTreasury__curBalance__text"></span>
            <div className="influenceMyClanTreasury__corBalanceDotsLine"></div>
            <img
              src=""
              alt=""
              className="influenceMyClanTreasury__curBalanceCpImg"
            />
          </div>
          <button className="influenceMyClanTreasury__btn">
            <div className="influenceMyClanTreasury__btnInner"></div>
          </button>
        </div>
      </div>
      <div className="influenceMyClanTreasury__accordions">
        <Accordion title={"Статистика вложений"}>
          <div className="influenceMyClanTreasury__statisticsContainer">
            <Table
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
                        src={"influenceMyClanTreasury__cpImage"}
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
            <button className="influenceMyClanTreasury__btn">
              <div className="influenceMyClanTreasury__btnInner"></div>
            </button>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default InfluenceMyClanTreasury;
