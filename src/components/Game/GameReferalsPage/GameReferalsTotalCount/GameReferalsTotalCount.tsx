import React, { useState } from "react";
import styles from "./GameReferalsTotalCount.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import GameReferalsTotalCountBottomBlock from "../../../layout/icons/game/GameReferalsPage/GameReferalsTotalCountBottomBlock";
import GameReferalsHistory from "../GameReferalsHistory/GameReferalsHistory";
import TransitionProvider from "../../../../providers/TransitionProvider";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
const GameReferalsTotalCount = () => {
  const [historyOpened, setHistoryOpened] = useState(false);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
    >
      <button
        onClick={() => setHistoryOpened(true)}
        className={styles.gameReferalsTotalCount}
      >
        <WrapperWithFrame>
          <div className={styles.gameReferalsTotalCount__inner}>
            <h6 className={styles.gameReferalsTotalCount__title}>
              Рефералы за всё время
            </h6>
            <div className={styles.gameReferalsTotalCount__dotsLine}>
              <DotsLine />
            </div>
            <span className={styles.gameReferalsTotalCount__countText}>5</span>
          </div>
        </WrapperWithFrame>
        <div className={styles.gameReferalsTotalCount__bottomBlock}>
          <GameReferalsTotalCountBottomBlock />
        </div>
      </button>
      <GameReferalsHistory
        show={historyOpened}
        onClose={() => setHistoryOpened(false)}
      />
    </TransitionProvider>
  );
};

export default GameReferalsTotalCount;
