import React from "react";
import styles from "./RPGGameCharacterInventoryModel.module.scss";
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
} from "../../../../../assets/imageMaps";
import {RPGGameCharacterInventoryModelBranches} from "../../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterInventory";
import { useAppSelector } from "../../../../../hooks/redux";
import { TransitionStyleTypes } from "../../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../../providers/TransitionProvider";

const RPGGameCharacterInventoryModel = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      delay={100}
      className={styles.rpgGameCharacterInventoryModel}
    >
      <div className={styles.rpgGameCharacterInventoryModel__wrapper}>
        <div className={styles.rpgGameCharacterInventoryModel__branches}>
          <RPGGameCharacterInventoryModelBranches />
        </div>
        <div
          className={`${styles.rpgGameCharacterInventoryModel__equipmentCol} ${styles.rpgGameCharacterInventoryModel__equipmentCol_left}`}
        >
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool8Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool2Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div></div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool3Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool5Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
        </div>
        <img
          src={personModel2Image}
          alt="tool"
          className={styles.rpgGameCharacterInventoryModel__modelImg}
        />
        <div
          className={`${styles.rpgGameCharacterInventoryModel__equipmentCol} ${styles.rpgGameCharacterInventoryModel__equipmentCol_right}`}
        >
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool21Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool13Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool13Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool22Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
          <div className={styles.rpgGameCharacterInventoryModel__equipmentItem}>
            <div
              className={styles.rpgGameCharacterInventoryModel__equipmentItemInner}
            >
              <img
                src={tool23Image}
                alt="tool"
                className={styles.rpgGameCharacterInventoryModel__equipmntImg}
              />
            </div>
          </div>
        </div>
      </div>
    </TransitionProvider>
  );
};

export default RPGGameCharacterInventoryModel;
