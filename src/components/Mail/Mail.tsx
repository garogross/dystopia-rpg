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

const messages = [
  {
    id: 1,
    from: "Командование Сектора 9",
    theme: "Уважение заслужено",
    received: Date.now() - 2 * 24 * 60 * 60 * 1000,
    status: "new",
    description:
      "Поздравляем! Ваши действия были отмечены командованием. Продолжайте в том же духе для дальнейшего продвижения.",
  },
  {
    id: 2,
    from: "Агентство Связи",
    theme: "Важное обновление",
    received: Date.now() - 1 * 24 * 60 * 60 * 1000,
    status: "read",
    description:
      "Появились новые правила использования коммуникационных каналов. Ознакомьтесь с изменениями в приложении.",
  },
  {
    id: 3,
    from: "Система Безопасности",
    theme: "Подтверждение входа",
    received: Date.now() - 3 * 24 * 60 * 60 * 1000,
    status: "new",
    description:
      "Вход в систему был выполнен с нового устройства. Если это были не вы, обратитесь в службу поддержки.",
  },
  {
    id: 4,
    from: "Техническая Поддержка",
    theme: "Ответ на ваш запрос",
    received: Date.now() - 5 * 24 * 60 * 60 * 1000,
    status: "read",
    description:
      "Ваш запрос был обработан. Если проблема сохраняется, пожалуйста, создайте новый тикет.",
  },
  {
    id: 5,
    from: "Командование Сектора 7",
    theme: "Приглашение на собрание",
    received: Date.now() - 4 * 24 * 60 * 60 * 1000,
    status: "new",
    description:
      "Вы приглашены на еженедельное собрание сектора. Подтвердите своё участие в календаре.",
  },
  {
    id: 6,
    from: "Снабжение",
    theme: "Поставка ресурсов",
    received: Date.now() - 6 * 24 * 60 * 60 * 1000,
    status: "read",
    description:
      "Поставка ресурсов успешно завершена. Проверьте склад для подтверждения получения.",
  },
  {
    id: 7,
    from: "Центр Обучения",
    theme: "Новые инструкции",
    received: Date.now() - 7 * 24 * 60 * 60 * 1000,
    status: "new",
    description:
      "Доступны новые обучающие материалы. Рекомендуем ознакомиться для повышения квалификации.",
  },
  {
    id: 8,
    from: "Служба Поддержки",
    theme: "Ваш тикет закрыт",
    received: Date.now() - 8 * 24 * 60 * 60 * 1000,
    status: "read",
    description:
      "Ваш тикет был успешно закрыт. Спасибо за обращение в службу поддержки.",
  },
  {
    id: 9,
    from: "Командование Сектора 3",
    theme: "Изменения в расписании",
    received: Date.now() - 9 * 24 * 60 * 60 * 1000,
    status: "new",
    description:
      "В расписание внесены изменения. Проверьте актуальное время проведения мероприятий.",
  },
  {
    id: 10,
    from: "Система Оповещений",
    theme: "Системное сообщение",
    received: Date.now() - 10 * 24 * 60 * 60 * 1000,
    status: "read",
    description: "Это автоматическое системное сообщение. Не требует ответа.",
  },
];

const Mail = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const [openedMessageId, setOpenedMessageId] = useState<null | number>(null);
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
          <span>{totalText[language]}: 50</span>
        </p>
        <p className={styles.mail__infoText}>
          <Dotsline />
          <span>{unreadText[language]}: 0</span>
        </p>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.mail__list}
      >
        {messages.map((msg) => (
          <div
            onClick={() => setOpenedMessageId(msg.id)}
            key={msg.id}
            className={styles.mail__listItem}
          >
            <div className={styles.mail__itemMain}>
              {msg.status === "read" ? <ReadMessageIcon /> : <NewMessageIcon />}
              <div className={styles.mail__itemMainTexts}>
                <div className={styles.mail__itemHeader}>
                  <div className={styles.mail__itemCol}>
                    <strong>{fromText[language]}: </strong>
                    <span>{msg.from}</span>
                  </div>
                  <div className={styles.mail__itemActions}>
                    {msg.status === "new" && (
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
                  <span>{msg.theme}</span>
                </p>
                <p className={styles.mail__itemCol}>
                  <strong>{receivedText[language]}: </strong>
                  <span>{getElapsedTime(msg.received, language)}</span>
                </p>
              </div>
            </div>
            <TransitionProvider
              inProp={openedMessageId === msg.id}
              style={TransitionStyleTypes.height}
              height={500}
              className={styles.mail__listItemDescription}
            >
              <p className={styles.mail__listItemDescriptionText}>
                {msg.description}
              </p>
              <button className={styles.mail__btn}>
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
