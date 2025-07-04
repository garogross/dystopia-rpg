import { TRANSLATIONS } from "../TRANSLATIONS";
import { EHackTerminalAchievments } from "./EHackTerminalAchievments";

import {
  AchievmentSaveWin1Level,
  AchievmentSaveWin2Level,
  AchievmentSaveWin3Level,
  AchievmentSaveWin4Level,
  AchievmentSaveWin5Level,
} from "../../components/layout/icons/Achievments/hackTerminal/SaveWin";
import {
  AchievmentWin1Level,
  AchievmentWin2Level,
  AchievmentWin3Level,
  AchievmentWin4Level,
  AchievmentWin5Level,
} from "../../components/layout/icons/Achievments/hackTerminal/Win";
import {
  AchievmentWinInRow1Level,
  AchievmentWinInRow2Level,
  AchievmentWinInRow3Level,
  AchievmentWinInRow4Level,
  AchievmentWinInRow5Level,
} from "../../components/layout/icons/Achievments/hackTerminal/WinInRow";
import { AchievmentDetailsType } from "../../types/Achievments/AchievmentDetailsType";

const { win, winInRow, saveWin } = TRANSLATIONS.hackTerminal.achievments;

export const HACK_TERMINAL_ACHIEVMENTS: AchievmentDetailsType<EHackTerminalAchievments> =
  {
    [EHackTerminalAchievments.WIN]: [
      {
        icon: <AchievmentWin1Level />,
        title: win.level1,
        description: win.desc1,
      },
      {
        icon: <AchievmentWin2Level />,
        title: win.level2,
        description: win.desc2,
      },
      {
        icon: <AchievmentWin3Level />,
        title: win.level3,
        description: win.desc3,
      },
      {
        icon: <AchievmentWin4Level />,
        title: win.level4,
        description: win.desc4,
      },
      {
        icon: <AchievmentWin5Level />,
        title: win.level5,
        description: win.desc5,
      },
    ],
    [EHackTerminalAchievments.SAVE_WIN]: [
      {
        icon: <AchievmentSaveWin1Level />,
        title: saveWin.level1,
        description: saveWin.desc1,
      },
      {
        icon: <AchievmentSaveWin2Level />,
        title: saveWin.level2,
        description: saveWin.desc2,
      },
      {
        icon: <AchievmentSaveWin3Level />,
        title: saveWin.level3,
        description: saveWin.desc3,
      },
      {
        icon: <AchievmentSaveWin4Level />,
        title: saveWin.level4,
        description: saveWin.desc4,
      },
      {
        icon: <AchievmentSaveWin5Level />,
        title: saveWin.level5,
        description: saveWin.desc5,
      },
    ],
    [EHackTerminalAchievments.WIN_IN_ROW]: [
      {
        icon: <AchievmentWinInRow1Level />,
        title: winInRow.level1,
        description: winInRow.desc1,
      },
      {
        icon: <AchievmentWinInRow2Level />,
        title: winInRow.level2,
        description: winInRow.desc2,
      },
      {
        icon: <AchievmentWinInRow3Level />,
        title: winInRow.level3,
        description: winInRow.desc3,
      },
      {
        icon: <AchievmentWinInRow4Level />,
        title: winInRow.level4,
        description: winInRow.desc4,
      },
      {
        icon: <AchievmentWinInRow5Level />,
        title: winInRow.level5,
        description: winInRow.desc5,
      },
    ],
  };
