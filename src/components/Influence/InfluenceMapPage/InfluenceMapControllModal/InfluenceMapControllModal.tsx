import React, { useState } from "react";
import {
  ToggleIcon,
  BuildingIcon,
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

const InfluenceMapControllModal = () => {
  const hexes = useAppSelector((state) => state.influence.map.hexes);
  const influencePoints = useAppSelector(
    (state) => state.influence.influence.influencePoints
  );
  const tgId = useAppSelector((state) => state.profile.tgId);
  const [open, setOpen] = useState(true);

  const ownedHexesCount = hexes.filter((item) => item.owner_id === tgId).length;

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
          Контроль клана
        </h6>
      </div>
      <div className={styles.influenceMapControllModal__content}>
        <div className={styles.influenceMapControllModal__dotline}>
          <DotsLine preserveAspectRatio />
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <span>Захвачено гексов: {ownedHexesCount}</span>
          <ImageWebp
            src={hexIconImage}
            srcSet={hexIconImageWebp}
            alt="hex"
            className={styles.influenceMapControllModal__img}
          />
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <span>Очки влияния: {influencePoints}</span>
          <ImageWebp
            src={influencePointIconImage}
            srcSet={influencePointIconImageWebp}
            alt="influence point"
            className={styles.influenceMapControllModal__img}
          />
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <span>Прогноз награды: ≈ 0.182</span>
          <ImageWebp
            src={cpImage}
            srcSet={cpImageWebp}
            alt="cash point"
            className={styles.influenceMapControllModal__img}
          />
        </div>
        <div className={styles.influenceMapControllModal__dotline}>
          <DotsLine preserveAspectRatio />
        </div>
        <div
          className={`${styles.influenceMapControllModal__text} ${styles.influenceMapControllModal__text_head}`}
        >
          <BuildingIcon />
          <strong>Всего построек(14)</strong>
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <BuildingIcon />
          <span>Постройки производства: 8</span>
        </div>
        <div className={styles.influenceMapControllModal__text}>
          <BuildingIcon />
          <span>Постройки обороны: 4</span>
        </div>
      </div>
    </div>
  );
};

export default InfluenceMapControllModal;
