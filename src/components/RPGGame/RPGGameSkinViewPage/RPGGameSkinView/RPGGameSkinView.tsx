import React from "react";
import styles from "./RPGGameSkinView.module.scss";
import { personModel1Image } from "../../../../assets/imageMaps";
import {RPGGameSkinViewPrevIcon,RPGGameSkinViewSelectIcon} from "../../../layout/icons/RPGGame/RPGGameSkinViewPage";
import RPGGameCharacterBottomWings from "../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterBottomWings";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
const RPGGameSkinView = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <section className={`${styles.rpgGameSkinView} container`}>
      <div className={styles.rpgGameSkinView__container}>
        <TransitionProvider
          className={styles.rpgGameSkinView__modelImgWrap}
          style={TransitionStyleTypes.zoomIn}
          inProp={gameInited}
        >
          <img
            src={personModel1Image}
            alt="model"
            className={styles.rpgGameSkinView__modelImg}
          />
        </TransitionProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <button
            className={`${styles.rpgGameSkinView__btn} ${styles.rpgGameSkinView__btnPrev}`}
          >
            <div className={styles.rpgGameSkinView__btnInner}>
              <RPGGameSkinViewPrevIcon />
            </div>
          </button>
        </TransitionProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <button
            className={`${styles.rpgGameSkinView__btn} ${styles.rpgGameSkinView__btnSelect}`}
          >
            <div className={styles.rpgGameSkinView__btnInner}>
              <RPGGameSkinViewSelectIcon />
            </div>
          </button>
        </TransitionProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <button
            className={`${styles.rpgGameSkinView__btn} ${styles.rpgGameSkinView__btnNext}`}
          >
            <div className={styles.rpgGameSkinView__btnInner}>
              <RPGGameSkinViewPrevIcon reversed />
            </div>
          </button>
        </TransitionProvider>
      </div>
      <div className={styles.rpgGameSkinView__bottomBg}>
        <RPGGameCharacterBottomWings />
      </div>
    </section>
  );
};

export default RPGGameSkinView;
