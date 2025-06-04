import React from "react";

import styles from "./RPGGameHeader.module.scss";

import { RPGHeaderBtnsBg,
  RPGHeaderSwitcherIcon,
  RPGHeaderMailIcon,
  RPGHeaderSettingsIcon,
  RPGHeaderRatingIcon,
  RPGHeaderReferenceIcon,
  RPGHeaderBottomBg,
  RPGHeaderHideIcon,
  RPGHeaderPremiumIcon,
  RPGHeaderMiniGamesICon,
 } from "../../layout/icons/RPGGame/RPGHeader";
import {DotsLine} from "../../layout/icons/RPGGame/Common";
import { useAppSelector } from "../../../hooks/redux";
import { Link, NavLink } from "react-router-dom";
import {
  gamePagePath,
  gameReferalsPagePath,
  gameSkinViewPagePath,
} from "../../../router/constants";
import { EStats } from "../../../constants/EStats";
import StatImg from "../../layout/StatImg/StatImg";

const RPGGameHeader: React.FC = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass =
    (className?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.rpgGameHeader__navBtn_active} ${styles.rpgGameHeader__navBtn} ${
            className || ""
          }`
        : `${styles.rpgGameHeader__navBtn} ${className || ""}`;

  return (
    <header
      className={`${styles.rpgGameHeader} ${gameInited ? styles.rpgGameHeader_inited : ""}`}
    >
      <div
        className={`${styles.rpgGameHeader__cornerBlock} ${styles.rpgGameHeader__cornerBlock_left}`}
      >
        <div className={styles.rpgGameHeader__headerBtnsBg}>
          <RPGHeaderBtnsBg />
        </div>
        <div className={styles.rpgGameHeader__dotsLine}>
          <DotsLine />
        </div>
        <button className={styles.rpgGameHeader__mainBtn}>
          <RPGHeaderSwitcherIcon />
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
          <RPGHeaderBtnsBg />
        </div>
        <div className={styles.rpgGameHeader__dotsLine}>
          <DotsLine />
        </div>
        <button className={styles.rpgGameHeader__mainBtn}>
          <RPGHeaderSettingsIcon />
        </button>
        <div className={styles.rpgGameHeader__navBtns}>
          <NavLink
            to={"/rating"}
            className={linkActiveClass(styles.rpgGameHeader__ratingBtn)}
          >
            <RPGHeaderRatingIcon />
          </NavLink>
          <NavLink
            to={`${gamePagePath}/${gameReferalsPagePath}`}
            className={linkActiveClass()}
          >
            <RPGHeaderReferenceIcon />
          </NavLink>
        </div>
        <div className={styles.rpgGameHeader__stat}>
          <StatImg stat={EStats.darkMatter} size={19} />
          <span className={styles.rpgGameHeader__statText}>126,90k</span>
        </div>
      </div>

      <div className={styles.rpgGameHeader__bottomBlock}>
        <div className={styles.rpgGameHeader__bottomBlockBg}>
          <RPGHeaderBottomBg />
        </div>
        <Link
          to={`${gamePagePath}/${gameSkinViewPagePath}`}
          className={styles.rpgGameHeader__hideBtn}
        >
          <RPGHeaderHideIcon />
        </Link>
      </div>
    </header>
  );
};

export default RPGGameHeader;
