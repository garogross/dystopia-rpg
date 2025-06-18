import React from "react";

import styles from "./ReferalsShareButtons.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import {
  ReferalsCopyIcon,
  ReferalsInviteIcon,
} from "../../layout/icons/Referals";
const ReferalsShareButtons = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.referalsShareButtons}
    >
      <button className={styles.referalsShareButtons__button}>
        <div className={styles.referalsShareButtons__buttonInner}>
          <ReferalsCopyIcon />
          <span>Копиробать ссылку</span>
        </div>
      </button>
      <button className={styles.referalsShareButtons__button}>
        <div className={styles.referalsShareButtons__buttonInner}>
          <ReferalsInviteIcon />
          <span>Пригласить друга</span>
        </div>
      </button>
    </TransitionProvider>
  );
};

export default ReferalsShareButtons;
