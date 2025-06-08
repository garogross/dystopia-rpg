import React from "react";
import styles from "./LoyalityCollectReward.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { LoyalityCollectRewardIcon } from "../../layout/icons/Loyality";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  disabled?: boolean;
}

const { collectRewardText } = TRANSLATIONS.loyality.collectReward;

const LoyalityCollectReward = ({ disabled }: Props) => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <div className={styles.loyalityCollectReward}>
      <div className={styles.loyalityCollectReward__wings}>
        <HeaderWings reversed />
      </div>
      <button
        disabled={disabled}
        className={styles.loyalityCollectReward__button}
      >
        <div className={styles.loyalityCollectReward__buttonInner}>
          <LoyalityCollectRewardIcon />
          <span className={styles.loyalityCollectReward__buttonText}>
            {collectRewardText[language]}
          </span>
        </div>
      </button>
    </div>
  );
};

export default LoyalityCollectReward;
