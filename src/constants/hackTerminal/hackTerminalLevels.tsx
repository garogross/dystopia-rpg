import {
  HackerLevelIcon,
  NewbiesLevelIcon,
  CrackersLevelIcon,
} from "../../components/layout/icons/HackTerminal/HackTerminalLevelSelect";
import { TRANSLATIONS } from "../TRANSLATIONS";

const { newbie, cracker, hacker } = TRANSLATIONS.hackTerminal.levelSelect;

export const HACK_TERMINAL_LEVELS = [
  {
    name: newbie.name,
    description: newbie.description,
    codeLength: 4,
    attempts: 10,
    icon: <NewbiesLevelIcon />,
    selected: true,
  },
  {
    name: cracker.name,
    description: cracker.description,
    codeLength: 6,
    attempts: 8,
    icon: <CrackersLevelIcon />,
  },
  {
    name: hacker.name,
    description: hacker.description,
    codeLength: 8,
    attempts: 6,
    icon: <HackerLevelIcon />,
  },
];
