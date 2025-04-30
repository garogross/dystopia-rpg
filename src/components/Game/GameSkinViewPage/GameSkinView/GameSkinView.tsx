import React from "react";
import styles from "./GameSkinView.module.scss";
import { personModel1Image } from "../../../../assets/images";
import GameSkinViewPrevIcon from "../../../layout/icons/game/GameSkinViewPage/GameSkinViewPrevIcon";
import GameSkinViewSelectIcon from "../../../layout/icons/game/GameSkinViewPage/GameSkinViewSelectIcon";
import GameCharacterBottomWings from "../../../layout/icons/game/GameCharacterPage/GameCharacterBottomWings";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
const GameSkinView = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <section className={`${styles.gameSkinView} container`}>
      <div className={styles.gameSkinView__container}>
        <TransitionProvider
          className={styles.gameSkinView__modelImgWrap}
          style={TransitionStyleTypes.zoomIn}
          inProp={gameInited}
        >
          <img
            src={personModel1Image}
            alt="model"
            className={styles.gameSkinView__modelImg}
          />
        </TransitionProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <button
            className={`${styles.gameSkinView__btn} ${styles.gameSkinView__btnPrev}`}
          >
            <div className={styles.gameSkinView__btnInner}>
              <GameSkinViewPrevIcon />
            </div>
          </button>
        </TransitionProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <button
            className={`${styles.gameSkinView__btn} ${styles.gameSkinView__btnSelect}`}
          >
            <div className={styles.gameSkinView__btnInner}>
              <GameSkinViewSelectIcon />
            </div>
          </button>
        </TransitionProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <button
            className={`${styles.gameSkinView__btn} ${styles.gameSkinView__btnNext}`}
          >
          <div className={styles.gameSkinView__btnInner}>
            <GameSkinViewPrevIcon reversed />
            </div>
          </button>
        </TransitionProvider>
      </div>
      <div className={styles.gameSkinView__bottomBg}>
        <GameCharacterBottomWings />
      </div>
    </section>
  );
};

export default GameSkinView;
