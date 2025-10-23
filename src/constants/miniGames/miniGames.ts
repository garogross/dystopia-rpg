import {
  bubblefrontImage,
  bubblefrontImageWebp,
  gridlineImage,
  gridlineImageWebp,
  // hackTerminalImage,
  // hackTerminalImageWebp,
  // minGamesPuzzleImage,
  // minGamesPuzzleImageWebp,
} from "../../assets/imageMaps";
import {
  bubbleFrontPagePath,
  gridlinePagePath,
  // hackTerminalPagePath,
} from "../../router/constants";
import { TranslationItemType } from "../../types/TranslationItemType";
import { TRANSLATIONS } from "../TRANSLATIONS";
import { EMiniGames } from "./EMiniGames";

const { puzzle, hackTerminal, gridline, bubbleFront } = TRANSLATIONS.miniGames;

export const MINI_GAMES: {
  image: {
    src: string;
    srcSet: string;
  };
  name: TranslationItemType;
  description: TranslationItemType;
  key: EMiniGames;
  link: string;
  pinned?: boolean;
}[] = [
  // {
  //   image: {
  //     src: minGamesPuzzleImage,
  //     srcSet: minGamesPuzzleImageWebp,
  //   },
  //   name: puzzle.name,
  //   description: puzzle.description,
  //   pinned: true,
  //   key: EMiniGames.PUZZLE,
  // },
  // {
  //   image: {
  //     src: hackTerminalImage,
  //     srcSet: hackTerminalImageWebp,
  //   },
  //   name: hackTerminal.name,
  //   description: hackTerminal.description,
  //   key: EMiniGames.HACK_TERMINAL,
  //   link: hackTerminalPagePath,
  // },
  {
    image: {
      src: bubblefrontImage,
      srcSet: bubblefrontImageWebp,
    },
    name: bubbleFront.name,
    description: bubbleFront.description,
    key: EMiniGames.BUBBLE_FRONT,
    link: bubbleFrontPagePath,
  },
  {
    image: {
      src: gridlineImage,
      srcSet: gridlineImageWebp,
    },
    name: gridline.name,
    description: gridline.description,
    key: EMiniGames.GRIDLINE,
    link: gridlinePagePath,
  },
];
