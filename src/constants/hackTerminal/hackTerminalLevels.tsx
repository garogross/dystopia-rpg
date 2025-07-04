import {
  HackerLevelIcon,
  NewbiesLevelIcon,
  CrackersLevelIcon,
} from "../../components/layout/icons/HackTerminal/HackTerminalLevelSelect";

export const HACK_TERMINAL_LEVELS = [
  {
    name: "Новичок",
    description: "Простой код",
    codeLength: 4,
    attempts: 10,
    icon: <NewbiesLevelIcon />,
    selected: true,
  },
  {
    name: "Взломщик",
    description: "Средний вызов",
    codeLength: 6,
    attempts: 8,
    icon: <CrackersLevelIcon />,
  },
  {
    name: "Хакер",
    description: "Сложный шифр",
    codeLength: 8,
    attempts: 6,
    icon: <HackerLevelIcon />,
  },
];
