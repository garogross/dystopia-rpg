import React, { useState } from "react";
import styles from "./RPGGameReferalsTotalCount.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import {DotsLine} from "../../../layout/icons/RPGGame/Common/DotsLine";
import {RPGGameReferalsTotalCountBottomBlock} from "../../../layout/icons/RPGGame/RPGGameReferalsPage";
import RPGGameReferalsHistory from "../RPGGameReferalsHistory/RPGGameReferalsHistory";
import TransitionProvider from "../../../../providers/TransitionProvider";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
const RPGGameReferalsTotalCount = () => {
  const [historyOpened, setHistoryOpened] = useState(false);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider inProp={gameInited} style={TransitionStyleTypes.zoomIn}>
      <button
        onClick={() => setHistoryOpened(true)}
        className={styles.rpgGameReferalsTotalCount}
      >
        <WrapperWithFrame>
          <div className={styles.rpgGameReferalsTotalCount__inner}>
            <h6 className={styles.rpgGameReferalsTotalCount__title}>
              Рефералы за всё время
            </h6>
            <div className={styles.rpgGameReferalsTotalCount__dotsLine}>
              <DotsLine />
            </div>
            <span className={styles.rpgGameReferalsTotalCount__countText}>5</span>
          </div>
        </WrapperWithFrame>
        <div className={styles.rpgGameReferalsTotalCount__bottomBlock}>
          <RPGGameReferalsTotalCountBottomBlock />
        </div>
      </button>
      <RPGGameReferalsHistory
        show={historyOpened}
        onClose={() => setHistoryOpened(false)}
      />
    </TransitionProvider>
  );
};

export default RPGGameReferalsTotalCount;
