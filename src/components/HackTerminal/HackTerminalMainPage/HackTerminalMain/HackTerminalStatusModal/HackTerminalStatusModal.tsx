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
            {!isLose ? "вы победили!" : "вы Проиграли"}
          </h3>
          {!isLose && (
            <div className={styles.hackTerminalStatusModal__reward}>
              <span>Вы получатете {bonusValue}</span>
              <StatImg size={15} stat={EStats.cp} />
            </div>
          )}

          {isLose && (
            <>
              <button className={styles.hackTerminalStatusModal__resetByCpBtn}>
                <div
                  className={styles.hackTerminalStatusModal__resetByCpBtnInner}
                >
                  <span>+1 попытка за 1</span>
                  <StatImg size={15} stat={EStats.cp} />
                </div>
              </button>
              <button className={styles.hackTerminalStatusModal__resetByAd}>
                <div
                  className={
                    styles.hackTerminalStatusModal__resetByAdInnerbutton
                  }
                >
                  <span>+1 попытка за</span>
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
                <span>Получать награду</span>
              </>
            ) : (
              <>
                <ResetIcon />
                <span>Играть снова</span>
              </>
            )}
          </button>
        </div>
      </TransitionProvider>
    </NewPortalProvider>
  );
};

export default HackTerminalStatusModal;
