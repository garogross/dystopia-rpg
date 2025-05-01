import {
  darkMatterImage,
  darkMatterImageWebp,
  kreditImage,
  kreditImageWebp,
  lpImage,
  lpImageWebp,
  tokenImage,
  tokenImageWebp,
} from "../assets/images";
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
};
