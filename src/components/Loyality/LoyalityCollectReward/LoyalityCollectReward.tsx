import React from "react";
import styles from "./LoyalityCollectReward.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { LoyalityCollectRewardIcon } from "../../layout/icons/Loyality";

interface Props {
  disabled?: boolean;
}

const LoyalityCollectReward = ({ disabled }: Props) => {
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
            Получать награду
          </span>
        </div>
      </button>
    </div>
  );
};

export default LoyalityCollectReward;
