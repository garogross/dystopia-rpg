import React from "react";
import {
  AchievmentsIcon,
  ModeSelectIcon,
  NecrobombIcon,
  RatingsIcon,
} from "../../layout/icons/BubbleFront/BubbleFrontBottomNavbar";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { bubbleGunImage, bubbleGunImageWebp } from "../../../assets/imageMaps";
import { TopBtnBg } from "../../layout/icons/BubbleFront/BubbleFrontBottomNavbar/TopBtnBg";
import BottomBtnBg from "../../layout/icons/BubbleFront/BubbleFrontBottomNavbar/BottomBtnBg";
import styles from "./BubbleFrontBottomNavbar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { BottomWings } from "../../layout/icons/HackTerminal/HackTerminalBottomNavbar";
import {
  bubbleFrontAchievmentsPagePath,
  bubbleFrontRatingsPagePath,
} from "../../../router/constants";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

const { modeSelectText, ratingsText, necrobombText, achievementsText } =
  TRANSLATIONS.bubbleFront.bottomNavbar;

const BubbleFrontBottomNavbar = () => {
  const location = useLocation();
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.bubbleFrontBottomNavbar__btn_active} ${styles.bubbleFrontBottomNavbar__btn}`
      : `${styles.bubbleFrontBottomNavbar__btn}`;

  return (
    <div className={styles.bubbleFrontBottomNavbar}>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.bubbleFrontBottomNavbar__main}
      >
        <div className={styles.bubbleFrontBottomNavbar__col}>
          <button className={styles.bubbleFrontBottomNavbar__btn}>
            <ModeSelectIcon />
            <span>{modeSelectText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <TopBtnBg />
            </div>
          </button>
          <NavLink to={bubbleFrontRatingsPagePath} className={linkActiveClass}>
            <RatingsIcon />
            <span>{ratingsText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <BottomBtnBg
                reversed
                active={location.pathname.endsWith(bubbleFrontRatingsPagePath)}
              />
            </div>
          </NavLink>
        </div>
        <div className={styles.bubbleFrontBottomNavbar__gun}>
          <ImageWebp
            src={bubbleGunImage}
            srcSet={bubbleGunImageWebp}
            alt="bubble gun"
            className={styles.bubbleFrontBottomNavbar__gunImg}
          />
        </div>
        <div className={styles.bubbleFrontBottomNavbar__col}>
          <button className={styles.bubbleFrontBottomNavbar__btn}>
            <NecrobombIcon />
            <span>{necrobombText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <TopBtnBg reversed />
            </div>
          </button>
          <NavLink
            to={bubbleFrontAchievmentsPagePath}
            className={linkActiveClass}
          >
            <AchievmentsIcon />
            <span>{achievementsText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <BottomBtnBg
                active={location.pathname.endsWith(
                  bubbleFrontAchievmentsPagePath
                )}
              />
            </div>
          </NavLink>
        </div>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.bubbleFrontBottomNavbar__bottowmWings}
      >
        <BottomWings />
      </TransitionProvider>
    </div>
  );
};

export default BubbleFrontBottomNavbar;
