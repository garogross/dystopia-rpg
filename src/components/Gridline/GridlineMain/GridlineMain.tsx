import React, { useState } from "react";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import {
  gridlineBlueBallImage,
  gridlineBlueBallImageWebp,
  gridlineGoldBallImage,
  gridlineGoldBallImageWebp,
  gridlineGreenBallImage,
  gridlineGreenBallImageWebp,
  gridlineRedBallImage,
  gridlineRedBallImageWebp,
  gridlineSilverBallImage,
  gridlineSilverBallImageWebp,
} from "../../../assets/imageMaps/gridlineImages";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  BottomFrame,
  ChangeShapersIcon,
  ColorVirusIcon,
  LineBangIcon,
  TopFrame,
} from "../../layout/icons/Gridline/Main";

import styles from "./GridlineMain.module.scss";
import GridlineMainCanvas from "./GridlineMainCanvas/GridlineMainCanvas";
import { EGridlineBalls } from "../../../constants/gridline/EGridlineBalls";
import { EGridlineBonuses } from "../../../constants/gridline/EGridlineBonuses";

const nextBalls = {
  [EGridlineBalls.Blue]: [gridlineBlueBallImage, gridlineBlueBallImageWebp],
  [EGridlineBalls.Gold]: [gridlineGoldBallImage, gridlineGoldBallImageWebp],
  [EGridlineBalls.Green]: [gridlineGreenBallImage, gridlineGreenBallImageWebp],
  [EGridlineBalls.Red]: [gridlineRedBallImage, gridlineRedBallImageWebp],
  [EGridlineBalls.Silver]: [
    gridlineSilverBallImage,
    gridlineSilverBallImageWebp,
  ],
};

const bonuses = {
  [EGridlineBonuses.LineBang]: { icon: <LineBangIcon />, name: "Взрыв линии" },
  [EGridlineBonuses.SphereChange]: {
    icon: <ChangeShapersIcon />,
    name: "Смена сфер",
  },
  [EGridlineBonuses.ColorVirus]: {
    icon: <ColorVirusIcon />,
    name: "Цветовирус",
  },
};

const GridlineMain = () => {
  const [score, setScore] = useState(0);
  return (
    <div className={`container ${styles.gridlineMain}`}>
      <div className={styles.gridlineMain__header}>
        <div className={styles.gridlineMain__headerWings}>
          <HeaderWings />
        </div>
        <div className={styles.gridlineMain__headerMain}>
          <span className={styles.gridlineMain__headerText}>СферЫ; 14</span>
          <div className={styles.gridlineMain__headerBalls}>
            {Object.values(nextBalls)
              .slice(0, 3)
              .map((item, index) => (
                <ImageWebp
                  src={item[0]}
                  srcSet={item[1]}
                  alt={"ball"}
                  className={styles.gridlineMain__headerBallImg}
                />
              ))}
          </div>
          <span className={styles.gridlineMain__headerText}>очки: {score}</span>
        </div>
      </div>
      <div className={styles.gridlineMain__gameWrapper}>
        <div className={styles.gridlineMain__gameWrapperTopIcon}>
          <TopFrame />
        </div>
        <div className={styles.gridlineMain__gameContainer}>
          <GridlineMainCanvas setScore={setScore} />
        </div>
        <div className={styles.gridlineMain__gameWrapperBottomIcon}>
          <BottomFrame />
        </div>
      </div>
      <div className={styles.gridlineMain__bonuses}>
        <div className={styles.gridlineMain__bonusesInfoText}>
          Шкала способностей заполняется при каждом удачном ходу. Полная полоска
          даёт возможность выбрать один из доступных помогающих бонусов
        </div>
        <div className={styles.gridlineMain__bonusesProgressBar}>
          <div className={styles.gridlineMain__bonusesProgressBarInner}>
            42%
          </div>
        </div>
        <div className={styles.gridlineMain__bonusesOptionsList}>
          {Object.entries(bonuses).map(([k, value]) => {
            const key = k as EGridlineBonuses;
            return (
              <button className={styles.gridlineMain__bonusOptionBtn} key={key}>
                <div className={styles.gridlineMain__bonusOptionBtnInner}>
                  {value.icon}
                  <span>{value.name}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className={styles.gridlineMain__bonusesBottomWings}>
          <HeaderWings reversed />
        </div>
      </div>
    </div>
  );
};

export default GridlineMain;
