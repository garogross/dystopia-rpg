import React from "react";

import styles from "./GameSideBar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { GameSideBarProps } from "../../../models/Props/GameSideBarProps";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  gameSideBarCablesImageWebp,
  gameSideBarCablesWithAdditionsImage,
  gameSideBarCablesWithAdditionsImageWebp,
} from "../../../assets/images";
import { gameSideBarCablesImage } from "../../../assets/images";
import { useAppSelector } from "../../../hooks/redux";
import GameCharacterInventorySexIcon from "../../layout/icons/game/GameCharacterPage/GameCharacterInventory/GameCharacterInventorySexIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import GameCharacterInventoryPvpIcon from "../../layout/icons/game/GameCharacterPage/GameCharacterInventory/GameCharacterInventoryPvpIcon";

const GameSideBar: React.FC<GameSideBarProps> = ({ items }) => {
  const location = useLocation();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const isActiveHash = (hash: string) => {
    return location.hash.includes(hash);
  };

  const isInventoryActive = location.hash.includes("inventory");

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
        <TransitionProvider
          className={styles.gameSideBar__additionalLinks}
          style={TransitionStyleTypes.height}
          inProp={isInventoryActive}
          height={60}
        >
          <NavLink
            to=""
            className={`${styles.gameSideBar__item} ${styles.gameSideBar__item_sm}`}
          >
            <div className={linkActiveClass("pvp", 0)}>
              <div className={styles.gameSideBar__itemInner}>
                <GameCharacterInventoryPvpIcon />
              </div>
            </div>
            <div
              className={`${styles.gameSideBar__socket} ${styles.gameSideBar__socket_sm}`}
            >
              <div className={styles.gameSideBar__socketInner}></div>
            </div>
          </NavLink>
          <NavLink
            to=""
            className={`${styles.gameSideBar__item} ${styles.gameSideBar__item_sm}`}
          >
            <div className={linkActiveClass("sex", 1)}>
              <div className={styles.gameSideBar__itemInner}>
                <GameCharacterInventorySexIcon />
              </div>
            </div>
            <div
              className={`${styles.gameSideBar__socket} ${styles.gameSideBar__socket_sm}`}
            >
              <div className={styles.gameSideBar__socketInner}></div>
            </div>
          </NavLink>
        </TransitionProvider>
        {items.map((item, index) => (
          <NavLink
            key={item.link}
            to={item.disabled ? "" : `#${item.link}`}
            className={`${styles.gameSideBar__item} ${
              item.disabled ? styles.gameSideBar__item_disabled : ""
            }`}
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
      <div
        className={`${styles.gameSideBar__cables} ${
          isInventoryActive ? styles.gameSideBar__cables_withAdditions : ""
        }`}
      >
        <ImageWebp
          className={styles.gameSideBar__cablesImage}
          pictureClass={styles.gameSideBar__cablesPicture}
          srcSet={
            !isInventoryActive
              ? gameSideBarCablesImageWebp
              : gameSideBarCablesWithAdditionsImageWebp
          }
          src={
            !isInventoryActive
              ? gameSideBarCablesImage
              : gameSideBarCablesWithAdditionsImage
          }
          alt="gameSideBarCables"
        />
      </div>
    </aside>
  );
};

export default GameSideBar;
