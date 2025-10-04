import React from "react";
import {
  AchievmentsIcon,
  BottomWings,
  LevelSelectIcon,
  RatingsIcon,
} from "../layout/icons/GameBottomNavbar";
import { NavLink } from "react-router-dom";

import styles from "./GameBottomNavbar.module.scss";
import { useAppSelector } from "../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";

const { ratingsText, levelSelectText, achievmentsText } =
  TRANSLATIONS.miniGames.gameBottomNavbar;

interface Props {
  ratingsPagePath: string;
  levelSelectPagePath: string;
  achievmentsPagePath: string;
}

const linkActiveClass =
  (mainClass: string, activeClass: string) =>
  ({ isActive }: { isActive: boolean }) =>
    isActive ? `${activeClass} ${mainClass}` : `${mainClass}`;

const GameBottomNavbar: React.FC<Props> = ({
  ratingsPagePath,
  levelSelectPagePath,
  achievmentsPagePath,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  const mainLinks = [
    {
      icon: <RatingsIcon />,
      link: ratingsPagePath,
      name: ratingsText,
    },
    {
      icon: <LevelSelectIcon />,
      link: levelSelectPagePath,
      name: levelSelectText,
    },
    {
      icon: <AchievmentsIcon />,
      link: achievmentsPagePath,
      name: achievmentsText,
    },
  ];

  const maiNavLinksActiveClass = linkActiveClass(
    styles.gameBottomNavbar__mainNavLink,
    styles.gameBottomNavbar__mainNavLink_active
  );

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.gameBottomNavbar}
    >
      <div className={styles.gameBottomNavbar__mainNav}>
        {mainLinks.map((item) => (
          <NavLink
            to={item.link}
            key={item.link}
            className={maiNavLinksActiveClass}
          >
            <div className={styles.gameBottomNavbar__mainNavLinkInner}>
              {item.icon}
              <span>{item.name[language]}</span>
            </div>
          </NavLink>
        ))}
      </div>
      <div className={styles.gameBottomNavbar__bottomWings}>
        <BottomWings />
      </div>
    </TransitionProvider>
  );
};

export default GameBottomNavbar;
