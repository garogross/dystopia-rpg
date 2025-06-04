import React from "react";
import RPGGameStore from "../../RPGGameStore/RPGGameStore";
import styles from "./RPGGameLoyalityStore.module.scss";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common";
const RPGGameLoyalityStore = () => {
  return (
    <div className={styles.rpgGameLoyalityStore}>
      <RPGGameStore isDualColumns />
      <div className={styles.rpgGameLoyalityStore__wings}>
        <HeaderWings reversed />
      </div>
    </div>
  );
};

export default RPGGameLoyalityStore;
