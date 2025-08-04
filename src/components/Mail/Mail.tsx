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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CancelIcon } from "../layout/icons/Common";
import { HeaderWings } from "../layout/icons/RPGGame/Common";

import styles from "./Mail.module.scss";
import { Dotsline } from "../layout/icons/HackTerminal/HackTerminalRatings";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { receiveMailReward } from "../../store/slices/influence/mailSlice";
import { useTooltip } from "../../hooks/useTooltip";
import LoadingOverlay from "../layout/LoadingOverlay/LoadingOverlay";
import Tooltip from "../layout/Tooltip/Tooltip";

const {
  inboxTitleText,
  totalText,
  fromText,
  themeText,
  receivedText,
  unreadText,
  claimText,
  closeText,
  takeAllText,
  claimRewardFailedText,
  messageDeletedSuccessText,
  claimRewardSuccessText,
} = TRANSLATIONS.mail;

const Mail = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const mails = useAppSelector((state) => state.influence.mail.mails);
  const [openedMessageId, setOpenedMessageId] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState(claimRewardSuccessText);
  const { show: showTooltip, openTooltip } = useTooltip();
  const unreadMessagesLength = mails.filter((mail) => !mail.read).length;

  const hasUnreadMessages = mails.some((mail) => !mail.read);

  const onReward = async (
    id: string | undefined,
    action: "read" | "delete" | "read_all"
  ) => {
    try {
      setLoading(true);
      if (action === "read_all") {
        await dispatch(receiveMailReward({ action })).unwrap();
      } else {
        await dispatch(
          receiveMailReward({ id: id as string, action })
        ).unwrap();
      }
      setTooltipText(
        action === "delete" ? messageDeletedSuccessText : claimRewardSuccessText
      );
    } catch (error) {
      setTooltipText(claimRewardFailedText);
    } finally {
      setLoading(false);
      openTooltip();
    }
  };

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
        {[...mails]
          .sort((a, b) => {
            const aTime = a?.created_at ? new Date(a.created_at).getTime() : 0;
            const bTime = b?.created_at ? new Date(b.created_at).getTime() : 0;
            return bTime - aTime;
          })
          .map((msg) => (
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onReward(msg.id, "read");
                          }}
                          className={styles.mail__actionBtn}
                        >
                          <SetAsReadIcon />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReward(msg.id, "delete");
                        }}
                        className={styles.mail__actionBtn}
                      >
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
                <p className={styles.mail__listItemDescriptionText}>
                  {msg.body}
                </p>
                {!msg?.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReward(msg.id, "read");
                    }}
                    className={styles.mail__btn}
                  >
                    <div className={styles.mail__btnInner}>
                      <span>{claimText[language]}</span>
                      <TakeAllIcon />
                    </div>
                  </button>
                )}
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
        <TransitionProvider
          inProp={hasUnreadMessages}
          style={TransitionStyleTypes.opacity}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReward(undefined, "read_all");
            }}
            className={styles.mail__btn}
          >
            <div className={styles.mail__btnInner}>
              <span>{takeAllText[language]}</span>
              <TakeAllIcon />
            </div>
          </button>
        </TransitionProvider>
      </TransitionProvider>
      <LoadingOverlay loading={loading} />
      <Tooltip show={showTooltip} text={tooltipText[language]} />
    </section>
  );
};

export default Mail;
