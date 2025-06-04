import React from "react";

import styles from "./RPGGameChalangesMain.module.scss";
import RPGGameChalangesHeader from "../RPGGameChalangesHeader/RPGGameChalangesHeader";
import RPGGameChalangesList from "../RPGGameChalangesList/RPGGameChalangesList";

interface Props {}

const RPGGameChalangesMain: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.rpgGmeChalangesMain} container`}>
      <RPGGameChalangesHeader />
      <RPGGameChalangesList />
    </div>
  );
};

export default RPGGameChalangesMain;
