import React from "react";
import styles from "./RPGGameReferalsTotalEarnings.module.scss";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common/HeaderWings";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import {RPGGameReferalsCollectIcon} from "../../../layout/icons/RPGGame/RPGGameReferalsPage";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { EStats } from "../../../../constants/EStats";
import StatImg from "../../../layout/StatImg/StatImg";

const RPGGameReferalsTotalEarnings = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.top}
      className={styles.rpgGameReferalsTotalEarnings}
    >
      <WrapperWithFrame className={styles.rpgGameReferalsTotalEarnings__main}>
        <div className={styles.rpgGameReferalsTotalEarnings__inner}>
          <div className={styles.rpgGameReferalsTotalEarnings__texts}>
            <h5 className={styles.rpgGameReferalsTotalEarnings__title}>
              Заработано за всё время
            </h5>
            <div className={styles.rpgGameReferalsTotalEarnings__values}>
              <div className={styles.rpgGameReferalsTotalEarnings__value}>
                <StatImg stat={EStats.kredit} size={19} />
                <span className={styles.rpgGameReferalsTotalEarnings__valueText}>
                  90k
                </span>
              </div>
              <div className={styles.rpgGameReferalsTotalEarnings__value}>
                <StatImg stat={EStats.darkMatter} size={19} />
                <span className={styles.rpgGameReferalsTotalEarnings__valueText}>
                  126
                </span>
              </div>
            </div>
          </div>
          <button className={styles.rpgGameReferalsTotalEarnings__collectBtn}>
            <div className={styles.rpgGameReferalsTotalEarnings__collectBtnInner}>
              <RPGGameReferalsCollectIcon />
              <span>Собрать</span>
            </div>
          </button>
        </div>
      </WrapperWithFrame>
      <div className={styles.rpgGameReferalsTotalEarnings__wings}>
        <HeaderWings reversed />
      </div>
    </TransitionProvider>
  );
};

export default RPGGameReferalsTotalEarnings;
