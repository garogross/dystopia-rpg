import React, { useState } from "react";
import ImageWebp from "../../../../layout/ImageWebp/ImageWebp";
import {
  influenceEnergyImage,
  influenceEnergyImageWebp,
} from "../../../../../assets/imageMaps";
import { BuyWalletIcon } from "../../../../layout/icons/Common";
import { HistoryIcon } from "../../../../layout/icons/Influence/InfluenceMyClanTreasury";
import { DotsLineFullscreen } from "../../../../layout/icons/Common/DotsLineFullscreen";

import styles from "./InfluenceMyClanTreasuryAPStorage.module.scss";
import InfluenceMyClanTreasuryHistory from "../InfluenceMyClanTreasuryHistory/InfluenceMyClanTreasuryHistory";
import { TRANSLATIONS } from "../../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../../hooks/redux";

const {
  clanStorageLabel,
  yourAPLabel,
  withdrawAPLabel,
  withdrawButtonText,
  maxPerSessionText,
  restorePerHourLabel,
} = TRANSLATIONS.influence.myClan.tressury.apStorage;

const InfluenceMyClanTreasuryAPStorage = () => {
  const language = useAppSelector((state) => state.ui.language);

  const [histotyOpened, setHistotyOpened] = useState(false);
  return (
    <>
      <div className={styles.influenceMyClanTreasuryAPStorage}>
        <div className={styles.influenceMyClanTreasuryAPStorage__col}>
          <span>
            <strong>{clanStorageLabel[language]}:</strong> 850/1000
          </span>
          <ImageWebp
            src={influenceEnergyImage}
            srcSet={influenceEnergyImageWebp}
            alt="action points"
            className={styles.influenceMyClanTreasuryAPStorage__apImage}
          />
        </div>
        <div className={styles.influenceMyClanTreasuryAPStorage__col}>
          <span>
            <strong>{yourAPLabel[language]}:</strong> 15/25
          </span>
          <ImageWebp
            src={influenceEnergyImage}
            srcSet={influenceEnergyImageWebp}
            alt="action points"
            className={styles.influenceMyClanTreasuryAPStorage__apImage}
          />
        </div>
        <div className={styles.influenceMyClanTreasuryAPStorage__col}>
          {withdrawAPLabel[language]}
        </div>
        <div
          className={styles.influenceMyClanTreasuryAPStorage__getFormWrapper}
        >
          <div className={styles.influenceMyClanTreasuryAPStorage__getForm}>
            <div
              className={styles.influenceMyClanTreasuryAPStorage__getFormMain}
            >
              <div
                className={
                  styles.influenceMyClanTreasuryAPStorage__getFormMainInner
                }
              >
                <input
                  type="text"
                  className={styles.influenceMyClanTreasuryAPStorage__input}
                />
                <button
                  className={styles.influenceMyClanTreasuryAPStorage__getBtn}
                >
                  <div
                    className={
                      styles.influenceMyClanTreasuryAPStorage__getBtnInner
                    }
                  >
                    <BuyWalletIcon />
                    <span>{withdrawButtonText[language]}</span>
                  </div>
                </button>
              </div>
            </div>
            <button
              onClick={() => setHistotyOpened(true)}
              className={styles.influenceMyClanTreasuryAPStorage__openHistryBtn}
            >
              <span
                className={
                  styles.influenceMyClanTreasuryAPStorage__openHistryBtnInner
                }
              >
                <HistoryIcon />
              </span>
            </button>
          </div>
          <p
            className={
              styles.influenceMyClanTreasuryAPStorage__maxPerSessionText
            }
          >
            {maxPerSessionText[language]}
          </p>
        </div>
        <div className={styles.influenceMyClanTreasuryAPStorage__footer}>
          <div className={styles.influenceMyClanTreasuryAPStorage__dotsLine}>
            <DotsLineFullscreen preserveAspectRatio />
          </div>
          <div className={styles.influenceMyClanTreasuryAPStorage__col}>
            <span>
              <strong>{restorePerHourLabel[language]}: </strong> +20
            </span>
            <ImageWebp
              src={influenceEnergyImage}
              srcSet={influenceEnergyImageWebp}
              alt="action points"
              className={styles.influenceMyClanTreasuryAPStorage__apImage}
            />
          </div>
        </div>
      </div>
      <InfluenceMyClanTreasuryHistory
        show={histotyOpened}
        onClose={() => setHistotyOpened(false)}
      />
    </>
  );
};

export default InfluenceMyClanTreasuryAPStorage;
