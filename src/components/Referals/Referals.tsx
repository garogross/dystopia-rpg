import React from "react";

import styles from "./Referals.module.scss";
import ReferalsTotalEarnings from "./ReferalsTotalEarnings/ReferalsTotalEarnings";
import ReferalsTotalCount from "./ReferalsTotalCount/ReferalsTotalCount";
import ReferalsInfo from "./ReferalsInfo/ReferalsInfo";
import ReferalsShareButtons from "./ReferalsShareButtons/ReferalsShareButtons";
import TitleH3 from "../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../hooks/redux";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";

const { titleText } = TRANSLATIONS.referals.main;
const Referals = () => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <div className={`${styles.referals} container`}>
      <TitleH3>{titleText[language]}</TitleH3>
      <ReferalsTotalEarnings />
      <ReferalsTotalCount />
      <ReferalsShareButtons />
      <ReferalsInfo />
    </div>
  );
};

export default Referals;
