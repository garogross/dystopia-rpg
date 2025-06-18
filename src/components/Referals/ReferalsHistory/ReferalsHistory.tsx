import React from "react";
import styles from "./ReferalsHistory.module.scss";
import TitleH3 from "../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../hooks/redux";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  kreditImageWebp,
  darkMatterImage,
  darkMatterImageWebp,
} from "../../../assets/imageMaps";
import { kreditImage } from "../../../assets/imageMaps";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import { ReferalsHistoryBottomBg } from "../../layout/icons/Referals";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

interface Props {
  show: boolean;
  onClose: () => void;
}

const { titleText, totalText } = TRANSLATIONS.referals.history;

const ReferalsHistory: React.FC<Props> = ({ show, onClose }) => {
  const refferences = useAppSelector((state) => state.refferences.refferences);
  const language = useAppSelector((state) => state.ui.language);

  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.opacity}
      className={`${styles.referalsHistory} container`}
    >
      <HeaderWithBackButton
        onClose={onClose}
        className={styles.referalsHistory__header}
      />
      <TitleH3 className={styles.referalsHistory__title} wingsReverse={false}>
        {titleText[language]}
      </TitleH3>
      <WrapperWithFrame
        className={styles.referalsHistory__wrapper}
        size={"lg"}
        innerClassName={styles.referalsHistory__inner}
      >
        <div className={styles.referalsHistory__main}>
          <div className={styles.referalsHistory__mainHeader}>
            <h6 className={styles.referalsHistory__mainHeaderTitle}>
              {totalText[language]}
            </h6>
            <DotsLine />
            <span className={styles.referalsHistory__mainHeaderValueText}>
              1500
            </span>
          </div>
          <div className={styles.referalsHistory__mainList}>
            {refferences.map((refference) => (
              <div className={styles.referalsHistory__mainListItem}>
                <p className={styles.referalsHistory__mainText}>
                  {refference.name}
                </p>
                <div className={styles.referalsHistory__income}>
                  <div className={styles.referalsHistory__incomeImgWrapper}>
                    <ImageWebp
                      src={kreditImage}
                      srcSet={kreditImageWebp}
                      alt="kredit"
                      className={styles.referalsHistory__incomeImg}
                    />
                  </div>
                  <span className={styles.referalsHistory__mainText}>
                    {refference.income.kredit}
                  </span>
                </div>
                <div className={styles.referalsHistory__income}>
                  <div className={styles.referalsHistory__incomeImgWrapper}>
                    <ImageWebp
                      src={darkMatterImage}
                      srcSet={darkMatterImageWebp}
                      alt="darkMatter"
                      className={styles.referalsHistory__incomeImg}
                    />
                  </div>
                  <span className={styles.referalsHistory__mainText}>
                    {refference.income.darkMatter}
                  </span>
                </div>
                <p
                  className={`${styles.referalsHistory__mainText} ${styles.referalsHistory__mainTextDate}`}
                >
                  {refference.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </WrapperWithFrame>

      <div className={styles.referalsHistory__bottomBg}>
        <ReferalsHistoryBottomBg />
      </div>
    </TransitionProvider>
  );
};

export default ReferalsHistory;
