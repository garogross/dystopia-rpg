import React, { ReactNode, useState } from "react";
import {
  ToggleIcon,
  // BuildingIcon,
  ControllIcon,
} from "../../../layout/icons/Influence/InfluenceMap";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  cpImage,
  cpImageWebp,
  hexIconImage,
  hexIconImageWebp,
  influencePointIconImage,
  influencePointIconImageWebp,
} from "../../../../assets/imageMaps";
import { DotsLine } from "../../../layout/icons/RPGGame/Common";

import styles from "./InfluenceMapControllModal.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { formatTime } from "../../../../utils/formatTime";
import { useFreshDateStateUpdate } from "../../../../hooks/useFreshDateStateUpdate";

const {
  // totalHexesText,
  // productionBuildingsText,
  // defenseBuildingsText,
  sessionTimeLeftText,
  sessionPrizePoolText,
  capturedHexesText,
  influencePointsText,
  rewardForecastText,
  clanControlTitleText,
} = TRANSLATIONS.influence.map.controllModal;

const SessionTimeLefTimer = () => {
  const durationHours = useAppSelector(
    (state) => state.influence.map.durationHours
  );
  const startDatetime = useAppSelector(
    (state) => state.influence.map.startDatetime
  );
  const freshDate = useAppSelector((state) => state.ui.freshDate);

  let remainingTimeMs: ReactNode = 0;
  if (startDatetime) {
    const startDate = new Date(startDatetime);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + durationHours);
    if (endDate.getTime() > freshDate)
      remainingTimeMs = (endDate.getTime() - freshDate) / 1000;
  }

  useFreshDateStateUpdate(!!remainingTimeMs);

  return <>{formatTime(remainingTimeMs)}</>;
};

const InfluenceMapControllModal = () => {
  const language = useAppSelector((state) => state.ui.language);
  const hexesCaptured = useAppSelector(
    (state) => state.influence.map.hexesCaptured
  );
  const influencePoints = useAppSelector(
    (state) => state.influence.influence.influencePoints
  );
  const mapRewardsInfo = useAppSelector(
    (state) => state.influence.map.mapRewardsInfo
  );
  const mapId = useAppSelector((state) => state.influence.map.mapId);
  const [open, setOpen] = useState(true);

  const curMapRewardsInfo = mapId ? mapRewardsInfo[mapId] : null;

  const controllModalStats = [
    {
      label: sessionTimeLeftText[language],
      value: <SessionTimeLefTimer />,
      icon: {
        src: hexIconImage,
        srcSet: hexIconImageWebp,
        alt: "hex",
      },
    },
    {
      label: sessionPrizePoolText[language],
      value: curMapRewardsInfo?.map_pool_size
        ? +(curMapRewardsInfo?.map_pool_size).toFixed(2)
        : 0,
      icon: {
        src: hexIconImage,
        srcSet: hexIconImageWebp,
        alt: "hex",
      },
    },
    {
      label: capturedHexesText[language],
      value: hexesCaptured,
      icon: {
        src: hexIconImage,
        srcSet: hexIconImageWebp,
        alt: "hex",
      },
    },
    {
      label: influencePointsText[language],
      value: influencePoints,
      icon: {
        src: influencePointIconImage,
        srcSet: influencePointIconImageWebp,
        alt: "influence point",
      },
    },
    {
      label: rewardForecastText[language],
      value: curMapRewardsInfo?.user_reward
        ? +(curMapRewardsInfo?.user_reward).toFixed(2)
        : 0,
      icon: {
        src: cpImage,
        srcSet: cpImageWebp,
        alt: "cash point",
      },
    },
  ];
  return (
    <div
      className={`${styles.influenceMapControllModal} ${
        open ? styles.influenceMapControllModal_open : ""
      }`}
    >
      <div className={styles.influenceMapControllModal__header}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={styles.influenceMapControllModal__toggleBtn}
        >
          <div className={styles.influenceMapControllModal__toggleBtnInner}>
            <ToggleIcon />
            <ControllIcon />
          </div>
        </button>
        <h6 className={styles.influenceMapControllModal__headerTitle}>
          {clanControlTitleText[language]}
        </h6>
      </div>
      <div className={styles.influenceMapControllModal__content}>
        <div className={styles.influenceMapControllModal__dotline}>
          <DotsLine preserveAspectRatio />
        </div>
        {controllModalStats.map((stat, idx) => (
          <div className={styles.influenceMapControllModal__text} key={idx}>
            <span>
              {stat.label}: {stat.value}
            </span>
            <ImageWebp
              src={stat.icon.src}
              srcSet={stat.icon.srcSet}
              alt={stat.icon.alt}
              className={styles.influenceMapControllModal__img}
            />
          </div>
        ))}
        {/* <div className={styles.influenceMapControllModal__dotline}>
          <DotsLine preserveAspectRatio />
        </div>
        <div
          className={`${styles.influenceMapControllModal__text} ${styles.influenceMapControllModal__text_head}`}
        >
          <BuildingIcon />
          <strong>{totalHexesText[language]} (14)</strong>
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <BuildingIcon />
          <span>{productionBuildingsText[language]}: 8</span>
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <BuildingIcon />
          <span>{defenseBuildingsText[language]}: 4</span>
        </div> */}
      </div>
    </div>
  );
};

export default InfluenceMapControllModal;
