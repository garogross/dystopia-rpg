import React from "react";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameClanEditMessageIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanEditMessageIcon";
import { statImages } from "../../../../../constants/statImages";
import { EStats } from "../../../../../constants/EStats";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import { useAppSelector } from "../../../../../hooks/redux";

import styles from "./GameClanAboutHeader.module.scss"
import TransitionProvider, { TransitionStyleTypes } from "../../../../../providers/TransitionProvider";

const GameClanAboutHeader = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);  
  const stats = {
    [EStats.kredit]: "120k",
    [EStats.darkMatter]: "10k",
    [EStats.token]: "100k",
  };

  return (
    <WrapperWithFrame>
      <TransitionProvider inProp={gameInited} style={TransitionStyleTypes.zoomIn}>
        <div className={styles.gameClanAboutHeader}>
          <div className={styles.gameClanAboutHeader__clanMessage}>
            <div className={styles.gameClanAboutHeader__clanMessageTopBlock}>
              <h4 className={styles.gameClanAboutHeader__clanMessage__title}>
                Сообщения для клана
              </h4>
              <button className={styles.gameClanAboutHeader__editClanMessageBtn}>
                <GameClanEditMessageIcon />
              </button>
            </div>
            <p className={styles.gameClanAboutHeader__clanMessageText}>
              Следующий рейд через 72 часов! Не пропадайте пацаны.
            </p>
          </div>
          <div className={styles.gameClanAboutHeader__tressury}>
            <h6 className={styles.gameClanAboutHeader__tressury__title}>Казна клана</h6>
            <div className={styles.gameClanAboutHeader__tressuryValues}>
              {Object.keys(statImages).map((k) => {
                const key = k as EStats;

                return (
                  <div className={styles.gameClanAboutHeader__tressuryValue} key={key}>
                    <div className={styles.gameClanAboutHeader__tressuryValueImgWrapper}>
                      <ImageWebp
                        src={statImages[key].img}
                        srcSet={statImages[key].imgWebp}
                        alt=""
                        className={styles.gameClanAboutHeader__tressuryImg}
                      />
                    </div>
                    <span className={styles.gameClanAboutHeader__tressuryValueText}>
                      {stats[key]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TransitionProvider>
    </WrapperWithFrame>
  );
};

export default GameClanAboutHeader;
