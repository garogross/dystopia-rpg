import React, { useState } from "react";
import styles from "./GameLoyalityInfo.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameLoyalityArrowIcon from "../../../layout/icons/game/GameLoyalityPage/GameLoyalityArrowIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { EStats } from "../../../../constants/EStats";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import StatImg from "../../../layout/StatImg/StatImg";
import { useAppSelector } from "../../../../hooks/redux";
interface Props {
  title: string;
  text: string;
  statText: string;
}

const GameLoyalityInfo: React.FC<Props> = ({ title, text, statText }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.gameLoyalityInfo}
      style={TransitionStyleTypes.zoomIn}
      inProp={gameInited}
    >
      <WrapperWithFrame>
        <div className={styles.gameLoyalityInfo__main}>
          <div className={styles.gameLoyalityInfo__mainHeader}>
            <h4 className={styles.gameLoyalityInfo__title}>{title}</h4>
            <button
              className={styles.gameLoyalityInfo__headerBtn}
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <GameLoyalityArrowIcon rotated={isDescriptionOpen} />
            </button>
          </div>
          <TransitionProvider
            inProp={isDescriptionOpen}
            style={TransitionStyleTypes.height}
            height={60}
            className={styles.gameLoyalityInfo__textWrapper}
          >
            <p className={styles.gameLoyalityInfo__text}>{text}</p>
          </TransitionProvider>
        </div>
      </WrapperWithFrame>

      <div className={styles.gameLoyalityInfo__bottomBlock}>
        <div className={styles.gameLoyalityInfo__bottomBlockWings}>
          <HeaderWings />
        </div>
        <div className={styles.gameLoyalityInfo__bottomBlockValue}>
          <span className={styles.gameLoyalityInfo__bottomBlockText}>
            Всего : 50
          </span>

          <StatImg stat={EStats.lp} />
        </div>
        <span className={styles.gameLoyalityInfo__bottomBlockText}>
          {statText}
        </span>
      </div>
    </TransitionProvider>
  );
};

export default GameLoyalityInfo;
