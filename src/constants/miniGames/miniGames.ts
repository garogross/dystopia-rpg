import {
  hackTerminalImage,
  hackTerminalImageWebp,
  minGamesPuzzleImage,
  minGamesPuzzleImageWebp,
} from "../../assets/imageMaps";

export const MINI_GAMES = [
  {
    image: {
      src: minGamesPuzzleImage,
      srcSet: minGamesPuzzleImageWebp,
    },
    name: "Mini Puzzle",
    description: "Idle-экономика без суеты: строй, улучшай, собирай прибыль.",
    pinned: true,
  },
  {
    image: {
      src: hackTerminalImage,
      srcSet: hackTerminalImageWebp,
    },
    name: "Взлом терминала",
    description: "Испытай себя в быстрой мини-игре на реакцию и внимание.",
  },
];
