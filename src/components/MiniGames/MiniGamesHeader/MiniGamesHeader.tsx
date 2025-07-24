import React, { useState } from "react";
import styles from "./MiniGamesHeader.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import {
  HeaderBottomBg,
  HeaderBtnsBg,
  HeaderPremiumIcon,
  HeaderSettingsIcon,
  HeaderSwitcherIcon,
} from "../../layout/icons/Common/Header";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { useNavigate } from "react-router-dom";
import { onBoardingPagePath } from "../../../router/constants";
import StatImg from "../../layout/StatImg/StatImg";
import { EStats } from "../../../constants/EStats";

import { formatNumber } from "../../../utils/formatNumber";
import SettingsModal from "../../SettingsModal/SettingsModal";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const { getPremiumText } = TRANSLATIONS.common;

const MiniGamesHeader = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const stats = useAppSelector((state) => state.profile.stats);
  const [settingsOpened, setSettingsOpened] = useState(false);

  const onSwith = () => {
    navigate(onBoardingPagePath);
  };
  return (
    <header
      className={`${styles.miniGamesHeader} ${
        gameInited ? styles.miniGamesHeader_inited : ""
      }`}
    >
      <div
        className={`${styles.miniGamesHeader__cornerBlock} ${styles.miniGamesHeader__cornerBlock_left}`}
      >
        <div className={styles.miniGamesHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.miniGamesHeader__dotsLine}>
          <DotsLine />
        </div>
        <button onClick={onSwith} className={styles.miniGamesHeader__mainBtn}>
          <HeaderSwitcherIcon />
        </button>
      </div>
      <div className={styles.miniGamesHeader__stat}>
        <StatImg stat={EStats.cp} size={19} />
        <span className={styles.miniGamesHeader__statText}>
          {formatNumber(stats.cp, undefined, true)}
        </span>
      </div>
      <div
        onClick={() => {}}
        className={styles.miniGamesHeader__premiumBtnWrapper}
      >
        <button className={styles.miniGamesHeader__premiumBtn}>
          <HeaderPremiumIcon />
          <span>{getPremiumText[language]}</span>
        </button>
      </div>
      <div
        className={`${styles.miniGamesHeader__cornerBlock} ${styles.miniGamesHeader__cornerBlock_right}`}
      >
        <div className={styles.miniGamesHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.miniGamesHeader__dotsLine}>
          <DotsLine />
        </div>
        <button
          onClick={() => setSettingsOpened(true)}
          className={styles.miniGamesHeader__mainBtn}
        >
          <HeaderSettingsIcon />
        </button>
      </div>

      <div className={styles.miniGamesHeader__bottomBlock}>
        <div className={styles.miniGamesHeader__bottomBlockBg}>
          <HeaderBottomBg />
        </div>
        <div className={styles.miniGamesHeader__hideBtn}></div>
      </div>

      <SettingsModal
        show={settingsOpened}
        onClose={() => setSettingsOpened(false)}
      />
    </header>
  );
};

export default MiniGamesHeader;
