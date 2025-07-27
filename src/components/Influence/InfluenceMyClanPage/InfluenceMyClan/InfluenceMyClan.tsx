import React from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import InfluenceMyClanHeader from "../InfluenceMyClanHeader/InfluenceMyClanHeader";
import InfluenceMyClanTabs from "../InfluenceMyClanTabs/InfluenceMyClanTabs";
import styles from "./InfluenceMyClan.module.scss";

const InfluenceMyClan = () => {
  return (
    <section className={`container ${styles.influenceMyClan}`}>
      <TitleH3 wingsReverse={false} hideDotline>
        клан
      </TitleH3>
      <InfluenceMyClanHeader />
      <InfluenceMyClanTabs />
    </section>
  );
};

export default InfluenceMyClan;
