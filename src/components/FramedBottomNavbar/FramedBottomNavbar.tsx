import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  FramedBottomNavbarBottomBg,
  FramedBottomNavbarItemFrame,
  FramedBottomNavbarItemInnerFrame,
  FramedBottomNavbarTopBg,
} from "../layout/icons/FramedBottomNavbar";

import styles from "./FramedBottomNavbar.module.scss";

import { useAppSelector } from "../../hooks/redux";

interface Props {
  items: {
    icon: ReactNode;
    link: string;
  }[];
}

const FramedBottomNavbar: FC<Props> = ({ items }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.framedBottomNavbar__item_active} ${styles.framedBottomNavbar__item}`
      : `${styles.framedBottomNavbar__item}`;
  return (
    <div
      className={`${styles.framedBottomNavbar} ${
        gameInited ? styles.framedBottomNavbar_inited : ""
      }`}
    >
      <div className={styles.framedBottomNavbar__topBlock}>
        <FramedBottomNavbarTopBg />
      </div>
      <nav className={styles.framedBottomNavbar__nav}>
        {items.map(({ link, icon }, index) => (
          <NavLink key={index} to={link} end={true} className={linkActiveClass}>
            <div className={styles.framedBottomNavbar__itemFrame}>
              <FramedBottomNavbarItemFrame />
            </div>
            <div className={styles.framedBottomNavbar__itemInnerFrame}>
              <FramedBottomNavbarItemInnerFrame
                className={styles.framedBottomNavbar__itemInnerFrameIcon}
              />
              <div className={styles.framedBottomNavbar__itemIconWrapper}>
                {icon}
              </div>
            </div>
          </NavLink>
        ))}
      </nav>
      <div className={styles.framedBottomNavbar__bottomBlock}>
        <FramedBottomNavbarBottomBg />
      </div>
    </div>
  );
};

export default FramedBottomNavbar;
