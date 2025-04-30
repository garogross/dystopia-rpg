import React from "react";

import styles from "./GameHeader.module.scss";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  darkMatterImage,
  darkMatterImageWebp,
  kreditImage,
  kreditImageWebp,
} from "../../../assets/images";
import { HeaderBtnsBg } from "../../layout/icons/game/Header/HeaderBtnsBg";
import { HeaderSwitcherIcon } from "../../layout/icons/game/Header/HeaderSwitcherIcon";
import { HeaderMailIcon } from "../../layout/icons/game/Header/HeaderMailIcon";
import { HeaderSettingsIcon } from "../../layout/icons/game/Header/HeaderSettingsIcon";
import { HeaderRatingIcon } from "../../layout/icons/game/Header/HeaderRatingIcon";
import { HeaderReferenceIcon } from "../../layout/icons/game/Header/HeaderReferenceIcon";
import { HeaderBottomBg } from "../../layout/icons/game/Header/HeaderBottomBg";
import { HeaderHideIcon } from "../../layout/icons/game/Header/HeaderHideIcon";
import { DotsLine } from "../../layout/icons/game/Common/DotsLine";
import HeaderPremiumIcon from "../../layout/icons/game/Header/HeaderPremiumIcon";
import HeaderMiniGamesICon from "../../layout/icons/game/Header/HeaderMiniGamesICon";
import { useAppSelector } from "../../../hooks/redux";
import { Link, NavLink } from "react-router-dom";
import {
  gamePagePath,
  gameReferalsPagePath,
  gameSkinViewPagePath,
} from "../../../router/constants";

const GameHeader: React.FC = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass =
    (className?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.header__navBtn_active} ${styles.header__navBtn} ${
            className || ""
          }`
        : `${styles.header__navBtn} ${className || ""}`;

  return (
    <header
      className={`${styles.header} ${gameInited ? styles.header_inited : ""}`}
    >
      <div
        className={`${styles.header__cornerBlock} ${styles.header__cornerBlock_left}`}
      >
        <div className={styles.header__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.header__dotsLine}>
          <DotsLine />
        </div>
        <button className={styles.header__mainBtn}>
          <HeaderSwitcherIcon />
        </button>
        <div className={styles.header__navBtns}>
          <NavLink to={"/mingames"} className={linkActiveClass()}>
            <HeaderMiniGamesICon />
          </NavLink>
          <NavLink
            to={"/mail"}
            className={linkActiveClass(styles.header__mailBtn)}
          >
            <HeaderMailIcon />
          </NavLink>
        </div>
        <div className={styles.header__stat}>
          <div className={styles.header__statImgWrapper}>
            <ImageWebp
              src={kreditImage}
              alt="kredit"
              className={styles.header__statImg}
              srcSet={kreditImageWebp}
            />
          </div>
          <span className={styles.header__statText}>126,90k</span>
        </div>
      </div>
      <button className={styles.header__premiumBtn}>
        <HeaderPremiumIcon />
        <span>Получить премиум</span>
      </button>
      <div
        className={`${styles.header__cornerBlock} ${styles.header__cornerBlock_right}`}
      >
        <div className={styles.header__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.header__dotsLine}>
          <DotsLine />
        </div>
        <button className={styles.header__mainBtn}>
          <HeaderSettingsIcon />
        </button>
        <div className={styles.header__navBtns}>
          <NavLink
            to={"/rating"}
            className={linkActiveClass(styles.header__ratingBtn)}
          >
            <HeaderRatingIcon />
          </NavLink>
          <NavLink
            to={`${gamePagePath}/${gameReferalsPagePath}`}
            className={linkActiveClass()}
          >
            <HeaderReferenceIcon />
          </NavLink>
        </div>
        <div className={styles.header__stat}>
          <div className={styles.header__statImgWrapper}>
            <ImageWebp
              src={darkMatterImage}
              alt="kredit"
              className={styles.header__statImg}
              srcSet={darkMatterImageWebp}
            />
          </div>
          <span className={styles.header__statText}>126,90k</span>
        </div>
      </div>

      <div className={styles.header__bottomBlock}>
        <div className={styles.header__bottomBlockBg}>
          <HeaderBottomBg />
        </div>
        <Link
          to={`${gamePagePath}/${gameSkinViewPagePath}`}
          className={styles.header__hideBtn}
        >
          <HeaderHideIcon />
        </Link>
      </div>
    </header>
  );
};

export default GameHeader;
