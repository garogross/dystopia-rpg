import React from "react";
import styles from "./RPGGameCharacterInventory.module.scss";
import RPGGameCharacterInventoryEquipment from "./RPGGameCharacterInventoryEquipment/RPGGameCharacterInventoryEquipment";
import RPGGameCharacterInventoryModel from "./RPGGameCharacterInventoryModel/RPGGameCharacterInventoryModel";
import RPGGameCharacterInventoryList from "./RPGGameCharacterInventoryList/RPGGameCharacterInventoryList";


const RPGGameCharacterInventory: React.FC = () => {
  return (
    <div className={styles.rpgGameCharacterInventory}>
      <RPGGameCharacterInventoryEquipment />
      <RPGGameCharacterInventoryModel />
      <RPGGameCharacterInventoryList />
    </div>
  );
};

export default RPGGameCharacterInventory;
