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

interface Props {
  show: boolean;
  onClose: () => void;
}

const historyData = [
  {
    username: "Игрок1",
    actionType: "fillUp",
    count: 15,
    date: "1 мин. назад",
  },
  {
    username: "Игрок2",
    actionType: "fillDown",
    count: 5,
    date: "2 мин. назад",
  },
  {
    username: "Игрок3",
    actionType: "fillUp",
    count: 20,
    date: "3 мин. назад",
  },
  {
    username: "Игрок4",
    actionType: "fillDown",
    count: 8,
    date: "4 мин. назад",
  },
  {
    username: "Игрок5",
    actionType: "fillUp",
    count: 12,
    date: "5 мин. назад",
  },
  {
    username: "Игрок6",
    actionType: "fillDown",
    count: 7,
    date: "6 мин. назад",
  },
  {
    username: "Игрок7",
    actionType: "fillUp",
    count: 18,
    date: "7 мин. назад",
  },
  {
    username: "Игрок8",
    actionType: "fillDown",
    count: 6,
    date: "8 мин. назад",
  },
  {
    username: "Игрок9",
    actionType: "fillUp",
    count: 14,
    date: "9 мин. назад",
  },
  {
    username: "Игрок10",
    actionType: "fillDown",
    count: 9,
    date: "10 мин. назад",
  },
  {
    username: "Игрок11",
    actionType: "fillUp",
    count: 11,
    date: "11 мин. назад",
  },
  {
    username: "Игрок12",
    actionType: "fillDown",
    count: 4,
    date: "12 мин. назад",
  },
  {
    username: "Игрок13",
    actionType: "fillUp",
    count: 17,
    date: "13 мин. назад",
  },
  {
    username: "Игрок14",
    actionType: "fillDown",
    count: 10,
    date: "14 мин. назад",
  },
  {
    username: "Игрок15",
    actionType: "fillUp",
    count: 13,
    date: "15 мин. назад",
  },
  {
    username: "Игрок16",
    actionType: "fillDown",
    count: 3,
    date: "16 мин. назад",
  },
  {
    username: "Игрок17",
    actionType: "fillUp",
    count: 16,
    date: "17 мин. назад",
  },
  {
    username: "Игрок18",
    actionType: "fillDown",
    count: 12,
    date: "18 мин. назад",
  },
  {
    username: "Игрок19",
    actionType: "fillUp",
    count: 19,
    date: "19 мин. назад",
  },
  {
    username: "Игрок20",
    actionType: "fillDown",
    count: 2,
    date: "20 мин. назад",
  },
];

const InfluenceMyClanTreasuryHistory: React.FC<Props> = ({ onClose, show }) => {
  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.opacity}
      className={styles.influenceMyClanTreasuryHistory}
    >
      <div className={styles.influenceMyClanTreasuryHistory__inner}>
        <div className={styles.influenceMyClanTreasuryHistory__header}>
          <h3 className={styles.influenceMyClanTreasuryHistory__titleText}>
            Журнал вложений/получений ОД
          </h3>
          <HeaderBtn type={"close"} onClick={onClose} />
        </div>
        <Table
          withoutBorder
          headers={["Участник", "Действие", "Количество", "Дата"]}
          data={historyData}
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
                      <span>Забрал</span>
                    </>
                  ) : (
                    <>
                      <HistoryFillUpIcon />
                      <span>Попoлнил</span>
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
            },
          ]}
        />
      </div>
    </TransitionProvider>
  );
};

export default InfluenceMyClanTreasuryHistory;
