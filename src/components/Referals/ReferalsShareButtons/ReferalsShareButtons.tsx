import React, { useState } from "react";

import styles from "./ReferalsShareButtons.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import { ReferalsInviteIcon } from "../../layout/icons/Referals";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { CopyIcon } from "../../layout/icons/Common";

const { copyLinkText, copiedText, inviteFriendText } =
  TRANSLATIONS.referals.shareButtons;

const REF_LINK = "https://t.me/dystopiagamebot?start=";
const SHARE_TEXT =
  "⚡️ Grow your Cyber Farm: Cultivate crops, build factories, craft goods — sell for $TON! Enjoy the grind!";

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
          <CopyIcon />
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
