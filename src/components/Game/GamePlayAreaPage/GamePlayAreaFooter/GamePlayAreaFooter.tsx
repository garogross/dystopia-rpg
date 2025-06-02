import React, { useEffect, useRef, useState } from "react";

import styles from "./GamePlayAreaFooter.module.scss";
import GamePlayAreaFooterAbility1 from "../../../layout/icons/game/GamePlayArea/GamePlayAreaFooter/GamePlayAreaFooterAbility1";
import GamePlayAreaFooterAbility2 from "../../../layout/icons/game/GamePlayArea/GamePlayAreaFooter/GamePlayAreaFooterAbility2";
import GamePlayAreaFooterAbility3 from "../../../layout/icons/game/GamePlayArea/GamePlayAreaFooter/GamePlayAreaFooterAbility3";
import GamePlayAreaFooterAbility4 from "../../../layout/icons/game/GamePlayArea/GamePlayAreaFooter/GamePlayAreaFooterAbility4";
import GamePlayAreaFooterAbility5 from "../../../layout/icons/game/GamePlayArea/GamePlayAreaFooter/GamePlayAreaFooterAbility5";
import {
  asset1Image,
  asset2Image,
  asset3Image,
  asset4Image,
  asset5Image,
} from "../../../../assets/images";
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

const GamePlayAreaFooter: React.FC<Props> = ({
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
    <footer className={styles.gamePlayAreaFooter}>
      <div
        className={`${styles.gamePlayAreaFooter__btnsList} ${styles.gamePlayAreaFooter__btnsList_left}`}
      >
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <GamePlayAreaFooterAbility1 />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <GamePlayAreaFooterAbility2 />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <GamePlayAreaFooterAbility3 />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <GamePlayAreaFooterAbility4 />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <GamePlayAreaFooterAbility5 />
          </span>
        </button>
      </div>
      <div className={styles.gamePlayAreaFooter__statusPanel}>
        <div className={styles.gamePlayAreaFooter__statuPannelInner}>
          <h5 className={styles.gamePlayAreaFooter__stepText}>
            Ход игры: {isOurStep ? "Ваш" : "Противника"}
          </h5>
          {gameType === "pvp" && (
            <>
              <div className={styles.gamePlayAreaFooter__timerText}>
                Осталось времени
              </div>
              <div className={styles.gamePlayAreaFooter__timerValueText}>
                {timer} сек.
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`${styles.gamePlayAreaFooter__btnsList} ${styles.gamePlayAreaFooter__btnsList_right}`}
      >
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <img
              src={asset1Image}
              alt="asset"
              className={styles.gamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <img
              src={asset5Image}
              alt="asset"
              className={styles.gamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <img
              src={asset2Image}
              alt="asset"
              className={styles.gamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <img
              src={asset3Image}
              alt="asset"
              className={styles.gamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
        <button className={styles.gamePlayAreaFooter__btn}>
          <span className={styles.gamePlayAreaFooter__btnInner}>
            <img
              src={asset4Image}
              alt="asset"
              className={styles.gamePlayAreaFooter__toolImg}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};

export default GamePlayAreaFooter;
