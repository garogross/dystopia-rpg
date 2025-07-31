import React from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import InfluenceMyClanHeader from "../InfluenceMyClanHeader/InfluenceMyClanHeader";
import InfluenceMyClanTabs from "../InfluenceMyClanTabs/InfluenceMyClanTabs";
import styles from "./InfluenceMyClan.module.scss";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

const { titleText } = TRANSLATIONS.influence.myClan;
const InfluenceMyClan = () => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <section className={`container ${styles.influenceMyClan}`}>
      <TitleH3 wingsReverse={false} hideDotline>
        {titleText[language]}
      </TitleH3>
      <InfluenceMyClanHeader />
      <InfluenceMyClanTabs />
    </section>
  );
};

export default InfluenceMyClan;
