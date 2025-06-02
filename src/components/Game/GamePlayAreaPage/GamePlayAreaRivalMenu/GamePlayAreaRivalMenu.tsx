import React, { useEffect, useState } from "react";

import styles from "./GamePlayAreaRivalMenu.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import { EHitZones } from "../../../../constants/EHitZones";
import HeadShotIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaRivalMenu/HeadShotIcon";
import BodyShotIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaRivalMenu/BodyShotIcon";
import FootShotIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaRivalMenu/FootShotIcon";
import HeartIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/HeartIcon";
import SheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/SheildIcon";
import PowerSheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/PowerSheildIcon";

interface Props {
  show: boolean;
  canvasRect?: DOMRect;
  selectedPlace: PositionPlace | null;
  onClick: (hitZone: EHitZones) => void;
  hp: number;
  damage: number;
  sheildPower: number;
}

const GamePlayAreaRivalMenu: React.FC<Props> = ({
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
        className={styles.gamePlayAreaRivalMenu}
      >
        <div className={styles.gamePlayAreaRivalMenu__info}>
          <div className={styles.gamePlayAreaRivalMenu__infoInner}>
            <div className={styles.gamePlayAreaRivalMenu__infoItem}>
              <HeartIcon />
              <h4 className={styles.gamePlayAreaRivalMenu__infoText}>{hp}</h4>
            </div>
            <div className={styles.gamePlayAreaRivalMenu__infoItem}>
              <SheildIcon />
              <h4 className={styles.gamePlayAreaRivalMenu__infoText}>
                {damage}
              </h4>
            </div>
            <div className={styles.gamePlayAreaRivalMenu__infoItem}>
              <PowerSheildIcon />
              <h4 className={styles.gamePlayAreaRivalMenu__infoText}>
                {sheildPower}
              </h4>
            </div>
          </div>
        </div>
        <button
          className={styles.gamePlayAreaRivalMenu__btn}
          onClick={() => onClick(EHitZones.HEAD)}
        >
          <div className={styles.gamePlayAreaRivalMenu__btnInner}>
            <HeadShotIcon />
          </div>
        </button>
        <button
          onClick={() => onClick(EHitZones.BODY)}
          className={styles.gamePlayAreaRivalMenu__btn}
        >
          <div className={styles.gamePlayAreaRivalMenu__btnInner}>
            <BodyShotIcon />
          </div>
        </button>
        <button
          onClick={() => onClick(EHitZones.LEGS)}
          className={styles.gamePlayAreaRivalMenu__btn}
        >
          <div className={styles.gamePlayAreaRivalMenu__btnInner}>
            <FootShotIcon />
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default GamePlayAreaRivalMenu;
