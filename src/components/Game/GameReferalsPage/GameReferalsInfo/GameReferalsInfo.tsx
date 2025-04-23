import React from "react";
import styles from "./GameReferalsInfo.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameReferalsInfoBottomBg from "../../../layout/icons/game/GameReferalsPage/GameReferalsInfoBottomBg";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";

const infoData = [
  "Реферальные награды начисляются раз в сутке.",
  "Ежедневное начисление жетонов зависит от активности ваших рефералов.",
  "1% от трат кредитов вашими рефералами",
];

const GameReferalsInfo = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.gameReferalsInfo}
    >
      <div className={styles.gameReferalsInfo}>
        <WrapperWithFrame withoutBorder>
        <div className={styles.gameReferalsInfo__main}>
          {infoData.map((item, index) => (
            <div className={styles.gameReferalsInfo__item} key={index}>
              <div className={styles.gameReferalsInfo__itemInner}>
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </WrapperWithFrame>
      <div className={styles.gameReferalsInfo__bottom}>
          <GameReferalsInfoBottomBg />
        </div>
      </div>
    </TransitionProvider>
  );
};

export default GameReferalsInfo;
