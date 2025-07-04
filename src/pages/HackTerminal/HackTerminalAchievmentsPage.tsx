import React from "react";
import Achievments from "../../components/Achievments/Achievments";
import { HACK_TERMINAL_ACHIEVMENTS } from "../../constants/hackTerminal/hackTerminalAchievments";
import { EHackTerminalAchievments } from "../../constants/hackTerminal/EHackTerminalAchievments";

const HackTerminalAchievmentsPage = () => {
  const achievments = {
    [EHackTerminalAchievments.WIN]: {
      count: 1,
      level: 1,
    },
    [EHackTerminalAchievments.SAVE_WIN]: {
      count: 1,
      level: 1,
    },
    [EHackTerminalAchievments.WIN_IN_ROW]: {
      count: 1,
      level: 1,
    },
  };

  const settings = {
    [EHackTerminalAchievments.WIN]: {
      desc: "lorem text",
      levels: [2, 2, 2, 2, 2],
      reward_per_level_hours: 1,
    },
    [EHackTerminalAchievments.SAVE_WIN]: {
      desc: "lorem text",
      levels: [2, 2, 2, 2, 2],
      reward_per_level_hours: 1,
    },
    [EHackTerminalAchievments.WIN_IN_ROW]: {
      desc: "lorem text",
      levels: [2, 2, 2, 2, 2],
      reward_per_level_hours: 1,
    },
  };
  return (
    <Achievments
      achievments={achievments}
      details={HACK_TERMINAL_ACHIEVMENTS}
      settings={settings}
    />
  );
};

export default HackTerminalAchievmentsPage;
