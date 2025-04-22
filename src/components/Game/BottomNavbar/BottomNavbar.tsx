import React from "react";
import { BottomNavbarBottomBg } from "../../layout/icons/game/BottomNavbar/BottomNavbarBottomBg";
import { NavLink } from "react-router-dom";
import { BottomNavbarItemFrame } from "../../layout/icons/game/BottomNavbar/BottomNavbarItemFrame";
import { BottomNavbarItemInnerFrame } from "../../layout/icons/game/BottomNavbar/BottomNavbarItemInnerFrame";
import { BottomNavbarChalanagesIcon } from "../../layout/icons/game/BottomNavbar/BottomNavbarChalanagesIcon";
import { BottomNavbarDuelsIcon } from "../../layout/icons/game/BottomNavbar/BottomNavbarDuelsIcon";
import { BottomNavbarClanIcon } from "../../layout/icons/game/BottomNavbar/BottomNavbarClanIcon";
import {
  gameChallengesPagePath,
  gameClanPagePath,
  gameDuelPagePath,
  gameLoyalityPagePath,
} from "../../../router/constants";
import styles from "./BottomNavbar.module.scss";
import { BottomNavbarTopBg } from "../../layout/icons/game/BottomNavbar/BottomNavbarTopBg";
import { BottomNavbarCharacterIcon } from "../../layout/icons/game/BottomNavbar/BottomNavbarCharacterIcon";
import BottomNavbarLoyalityIcon from "../../layout/icons/game/BottomNavbar/BottomNavbarLoyalityIcon";
import { useAppSelector } from "../../../hooks/redux";

const items = [
  {
    icon: <BottomNavbarChalanagesIcon className={styles.bottomNavbar__icon} />,
    link: gameChallengesPagePath,
  },
  {
    icon: <BottomNavbarCharacterIcon className={styles.bottomNavbar__icon} />,
    link: "",
  },
  {
    icon: <BottomNavbarDuelsIcon className={styles.bottomNavbar__icon} />,
    link: gameDuelPagePath,
  },
  {
    icon: <BottomNavbarClanIcon className={styles.bottomNavbar__icon} />,
    link: gameClanPagePath,
  },
  {
    icon: <BottomNavbarLoyalityIcon className={styles.bottomNavbar__icon} />,
    link: gameLoyalityPagePath,
  },
];

const BottomNavbar = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.bottomNavbar__item_active} ${styles.bottomNavbar__item}`
      : `${styles.bottomNavbar__item}`;
  return (
    <div
      className={`${styles.bottomNavbar} ${
        gameInited ? styles.bottomNavbar_inited : ""
      }`}
    >
      <div className={styles.bottomNavbar__topBlock}>
        <BottomNavbarTopBg />
      </div>
      <nav className={styles.bottomNavbar__nav}>
        {items.map(({ link, icon }, index) => (
          <NavLink key={index} to={link} end={true} className={linkActiveClass}>
            <div className={styles.bottomNavbar__itemFrame}>
              <BottomNavbarItemFrame />
            </div>
            <div className={styles.bottomNavbar__itemInnerFrame}>
              <BottomNavbarItemInnerFrame
                className={styles.bottomNavbar__itemInnerFrameIcon}
              />
              {icon}
            </div>
          </NavLink>
        ))}
      </nav>
      <div className={styles.bottomNavbar__bottomBlock}>
        <BottomNavbarBottomBg />
      </div>
    </div>
  );
};

export default BottomNavbar;
