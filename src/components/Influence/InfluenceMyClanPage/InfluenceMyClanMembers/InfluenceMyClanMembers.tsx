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
import Table from "../../../layout/Table/Table";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";

const {
  tableHeadersText,
  ranksText,
  statusText,
  leavePostText,
  leaveClanText,
} = TRANSLATIONS.influence.myClan.members;

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

const ranks = {
  [EInfluenceClanMemberRanks.LEADER]: {
    name: ranksText.leader,
    icon: <LeaderIcon />,
  },
  [EInfluenceClanMemberRanks.ADVISOR]: {
    name: ranksText.advisor,
    icon: <AdvicorIcon />,
  },
  [EInfluenceClanMemberRanks.OFFICER]: {
    name: ranksText.officer,
    icon: <OficerIcon />,
  },
  [EInfluenceClanMemberRanks.MEMBER]: {
    name: ranksText.member,
    icon: <FightIcon />,
  },
};

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
  const language = useAppSelector((state) => state.ui.language);
  return (
    <div className={styles.influenceMyClanMembers}>
      <Table
        headers={Object.values(tableHeadersText)}
        data={members}
        cols={[
          {
            key: "username",
          },
          {
            key: "rank",
            render: (item) => (
              <>
                {" "}
                {ranks[item.rank].icon}{" "}
                <span>{ranks[item.rank].name[language]}</span>
              </>
            ),
          },
          {
            key: "online",
            render: (item) => (
              <>
                <div
                  className={`${styles.influenceMyClanMembers__status} ${
                    item.online
                      ? styles.influenceMyClanMembers__status_online
                      : ""
                  }`}
                ></div>
                <span>
                  {
                    (item.online ? statusText.online : statusText.offline)[
                      language
                    ]
                  }
                </span>
              </>
            ),
          },
          {
            key: "spendAP",
          },
        ]}
      />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceMyClanMembers__footer}
      >
        <button className={styles.influenceMyClanMembers__footerBtn}>
          <div className={styles.influenceMyClanMembers__footerBtnInner}>
            <LeavePostIcon />
            <span>{leavePostText[language]}</span>
          </div>
        </button>
        <button className={styles.influenceMyClanMembers__footerBtn}>
          <div className={styles.influenceMyClanMembers__footerBtnInner}>
            <LeaveClanIcon />
            <span>{leaveClanText[language]}</span>
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
