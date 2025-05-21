import React from "react";
import styles from "./HomeFooter.module.scss";

import {
  instaIconImage,
  instaIconImageWebp,
  reditIconImage,
  reditIconImageWebp,
  telegramIconImage,
  telegramIconImageWebp,
  xIconImage,
  xIconImageWebp,
} from "../../../assets/images";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
const socialIcons = [
  {
    link: "https://www.instagram.com/gamedystopia",
    alt: "Instagram",
    src: instaIconImage,
    srcSet: instaIconImageWebp,
  },
  {
    link: "https://www.reddit.com/user/DystopiaGame",
    alt: "Reddit",
    src: reditIconImage,
    srcSet: reditIconImageWebp,
  },
  {
    link: "https://t.me/dystopia_game",
    alt: "Telegram",
    src: telegramIconImage,
    srcSet: telegramIconImageWebp,
  },
  {
    link: "https://x.com/gamedystopia",
    alt: "X",
    src: xIconImage,
    srcSet: xIconImageWebp,
  },
];


const HomeFooter = () => {
  return (
    <footer className={styles.homeFooter}>
      {socialIcons.map((icon) => (
        <a
          href={icon.link}
          key={icon.alt}
          className={styles.homeFooter__btn}
          target="_blank"
          rel="noreferrer"
        >
          <ImageWebp
            srcSet={icon.srcSet}
            src={icon.src}
            alt={icon.alt}
            className={styles.homeFooter__iconImg}
          />
        </a>
      ))}
    </footer>
  );
};

export default HomeFooter;
