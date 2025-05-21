import React from "react";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";

import styles from "./HomeAbout.module.scss";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

const { titleText, descriptionText } = TRANSLATIONS.home;

const HomeAbout = () => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <>
      <h1 className={`${styles.homeAbout__title} homeContainer`}>
        Dystopia Game
      </h1>
      <div className={`${styles.homeAbout__description} homeContainer`}>
        <WrapperWithFrame size={"lg"}>
          <div className={styles.homeAbout__descriptionInner}>
            <h4 className={styles.homeAbout__descriptionTitle}>
              <span className={styles.homeAbout__descriptionTitleNameText}>
                <span className={styles.homeAbout__descriptionTitleTrait}>
                  -{" "}
                </span>
                Dystopia —
              </span>{" "}
              {titleText[language]}
            </h4>
            <p className={styles.homeAbout__descriptionText}>
              {descriptionText[language]}
            </p>
          </div>
        </WrapperWithFrame>
      </div>
    </>
  );
};

export default HomeAbout;
