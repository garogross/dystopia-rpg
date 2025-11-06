import React from "react";
import {
  PrizesListIcon,
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
import GameBottomNavbar from "../../GameBottomNavbar/GameBottomNavbar";

const { prizesListText, rulesText } = TRANSLATIONS.hackTerminal.bottomNavbar;

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
      <GameBottomNavbar
        ratingsPagePath={hackTerminalRatingsPagePath}
        levelSelectPagePath={hackTerminalLevelSelectPagePath}
        achievmentsPagePath={hackTerminalAchievmentsPagePath}
      />
    </div>
  );
};

export default HackTerminalBottomNavbar;
