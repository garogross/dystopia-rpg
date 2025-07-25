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
import { useAppSelector } from "../../../../hooks/redux";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useNavigate } from "react-router-dom";

const { titleText, pinnedTitleText, playText } = TRANSLATIONS.miniGames.catalog;

interface Props {
  filterPinned?: boolean;
}

const MiniGamesCatalog: FC<Props> = ({ filterPinned }) => {
  const language = useAppSelector((state) => state.ui.language);
  const navigate = useNavigate();

  const data = filterPinned
    ? MINI_GAMES.filter((item) => item.pinned)
    : MINI_GAMES;
  return (
    <div className={`${styles.miniGamesCatalog}  container`}>
      <TitleH3 wingsReverse={false}>
        {filterPinned ? pinnedTitleText[language] : titleText[language]}
      </TitleH3>
      <div className={styles.miniGamesCatalog__list}>
        {data.map(({ name, description, pinned, link, image }, index) => (
          <div key={index} className={styles.miniGamesCatalog__listItem}>
            <div className={styles.miniGamesCatalog__listItemInner}>
              <ImageWebp
                src={image.src}
                srcSet={image.srcSet}
                alt={name[language]}
                className={styles.miniGamesCatalog__listItemImg}
              />
              <div className={styles.miniGamesCatalog__listItemMain}>
                <div className={styles.miniGamesCatalog__listItemHeader}>
                  <h4 className={styles.miniGamesCatalog__listItemNameText}>
                    {name[language]}
                  </h4>
                  <button className={styles.miniGamesCatalog__pinBtn}>
                    {!pinned ? <PinIcon /> : <UnpinIcon />}
                  </button>
                </div>
                <p className={styles.miniGamesCatalog__descriptionText}>
                  {description[language]}
                </p>
                <button
                  onClick={() => {
                    if (link) navigate(link);
                  }}
                  className={styles.miniGamesCatalog__playBtn}
                >
                  <div className={styles.miniGamesCatalog__playBtnInner}>
                    <span>{playText[language]}</span>
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
