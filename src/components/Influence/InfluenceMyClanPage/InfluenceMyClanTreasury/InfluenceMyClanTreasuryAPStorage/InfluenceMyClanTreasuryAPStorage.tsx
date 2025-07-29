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

const InfluenceMyClanTreasuryAPStorage = () => {
  const [histotyOpened, setHistotyOpened] = useState(false);
  return (
    <>
      <div className={styles.influenceMyClanTreasuryAPStorage}>
        <div className={styles.influenceMyClanTreasuryAPStorage__col}>
          <span>
            <strong>Хранилище клана:</strong> 850/1000
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
            <strong>Ваши ОД:</strong> 15/25
          </span>
          <ImageWebp
            src={influenceEnergyImage}
            srcSet={influenceEnergyImageWebp}
            alt="action points"
            className={styles.influenceMyClanTreasuryAPStorage__apImage}
          />
        </div>
        <div className={styles.influenceMyClanTreasuryAPStorage__col}>
          Забрать ОД из склада
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
                    <span>Забрать</span>
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
            За каждую сессию можно забрать максимум 25 ОД
          </p>
        </div>
        <div className={styles.influenceMyClanTreasuryAPStorage__footer}>
          <div className={styles.influenceMyClanTreasuryAPStorage__dotsLine}>
            <DotsLineFullscreen preserveAspectRatio />
          </div>
          <div className={styles.influenceMyClanTreasuryAPStorage__col}>
            <span>
              <strong>Восстановление/час: </strong> +20
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
