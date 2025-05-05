import React from "react";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameClanEditMessageIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanEditMessageIcon";
import { statImages } from "../../../../../constants/statImages";
import { EStats } from "../../../../../constants/EStats";
import { useAppSelector } from "../../../../../hooks/redux";

import styles from "./GameClanAboutHeader.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import StatImg from "../../../../layout/StatImg/StatImg";
import { IClan } from "../../../../../models/IClan";
import { formatNumber } from "../../../../../utils/formatNumber";

interface Props {
  clanMessage: IClan["clanMessage"];
  treasury: IClan["treasury"];
}

const GameClanAboutHeader: React.FC<Props> = ({ clanMessage, treasury }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const stats = treasury;

  return (
    <WrapperWithFrame>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomIn}
      >
        <div className={styles.gameClanAboutHeader}>
          <div className={styles.gameClanAboutHeader__clanMessage}>
            <div className={styles.gameClanAboutHeader__clanMessageTopBlock}>
              <h4 className={styles.gameClanAboutHeader__clanMessage__title}>
                Сообщения для клана
              </h4>
              <button
                className={styles.gameClanAboutHeader__editClanMessageBtn}
              >
                <GameClanEditMessageIcon />
              </button>
            </div>
            <p className={styles.gameClanAboutHeader__clanMessageText}>
              {clanMessage}
            </p>
          </div>
          <div className={styles.gameClanAboutHeader__tressury}>
            <h6 className={styles.gameClanAboutHeader__tressury__title}>
              Казна клана
            </h6>
            <div className={styles.gameClanAboutHeader__tressuryValues}>
              {Object.keys(statImages).map((k) => {
                const key = k as EStats;

                return (
                  <div
                    className={styles.gameClanAboutHeader__tressuryValue}
                    key={key}
                  >
                    <StatImg stat={key} size={10} />
                    <span
                      className={styles.gameClanAboutHeader__tressuryValueText}
                    >
                      {!!stats[key] && formatNumber(stats[key] || 0)}
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
