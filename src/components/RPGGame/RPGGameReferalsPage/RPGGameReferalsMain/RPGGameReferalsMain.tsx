import React from "react";

import styles from "./RPGGameReferalsMain.module.scss";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import RPGGameReferalsTotalEarnings from "../RPGGameReferalsTotalEarnings/RPGGameReferalsTotalEarnings";
import RPGGameReferalsTotalCount from "../RPGGameReferalsTotalCount/RPGGameReferalsTotalCount";
import RPGGameReferalsInfo from "../RPGGameReferalsInfo/RPGGameReferalsInfo";
import RPGGameReferalsShareButtons from "../RPGGameReferalsShareButtons/RPGGameReferalsShareButtons";


const RPGGameReferalsMain = () => {
  return (
    <div className={`${styles.rpgGameReferalsMain} container`}>
      <TitleH3>друзья</TitleH3>
      <RPGGameReferalsTotalEarnings />
      <RPGGameReferalsTotalCount />
      <RPGGameReferalsShareButtons />
      <RPGGameReferalsInfo />
      
    </div>
  );
};

export default RPGGameReferalsMain;
