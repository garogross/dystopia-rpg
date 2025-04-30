import React from "react";
import styles from "./GameReferalsTotalEarnings.module.scss";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameReferalsCollectIcon from "../../../layout/icons/game/GameReferalsPage/GameReferalsCollectIcon";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { EStats } from "../../../../constants/EStats";
import StatImg from "../../../layout/StatImg/StatImg";


const GameReferalsTotalEarnings = () => {
  const gameInited = useAppSelector(state => state.ui.gameInited)
  return (
    <TransitionProvider
    inProp={gameInited}
    style={TransitionStyleTypes.top}
    className={styles.gameReferalsTotalEarnings}>
      <WrapperWithFrame className={styles.gameReferalsTotalEarnings__main}>
        <div className={styles.gameReferalsTotalEarnings__inner}>
          <div className={styles.gameReferalsTotalEarnings__texts}>
            <h5 className={styles.gameReferalsTotalEarnings__title}>
              Заработано за всё время
            </h5>
            <div className={styles.gameReferalsTotalEarnings__values}>
              <div className={styles.gameReferalsTotalEarnings__value}>
            
                <StatImg stat={EStats.kredit} size={19} />
                <span className={styles.gameReferalsTotalEarnings__valueText}>
                  90k
                </span>
              </div>
              <div className={styles.gameReferalsTotalEarnings__value}>
        
                <StatImg stat={EStats.darkMatter} size={19} />
                <span className={styles.gameReferalsTotalEarnings__valueText}>
                  126
                </span>
              </div>
            </div>
          </div>
          <button className={styles.gameReferalsTotalEarnings__collectBtn}>
            <div className={styles.gameReferalsTotalEarnings__collectBtnInner}>
              <GameReferalsCollectIcon />
              <span>Собрать</span>
            </div>
          </button>
        </div>

      </WrapperWithFrame>
        <div className={styles.gameReferalsTotalEarnings__wings}>
          <HeaderWings reversed />
        </div>
    </TransitionProvider>
  );
};

export default GameReferalsTotalEarnings;
