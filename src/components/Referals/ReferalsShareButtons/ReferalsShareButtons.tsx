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
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const { copyLinkText, inviteFriendText } = TRANSLATIONS.referals.shareButtons;

const ReferalsShareButtons = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.referalsShareButtons}
    >
      <button className={styles.referalsShareButtons__button}>
        <div className={styles.referalsShareButtons__buttonInner}>
          <ReferalsCopyIcon />
          <span>{copyLinkText[language]}</span>
        </div>
      </button>
      <button className={styles.referalsShareButtons__button}>
        <div className={styles.referalsShareButtons__buttonInner}>
          <ReferalsInviteIcon />
          <span>{inviteFriendText[language]}</span>
        </div>
      </button>
    </TransitionProvider>
  );
};

export default ReferalsShareButtons;
