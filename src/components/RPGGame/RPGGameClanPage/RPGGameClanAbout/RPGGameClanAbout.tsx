import React from "react";
import styles from "./RPGGameClanAbout.module.scss";
import RPGGameClanAboutHeader from "./RPGGameClanAboutHeader/RPGGameClanAboutHeader";
import RPGGameClanAboutParticipants from "./RPGGameClanAboutParticipants/RPGGameClanAboutParticipants";
import { IClan } from "../../../../models/IClan";

interface Props {
  clan?: IClan
}

const RPGGameClanAbout: React.FC<Props> = ({clan}) => {

  if (!clan) {
    return null;
  }
  const { clanMessage, treasury,participants } = clan;
  return (
    <div className={styles.rpgGameClanAbout}>
      <RPGGameClanAboutHeader
      clanMessage={clanMessage}
      treasury={treasury}
      />
      <RPGGameClanAboutParticipants participants={participants}/>
    </div>
  );
};

export default RPGGameClanAbout;
