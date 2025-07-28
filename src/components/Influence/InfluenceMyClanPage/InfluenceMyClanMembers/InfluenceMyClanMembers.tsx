import React from "react";
import { EInfluenceClanMemberRanks } from "../../../../constants/influence/EInfluenceClanMemberRanks";
import {
  AdvicorIcon,
  LeaderIcon,
  OficerIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanMembers/ranks";
import { FightIcon } from "../../../layout/icons/Influence/InfluenceNotifications/Tabs";

import styles from "./InfluenceMyClanMembers.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
import { HeaderWings } from "../../../layout/icons/RPGGame/Common";
import {
  LeaveClanIcon,
  LeavePostIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanMembers";

const ranks = {
  [EInfluenceClanMemberRanks.LEADER]: {
    name: "Глава",
    icon: <LeaderIcon />,
  },
  [EInfluenceClanMemberRanks.ADVISOR]: {
    name: "Советник",
    icon: <AdvicorIcon />,
  },
  [EInfluenceClanMemberRanks.OFFICER]: {
    name: "Офицер",
    icon: <OficerIcon />,
  },
  [EInfluenceClanMemberRanks.MEMBER]: {
    name: "Боец",
    icon: <FightIcon />,
  },
};

const usernames = [
  "ShadowWolf",
  "IronFist",
  "NightHawk",
  "StormRider",
  "FireBlade",
  "SilverFox",
  "DarkKnight",
  "ThunderCat",
  "FrostMage",
  "SunWarrior",
  "MoonDancer",
  "CrimsonViper",
  "SteelHeart",
  "GhostWalker",
  "BlazeHunter",
  "WindRunner",
  "StoneGiant",
  "AquaSpirit",
  "StarSeeker",
  "VenomStrike",
];

const ranksArr = [
  EInfluenceClanMemberRanks.LEADER,
  EInfluenceClanMemberRanks.ADVISOR,
  EInfluenceClanMemberRanks.OFFICER,
  EInfluenceClanMemberRanks.MEMBER,
];

const members = Array.from({ length: 20 }, (_, i) => ({
  username: usernames[i % usernames.length],
  rank: ranksArr[i] || EInfluenceClanMemberRanks.MEMBER,
  online: Math.random() > 0.5,
  spendAP: Math.floor(Math.random() * 2000),
}));

const InfluenceMyClanMembers = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.influenceMyClanMembers}>
      <div className={styles.influenceMyClanMembers__table}>
        <div className={styles.influenceMyClanMembers__col}>
          <div className={styles.influenceMyClanMembers__tableHeaderText}>
            Участник
          </div>
          <div className={styles.influenceMyClanMembers__tableHeaderText}>
            Звание
          </div>
          <div className={styles.influenceMyClanMembers__tableHeaderText}>
            Статус
          </div>
          <div className={styles.influenceMyClanMembers__tableHeaderText}>
            Потрачено ОД
          </div>
        </div>
        {members.map((member) => (
          <div
            key={member.username}
            className={styles.influenceMyClanMembers__col}
          >
            <div className={styles.influenceMyClanMembers__tableBodyItem}>
              {member.username}
            </div>
            <div className={styles.influenceMyClanMembers__tableBodyItem}>
              {ranks[member.rank].icon} <span>{ranks[member.rank].name}</span>
            </div>

            <div className={styles.influenceMyClanMembers__tableBodyItem}>
              <div
                className={`${styles.influenceMyClanMembers__status} ${
                  member.online
                    ? styles.influenceMyClanMembers__status_online
                    : ""
                }`}
              ></div>
              <span>{member.online ? "в сети" : "офлайн"}</span>
            </div>
            <div className={styles.influenceMyClanMembers__tableBodyItem}>
              {member.spendAP}
            </div>
          </div>
        ))}
      </div>

      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceMyClanMembers__footer}
      >
        <button className={styles.influenceMyClanMembers__footerBtn}>
          <div className={styles.influenceMyClanMembers__footerBtnInner}>
            <LeavePostIcon />
            <span>Покинуть пост</span>
          </div>
        </button>
        <button className={styles.influenceMyClanMembers__footerBtn}>
          <div className={styles.influenceMyClanMembers__footerBtnInner}>
            <LeaveClanIcon />
            <span>Покинуть клан</span>
          </div>
        </button>
        <div className={styles.influenceMyClanMembers__wings}>
          <HeaderWings reversed />
        </div>
      </TransitionProvider>
    </div>
  );
};

export default InfluenceMyClanMembers;
