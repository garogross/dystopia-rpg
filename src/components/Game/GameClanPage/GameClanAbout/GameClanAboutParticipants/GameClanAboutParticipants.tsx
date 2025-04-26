import React, { useState } from "react";
import Tabbar, { TabBarItem } from "../../../../layout/Tabbar/Tabbar";
import GameClanRolesIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanRolesIcon";
import GameClanEditSettingsIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanEditSettingsIcon";
import GameClanRequetsIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanRequetsIcon";
import GameClanHistoryIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanHistoryIcon";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";

import styles from "./GameClanAboutParticipants.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../../hooks/redux";

const tabs: TabBarItem[] = [
  {
    icon: <GameClanRolesIcon />,
    id: "roles",
  },
  {
    icon: <GameClanEditSettingsIcon />,
    id: "settings",
    isIconStroke: true,
  },
  {
    icon: <GameClanRequetsIcon />,
    id: "requests",
  },
  {
    icon: <GameClanHistoryIcon />,
    id: "history",
  },
];

const users = [
  { name: "Гарик2000", role: "Лидер", status: "в сети", level: 37 },
  { name: "JohnySilver", role: "Замлидер", status: "в сети", level: 81 },
  { name: "NeonVortex", role: "Дембель", status: "в сети", level: 37 },
  { name: "RustHawk", role: "Дембель", status: "в сети", level: 37 },
  { name: "CyberReaper", role: "Дух", status: "в сети", level: 37 },
  { name: "VoidSpecter", role: "Дух", status: "в сети", level: 37 },
  { name: "IronReign", role: "Лидер", status: "в сети", level: 37 },
  { name: "IronReign", role: "Лидер", status: "не в сети(1ч)", level: 37 },
  { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
  { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
  { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
  { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
  { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
  { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
];

const GameClanAboutParticipants = () => {
  const [activeTabId, setActiveTabId] = useState("");
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <>
      <Tabbar
        activeTabId={activeTabId}
        onChange={(id) => setActiveTabId(id)}
        tabs={tabs}
      />
      <WrapperWithFrame className={styles.gameClanAboutParticipants}>
        <div className={styles.gameClanAboutParticipants__wrapper}>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            className={styles.gameClanAboutParticipants__header}
          >
            <h6 className={styles.gameClanAboutParticipants__headerText}>
              Участники
            </h6>
            <h6 className={styles.gameClanAboutParticipants__headerText}>
              Статус
            </h6>
            <h6 className={styles.gameClanAboutParticipants__headerText}>
              Ур.
            </h6>
          </TransitionProvider>
          <div className={styles.gameClanAboutParticipants__list}>
            {users.map((user, index) => (
              <TransitionProvider
                key={index}
                inProp={gameInited}
                style={TransitionStyleTypes.bottom}
                delay={100 * index}
              >
                <div className={styles.gameClanAboutParticipants__listItem}>
                  <div className={styles.gameClanAboutParticipants__nameBlock}>
                    <span
                      className={styles.gameClanAboutParticipants__roleText}
                    >
                      {user.role}
                    </span>
                    <p className={styles.gameClanAboutParticipants__nameText}>
                      {user.name}
                    </p>
                  </div>
                  <div className={styles.gameClanAboutParticipants__status}>
                    <span
                      className={`${
                        styles.gameClanAboutParticipants__statusColor
                      } ${
                        user.status === "в сети"
                          ? styles.gameClanAboutParticipants__statusColor_active
                          : styles.gameClanAboutParticipants__statusColor_inactive
                      }`}
                    ></span>
                    <span
                      className={styles.gameClanAboutParticipants__statusText}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className={styles.gameClanAboutParticipants__levelText}>
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

export default GameClanAboutParticipants;
