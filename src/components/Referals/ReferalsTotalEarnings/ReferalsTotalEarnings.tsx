import React from "react";
import styles from "./ReferalsTotalEarnings.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common/HeaderWings";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { EStats } from "../../../constants/EStats";
import StatImg from "../../layout/StatImg/StatImg";
import { ReferalsCollectIcon } from "../../layout/icons/Referals";

const ReferalsTotalEarnings = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.top}
      className={styles.referalsTotalEarnings}
    >
      <WrapperWithFrame className={styles.referalsTotalEarnings__main}>
        <div className={styles.referalsTotalEarnings__inner}>
          <div className={styles.referalsTotalEarnings__texts}>
            <h5 className={styles.referalsTotalEarnings__title}>
              Заработано за всё время
            </h5>
            <div className={styles.referalsTotalEarnings__values}>
              <div className={styles.referalsTotalEarnings__value}>
                <StatImg stat={EStats.kredit} size={19} />
                <span className={styles.referalsTotalEarnings__valueText}>
                  90k
                </span>
              </div>
              <div className={styles.referalsTotalEarnings__value}>
                <StatImg stat={EStats.darkMatter} size={19} />
                <span className={styles.referalsTotalEarnings__valueText}>
                  126
                </span>
              </div>
            </div>
          </div>
          <button className={styles.referalsTotalEarnings__collectBtn}>
            <div className={styles.referalsTotalEarnings__collectBtnInner}>
              <ReferalsCollectIcon />
              <span>Собрать</span>
            </div>
          </button>
        </div>
      </WrapperWithFrame>
      <div className={styles.referalsTotalEarnings__wings}>
        <HeaderWings reversed />
      </div>
    </TransitionProvider>
  );
};

export default ReferalsTotalEarnings;
