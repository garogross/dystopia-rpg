import React, { ReactNode, useState } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { ArrowIcon, DotslineLong } from "../../../layout/icons/Common";

import styles from "./InfluencePlayer.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import InfluencePlayerMain from "../InfluencePlayerMain/InfluencePlayerMain";
import InfluencePlayerStrengthening from "../InfluencePlayerStrengthening/InfluencePlayerStrengthening";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

const {
  titleText,
  sessionBuffsTitle,
  achievementsBonusesTitle,
  clanBonusesTitle,

  achievementBonusesList,
  clanBonusesList,
} = TRANSLATIONS.influence.player;

const Dropdown = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const [opened, setOpened] = useState(false);

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.influencePlayer__dropdown}
    >
      <button
        className={styles.influencePlayer__dropdownBtn}
        onClick={() => setOpened((prev) => !prev)}
      >
        <span>{title}</span>
        <span className={styles.influencePlayer__dropdownBtnDotsline}>
          <DotslineLong preserveAspectRatio />
        </span>
        <ArrowIcon rotate={opened} />
      </button>
      <TransitionProvider
        inProp={opened}
        style={TransitionStyleTypes.height}
        height={500}
        className={styles.influencePlayer__dropdownContent}
      >
        {children}
      </TransitionProvider>
    </TransitionProvider>
  );
};

const InfluencePlayer = () => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <section className={styles.influencePlayer}>
      <TitleH3 wingsReverse={false} hideDotline>
        {titleText[language]}
      </TitleH3>
      <div className={styles.influencePlayer__container}>
        <InfluencePlayerMain />
        <Dropdown title={sessionBuffsTitle[language]}>
          <InfluencePlayerStrengthening />
        </Dropdown>
        <Dropdown title={achievementsBonusesTitle[language]}>
          {achievementBonusesList[language].map((item) => (
            <p key={item} className={styles.influencePlayer__valueText}>
              {item}
            </p>
          ))}
        </Dropdown>
        <Dropdown title={clanBonusesTitle[language]}>
          {clanBonusesList[language].map((item) => (
            <p key={item} className={styles.influencePlayer__valueText}>
              {item}
            </p>
          ))}
        </Dropdown>
      </div>
    </section>
  );
};

export default InfluencePlayer;
