import {
  darkMatterImage,
  darkMatterImageWebp,
  kreditImage,
  kreditImageWebp,
  lpImage,
  lpImageWebp,
  tokenImage,
  tokenImageWebp,
  cpImage,
  cpImageWebp,
  tonImage,
  tonImageWebp,
} from "../assets/imageMaps";
import { EStats } from "./EStats";

export const statImages = {
  [EStats.kredit]: {
    img: kreditImage,
    imgWebp: kreditImageWebp,
  },
  [EStats.darkMatter]: {
    img: darkMatterImage,
    imgWebp: darkMatterImageWebp,
  },
  [EStats.token]: {
    img: tokenImage,
    imgWebp: tokenImageWebp,
  },
  [EStats.lp]: {
    img: lpImage,
    imgWebp: lpImageWebp,
  },
  [EStats.cp]: {
    img: cpImage,
    imgWebp: cpImageWebp,
  },
  [EStats.ton]: {
    img: tonImage,
    imgWebp: tonImageWebp,
  },
};
