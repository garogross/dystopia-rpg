import React from "react";

import styles from "./RPGGamePlayAreaOwnedCharacterMenu.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import { EHitZones } from "../../../../constants/cyberfarm/EHitZones";
import {
  HeadSheildIcon,
  BodySheildIcon,
  FootSheildIcon,
} from "../../../layout/icons/RPGGame/RPGGamePlayArea/RPGGamePlayAreaOwnedCharacterMenu";

interface Props {
  show: boolean;
  canvasRect?: DOMRect;
  selectedPlace: PositionPlace | null;
  onclick: (hitZone: EHitZones) => void;
}

const RPGGamePlayAreaOwnedCharacterMenu: React.FC<Props> = ({
  show,
  canvasRect,
  selectedPlace,
  onclick,
}) => {
  const sharacterMenuPositionStyles = {
    top:
      (canvasRect?.top || 0) +
      (selectedPlace?.character?.y || 0) +
      (selectedPlace?.character?.height || 0) / 2,
    left:
      (canvasRect?.left || 0) +
      (selectedPlace?.character?.width || 0) * 2 +
      (selectedPlace?.character?.x || 0),
  };

  return (
    <TransitionProvider
      style={TransitionStyleTypes.opacity}
      inProp={show}
      duration={100}
    >
      <div
        style={sharacterMenuPositionStyles}
        className={styles.rpgGamePlayAreaOwnedCharacterMenu}
      >
        <button
          className={styles.rpgGamePlayAreaOwnedCharacterMenu__btn}
          onClick={() => onclick(EHitZones.HEAD)}
        >
          <div className={styles.rpgGamePlayAreaOwnedCharacterMenu__btnInner}>
            <HeadSheildIcon />
          </div>
        </button>
        <button
          onClick={() => onclick(EHitZones.BODY)}
          className={styles.rpgGamePlayAreaOwnedCharacterMenu__btn}
        >
          <div className={styles.rpgGamePlayAreaOwnedCharacterMenu__btnInner}>
            <BodySheildIcon />
          </div>
        </button>
        <button
          onClick={() => onclick(EHitZones.LEGS)}
          className={styles.rpgGamePlayAreaOwnedCharacterMenu__btn}
        >
          <div className={styles.rpgGamePlayAreaOwnedCharacterMenu__btnInner}>
            <FootSheildIcon />
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default RPGGamePlayAreaOwnedCharacterMenu;
