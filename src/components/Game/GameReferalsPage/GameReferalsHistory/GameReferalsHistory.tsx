import React from "react";
import styles from "./GameReferalsHistory.module.scss";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../../hooks/redux";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  kreditImageWebp,
  darkMatterImage,
  darkMatterImageWebp,
} from "../../../../assets/images";
import { kreditImage } from "../../../../assets/images";
import GameReferalsHistoryBottomBg from "../../../layout/icons/game/GameReferalsPage/GameReferalsIHistoryBottomBg";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import HeaderWithBackButton from "../../../layout/HeaderWithBackButton/HeaderWithBackButton";

interface Props {
  show: boolean;
  onClose: () => void;
}

const GameReferalsHistory: React.FC<Props> = ({ show, onClose }) => {
  const refferences = useAppSelector((state) => state.refferences.refferences);
  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.opacity}
      className={`${styles.gameReferalsHistory} container`}
    >
     <HeaderWithBackButton onClose={onClose} className={styles.gameReferalsHistory__header} />
      <TitleH3
        className={styles.gameReferalsHistory__title}
        wingsReverse={false}
      >
        Рефералы
      </TitleH3>
      <WrapperWithFrame
        className={styles.gameReferalsHistory__wrapper}
        size={"lg"}
        innerClassName={styles.gameReferalsHistory__inner}
      >
        <div className={styles.gameReferalsHistory__main}>
          <div className={styles.gameReferalsHistory__mainHeader}>
            <h6 className={styles.gameReferalsHistory__mainHeaderTitle}>
              Всего
            </h6>
            <DotsLine />
            <span className={styles.gameReferalsHistory__mainHeaderValueText}>
              1500
            </span>
          </div>
          <div className={styles.gameReferalsHistory__mainList}>
            {refferences.map((refference) => (
              <div className={styles.gameReferalsHistory__mainListItem}>
                <p className={styles.gameReferalsHistory__mainText}>
                  {refference.name}
                </p>
                <div className={styles.gameReferalsHistory__income}>
                  <div className={styles.gameReferalsHistory__incomeImgWrapper}>
                    <ImageWebp
                      src={kreditImage}
                      srcSet={kreditImageWebp}
                      alt="kredit"
                      className={styles.gameReferalsHistory__incomeImg}
                    />
                  </div>
                  <span className={styles.gameReferalsHistory__mainText}>
                    {refference.income.kredit}
                  </span>
                </div>
                <div className={styles.gameReferalsHistory__income}>
                  <div className={styles.gameReferalsHistory__incomeImgWrapper}>
                    <ImageWebp
                      src={darkMatterImage}
                      srcSet={darkMatterImageWebp}
                      alt="darkMatter"
                      className={styles.gameReferalsHistory__incomeImg}
                    />
                  </div>
                  <span className={styles.gameReferalsHistory__mainText}>
                    {refference.income.darkMatter}
                  </span>
                </div>
                <p
                  className={`${styles.gameReferalsHistory__mainText} ${styles.gameReferalsHistory__mainTextDate}`}
                >
                  {refference.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </WrapperWithFrame>

      <div className={styles.gameReferalsHistory__bottomBg}>
        <GameReferalsHistoryBottomBg />
      </div>
    </TransitionProvider>
  );
};

export default GameReferalsHistory;
