import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import TitleH3 from "../../layout/TitleH3/TitleH3";
import {
  CalendarIcon,
  CrackersLevelicon,
  Dotsline,
  HackerLevelIcon,
  MainFrame,
  NewbiesLevelIcon,
} from "../../layout/icons/HackTerminal/HackTerminalRatings";
import styles from "./HackTerminalRatings.module.scss";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const {
  titleText,
  levels: levelsTexts,
  filters,
  placeText,
  gamesText,
  lastPlayText,
  daysAgoText,
  todayText,
} = TRANSLATIONS.hackTerminal.ratings;

const levels = [
  {
    name: levelsTexts.hacker,
    icon: <HackerLevelIcon />,
  },
  {
    name: levelsTexts.cracker,
    icon: <CrackersLevelicon />,
  },
  {
    name: levelsTexts.newbie,
    icon: <NewbiesLevelIcon />,
  },
];

const dayFilters = filters;
const dayFilterKeys = ["winsInMonth", "winsInWeek", "allWins"] as const;

const data = [
  ...Array.from({ length: 15 }, (_, i) => {
    const names = [
      "Хакер228",
      "Взломщик007",
      "Новичок123",
      "КиберВолк",
      "ТехноМаг",
      "СетевойГуру",
      "Питончик",
      "БайтМастер",
      "КодерX",
      "Скриптер",
      "Терминатор",
      "Вирус",
      "Флудер",
      "Досер",
      "Рутер",
    ];
    const name = names[i % names.length];
    const allWins = Math.floor(Math.random() * 200) + 1;
    const winsInWeek = Math.floor(Math.random() * 15);
    const winsInMonth = Math.floor(Math.random() * 40);
    const lastPlay = Math.floor(Math.random() * 10);
    return {
      name,
      allWins,
      winsInWeek,
      winsInMonth,
      lastPlay,
    };
  }),
];

const HackTerminalRatings = () => {
  const username = useAppSelector((state) => state.profile.username);
  const language = useAppSelector((state) => state.ui.language);
  const [activeDayFilter, setActiveDayFilter] = useState(0);
  const [activeLevelFilter, setActiveLevelFilter] = useState(0);
  return (
    <div className={`container ${styles.hackTerminalRatings}`}>
      <TitleH3 wingsReverse={false}>{titleText[language]}</TitleH3>
      <div className={styles.hackTerminalRatings__tabs}>
        {levels.map((item, index) => (
          <button
            key={item.name[language]}
            onClick={() => setActiveLevelFilter(index)}
            className={`${styles.hackTerminalRatings__tabBtn} ${
              index === activeLevelFilter
                ? styles.hackTerminalRatings__tabBtn_active
                : ""
            }`}
          >
            {item.icon}
            <span>{item.name[language]}</span>
          </button>
        ))}
      </div>
      <div className={styles.hackTerminalRatings__main}>
        <div className={styles.hackTerminalRatings__mainBg}>
          <MainFrame />
        </div>
        <div className={styles.hackTerminalRatings__dayFilter}>
          {Object.values(dayFilters).map((item, index) => (
            <button
              onClick={() => setActiveDayFilter(index)}
              key={index}
              className={`${styles.hackTerminalRatings__dayFilterBtn} ${
                index === activeDayFilter
                  ? styles.hackTerminalRatings__dayFilterBtn_active
                  : ""
              }`}
            >
              <div className={styles.hackTerminalRatings__dayFilterBtnInner}>
                <CalendarIcon />
                <span>{item[language]}</span>
              </div>
            </button>
          ))}
        </div>
        <div className={styles.hackTerminalRatings__listHeader}>
          <span className={styles.hackTerminalRatings__headerText}>#</span>
          <span className={styles.hackTerminalRatings__headerText}>
            {placeText[language]}
          </span>
          <span className={styles.hackTerminalRatings__headerText}>
            {gamesText[language]}
          </span>
          <span className={styles.hackTerminalRatings__headerText}>
            {lastPlayText[language]}
          </span>
        </div>
        <span className={styles.hackTerminalRatings__list}>
          {data.map((item, index) => (
            <div className={styles.hackTerminalRatings__listItem} key={index}>
              <span className={styles.hackTerminalRatings__headerListItemText}>
                {index + 1}
              </span>
              <span className={styles.hackTerminalRatings__headerListItemText}>
                {item.name}
              </span>
              <span className={styles.hackTerminalRatings__headerListItemText}>
                {item[dayFilterKeys[activeDayFilter]]}
              </span>
              <span className={styles.hackTerminalRatings__headerListItemText}>
                {daysAgoText[language].replace(
                  "DAYS",
                  item.lastPlay.toString()
                )}
                .
              </span>
            </div>
          ))}
        </span>
        <div className={styles.hackTerminalRatings__curUserStatus}>
          <div className={styles.hackTerminalRatings__curUserStatusDotline}>
            <Dotsline />
          </div>
          <div className={styles.hackTerminalRatings__curUserStatusCol}>
            <span className={styles.hackTerminalRatings__curUserStatusText}>
              120
            </span>
            <span className={styles.hackTerminalRatings__curUserStatusText}>
              {username}
            </span>
            <span className={styles.hackTerminalRatings__curUserStatusText}>
              7
            </span>
            <span className={styles.hackTerminalRatings__curUserStatusText}>
              {todayText[language]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackTerminalRatings;
