import React, { FC } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { MINI_GAMES } from "../../../../constants/miniGames/miniGames";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  PinIcon,
  PlayIcon,
  UnpinIcon,
} from "../../../layout/icons/MiniGames/Catalog";

import styles from "./MiniGamesCatalog.module.scss";

interface Props {
  filterPinned?: boolean;
}

const MiniGamesCatalog: FC<Props> = ({ filterPinned }) => {
  const data = filterPinned
    ? MINI_GAMES.filter((item) => item.pinned)
    : MINI_GAMES;
  return (
    <div className={styles.miniGamesCatalog}>
      <TitleH3 wingsReverse={false}>
        {filterPinned ? "Избранные" : "Мини игры"}
      </TitleH3>
      <div className={styles.miniGamesCatalog__list}>
        {data.map(({ name, description, pinned, image }, index) => (
          <div key={index} className={styles.miniGamesCatalog__listItem}>
            <div className={styles.miniGamesCatalog__listItemInner}>
              <ImageWebp
                src={image.src}
                srcSet={image.srcSet}
                alt={name}
                className={styles.miniGamesCatalog__listItemImg}
              />
              <div className={styles.miniGamesCatalog__listItemMain}>
                <div className={styles.miniGamesCatalog__listItemHeader}>
                  <h4 className={styles.miniGamesCatalog__listItemNameText}>
                    {name}
                  </h4>
                  <button className={styles.miniGamesCatalog__pinBtn}>
                    {!pinned ? <PinIcon /> : <UnpinIcon />}
                  </button>
                </div>
                <p className={styles.miniGamesCatalog__descriptionText}>
                  {description}
                </p>
                <button className={styles.miniGamesCatalog__playBtn}>
                  <div className={styles.miniGamesCatalog__playBtnInner}>
                    <span>Играть</span>
                    <PlayIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniGamesCatalog;
