import React from "react";
import styles from "./GameCharacterInventory.module.scss";
import GameCharacterInventoryEquipment from "./GameCharacterInventoryEquipment/GameCharacterInventoryEquipment";
import GameCharacterInventoryModel from "./GameCharacterInventoryModel/GameCharacterInventoryModel";
import GameCharacterInventoryList from "./GameCharacterInventoryList/GameCharacterInventoryList";


const GameCharacterInventory: React.FC = () => {
  return (
    <div className={styles.gameCharacterInventory}>
      <GameCharacterInventoryEquipment />
      <GameCharacterInventoryModel />
      <GameCharacterInventoryList />
    </div>
  );
};

export default GameCharacterInventory;
