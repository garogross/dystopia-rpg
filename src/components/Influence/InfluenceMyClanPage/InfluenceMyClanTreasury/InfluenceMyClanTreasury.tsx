import React from "react";
import Accordion from "../../../layout/Accordion/Accordion";
import InfluenceMyClanTreasuryStatistics from "./InfluenceMyClanTreasuryStatistics/InfluenceMyClanTreasuryStatistics";
import InfluenceMyClanTreasuryAPStorage from "./InfluenceMyClanTreasuryAPStorage/InfluenceMyClanTreasuryAPStorage";
import { HeaderWings } from "../../../layout/icons/RPGGame/Common";
import { cpImage, cpImageWebp } from "../../../../assets/imageMaps";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  FillUpStorageIcon,
  ResetStatisticsIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanTreasury";
import { FillupIcon } from "../../../layout/icons/Influence/Common";
import { DotslineLong } from "../../../layout/icons/Common";

import styles from "./InfluenceMyClanTreasury.module.scss";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

const {
  curBalanceText,
  fillTreasuryButtonText,
  statisticsAccordionTitle,
  resetStatisticsButtonText,
  apStorageAccordionTitle,
  fillStorageButtonText,
} = TRANSLATIONS.influence.myClan.tressury;

const InfluenceMyClanTreasury = () => {
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.influenceMyClanTreasury}>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.influenceMyClanTreasury__container}
      >
        <div className={styles.influenceMyClanTreasury__header}>
          <div className={styles.influenceMyClanTreasury__headerInner}>
            <div className={styles.influenceMyClanTreasury__curBalance}>
              <span
                className={styles.influenceMyClanTreasury__curBalance__text}
              >
                {curBalanceText[language]}
              </span>
              <div
                className={styles.influenceMyClanTreasury__curBalanceDotsLine}
              >
                <DotslineLong preserveAspectRatio />
              </div>
              <span
                className={styles.influenceMyClanTreasury__curBalance__text}
              >
                32 000
              </span>
              <ImageWebp
                src={cpImage}
                srcSet={cpImageWebp}
                alt="cash points"
                className={styles.influenceMyClanTreasury__curBalanceCpImg}
              />
            </div>
            <button className={styles.influenceMyClanTreasury__btn}>
              <div className={styles.influenceMyClanTreasury__btnInner}>
                <FillUpStorageIcon />
                <span>{fillTreasuryButtonText[language]}</span>
              </div>
            </button>
          </div>
        </div>
        <div className={styles.influenceMyClanTreasury__accordions}>
          <Accordion title={statisticsAccordionTitle[language]}>
            <div
              className={styles.influenceMyClanTreasury__statisticsContainer}
            >
              <InfluenceMyClanTreasuryStatistics />
              <button className={styles.influenceMyClanTreasury__btn}>
                <div className={styles.influenceMyClanTreasury__btnInner}>
                  <ResetStatisticsIcon />
                  <span>{resetStatisticsButtonText[language]}</span>
                </div>
              </button>
            </div>
          </Accordion>
          <Accordion title={apStorageAccordionTitle[language]}>
            <div className={styles.influenceMyClanTreasury__storageContainer}>
              <InfluenceMyClanTreasuryAPStorage />
              <button className={styles.influenceMyClanTreasury__btn}>
                <div className={styles.influenceMyClanTreasury__btnInner}>
                  <FillupIcon />
                  <span>{fillStorageButtonText[language]}</span>
                </div>
              </button>
            </div>
          </Accordion>
        </div>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceMyClanTreasury__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
    </div>
  );
};

export default InfluenceMyClanTreasury;
