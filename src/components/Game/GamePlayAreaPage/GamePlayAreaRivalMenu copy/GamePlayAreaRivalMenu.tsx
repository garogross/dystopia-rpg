import React from "react";

import styles from "./GamePlayAreaRivalMenu.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import { EHitZones } from "../../../../constants/EHitZones";
import HeadShotIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaRivalMenu/HeadShotIcon";
import BodyShotIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaRivalMenu/BodyShotIcon";
import FootShotIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaRivalMenu/FootShotIcon";

interface Props {
  show: boolean;
  canvasRect?: DOMRect;
  selectedPlace: PositionPlace | null;
  onAttackByOwnedChar: (hitZone: EHitZones) => void;
}

const GamePlayAreaRivalMenu: React.FC<Props> = ({
  show,
  canvasRect,
  selectedPlace,
  onAttackByOwnedChar,
}) => {
  const sharacterMenuPositionStyles = {
    top:
      (canvasRect?.top || 0) +
      (selectedPlace?.character?.y || 0) +
      (selectedPlace?.character?.height || 0) / 2,
    left: (canvasRect?.left || 0) + (selectedPlace?.character?.x || 0),
  };

  return (
    <TransitionProvider
      className={styles.gamePlayArea__characterMenu}
      style={TransitionStyleTypes.opacity}
      inProp={show}
      duration={100}
    >
      <div
        style={sharacterMenuPositionStyles}
        className={styles.gamePlayArea__characterMenuMain}
      >
        <button
          className={styles.gamePlayArea__characterMenuBtn}
          onClick={() => onAttackByOwnedChar(EHitZones.HEAD)}
        >
          <div className={styles.gamePlayArea__characterMenuBtnInner}>
            <HeadShotIcon />
          </div>
        </button>
        <button
          onClick={() => onAttackByOwnedChar(EHitZones.BODY)}
          className={styles.gamePlayArea__characterMenuBtn}
        >
          <div className={styles.gamePlayArea__characterMenuBtnInner}>
            <BodyShotIcon />
          </div>
        </button>
        <button
          onClick={() => onAttackByOwnedChar(EHitZones.LEGS)}
          className={styles.gamePlayArea__characterMenuBtn}
        >
          <div className={styles.gamePlayArea__characterMenuBtnInner}>
            <FootShotIcon />
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default GamePlayAreaRivalMenu;
