import { darkMatterImage, darkMatterImageWebp, kreditImage, kreditImageWebp, tokenImage, tokenImageWebp } from "../assets/images";
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
    }
}