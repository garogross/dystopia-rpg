import React, { useState } from "react";
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

const {
  // totalHexesText,
  // productionBuildingsText,
  // defenseBuildingsText,
  capturedHexesText,
  influencePointsText,
  rewardForecastText,
  clanControlTitleText,
} = TRANSLATIONS.influence.map.controllModal;

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
        <div className={styles.influenceMapControllModal__text}>
          <span>
            {capturedHexesText[language]}: {hexesCaptured}
          </span>
          <ImageWebp
            src={hexIconImage}
            srcSet={hexIconImageWebp}
            alt="hex"
            className={styles.influenceMapControllModal__img}
          />
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <span>
            {influencePointsText[language]}: {influencePoints}
          </span>
          <ImageWebp
            src={influencePointIconImage}
            srcSet={influencePointIconImageWebp}
            alt="influence point"
            className={styles.influenceMapControllModal__img}
          />
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <span>
            {rewardForecastText[language]}: ≈{" "}
            {curMapRewardsInfo?.user_reward
              ? +(curMapRewardsInfo?.user_reward).toFixed(2)
              : 0}
          </span>
          <ImageWebp
            src={cpImage}
            srcSet={cpImageWebp}
            alt="cash point"
            className={styles.influenceMapControllModal__img}
          />
        </div>
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
