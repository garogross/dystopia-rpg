import React from "react";
import styles from "./GameLoyalityActivity.module.scss";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  lpImage,
  luteboxForAdImage,
  luteboxForAdImageWebp,
  luteboxForLpImage,
  luteboxForLpImageWebp,
} from "../../../../assets/images";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import GameLoyalityCollectReward from "../GameLoyalityCollectReward/GameLoyalityCollectReward";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";

const weekData = [
  {
    days: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 2],
  },
  {
    days: [2, 2.1, 2.2, 2.3, 2.4, 2.5, 3],
  },
  {
    days: [3, 3.1, 3.2, 3.3, 3.4, 3.5, 4],
  },
  {
    days: [4, 4.1, 4.2, 4.3, 4.4, 4.5, 5],
  },
];

const GameLoyalityActivity = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div
      className={styles.gameLoyalityActivity}
    >
      <div className={styles.gameLoyalityActivity__list}>
        {weekData.map((col, colIndex) => (
          <TransitionProvider
            key={colIndex}
            className={styles.gameLoyalityActivity__listCol}
            style={TransitionStyleTypes.top}
            inProp={gameInited}
            delay={colIndex * 100}
          >
            {col.days.map((value, dayIndex) => (
              <button
                key={dayIndex}
                className={`${styles.gameLoyalityActivity__listItem} ${
                  value === 1
                    ? styles.gameLoyalityActivity__listItem_active
                    : ""
                } ${
                  value === 1.1
                    ? styles.gameLoyalityActivity__listItem_recieved
                    : ""
                }`}
              >
                <ImageWebp
                  src={lpImage}
                  srcSet={lpImage}
                  alt="loyalty"
                  className={styles.gameLoyalityActivity__itemImg}
                  pictureClass={styles.gameLoyalityActivity__itemPicture}
                />
                <span className={styles.gameLoyalityActivity__itemText}>
                  {value}LP
                </span>
                {value === 1.1 && (
                  <span className={styles.gameLoyalityActivity__receivedText}>
                    Получено
                  </span>
                )}
              </button>
            ))}
          </TransitionProvider>
        ))}
      </div>
      <GameLoyalityCollectReward disabled={true} />
      <div className={styles.gameLoyalityActivity__availableIn}>
        <span className={styles.gameLoyalityActivity__availableInText}>
          100
        </span>
        <DotsLine />
      </div>
      <div className={styles.gameLoyalityActivity__lutBoxes}>
        <button className={styles.gameLoyalityActivity__luteBoxBtn}>
          <div className={styles.gameLoyalityActivity__luteBoxInner}>
            <ImageWebp
              src={luteboxForAdImage}
              srcSet={luteboxForAdImageWebp}
              alt="lutebox"
              className={styles.gameLoyalityActivity__luteBoxImg}
              pictureClass={styles.gameLoyalityActivity__luteBoxPicture}
            />
            <span className={styles.gameLoyalityActivity__luteBoxBtnText}>
              Лутбокс за рекламу
            </span>
          </div>
        </button>
        <button className={styles.gameLoyalityActivity__luteBoxBtn}>
          <div className={styles.gameLoyalityActivity__luteBoxInner}>
            <ImageWebp
              src={luteboxForLpImage}
              srcSet={luteboxForLpImageWebp}
              alt="lutebox"
              className={styles.gameLoyalityActivity__luteBoxImg}
              pictureClass={styles.gameLoyalityActivity__luteBoxPicture}
            />
            <span className={styles.gameLoyalityActivity__luteBoxBtnText}>
              Лутбокс за ЛП
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GameLoyalityActivity;
