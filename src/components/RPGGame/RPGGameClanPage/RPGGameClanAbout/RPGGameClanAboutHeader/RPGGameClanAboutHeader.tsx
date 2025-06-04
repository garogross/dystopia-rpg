import React from "react";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import {RPGGameClanEditMessageIcon} from "../../../../layout/icons/RPGGame/RPGGameClanPage/RPGGameClanAbout";
import { statImages } from "../../../../../constants/statImages";
import { EStats } from "../../../../../constants/EStats";
import { useAppSelector } from "../../../../../hooks/redux";

import styles from "./RPGGameClanAboutHeader.module.scss";
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

const RPGGameClanAboutHeader: React.FC<Props> = ({ clanMessage, treasury }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const stats = treasury;

  return (
    <WrapperWithFrame>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomIn}
      >
        <div className={styles.rpgGameClanAboutHeader}>
          <div className={styles.rpgGameClanAboutHeader__clanMessage}>
            <div className={styles.rpgGameClanAboutHeader__clanMessageTopBlock}>
              <h4 className={styles.rpgGameClanAboutHeader__clanMessage__title}>
                Сообщения для клана
              </h4>
              <button
                className={styles.rpgGameClanAboutHeader__editClanMessageBtn}
              >
                <RPGGameClanEditMessageIcon />
              </button>
            </div>
            <p className={styles.rpgGameClanAboutHeader__clanMessageText}>
              {clanMessage}
            </p>
          </div>
          <div className={styles.rpgGameClanAboutHeader__tressury}>
            <h6 className={styles.rpgGameClanAboutHeader__tressury__title}>
              Казна клана
            </h6>
            <div className={styles.rpgGameClanAboutHeader__tressuryValues}>
              {Object.keys(statImages).map((k) => {
                const key = k as EStats;

                return (
                  <div
                    className={styles.rpgGameClanAboutHeader__tressuryValue}
                    key={key}
                  >
                    <StatImg stat={key} size={10} />
                    <span
                      className={styles.rpgGameClanAboutHeader__tressuryValueText}
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

export default RPGGameClanAboutHeader;
