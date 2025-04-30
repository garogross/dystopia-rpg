import React from "react";
import styles from "./GameLoyalityCollectReward.module.scss";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import GameLoyalityCollectRewardIcon from "../../../layout/icons/game/GameLoyalityPage/GameLoyalityCollectRewardIcon";

interface Props {
  disabled?: boolean;
}

const GameLoyalityCollectReward = ({ disabled }: Props) => {
  return (
    <div className={styles.gameLoyalityCollectReward}>
      <div className={styles.gameLoyalityCollectReward__wings}>
        <HeaderWings reversed/>
      </div>
      <button disabled={disabled} className={styles.gameLoyalityCollectReward__button}>
        <div className={styles.gameLoyalityCollectReward__buttonInner}>
          <GameLoyalityCollectRewardIcon />
          <span className={styles.gameLoyalityCollectReward__buttonText}>
            Получать награду
          </span>
        </div>
      </button>
    </div>
  );
};

export default GameLoyalityCollectReward;
