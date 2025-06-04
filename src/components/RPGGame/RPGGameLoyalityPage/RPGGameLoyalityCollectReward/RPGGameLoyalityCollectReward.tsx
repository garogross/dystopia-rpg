import React from "react";
import styles from "./RPGGameLoyalityCollectReward.module.scss";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common";
import {RPGGameLoyalityCollectRewardIcon} from "../../../layout/icons/RPGGame/RPGGameLoyalityPage";

interface Props {
  disabled?: boolean;
}

const RPGGameLoyalityCollectReward = ({ disabled }: Props) => {
  return (
    <div className={styles.rpgGameLoyalityCollectReward}>
      <div className={styles.rpgGameLoyalityCollectReward__wings}>
        <HeaderWings reversed />
      </div>
      <button
        disabled={disabled}
        className={styles.rpgGameLoyalityCollectReward__button}
      >
        <div className={styles.rpgGameLoyalityCollectReward__buttonInner}>
          <RPGGameLoyalityCollectRewardIcon />
          <span className={styles.rpgGameLoyalityCollectReward__buttonText}>
            Получать награду
          </span>
        </div>
      </button>
    </div>
  );
};

export default RPGGameLoyalityCollectReward;
