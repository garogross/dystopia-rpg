import React, { useState } from "react";
import styles from "./CyberFarmHeader.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import {
  HeaderBottomBg,
  HeaderBtnsBg,
  HeaderRatingIcon,
  HeaderReferenceIcon,
  HeaderSettingsIcon,
  HeaderSwitcherIcon,
} from "../../layout/icons/Common/Header";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { NavLink, useNavigate } from "react-router-dom";
import { onBoardingPagePath } from "../../../router/constants";
import StatImg from "../../layout/StatImg/StatImg";
import { EStats } from "../../../constants/EStats";
import { WalletIcon } from "../../layout/icons/CyberFarm/CyberFarmHeader";
import CyberFarmBonuses from "../CyberFarmBonuses/CyberFarmBonuses";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { formatNumber } from "../../../utils/formatNumber";
const { balancesText } = TRANSLATIONS.cyberFarm.header;
const CyberFarmHeader = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const stats = useAppSelector((state) => state.profile.stats);
  const language = useAppSelector((state) => state.ui.language);
  const [bonusesOpened, setBonusesOpened] = useState(false);
  const linkActiveClass =
    (className?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.cyberFarmHeader__navBtn_active} ${
            styles.cyberFarmHeader__navBtn
          } ${className || ""}`
        : `${styles.cyberFarmHeader__navBtn} ${className || ""}`;

  const onSwith = () => {
    navigate(onBoardingPagePath);
  };
  return (
    <header
      className={`${styles.cyberFarmHeader} ${
        gameInited ? styles.cyberFarmHeader_inited : ""
      }`}
    >
      <div
        className={`${styles.cyberFarmHeader__cornerBlock} ${styles.cyberFarmHeader__cornerBlock_left}`}
      >
        <div className={styles.cyberFarmHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.cyberFarmHeader__dotsLine}>
          <DotsLine />
        </div>
        <button onClick={onSwith} className={styles.cyberFarmHeader__mainBtn}>
          <HeaderSwitcherIcon />
        </button>
        <div className={styles.cyberFarmHeader__navBtns}>
          <NavLink
            to={`/ref`}
            className={linkActiveClass(styles.cyberFarmHeader__refBtn)}
          >
            <HeaderReferenceIcon />
          </NavLink>
        </div>
        <div className={styles.cyberFarmHeader__stat}>
          <StatImg stat={EStats.cp} size={19} />
          <span className={styles.cyberFarmHeader__statText}>
            {formatNumber(stats.cp)}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          setBonusesOpened(true);
        }}
        className={styles.cyberFarmHeader__walletBtn}
      >
        <WalletIcon />
        <span>{balancesText[language]}</span>
      </button>
      <div
        className={`${styles.cyberFarmHeader__cornerBlock} ${styles.cyberFarmHeader__cornerBlock_right}`}
      >
        <div className={styles.cyberFarmHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.cyberFarmHeader__dotsLine}>
          <DotsLine />
        </div>
        <button className={styles.cyberFarmHeader__mainBtn}>
          <HeaderSettingsIcon />
        </button>
        <div className={styles.cyberFarmHeader__navBtns}>
          <NavLink
            to={"/rating"}
            className={linkActiveClass(styles.cyberFarmHeader__ratingBtn)}
          >
            <HeaderRatingIcon />
          </NavLink>
        </div>
        <div className={styles.cyberFarmHeader__stat}>
          <StatImg stat={EStats.ton} size={19} />
          <span className={styles.cyberFarmHeader__statText}>
            {formatNumber(stats.ton)}
          </span>
        </div>
      </div>

      <div className={styles.cyberFarmHeader__bottomBlock}>
        <div className={styles.cyberFarmHeader__bottomBlockBg}>
          <HeaderBottomBg />
        </div>
        <div className={styles.cyberFarmHeader__hideBtn}></div>
      </div>
      <CyberFarmBonuses
        show={bonusesOpened}
        onClose={() => setBonusesOpened(false)}
      />
    </header>
  );
};

export default CyberFarmHeader;
