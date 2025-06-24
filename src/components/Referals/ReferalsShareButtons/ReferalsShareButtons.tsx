import React, { useState } from "react";

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

const { copyLinkText, copiedText, inviteFriendText } =
  TRANSLATIONS.referals.shareButtons;

const REF_LINK = "https://t.me/dystopiagamebot?start=";
const SHARE_TEXT =
  "Develop your city, team up with other players to fight for territories, level up your character and become the best! Enjoy the game and get tokens.";

const ReferalsShareButtons = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const refLink = REF_LINK + tgId;
  const [copied, setCopied] = useState(false);

  const onInvite = () => {
    window.open(
      `https://t.me/share/url?url=${refLink}&text=${SHARE_TEXT}`,
      "_blank"
    );
  };

  const copyToClipboard = () => {
    const addMembersUrl = refLink;

    navigator.clipboard
      .writeText(addMembersUrl)
      .then(() => {
        setCopied(true);

        setTimeout(function () {
          setCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Err copy: ", err);
      });
  };
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.referalsShareButtons}
    >
      <button
        onClick={copyToClipboard}
        className={styles.referalsShareButtons__button}
      >
        <div className={styles.referalsShareButtons__buttonInner}>
          <ReferalsCopyIcon />
          <span>{(copied ? copiedText : copyLinkText)[language]}</span>
        </div>
      </button>
      <button
        onClick={onInvite}
        className={styles.referalsShareButtons__button}
      >
        <div className={styles.referalsShareButtons__buttonInner}>
          <ReferalsInviteIcon />
          <span>{inviteFriendText[language]}</span>
        </div>
      </button>
    </TransitionProvider>
  );
};

export default ReferalsShareButtons;
