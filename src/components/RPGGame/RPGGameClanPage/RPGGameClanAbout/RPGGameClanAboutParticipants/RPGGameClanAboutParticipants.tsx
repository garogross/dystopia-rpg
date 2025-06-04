import React, { useState } from "react";
import Tabbar, { TabBarItem } from "../../../../layout/Tabbar/Tabbar";
import {RPGGameClanRolesIcon,RPGGameClanEditSettingsIcon,
RPGGameClanRequetsIcon,
RPGGameClanHistoryIcon,} from "../../../../layout/icons/RPGGame/RPGGameClanPage/RPGGameClanAbout";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";

import styles from "./RPGGameClanAboutParticipants.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../../hooks/redux";
import { IClan } from "../../../../../models/IClan";

const tabs: TabBarItem[] = [
  {
    icon: <RPGGameClanRolesIcon />,
    id: "roles",
  },
  {
    icon: <RPGGameClanEditSettingsIcon />,
    id: "settings",
    isIconStroke: true,
  },
  {
    icon: <RPGGameClanRequetsIcon />,
    id: "requests",
  },
  {
    icon: <RPGGameClanHistoryIcon />,
    id: "history",
  },
];

interface Props {
  participants: IClan["participants"];
}

const RPGGameClanAboutParticipants: React.FC<Props> = ({ participants }) => {
  const [activeTabId, setActiveTabId] = useState("");
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <>
      <Tabbar
        activeTabId={activeTabId}
        onChange={(id) => setActiveTabId(id)}
        tabs={tabs}
      />
      <WrapperWithFrame className={styles.rpgGameClanAboutParticipants}>
        <div className={styles.rpgGameClanAboutParticipants__wrapper}>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            className={styles.rpgGameClanAboutParticipants__header}
          >
            <h6 className={styles.rpgGameClanAboutParticipants__headerText}>
              Участники
            </h6>
            <h6 className={styles.rpgGameClanAboutParticipants__headerText}>
              Статус
            </h6>
            <h6 className={styles.rpgGameClanAboutParticipants__headerText}>
              Ур.
            </h6>
          </TransitionProvider>
          <div className={styles.rpgGameClanAboutParticipants__list}>
            {participants.map((user, index) => (
              <TransitionProvider
                key={index}
                inProp={gameInited}
                style={TransitionStyleTypes.bottom}
                delay={100 * index}
              >
                <div className={styles.rpgGameClanAboutParticipants__listItem}>
                  <div className={styles.rpgGameClanAboutParticipants__nameBlock}>
                    <span
                      className={styles.rpgGameClanAboutParticipants__roleText}
                    >
                      {user.role}
                    </span>
                    <p className={styles.rpgGameClanAboutParticipants__nameText}>
                      {user.name}
                    </p>
                  </div>
                  <div className={styles.rpgGameClanAboutParticipants__status}>
                    <span
                      className={`${
                        styles.rpgGameClanAboutParticipants__statusColor
                      } ${
                        user.status === "в сети"
                          ? styles.rpgGameClanAboutParticipants__statusColor_active
                          : styles.rpgGameClanAboutParticipants__statusColor_inactive
                      }`}
                    ></span>
                    <span
                      className={styles.rpgGameClanAboutParticipants__statusText}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className={styles.rpgGameClanAboutParticipants__levelText}>
                    {user.level}
                  </div>
                </div>
              </TransitionProvider>
            ))}
          </div>
        </div>
      </WrapperWithFrame>
    </>
  );
};

export default RPGGameClanAboutParticipants;
