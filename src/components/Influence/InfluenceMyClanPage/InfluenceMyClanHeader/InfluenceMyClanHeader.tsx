import React from "react";
import { influenceClans } from "../../../../dummyData/influenceClans";
import { EditIcon } from "../../../layout/icons/Common";
import { DotsLineFullscreen } from "../../../layout/icons/Common/DotsLineFullscreen";
import {
  FoundedIcon,
  IdIcon,
  LeaderIcon,
  MembersIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanHeader";

import styles from "./InfluenceMyClanHeader.module.scss";

const stats = [
  {
    icon: <MembersIcon />,
    name: "Участники",
    value: "45/50",
  },
  {
    icon: <FoundedIcon />,
    name: "Основан",
    value: "15 д. назад",
  },
  {
    icon: <LeaderIcon />,
    name: "Глава",
    value: "Ластман63",
  },
  {
    icon: <IdIcon />,
    name: "ID клана",
    value: "GO0147CZ",
  },
];

const InfluenceMyClanHeader = () => {
  const clan = influenceClans[0];

  return (
    <header className={styles.influenceMyClanHeader}>
      <div className={styles.influenceMyClanHeader__main}>
        <img
          src={clan.image}
          alt="clan"
          className={styles.influenceMyClanHeader__img}
        />
        <div className={styles.influenceMyClanHeader__mainInfo}>
          <div className={styles.influenceMyClanHeader__mainInfotopBlock}>
            <h4 className={styles.influenceMyClanHeader__nameText}>
              {clan.name}
            </h4>
            <h5 className={styles.influenceMyClanHeader__levelText}>
              Уровень {clan.level}
            </h5>
            <button className={styles.influenceMyClanHeader__editBtn}>
              <EditIcon />
            </button>
          </div>
          <p className={styles.influenceMyClanHeader__descriptionText}>
            {clan.description}
          </p>
          <p className={styles.influenceMyClanHeader__progressText}>
            Прогресс повышения [9863/10000]
          </p>
          <div className={styles.influenceMyClanHeader__progressBar}>
            <div className={styles.influenceMyClanHeader__progressBarContainer}>
              <div
                className={styles.influenceMyClanHeader__progressBarinner}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.influenceMyClanHeader__dotsLine}>
        <DotsLineFullscreen preserveAspectRatio />
      </div>
      <div className={styles.influenceMyClanHeader__stats}>
        {stats.map((item, index) => (
          <div key={index} className={styles.influenceMyClanHeader__statItem}>
            {item.icon}
            <span>
              <strong>{item.name}</strong> {item.value}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default InfluenceMyClanHeader;
