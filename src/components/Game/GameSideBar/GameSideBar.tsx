import React from "react";

import styles from "./GameSideBar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { GameSideBarProps } from "../../../models/Props/GameSideBarProps";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { gameSideBarCablesImageWebp } from "../../../assets/images";
import { gameSideBarCablesImage } from "../../../assets/images";
import { useAppSelector } from "../../../hooks/redux";

const GameSideBar: React.FC<GameSideBarProps> = ({ items }) => {
  const location = useLocation();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const isActiveHash = (hash: string) => {
    return location.hash.includes(hash);
  };

  const linkActiveClass = (hash: string, index: number) =>
    isActiveHash(hash) || (!index && !location.hash)
      ? `${styles.gameSideBar__itemWrapper_active} ${styles.gameSideBar__itemWrapper}`
      : `${styles.gameSideBar__itemWrapper}`;

  return (
    <aside
      className={`${styles.gameSideBar} ${
        gameInited ? styles.gameSideBar_inited : ""
      }`}
    >
      <nav className={styles.gameSideBar__nav}>
        {items.map((item, index) => (
          <NavLink
            key={item.link}
            to={`#${item.link}`}
            className={styles.gameSideBar__item}
          >
            <div className={linkActiveClass(item.link, index)}>
              <div className={styles.gameSideBar__itemInner}>
                {item.icon}
                <span className={styles.gameSideBar__text}>{item.name}</span>
              </div>
            </div>
            <div className={styles.gameSideBar__socket}>
              <div className={styles.gameSideBar__socketInner}></div>
            </div>
          </NavLink>
        ))}
      </nav>
      <div className={styles.gameSideBar__cables}>
        <ImageWebp
          className={styles.gameSideBar__cablesImage}
          pictureClass={styles.gameSideBar__cablesPicture}
          srcSet={gameSideBarCablesImageWebp}
          src={gameSideBarCablesImage}
          alt="gameSideBarCables"
        />
      </div>
    </aside>
  );
};

export default GameSideBar;
