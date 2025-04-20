import React from "react";

import styles from "./GameHeader.module.scss";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  darkMatterImage,
  darkMatterImageWebp,
  kardImage,
  kardImageWebp,
} from "../../../assets/images";
import { HeaderBtnsBg } from "../../layout/icons/game/Header/HeaderBtnsBg";
import { HeaderSwitcherIcon } from "../../layout/icons/game/Header/HeaderSwitcherIcon";
import { HeaderSupportIcon } from "../../layout/icons/game/Header/HeaderSupportIcon";
import { HeaderMailIcon } from "../../layout/icons/game/Header/HeaderMailIcon";
import { HeaderSettingsIcon } from "../../layout/icons/game/Header/HeaderSettingsIcon";
import { HeaderRatingIcon } from "../../layout/icons/game/Header/HeaderRatingIcon";
import { HeaderReferenceIcon } from "../../layout/icons/game/Header/HeaderReferenceIcon";
import { HeaderBottomBg } from "../../layout/icons/game/Header/HeaderBottomBg";
import { HeaderHideIcon } from "../../layout/icons/game/Header/HeaderHideIcon";
import { DotsLine } from "../../layout/icons/game/Common/DotsLine";

interface Props {}

const GameHeader: React.FC<Props> = (props) => {
  return (
    <header className={styles.header}>
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
          <button className={styles.header__navBtn}>
            <HeaderSupportIcon />
          </button>
          <button
            className={`${styles.header__navBtn} ${styles.header__mailBtn}`}
          >
            <HeaderMailIcon />
          </button>
        </div>
        <div className={styles.header__stat}>
          <div className={styles.header__statImgWrapper}>
            <ImageWebp
              src={kardImage}
              alt="kard"
              className={styles.header__statImg}
              srcSet={kardImageWebp}
            />
          </div>
          <span className={styles.header__statText}>126,90k</span>
        </div>
      </div>
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
          <button
            className={`${styles.header__navBtn} ${styles.header__ratingBtn}`}
          >
            <HeaderRatingIcon />
          </button>
          <button className={styles.header__navBtn}>
            <HeaderReferenceIcon />
          </button>
        </div>
        <div className={styles.header__stat}>
          <div className={styles.header__statImgWrapper}>
            <ImageWebp
              src={darkMatterImage}
              alt="kard"
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
        <button className={styles.header__hideBtn}>
          <HeaderHideIcon />
        </button>
      </div>
    </header>
  );
};

export default GameHeader;
