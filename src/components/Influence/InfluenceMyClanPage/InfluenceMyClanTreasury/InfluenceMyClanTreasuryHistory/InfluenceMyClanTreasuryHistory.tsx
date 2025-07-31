import React from "react";

import styles from "./InfluenceMyClanTreasuryHistory.module.scss";
import HeaderBtn from "../../../../layout/HeaderBtn/HeaderBtn";
import Table from "../../../../layout/Table/Table";
import {
  HistoryFillDownIcon,
  HistoryFillUpIcon,
} from "../../../../layout/icons/Influence/InfluenceMyClanTreasury";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import {
  influenceEnergyImage,
  influenceEnergyImageWebp,
} from "../../../../../assets/imageMaps";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../../hooks/redux";
import { getElapsedTime } from "../../../../../utils/getElapsedTime";

const { titleText, headersText, actionsText } =
  TRANSLATIONS.influence.myClan.tressury.apStorage.history;

interface Props {
  show: boolean;
  onClose: () => void;
}

const historyData = [
  {
    username: "Игрок1",
    actionType: "fillUp",
    count: 15,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок2",
    actionType: "fillDown",
    count: 5,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок3",
    actionType: "fillUp",
    count: 20,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок4",
    actionType: "fillDown",
    count: 8,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок5",
    actionType: "fillUp",
    count: 12,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок6",
    actionType: "fillDown",
    count: 7,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок7",
    actionType: "fillUp",
    count: 18,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок8",
    actionType: "fillDown",
    count: 6,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок9",
    actionType: "fillUp",
    count: 14,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок10",
    actionType: "fillDown",
    count: 9,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок11",
    actionType: "fillUp",
    count: 11,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок12",
    actionType: "fillDown",
    count: 4,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок13",
    actionType: "fillUp",
    count: 17,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок14",
    actionType: "fillDown",
    count: 10,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок15",
    actionType: "fillUp",
    count: 13,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок16",
    actionType: "fillDown",
    count: 3,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок17",
    actionType: "fillUp",
    count: 16,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок18",
    actionType: "fillDown",
    count: 12,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок19",
    actionType: "fillUp",
    count: 19,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
  {
    username: "Игрок20",
    actionType: "fillDown",
    count: 2,
    date: Date.now() - Math.floor(Math.random() * 20 * 60 * 1000),
  },
];

const InfluenceMyClanTreasuryHistory: React.FC<Props> = ({ onClose, show }) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.opacity}
      className={styles.influenceMyClanTreasuryHistory}
    >
      <div className={styles.influenceMyClanTreasuryHistory__inner}>
        <div className={styles.influenceMyClanTreasuryHistory__header}>
          <h3 className={styles.influenceMyClanTreasuryHistory__titleText}>
            {titleText[language]}
          </h3>
          <HeaderBtn type={"close"} onClick={onClose} />
        </div>
        <Table
          withoutBorder
          headers={Object.values(headersText)}
          data={historyData}
          columnsTemplate="1.5fr 1fr 1fr 1fr"
          cols={[
            {
              key: "username",
            },
            {
              key: "actionType",
              render: (item) => (
                <>
                  {item.actionType === "fillDown" ? (
                    <>
                      <HistoryFillDownIcon />
                      <span>{actionsText.withdraw[language]}</span>
                    </>
                  ) : (
                    <>
                      <HistoryFillUpIcon />
                      <span>{actionsText.deposit[language]}</span>
                    </>
                  )}
                </>
              ),
            },
            {
              key: "count",
              render: (item) => (
                <>
                  <span>{item.count}</span>
                  <ImageWebp
                    srcSet={influenceEnergyImageWebp}
                    src={influenceEnergyImage}
                    alt={"action points"}
                    className={styles.influenceMyClanTreasuryHistory__apImage}
                  />
                </>
              ),
            },
            {
              key: "date",
              render: (item) => getElapsedTime(item.date, language),
            },
          ]}
        />
      </div>
    </TransitionProvider>
  );
};

export default InfluenceMyClanTreasuryHistory;
