import React from "react";
import styles from "./RPGGameLoyalityActivity.module.scss";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  lpImage,
  luteboxForAdImage,
  luteboxForAdImageWebp,
  luteboxForLpImage,
  luteboxForLpImageWebp,
} from "../../../../assets/imageMaps";
import {DotsLine} from "../../../layout/icons/RPGGame/Common";
import RPGGameLoyalityCollectReward from "../RPGGameLoyalityCollectReward/RPGGameLoyalityCollectReward";
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

const RPGGameLoyalityActivity = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.rpgGameLoyalityActivity}>
      <div className={styles.rpgGameLoyalityActivity__list}>
        {weekData.map((col, colIndex) => (
          <TransitionProvider
            key={colIndex}
            className={styles.rpgGameLoyalityActivity__listCol}
            style={TransitionStyleTypes.top}
            inProp={gameInited}
            delay={colIndex * 100}
          >
            {col.days.map((value, dayIndex) => (
              <button
                key={dayIndex}
                className={`${styles.rpgGameLoyalityActivity__listItem} ${
                  value === 1
                    ? styles.rpgGameLoyalityActivity__listItem_active
                    : ""
                } ${
                  value === 1.1
                    ? styles.rpgGameLoyalityActivity__listItem_recieved
                    : ""
                }`}
              >
                <ImageWebp
                  src={lpImage}
                  srcSet={lpImage}
                  alt="loyalty"
                  className={styles.rpgGameLoyalityActivity__itemImg}
                  pictureClass={styles.rpgGameLoyalityActivity__itemPicture}
                />
                <span className={styles.rpgGameLoyalityActivity__itemText}>
                  {value}LP
                </span>
                {value === 1.1 && (
                  <span className={styles.rpgGameLoyalityActivity__receivedText}>
                    Получено
                  </span>
                )}
              </button>
            ))}
          </TransitionProvider>
        ))}
      </div>
      <RPGGameLoyalityCollectReward disabled={true} />
      <div className={styles.rpgGameLoyalityActivity__availableIn}>
        <span className={styles.rpgGameLoyalityActivity__availableInText}>
          Будет доступно через: 22ч 25м
        </span>
        <DotsLine />
      </div>
      <div className={styles.rpgGameLoyalityActivity__lutBoxes}>
        <button className={styles.rpgGameLoyalityActivity__luteBoxBtn}>
          <div className={styles.rpgGameLoyalityActivity__luteBoxInner}>
            <ImageWebp
              src={luteboxForAdImage}
              srcSet={luteboxForAdImageWebp}
              alt="lutebox"
              className={styles.rpgGameLoyalityActivity__luteBoxImg}
              pictureClass={styles.rpgGameLoyalityActivity__luteBoxPicture}
            />
            <span className={styles.rpgGameLoyalityActivity__luteBoxBtnText}>
              Лутбокс за рекламу
            </span>
          </div>
        </button>
        <button className={styles.rpgGameLoyalityActivity__luteBoxBtn}>
          <div className={styles.rpgGameLoyalityActivity__luteBoxInner}>
            <ImageWebp
              src={luteboxForLpImage}
              srcSet={luteboxForLpImageWebp}
              alt="lutebox"
              className={styles.rpgGameLoyalityActivity__luteBoxImg}
              pictureClass={styles.rpgGameLoyalityActivity__luteBoxPicture}
            />
            <span className={styles.rpgGameLoyalityActivity__luteBoxBtnText}>
              Лутбокс за ЛП
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RPGGameLoyalityActivity;
