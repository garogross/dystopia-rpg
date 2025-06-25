import React from "react";

import styles from "./OnBoardingHeader.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

interface Props {}
const { titleText, appNameText } = TRANSLATIONS.onBoarding.header;

const OnBoardingHeader: React.FC<Props> = (props) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <header className={styles.onBoardingHeader}>
      <h1 className={styles.onBoardingHeader__title}>{titleText[language]}</h1>
      <h2 className={styles.onBoardingHeader__appName}>
        {appNameText[language]}
      </h2>
    </header>
  );
};

export default OnBoardingHeader;
