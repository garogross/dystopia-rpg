import React from "react";
import styles from "./RPGGameReferalsHistory.module.scss";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../../hooks/redux";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  kreditImageWebp,
  darkMatterImage,
  darkMatterImageWebp,
} from "../../../../assets/imageMaps";
import { kreditImage } from "../../../../assets/imageMaps";
import {RPGGameReferalsHistoryBottomBg} from "../../../layout/icons/RPGGame/RPGGameReferalsPage";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import {DotsLine} from "../../../layout/icons/RPGGame/Common";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import HeaderWithBackButton from "../../../layout/HeaderWithBackButton/HeaderWithBackButton";

interface Props {
  show: boolean;
  onClose: () => void;
}

const RPGGameReferalsHistory: React.FC<Props> = ({ show, onClose }) => {
  const refferences = useAppSelector((state) => state.refferences.refferences);
  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.opacity}
      className={`${styles.rpgGameReferalsHistory} container`}
    >
      <HeaderWithBackButton
        onClose={onClose}
        className={styles.rpgGameReferalsHistory__header}
      />
      <TitleH3
        className={styles.rpgGameReferalsHistory__title}
        wingsReverse={false}
      >
        Рефералы
      </TitleH3>
      <WrapperWithFrame
        className={styles.rpgGameReferalsHistory__wrapper}
        size={"lg"}
        innerClassName={styles.rpgGameReferalsHistory__inner}
      >
        <div className={styles.rpgGameReferalsHistory__main}>
          <div className={styles.rpgGameReferalsHistory__mainHeader}>
            <h6 className={styles.rpgGameReferalsHistory__mainHeaderTitle}>
              Всего
            </h6>
            <DotsLine />
            <span className={styles.rpgGameReferalsHistory__mainHeaderValueText}>
              1500
            </span>
          </div>
          <div className={styles.rpgGameReferalsHistory__mainList}>
            {refferences.map((refference) => (
              <div className={styles.rpgGameReferalsHistory__mainListItem}>
                <p className={styles.rpgGameReferalsHistory__mainText}>
                  {refference.name}
                </p>
                <div className={styles.rpgGameReferalsHistory__income}>
                  <div className={styles.rpgGameReferalsHistory__incomeImgWrapper}>
                    <ImageWebp
                      src={kreditImage}
                      srcSet={kreditImageWebp}
                      alt="kredit"
                      className={styles.rpgGameReferalsHistory__incomeImg}
                    />
                  </div>
                  <span className={styles.rpgGameReferalsHistory__mainText}>
                    {refference.income.kredit}
                  </span>
                </div>
                <div className={styles.rpgGameReferalsHistory__income}>
                  <div className={styles.rpgGameReferalsHistory__incomeImgWrapper}>
                    <ImageWebp
                      src={darkMatterImage}
                      srcSet={darkMatterImageWebp}
                      alt="darkMatter"
                      className={styles.rpgGameReferalsHistory__incomeImg}
                    />
                  </div>
                  <span className={styles.rpgGameReferalsHistory__mainText}>
                    {refference.income.darkMatter}
                  </span>
                </div>
                <p
                  className={`${styles.rpgGameReferalsHistory__mainText} ${styles.rpgGameReferalsHistory__mainTextDate}`}
                >
                  {refference.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </WrapperWithFrame>

      <div className={styles.rpgGameReferalsHistory__bottomBg}>
        <RPGGameReferalsHistoryBottomBg />
      </div>
    </TransitionProvider>
  );
};

export default RPGGameReferalsHistory;
