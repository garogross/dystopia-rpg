import React from "react";
import { influenceClans } from "../../../../dummyData/influenceClans";
import { EditIcon } from "../../../layout/icons/Common";
import { DotsLineFullscreen } from "../../../layout/icons/Common/DotsLineFullscreen";
import {
  FoundedIcon,
  IdIcon,
  LeaderIcon,
  MembersIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanHeader";

import styles from "./InfluenceMyClanHeader.module.scss";
import { INFLUENCE_CLAN_EMBLEMS } from "../../../../constants/influence/influenceClanEmblems";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import { getElapsedTime } from "../../../../utils/getElapsedTime";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

const {
  levelLabelText,
  progressLabelText,
  membersText,
  foundedText,
  leaderText,
  clanIdText,
} = TRANSLATIONS.influence.myClan.header;

const InfluenceMyClanHeader = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  const clan = influenceClans[0];
  const stats = [
    {
      icon: <MembersIcon />,
      name: membersText,
      value: `${clan.members}/${clan.maxMembers}`,
    },
    {
      icon: <FoundedIcon />,
      name: foundedText,
      value: getElapsedTime(clan.founded, language),
    },
    {
      icon: <LeaderIcon />,
      name: leaderText,
      value: clan.name,
    },
    {
      icon: <IdIcon />,
      name: clanIdText,
      value: clan.id,
    },
  ];

  return (
    <header className={styles.influenceMyClanHeader}>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.top}
        className={styles.influenceMyClanHeader__main}
      >
        <ImageWebp
          src={INFLUENCE_CLAN_EMBLEMS[clan.emblem].src}
          srcSet={INFLUENCE_CLAN_EMBLEMS[clan.emblem].src}
          alt="clan"
          className={styles.influenceMyClanHeader__img}
        />
        <div className={styles.influenceMyClanHeader__mainInfo}>
          <div className={styles.influenceMyClanHeader__mainInfotopBlock}>
            <h4 className={styles.influenceMyClanHeader__nameText}>
              {clan.name}
            </h4>
            <h5 className={styles.influenceMyClanHeader__levelText}>
              {levelLabelText[language]} {clan.level}
            </h5>
            <button className={styles.influenceMyClanHeader__editBtn}>
              <EditIcon />
            </button>
          </div>
          <p className={styles.influenceMyClanHeader__descriptionText}>
            {clan.description}
          </p>
          <p className={styles.influenceMyClanHeader__progressText}>
            {progressLabelText[language]} [9863/10000]
          </p>
          <div className={styles.influenceMyClanHeader__progressBar}>
            <div className={styles.influenceMyClanHeader__progressBarContainer}>
              <div
                className={styles.influenceMyClanHeader__progressBarinner}
              ></div>
            </div>
          </div>
        </div>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceMyClanHeader__dotsLine}
      >
        <DotsLineFullscreen preserveAspectRatio />
      </TransitionProvider>
      <div className={styles.influenceMyClanHeader__stats}>
        {stats.map((item, index) => (
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            delay={index * 100}
            key={index}
            className={styles.influenceMyClanHeader__statItem}
          >
            {item.icon}
            <span>
              <strong>{item.name[language]}</strong> {item.value}
            </span>
          </TransitionProvider>
        ))}
      </div>
    </header>
  );
};

export default InfluenceMyClanHeader;
