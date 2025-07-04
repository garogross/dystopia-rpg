import React from "react";

import styles from "./HackTerminalStatusModal.module.scss";
import NewPortalProvider from "../../../../../providers/NewPortalProvider";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import StatImg from "../../../../layout/StatImg/StatImg";
import { EStats } from "../../../../../constants/EStats";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import { adImage, adImageWebp } from "../../../../../assets/imageMaps";
import {
  GetRewardIcon,
  ResetIcon,
} from "../../../../layout/icons/HackTerminal/Main";
import { TRANSLATIONS } from "../../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../../hooks/redux";

const {
  winTitleText,
  loseTitleText,
  rewardText,
  resetByCpText,
  resetByAdText,
  getRewardButtonText,
  playAgainButtonText,
} = TRANSLATIONS.hackTerminal.main;

interface Props {
  show: boolean;
  isLose: boolean;
  onReset: () => void;
  bonusValue: number;
}

const HackTerminalStatusModal: React.FC<Props> = ({
  show,
  isLose,
  onReset,
  bonusValue,
}) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <NewPortalProvider>
      <TransitionProvider
        className={styles.hackTerminalStatusModal}
        inProp={show}
        style={TransitionStyleTypes.opacity}
      >
        <div className={styles.hackTerminalStatusModal__wrapper}>
          <h3
            className={`${styles.hackTerminalStatusModal__title} ${
              isLose ? styles.hackTerminalStatusModal__title_lose : ""
            }`}
          >
            {(!isLose ? winTitleText : loseTitleText)[language]}
          </h3>
          {!isLose && (
            <div className={styles.hackTerminalStatusModal__reward}>
              <span>
                {rewardText[language]} {bonusValue}
              </span>
              <StatImg size={15} stat={EStats.cp} />
            </div>
          )}

          {isLose && (
            <>
              <button className={styles.hackTerminalStatusModal__resetByCpBtn}>
                <div
                  className={styles.hackTerminalStatusModal__resetByCpBtnInner}
                >
                  <span>{resetByCpText[language]}</span>
                  <StatImg size={15} stat={EStats.cp} />
                </div>
              </button>
              <button className={styles.hackTerminalStatusModal__resetByAd}>
                <div
                  className={
                    styles.hackTerminalStatusModal__resetByAdInnerbutton
                  }
                >
                  <span>{resetByAdText[language]}</span>
                  <ImageWebp
                    srcSet={adImageWebp}
                    src={adImage}
                    alt={"watch ad"}
                    className={styles.hackTerminalStatusModal__resetByAdImg}
                  />
                </div>
              </button>
            </>
          )}
          <button className={styles.hackTerminalStatusModal__mainBtn}>
            {!isLose ? (
              <>
                <GetRewardIcon />
                <span>{getRewardButtonText[language]}</span>
              </>
            ) : (
              <>
                <ResetIcon />
                <span>{playAgainButtonText[language]}</span>
              </>
            )}
          </button>
        </div>
      </TransitionProvider>
    </NewPortalProvider>
  );
};

export default HackTerminalStatusModal;
