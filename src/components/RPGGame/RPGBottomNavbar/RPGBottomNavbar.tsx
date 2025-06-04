import React from "react";
import { NavLink } from "react-router-dom";
import { 
  RPGBottomNavbarBottomBg, 
  RPGBottomNavbarItemFrame, 
  RPGBottomNavbarItemInnerFrame, 
  RPGBottomNavbarChalanagesIcon, 
  RPGBottomNavbarDuelsIcon, 
  RPGBottomNavbarClanIcon, 
  RPGBottomNavbarTopBg, 
  RPGBottomNavbarCharacterIcon, 
  RPGBottomNavbarLoyalityIcon,
 } from "../../layout/icons/RPGGame/RPGBottomNavbar";

import {
  gameChallengesPagePath,
  gameClanPagePath,
  gameDuelPagePath,
  gameLoyalityPagePath,
} from "../../../router/constants";
import styles from "./RPGBottomNavbar.module.scss";

import { useAppSelector } from "../../../hooks/redux";

const items = [
  {
    icon: <RPGBottomNavbarChalanagesIcon className={styles.rpgBottomNavbar__icon} />,
    link: gameChallengesPagePath,
  },
  {
    icon: <RPGBottomNavbarCharacterIcon className={styles.rpgBottomNavbar__icon} />,
    link: "",
  },
  {
    icon: <RPGBottomNavbarDuelsIcon className={styles.rpgBottomNavbar__icon} />,
    link: gameDuelPagePath,
  },
  {
    icon: <RPGBottomNavbarClanIcon className={styles.rpgBottomNavbar__icon} />,
    link: gameClanPagePath,
  },
  {
    icon: <RPGBottomNavbarLoyalityIcon className={styles.rpgBottomNavbar__icon} />,
    link: gameLoyalityPagePath,
  },
];

const RPGBottomNavbar = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.rpgBottomNavbar__item_active} ${styles.rpgBottomNavbar__item}`
      : `${styles.rpgBottomNavbar__item}`;
  return (
    <div
      className={`${styles.rpgBottomNavbar} ${
        gameInited ? styles.rpgBottomNavbar_inited : ""
      }`}
    >
      <div className={styles.rpgBottomNavbar__topBlock}>
        <RPGBottomNavbarTopBg />
      </div>
      <nav className={styles.rpgBottomNavbar__nav}>
        {items.map(({ link, icon }, index) => (
          <NavLink key={index} to={link} end={true} className={linkActiveClass}>
            <div className={styles.rpgBottomNavbar__itemFrame}>
              <RPGBottomNavbarItemFrame />
            </div>
            <div className={styles.rpgBottomNavbar__itemInnerFrame}>
              <RPGBottomNavbarItemInnerFrame
                className={styles.rpgBottomNavbar__itemInnerFrameIcon}
              />
              {icon}
            </div>
          </NavLink>
        ))}
      </nav>
      <div className={styles.rpgBottomNavbar__bottomBlock}>
        <RPGBottomNavbarBottomBg />
      </div>
    </div>
  );
};

export default RPGBottomNavbar;
