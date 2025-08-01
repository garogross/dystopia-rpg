import React, { useState } from "react";
import TitleH3 from "../layout/TitleH3/TitleH3";
import {
  DeleteIcon,
  NewMessageIcon,
  ReadMessageIcon,
  SetAsReadIcon,
  TakeAllIcon,
} from "../layout/icons/Mail";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { useAppSelector } from "../../hooks/redux";
import { CancelIcon } from "../layout/icons/Common";
import { HeaderWings } from "../layout/icons/RPGGame/Common";

import styles from "./Mail.module.scss";
import { Dotsline } from "../layout/icons/HackTerminal/HackTerminalRatings";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";

const {
  inboxTitleText,
  totalText,
  fromText,
  themeText,
  receivedText,
  unreadText,
  closeText,
  takeAllText,
} = TRANSLATIONS.mail;

const Mail = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const mails = useAppSelector((state) => state.influence.mail.mails);
  const [openedMessageId, setOpenedMessageId] = useState<null | string>(null);

  const unreadMessagesLength = mails.filter((mail) => !mail.read).length;
  return (
    <section className={`container ${styles.mail}`}>
      <TitleH3 wingsReverse={false} hideDotline>
        {inboxTitleText[language]}
      </TitleH3>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.mail__info}
      >
        <p className={styles.mail__infoText}>
          <Dotsline />
          <span>
            {totalText[language]}: {mails.length}
          </span>
        </p>
        <p className={styles.mail__infoText}>
          <Dotsline />
          <span>
            {unreadText[language]}: {unreadMessagesLength}
          </span>
        </p>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.mail__list}
      >
        {mails.map((msg) => (
          <div
            onClick={() => setOpenedMessageId(msg.id)}
            key={msg.id}
            className={styles.mail__listItem}
          >
            <div className={styles.mail__itemMain}>
              {msg.read ? <ReadMessageIcon /> : <NewMessageIcon />}
              <div className={styles.mail__itemMainTexts}>
                <div className={styles.mail__itemHeader}>
                  <div className={styles.mail__itemCol}>
                    <strong>{fromText[language]}: </strong>
                    <span>
                      {msg.from ? msg.from.replaceAll("_", " ") : "Admin"}
                    </span>
                  </div>
                  <div className={styles.mail__itemActions}>
                    {!msg.read && (
                      <button className={styles.mail__actionBtn}>
                        <SetAsReadIcon />
                      </button>
                    )}
                    <button className={styles.mail__actionBtn}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <p className={styles.mail__itemCol}>
                  <strong>{themeText[language]}: </strong>
                  <span>{msg.subject}</span>
                </p>
                {msg.created_at && (
                  <p className={styles.mail__itemCol}>
                    <strong>{receivedText[language]}: </strong>
                    <span>
                      {getElapsedTime(new Date(msg.created_at), language)}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <TransitionProvider
              inProp={openedMessageId === msg.id}
              style={TransitionStyleTypes.height}
              height={500}
              className={styles.mail__listItemDescription}
            >
              <p className={styles.mail__listItemDescriptionText}>{msg.body}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenedMessageId(null);
                }}
                className={styles.mail__btn}
              >
                <div className={styles.mail__btnInner}>
                  <span>{closeText[language]}</span>
                  <CancelIcon />
                </div>
              </button>
            </TransitionProvider>
          </div>
        ))}
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.mail__footer}
      >
        <div className={styles.mail__wings}>
          <HeaderWings reversed />
        </div>
        <button className={styles.mail__btn}>
          <div className={styles.mail__btnInner}>
            <span>{takeAllText[language]}</span>
            <TakeAllIcon />
          </div>
        </button>
      </TransitionProvider>
    </section>
  );
};

export default Mail;
