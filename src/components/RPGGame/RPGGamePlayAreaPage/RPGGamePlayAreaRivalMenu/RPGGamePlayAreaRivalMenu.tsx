import React, { useEffect, useState } from "react";

import styles from "./RPGGamePlayAreaRivalMenu.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import { EHitZones } from "../../../../constants/rpgGame/EHitZones";
import {
  HeadShotIcon,
  BodyShotIcon,
  FootShotIcon,
} from "../../../layout/icons/RPGGame/RPGGamePlayArea/RPGGamePlayAreaRivalMenu";
import {
  HeartIcon,
  SheildIcon,
  PowerSheildIcon,
} from "../../../layout/icons/RPGGame/RPGGamePlayArea/RPGGamePlayAreaHeader";

interface Props {
  show: boolean;
  canvasRect?: DOMRect;
  selectedPlace: PositionPlace | null;
  onClick: (hitZone: EHitZones) => void;
  hp: number;
  damage: number;
  sheildPower: number;
}

const RPGGamePlayAreaRivalMenu: React.FC<Props> = ({
  show,
  canvasRect,
  selectedPlace,
  onClick,
  hp,
  damage,
  sheildPower,
}) => {
  const [sharacterMenuPositionStyles, setSharacterMenuPositionStyles] =
    useState({
      top: 0,
      left: 0,
    });

  useEffect(() => {
    if (selectedPlace) {
      setSharacterMenuPositionStyles({
        top:
          (canvasRect?.top || 0) +
          (selectedPlace?.character?.y || 0) +
          (selectedPlace?.character?.height || 0) / 2,
        left: (canvasRect?.left || 0) + (selectedPlace?.character?.x || 0),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace]);

  return (
    <TransitionProvider
      style={TransitionStyleTypes.opacity}
      inProp={show}
      duration={100}
    >
      <div
        style={sharacterMenuPositionStyles}
        className={styles.rpgGamePlayAreaRivalMenu}
      >
        <div className={styles.rpgGamePlayAreaRivalMenu__info}>
          <div className={styles.rpgGamePlayAreaRivalMenu__infoInner}>
            <div className={styles.rpgGamePlayAreaRivalMenu__infoItem}>
              <HeartIcon />
              <h4 className={styles.rpgGamePlayAreaRivalMenu__infoText}>
                {hp}
              </h4>
            </div>
            <div className={styles.rpgGamePlayAreaRivalMenu__infoItem}>
              <SheildIcon />
              <h4 className={styles.rpgGamePlayAreaRivalMenu__infoText}>
                {damage}
              </h4>
            </div>
            <div className={styles.rpgGamePlayAreaRivalMenu__infoItem}>
              <PowerSheildIcon />
              <h4 className={styles.rpgGamePlayAreaRivalMenu__infoText}>
                {sheildPower}
              </h4>
            </div>
          </div>
        </div>
        <button
          className={styles.rpgGamePlayAreaRivalMenu__btn}
          onClick={() => onClick(EHitZones.HEAD)}
        >
          <div className={styles.rpgGamePlayAreaRivalMenu__btnInner}>
            <HeadShotIcon />
          </div>
        </button>
        <button
          onClick={() => onClick(EHitZones.BODY)}
          className={styles.rpgGamePlayAreaRivalMenu__btn}
        >
          <div className={styles.rpgGamePlayAreaRivalMenu__btnInner}>
            <BodyShotIcon />
          </div>
        </button>
        <button
          onClick={() => onClick(EHitZones.LEGS)}
          className={styles.rpgGamePlayAreaRivalMenu__btn}
        >
          <div className={styles.rpgGamePlayAreaRivalMenu__btnInner}>
            <FootShotIcon />
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default RPGGamePlayAreaRivalMenu;
