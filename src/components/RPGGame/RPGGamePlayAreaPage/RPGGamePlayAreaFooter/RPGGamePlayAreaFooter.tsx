import React, { useEffect, useRef, useState } from "react";

import styles from "./RPGGamePlayAreaFooter.module.scss";
import {RPGGamePlayAreaFooterAbility1,
  RPGGamePlayAreaFooterAbility2,
RPGGamePlayAreaFooterAbility3,
RPGGamePlayAreaFooterAbility4,
RPGGamePlayAreaFooterAbility5,
} from "../../../layout/icons/RPGGame/RPGGamePlayArea/RPGGamePlayAreaFooter";
import {
  asset1Image,
  asset2Image,
  asset3Image,
  asset4Image,
  asset5Image,
} from "../../../../assets/imageMaps";
import { IBattle } from "../../../../models/IBattle";

const SECONDS_PER_STEP = 15;

interface Props {
  gameType: IBattle["type"];
  gameStarted: boolean;
  timerPoused: boolean;
  onEnd: () => void;
  ordersEnded: boolean;
  isOurStep: boolean;
}

const RPGGamePlayAreaFooter: React.FC<Props> = ({
  gameStarted,
  onEnd,
  timerPoused,
  ordersEnded,
  gameType,
  isOurStep,
}) => {
  const [timer, setTimer] = useState(SECONDS_PER_STEP);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const ordersEndedRef = useRef<boolean>(ordersEnded);

  useEffect(() => {
    ordersEndedRef.current = ordersEnded;
  }, [ordersEnded]);

  useEffect(() => {
    if (gameType === "pve") return;
    if (timerPoused && intervalRef.current) {
      clearInterval(intervalRef.current);
      setTimer(SECONDS_PER_STEP);
    }
    if (gameStarted && !timerPoused) {
      intervalRef.current = setInterval(() => {
        setTimer((prevState) => {
          if (prevState) {
            return prevState - 1;
          } else {
            onEnd();

            if (intervalRef.current && ordersEndedRef.current)
              clearInterval(intervalRef.current);
            setTimer(SECONDS_PER_STEP);
            return prevState;
          }
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, timerPoused, gameType]);

  return (
    <footer className={styles.rpgGamePlayAreaFooter}>
      <div
        className={`${styles.rpgGamePlayAreaFooter__btnsList} ${styles.rpgGamePlayAreaFooter__btnsList_left}`}
      >
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <RPGGamePlayAreaFooterAbility1 />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <RPGGamePlayAreaFooterAbility2 />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <RPGGamePlayAreaFooterAbility3 />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <RPGGamePlayAreaFooterAbility4 />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <RPGGamePlayAreaFooterAbility5 />
          </span>
        </button>
      </div>
      <div className={styles.rpgGamePlayAreaFooter__statusPanel}>
        <div className={styles.rpgGamePlayAreaFooter__statuPannelInner}>
          <h5 className={styles.rpgGamePlayAreaFooter__stepText}>
            Ход игры: {isOurStep ? "Ваш" : "Противника"}
          </h5>
          {gameType === "pvp" && (
            <>
              <div className={styles.rpgGamePlayAreaFooter__timerText}>
                Осталось времени
              </div>
              <div className={styles.rpgGamePlayAreaFooter__timerValueText}>
                {timer} сек.
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`${styles.rpgGamePlayAreaFooter__btnsList} ${styles.rpgGamePlayAreaFooter__btnsList_right}`}
      >
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <img
              src={asset1Image}
              alt="asset"
              className={styles.rpgGamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <img
              src={asset5Image}
              alt="asset"
              className={styles.rpgGamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <img
              src={asset2Image}
              alt="asset"
              className={styles.rpgGamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <img
              src={asset3Image}
              alt="asset"
              className={styles.rpgGamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.rpgGamePlayAreaFooter__btn}>
          <span className={styles.rpgGamePlayAreaFooter__btnInner}>
            <img
              src={asset4Image}
              alt="asset"
              className={styles.rpgGamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};

export default RPGGamePlayAreaFooter;
