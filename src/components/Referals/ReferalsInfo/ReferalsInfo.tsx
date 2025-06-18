import React from "react";
import styles from "./ReferalsInfo.module.scss";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import { ReferalsInfoBottomBg } from "../../layout/icons/Referals";

const infoData = [
  "Реферальные награды начисляются раз в сутке.",
  "Ежедневное начисление жетонов зависит от активности ваших рефералов.",
  "1% от трат кредитов вашими рефералами",
];

const ReferalsInfo = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.referalsInfo}
    >
      <div className={styles.referalsInfo}>
        <WrapperWithFrame withoutBorder>
          <div className={styles.referalsInfo__main}>
            {infoData.map((item, index) => (
              <div className={styles.referalsInfo__item} key={index}>
                <div className={styles.referalsInfo__itemInner}>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </WrapperWithFrame>
        <div className={styles.referalsInfo__bottom}>
          <ReferalsInfoBottomBg />
        </div>
      </div>
    </TransitionProvider>
  );
};

export default ReferalsInfo;
