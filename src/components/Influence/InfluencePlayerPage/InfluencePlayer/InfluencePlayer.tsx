import React from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";

import styles from "./InfluencePlayer.module.scss";

import InfluencePlayerMain from "../InfluencePlayerMain/InfluencePlayerMain";
import InfluencePlayerStrengthening from "../InfluencePlayerStrengthening/InfluencePlayerStrengthening";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import Accordion from "../../../layout/Accordion/Accordion";

const {
  titleText,
  sessionBuffsTitle,
  achievementsBonusesTitle,
  clanBonusesTitle,

  achievementBonusesList,
  clanBonusesList,
} = TRANSLATIONS.influence.player;

const InfluencePlayer = () => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <section className={styles.influencePlayer}>
      <TitleH3 wingsReverse={false} hideDotline>
        {titleText[language]}
      </TitleH3>
      <div className={styles.influencePlayer__container}>
        <InfluencePlayerMain />
        <Accordion title={sessionBuffsTitle[language]}>
          <InfluencePlayerStrengthening />
        </Accordion>
        <Accordion title={achievementsBonusesTitle[language]}>
          {achievementBonusesList[language].map((item) => (
            <p key={item} className={styles.influencePlayer__valueText}>
              {item}
            </p>
          ))}
        </Accordion>
        <Accordion title={clanBonusesTitle[language]}>
          {clanBonusesList[language].map((item) => (
            <p key={item} className={styles.influencePlayer__valueText}>
              {item}
            </p>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default InfluencePlayer;
