import React from "react";
import {
  AchievmentsIcon,
  BottomWings,
  LevelSelectIcon,
  PrizesListIcon,
  RatingsIcon,
  RullesIcon,
} from "../../layout/icons/HackTerminal/HackTerminalBottomNavbar";
import { NavLink } from "react-router-dom";
import {
  hackTerminalAchievmentsPagePath,
  hackTerminalLevelSelectPagePath,
  hackTerminalPrizesPagePath,
  hackTerminalRatingsPagePath,
  hackTerminalRulesPagePath,
} from "../../../router/constants";
import styles from "./HackTerminalBottomNavbar.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const {
  ratingsText,
  levelSelectText,
  achievmentsText,
  prizesListText,
  rulesText,
} = TRANSLATIONS.hackTerminal.bottomNavbar;

const mainLinks = [
  {
    icon: <RatingsIcon />,
    link: hackTerminalRatingsPagePath,
    name: ratingsText,
  },
  {
    icon: <LevelSelectIcon />,
    link: hackTerminalLevelSelectPagePath,
    name: levelSelectText,
  },
  {
    icon: <AchievmentsIcon />,
    link: hackTerminalAchievmentsPagePath,
    name: achievmentsText,
  },
];

const linkActiveClass =
  (mainClass: string, activeClass: string) =>
  ({ isActive }: { isActive: boolean }) =>
    isActive ? `${activeClass} ${mainClass}` : `${mainClass}`;

const HackTerminalBottomNavbar = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  const topBlockLinksActiveClass = linkActiveClass(
    styles.hackTerminalBottomNavbar__topBlockLink,
    styles.hackTerminalBottomNavbar__topBlockLink_active
  );

  const maiNavLinksActiveClass = linkActiveClass(
    styles.hackTerminalBottomNavbar__mainNavLink,
    styles.hackTerminalBottomNavbar__mainNavLink_active
  );

  return (
    <div className={`container ${styles.hackTerminalBottomNavbar}`}>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.hackTerminalBottomNavbar__topBlock}
      >
        <div className={styles.hackTerminalBottomNavbar__btnsWrapper}>
          <NavLink
            to={hackTerminalPrizesPagePath}
            className={topBlockLinksActiveClass}
          >
            <PrizesListIcon />
            <span>{prizesListText[language]}</span>
          </NavLink>
          <NavLink
            to={hackTerminalRulesPagePath}
            className={topBlockLinksActiveClass}
          >
            <RullesIcon />
            <span>{rulesText[language]}</span>
          </NavLink>
        </div>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.hackTerminalBottomNavbar__main}
      >
        <div className={styles.hackTerminalBottomNavbar__mainNav}>
          {mainLinks.map((item) => (
            <NavLink
              to={item.link}
              key={item.link}
              className={maiNavLinksActiveClass}
            >
              <div
                className={styles.hackTerminalBottomNavbar__mainNavLinkInner}
              >
                {item.icon}
                <span>{item.name[language]}</span>
              </div>
            </NavLink>
          ))}
        </div>
        <div className={styles.hackTerminalBottomNavbar__bottomWings}>
          <BottomWings />
        </div>
      </TransitionProvider>
    </div>
  );
};

export default HackTerminalBottomNavbar;
