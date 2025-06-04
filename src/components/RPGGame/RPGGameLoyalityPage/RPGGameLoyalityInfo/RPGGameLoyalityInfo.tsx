import React, { useState } from "react";
import styles from "./RPGGameLoyalityInfo.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import {RPGGameLoyalityArrowIcon} from "../../../layout/icons/RPGGame/RPGGameLoyalityPage";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { EStats } from "../../../../constants/EStats";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common";
import StatImg from "../../../layout/StatImg/StatImg";
import { useAppSelector } from "../../../../hooks/redux";
interface Props {
  title: string;
  text: React.ReactNode;
  statText: string;
}

const RPGGameLoyalityInfo: React.FC<Props> = ({ title, text, statText }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.rpgGameLoyalityInfo}
      style={TransitionStyleTypes.zoomIn}
      inProp={gameInited}
    >
      <WrapperWithFrame>
        <div className={styles.rpgGameLoyalityInfo__main}>
          <div className={styles.rpgGameLoyalityInfo__mainHeader}>
            <h4 className={styles.rpgGameLoyalityInfo__title}>{title}</h4>
            <button
              className={styles.rpgGameLoyalityInfo__headerBtn}
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <RPGGameLoyalityArrowIcon rotated={isDescriptionOpen} />
            </button>
          </div>
          <TransitionProvider
            inProp={isDescriptionOpen}
            style={TransitionStyleTypes.height}
            height={60}
            className={styles.rpgGameLoyalityInfo__textWrapper}
          >
            <p className={styles.rpgGameLoyalityInfo__text}>{text}</p>
          </TransitionProvider>
        </div>
      </WrapperWithFrame>

      <div className={styles.rpgGameLoyalityInfo__bottomBlock}>
        <div className={styles.rpgGameLoyalityInfo__bottomBlockWings}>
          <HeaderWings />
        </div>
        <div className={styles.rpgGameLoyalityInfo__bottomBlockValue}>
          <span className={styles.rpgGameLoyalityInfo__bottomBlockText}>
            Всего : 50
          </span>

          <StatImg stat={EStats.lp} />
        </div>
        <span className={styles.rpgGameLoyalityInfo__bottomBlockText}>
          {statText}
        </span>
      </div>
    </TransitionProvider>
  );
};

export default RPGGameLoyalityInfo;
