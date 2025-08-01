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
import { useTooltip } from "../../hooks/useTooltip";
import Tooltip from "../layout/Tooltip/Tooltip";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";

const { inDevelopmentText } = TRANSLATIONS.common;
interface Props {
  items: {
    icon: ReactNode;
    link: string;
    indev?: boolean;
  }[];
}

const FramedBottomNavbar: FC<Props> = ({ items }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const { show, openTooltip } = useTooltip();

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
        {items.map(({ link, icon, indev }, index) => (
          <NavLink
            onClick={(e) => {
              if (indev) {
                e.preventDefault();
                openTooltip();
              }
            }}
            key={index}
            to={link}
            end={true}
            className={linkActiveClass}
          >
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
      <Tooltip show={show} text={inDevelopmentText[language]} />
    </div>
  );
};

export default FramedBottomNavbar;
