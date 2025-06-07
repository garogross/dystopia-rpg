import React from "react";
import RPGGameStore from "../../RPGGame/RPGGameStore/RPGGameStore";
import styles from "./LoyalityStore.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
const LoyalityStore = () => {
  return (
    <div className={styles.loyalityStore}>
      <RPGGameStore isDualColumns />
      <div className={styles.loyalityStore__wings}>
        <HeaderWings reversed />
      </div>
    </div>
  );
};

export default LoyalityStore;
