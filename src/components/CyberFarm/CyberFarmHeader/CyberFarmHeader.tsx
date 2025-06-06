import React from "react";
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
import { lsProps } from "../../../utils/lsProps";
import { onBoardingPagePath } from "../../../router/constants";
import { removeLSItem } from "../../../helpers/localStorage";
import StatImg from "../../layout/StatImg/StatImg";
import { EStats } from "../../../constants/EStats";
import { WalletIcon } from "../../layout/icons/CyberFarm/CyberFarmHeader";

const CyberFarmHeader = () => {
  const navigate = useNavigate();

  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass =
    (className?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.cyberFarmHeader__navBtn_active} ${
            styles.cyberFarmHeader__navBtn
          } ${className || ""}`
        : `${styles.cyberFarmHeader__navBtn} ${className || ""}`;

  const onSwith = () => {
    removeLSItem(lsProps.selectedGameLink);
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
          <NavLink to={``} className={linkActiveClass()}>
            <HeaderReferenceIcon />
          </NavLink>
        </div>
        <div className={styles.cyberFarmHeader__stat}>
          <StatImg stat={EStats.kredit} size={19} />
          <span className={styles.cyberFarmHeader__statText}>126,90k</span>
        </div>
      </div>
      <button className={styles.cyberFarmHeader__walletBtn}>
        <WalletIcon />
        <span>Балансы</span>
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
          <NavLink to={"/rating"} className={linkActiveClass()}>
            <HeaderRatingIcon />
          </NavLink>
        </div>
        <div className={styles.cyberFarmHeader__stat}>
          <StatImg stat={EStats.darkMatter} size={19} />
          <span className={styles.cyberFarmHeader__statText}>126,90k</span>
        </div>
      </div>

      <div className={styles.cyberFarmHeader__bottomBlock}>
        <div className={styles.cyberFarmHeader__bottomBlockBg}>
          <HeaderBottomBg />
        </div>
        <div className={styles.cyberFarmHeader__hideBtn}></div>
      </div>
    </header>
  );
};

export default CyberFarmHeader;
