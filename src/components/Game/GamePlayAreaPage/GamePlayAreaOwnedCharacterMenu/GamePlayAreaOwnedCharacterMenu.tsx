import React from "react";

import styles from "./GamePlayAreaOwnedCharacterMenu.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import { EHitZones } from "../../../../constants/EHitZones";
import HeadSheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaOwnedCharacterMenu/HeadSheildIcon";
import BodySheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaOwnedCharacterMenu/BodySheildIcon";
import FootSheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaOwnedCharacterMenu/FootSheildIcon";

interface Props {
  show: boolean;
  canvasRect?: DOMRect;
  selectedPlace: PositionPlace | null;
  onclick: (hitZone: EHitZones) => void;
}

const GamePlayAreaOwnedCharacterMenu: React.FC<Props> = ({
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
        className={styles.gamePlayAreaOwnedCharacterMenu}
      >
        <button
          className={styles.gamePlayAreaOwnedCharacterMenu__btn}
          onClick={() => onclick(EHitZones.HEAD)}
        >
          <div className={styles.gamePlayAreaOwnedCharacterMenu__btnInner}>
            <HeadSheildIcon />
          </div>
        </button>
        <button
          onClick={() => onclick(EHitZones.BODY)}
          className={styles.gamePlayAreaOwnedCharacterMenu__btn}
        >
          <div className={styles.gamePlayAreaOwnedCharacterMenu__btnInner}>
            <BodySheildIcon />
          </div>
        </button>
        <button
          onClick={() => onclick(EHitZones.LEGS)}
          className={styles.gamePlayAreaOwnedCharacterMenu__btn}
        >
          <div className={styles.gamePlayAreaOwnedCharacterMenu__btnInner}>
            <FootSheildIcon />
          </div>
        </button>
      </div>
    </TransitionProvider>
  );
};

export default GamePlayAreaOwnedCharacterMenu;
