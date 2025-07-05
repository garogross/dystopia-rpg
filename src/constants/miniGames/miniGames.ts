import {
  hackTerminalImage,
  hackTerminalImageWebp,
  minGamesPuzzleImage,
  minGamesPuzzleImageWebp,
} from "../../assets/imageMaps";
import { TRANSLATIONS } from "../TRANSLATIONS";
import { EMiniGames } from "./EMiniGames";

const { puzzle, hackTerminal } = TRANSLATIONS.miniGames;

export const MINI_GAMES = [
  {
    image: {
      src: minGamesPuzzleImage,
      srcSet: minGamesPuzzleImageWebp,
    },
    name: puzzle.name,
    description: puzzle.description,
    pinned: true,
    key: EMiniGames.PUZZLE,
  },
  {
    image: {
      src: hackTerminalImage,
      srcSet: hackTerminalImageWebp,
    },
    name: hackTerminal.name,
    description: hackTerminal.description,
    key: EMiniGames.HACK_TERMINAL,
  },
];
