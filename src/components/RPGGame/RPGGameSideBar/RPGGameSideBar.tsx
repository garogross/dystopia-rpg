import React from "react";

import styles from "./RPGGameSideBar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { RPGGameSideBarProps } from "../../../models/Props/RPGGameSideBarProps";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  rpgGameSideBarCablesImageWebp,
  rpgGameSideBarCablesWithAdditionsImage,
  rpgGameSideBarCablesWithAdditionsImageWebp,
  rpgGameSideBarCablesImage,
} from "../../../assets/imageMaps";
import { useAppSelector } from "../../../hooks/redux";
import {RPGGameCharacterInventorySexIcon,RPGGameCharacterInventoryPvpIcon} from "../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterInventory";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

const RPGGameSideBar: React.FC<RPGGameSideBarProps> = ({ items }) => {
  const location = useLocation();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const isActiveHash = (hash: string) => {
    return location.hash.includes(hash);
  };

  const isInventoryActive = location.hash.includes("inventory");

  const linkActiveClass = (hash: string, index: number) =>
    isActiveHash(hash) || (!index && !location.hash)
      ? `${styles.rpgGameSideBar__itemWrapper_active} ${styles.rpgGameSideBar__itemWrapper}`
      : `${styles.rpgGameSideBar__itemWrapper}`;

  return (
    <aside
      className={`${styles.rpgGameSideBar} ${
        gameInited ? styles.rpgGameSideBar_inited : ""
      }`}
    >
      <nav className={styles.rpgGameSideBar__nav}>
        <TransitionProvider
          className={styles.rpgGameSideBar__additionalLinks}
          style={TransitionStyleTypes.height}
          inProp={isInventoryActive}
          height={60}
        >
          <NavLink
            to=""
            className={`${styles.rpgGameSideBar__item} ${styles.rpgGameSideBar__item_sm}`}
          >
            <div className={linkActiveClass("pvp", 0)}>
              <div className={styles.rpgGameSideBar__itemInner}>
                <RPGGameCharacterInventoryPvpIcon />
              </div>
            </div>
            <div
              className={`${styles.rpgGameSideBar__socket} ${styles.rpgGameSideBar__socket_sm}`}
            >
              <div className={styles.rpgGameSideBar__socketInner}></div>
            </div>
          </NavLink>
          <NavLink
            to=""
            className={`${styles.rpgGameSideBar__item} ${styles.rpgGameSideBar__item_sm}`}
          >
            <div className={linkActiveClass("sex", 1)}>
              <div className={styles.rpgGameSideBar__itemInner}>
                <RPGGameCharacterInventorySexIcon />
              </div>
            </div>
            <div
              className={`${styles.rpgGameSideBar__socket} ${styles.rpgGameSideBar__socket_sm}`}
            >
              <div className={styles.rpgGameSideBar__socketInner}></div>
            </div>
          </NavLink>
        </TransitionProvider>
        {items.map((item, index) => (
          <NavLink
            key={item.link}
            to={item.disabled ? "" : `#${item.link}`}
            className={`${styles.rpgGameSideBar__item} ${
              item.disabled ? styles.rpgGameSideBar__item_disabled : ""
            }`}
          >
            <div className={linkActiveClass(item.link, index)}>
              <div className={styles.rpgGameSideBar__itemInner}>
                {item.icon}
                <span className={styles.rpgGameSideBar__text}>{item.name}</span>
              </div>
            </div>
            <div className={styles.rpgGameSideBar__socket}>
              <div className={styles.rpgGameSideBar__socketInner}></div>
            </div>
          </NavLink>
        ))}
      </nav>
      <div
        className={`${styles.rpgGameSideBar__cables} ${
          isInventoryActive ? styles.rpgGameSideBar__cables_withAdditions : ""
        }`}
      >
        <ImageWebp
          className={styles.rpgGameSideBar__cablesImage}
          pictureClass={styles.rpgGameSideBar__cablesPicture}
          srcSet={
            !isInventoryActive
              ? rpgGameSideBarCablesImageWebp
              : rpgGameSideBarCablesWithAdditionsImageWebp
          }
          src={
            !isInventoryActive
              ? rpgGameSideBarCablesImage
              : rpgGameSideBarCablesWithAdditionsImage
          }
          alt="gameSideBarCables"
        />
      </div>
    </aside>
  );
};

export default RPGGameSideBar;
