import React from "react";
import styles from "./GameCharacterInventoryModel.module.scss";
import {
  personModel2Image,
  tool13Image,
  tool21Image,
  tool22Image,
  tool23Image,
  tool2Image,
  tool3Image,
  tool5Image,
  tool8Image,
} from "../../../../../assets/images";
import GameCharacterInventoryModelBranches from "../../../../layout/icons/game/GameCharacterPage/GameCharacterInventory/GameCharacterInventoryModelBranches";
import { useAppSelector } from "../../../../../hooks/redux";
import { TransitionStyleTypes } from "../../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../../providers/TransitionProvider";

const GameCharacterInventoryModel = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      delay={100}
      className={styles.gameCharacterInventoryModel}
    >
      <div className={styles.gameCharacterInventoryModel__wrapper}>
        <div className={styles.gameCharacterInventoryModel__branches}>
          <GameCharacterInventoryModelBranches />
        </div>
        <div
          className={`${styles.gameCharacterInventoryModel__equipmentCol} ${styles.gameCharacterInventoryModel__equipmentCol_left}`}
        >
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool8Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool2Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div></div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool3Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool5Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
        </div>
        <img
          src={personModel2Image}
          alt="tool"
          className={styles.gameCharacterInventoryModel__modelImg}
        />
        <div
          className={`${styles.gameCharacterInventoryModel__equipmentCol} ${styles.gameCharacterInventoryModel__equipmentCol_right}`}
        >
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool21Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool13Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool13Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool22Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.gameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.gameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool23Image}
                alt="tool"
                className={styles.gameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
        </div>
      </div>
    </TransitionProvider>
  );
};

export default GameCharacterInventoryModel;
