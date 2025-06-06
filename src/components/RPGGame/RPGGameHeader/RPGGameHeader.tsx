import React from "react";

import styles from "./RPGGameHeader.module.scss";

import {
  RPGHeaderMailIcon,
  RPGHeaderHideIcon,
  RPGHeaderPremiumIcon,
  RPGHeaderMiniGamesICon,
} from "../../layout/icons/RPGGame/RPGHeader";

import {
  HeaderBottomBg,
  HeaderBtnsBg,
  HeaderRatingIcon,
  HeaderReferenceIcon,
  HeaderSettingsIcon,
  HeaderSwitcherIcon,
} from "../../layout/icons/Common/Header";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { useAppSelector } from "../../../hooks/redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  onBoardingPagePath,
  rpgGamePagePath,
  rpgGameReferalsPagePath,
  rpgGameSkinViewPagePath,
} from "../../../router/constants";
import { EStats } from "../../../constants/EStats";
import StatImg from "../../layout/StatImg/StatImg";
import { removeLSItem } from "../../../helpers/localStorage";
import { lsProps } from "../../../utils/lsProps";

const RPGGameHeader: React.FC = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass =
    (className?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.rpgGameHeader__navBtn_active} ${
            styles.rpgGameHeader__navBtn
          } ${className || ""}`
        : `${styles.rpgGameHeader__navBtn} ${className || ""}`;

  const onSwith = () => {
    removeLSItem(lsProps.selectedGameLink);
    navigate(onBoardingPagePath);
  };

  return (
    <header
      className={`${styles.rpgGameHeader} ${
        gameInited ? styles.rpgGameHeader_inited : ""
      }`}
    >
      <div
        className={`${styles.rpgGameHeader__cornerBlock} ${styles.rpgGameHeader__cornerBlock_left}`}
      >
        <div className={styles.rpgGameHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.rpgGameHeader__dotsLine}>
          <DotsLine />
        </div>
        <button onClick={onSwith} className={styles.rpgGameHeader__mainBtn}>
          <HeaderSwitcherIcon />
        </button>
        <div className={styles.rpgGameHeader__navBtns}>
          <NavLink to={"/mingames"} className={linkActiveClass()}>
            <RPGHeaderMiniGamesICon />
          </NavLink>
          <NavLink
            to={"/mail"}
            className={linkActiveClass(styles.rpgGameHeader__mailBtn)}
          >
            <RPGHeaderMailIcon />
          </NavLink>
        </div>
        <div className={styles.rpgGameHeader__stat}>
          <StatImg stat={EStats.kredit} size={19} />
          <span className={styles.rpgGameHeader__statText}>126,90k</span>
        </div>
      </div>
      <button className={styles.rpgGameHeader__premiumBtn}>
        <RPGHeaderPremiumIcon />
        <span>Получить премиум</span>
      </button>
      <div
        className={`${styles.rpgGameHeader__cornerBlock} ${styles.rpgGameHeader__cornerBlock_right}`}
      >
        <div className={styles.rpgGameHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.rpgGameHeader__dotsLine}>
          <DotsLine />
        </div>
        <button className={styles.rpgGameHeader__mainBtn}>
          <HeaderSettingsIcon />
        </button>
        <div className={styles.rpgGameHeader__navBtns}>
          <NavLink
            to={"/rating"}
            className={linkActiveClass(styles.rpgGameHeader__ratingBtn)}
          >
            <HeaderRatingIcon />
          </NavLink>
          <NavLink
            to={`${rpgGamePagePath}/${rpgGameReferalsPagePath}`}
            className={linkActiveClass()}
          >
            <HeaderReferenceIcon />
          </NavLink>
        </div>
        <div className={styles.rpgGameHeader__stat}>
          <StatImg stat={EStats.darkMatter} size={19} />
          <span className={styles.rpgGameHeader__statText}>126,90k</span>
        </div>
      </div>

      <div className={styles.rpgGameHeader__bottomBlock}>
        <div className={styles.rpgGameHeader__bottomBlockBg}>
          <HeaderBottomBg />
        </div>
        <Link
          to={`${rpgGamePagePath}/${rpgGameSkinViewPagePath}`}
          className={styles.rpgGameHeader__hideBtn}
        >
          <RPGHeaderHideIcon />
        </Link>
      </div>
    </header>
  );
};

export default RPGGameHeader;
