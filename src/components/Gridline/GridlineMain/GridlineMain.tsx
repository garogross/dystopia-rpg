import React, { useEffect, useState } from "react";
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
import GridlineMainGameOverModal from "./GridlineMainGameOverModal/GridlineMainGameOverModal";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import { useNavigate } from "react-router-dom";
import { onBoardingPagePath } from "../../../router/constants";
import { RefreshIcon } from "../../layout/icons/Gridline/Common";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

const { name } = TRANSLATIONS.miniGames.gridline;

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
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.ui.language);

  // show/hide game over modal
  const [showGameOver, setShowGameOver] = useState(false);

  // resetKey increments when the game should restart; passed to canvas to trigger re-init
  const [resetKey, setResetKey] = useState(0);

  // spawn balls queue - shows next balls to be spawned
  const [spawnBalls, setSpawnBalls] = useState<EGridlineBalls[]>([]);

  // Generate random spawn balls
  const generateSpawnBalls = (count: number = 3): EGridlineBalls[] => {
    const ballTypes = Object.values(EGridlineBalls);
    const balls: EGridlineBalls[] = [];
    for (let i = 0; i < count; i++) {
      const randomBall =
        ballTypes[Math.floor(Math.random() * ballTypes.length)];
      balls.push(randomBall as EGridlineBalls);
    }
    return balls;
  };

  // Initialize spawn balls on component mount
  useEffect(() => {
    setSpawnBalls(generateSpawnBalls(3));
  }, []);

  // Handle when balls are consumed from spawn queue
  const handleBallsConsumed = (count: number) => {
    setSpawnBalls((prev) => {
      const newBalls = [...prev];
      // Remove consumed balls from the front
      newBalls.splice(0, count);
      // Add new balls to the end
      newBalls.push(...generateSpawnBalls(count));
      return newBalls;
    });
  };

  // called by GridlineMainCanvas when the board becomes full / game over
  const handleGameOver = () => {
    setShowGameOver(true);
  };

  const handleReset = () => {
    // reset score and reinit canvas by bumping resetKey
    setScore(0);
    setShowGameOver(false);
    setSpawnBalls(generateSpawnBalls(3));
    setResetKey((k) => k + 1);
  };

  return (
    <>
      <div className={styles.gridlineMain}>
        <HeaderWithBackButton
          className={`container ${styles.gridlineMain__title}`}
          onClose={() => {
            navigate(onBoardingPagePath);
          }}
          rightBtn={{
            icon: <RefreshIcon />,
            onClick: handleReset,
          }}
          title={name[language]}
        />
        <div className={styles.gridlineMain__header}>
          <div className={styles.gridlineMain__headerWings}>
            <HeaderWings />
          </div>
          <div className={styles.gridlineMain__headerMain}>
            <span className={styles.gridlineMain__headerText}>СферЫ; 14</span>
            <div className={styles.gridlineMain__headerBalls}>
              {spawnBalls.slice(0, 3).map((ballType, index) => {
                const ballImages = nextBalls[ballType];
                return (
                  <ImageWebp
                    src={ballImages[0]}
                    srcSet={ballImages[1]}
                    alt={"ball"}
                    className={styles.gridlineMain__headerBallImg}
                    key={`${ballType}-${index}`}
                  />
                );
              })}
            </div>
            <span className={styles.gridlineMain__headerText}>
              очки: {score}
            </span>
          </div>
        </div>
        <div className={styles.gridlineMain__gameWrapper}>
          <div className={styles.gridlineMain__gameWrapperTopIcon}>
            <TopFrame />
          </div>
          <div className={styles.gridlineMain__gameContainer}>
            <GridlineMainCanvas
              setScore={setScore}
              onGameOver={handleGameOver}
              resetKey={resetKey}
              spawnBalls={spawnBalls}
              onBallsConsumed={handleBallsConsumed}
            />
          </div>
          <div className={styles.gridlineMain__gameWrapperBottomIcon}>
            <BottomFrame />
          </div>
        </div>
        <div className={styles.gridlineMain__bonuses}>
          <div className={styles.gridlineMain__bonusesInfoText}>
            Шкала способностей заполняется при каждом удачном ходу. Полная
            полоска даёт возможность выбрать один из доступных помогающих
            бонусов
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
                <button
                  className={styles.gridlineMain__bonusOptionBtn}
                  key={key}
                >
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
        <GridlineMainGameOverModal
          show={showGameOver}
          onReset={handleReset}
          score={score}
        />
      </div>
    </>
  );
};

export default GridlineMain;
