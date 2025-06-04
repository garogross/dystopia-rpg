import React from "react";
import styles from "./RPGGameReferalsInfo.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import {RPGGameReferalsInfoBottomBg} from "../../../layout/icons/RPGGame/RPGGameReferalsPage";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";

const infoData = [
  "Реферальные награды начисляются раз в сутке.",
  "Ежедневное начисление жетонов зависит от активности ваших рефералов.",
  "1% от трат кредитов вашими рефералами",
];

const RPGGameReferalsInfo = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.rpgGameReferalsInfo}
    >
      <div className={styles.rpgGameReferalsInfo}>
        <WrapperWithFrame withoutBorder>
          <div className={styles.rpgGameReferalsInfo__main}>
            {infoData.map((item, index) => (
              <div className={styles.rpgGameReferalsInfo__item} key={index}>
                <div className={styles.rpgGameReferalsInfo__itemInner}>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </WrapperWithFrame>
        <div className={styles.rpgGameReferalsInfo__bottom}>
          <RPGGameReferalsInfoBottomBg />
        </div>
      </div>
    </TransitionProvider>
  );
};

export default RPGGameReferalsInfo;
