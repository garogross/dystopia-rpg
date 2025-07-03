import {
  hackTerminalImage,
  hackTerminalImageWebp,
  minGamesPuzzleImage,
  minGamesPuzzleImageWebp,
} from "../../assets/imageMaps";
import { EMiniGames } from "./EMiniGames";

export const MINI_GAMES = [
  {
    image: {
      src: minGamesPuzzleImage,
      srcSet: minGamesPuzzleImageWebp,
    },
    name: "Mini Puzzle",
    description: "Idle-экономика без суеты: строй, улучшай, собирай прибыль.",
    pinned: true,
    key: EMiniGames.PUZZLE,
  },
  {
    image: {
      src: hackTerminalImage,
      srcSet: hackTerminalImageWebp,
    },
    name: "Взлом терминала",
    description: "Испытай себя в быстрой мини-игре на реакцию и внимание.",
    key: EMiniGames.HACK_TERMINAL,
  },
];
