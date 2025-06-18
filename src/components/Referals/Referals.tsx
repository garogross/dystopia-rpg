import React from "react";

import styles from "./Referals.module.scss";
import ReferalsTotalEarnings from "./ReferalsTotalEarnings/ReferalsTotalEarnings";
import ReferalsTotalCount from "./ReferalsTotalCount/ReferalsTotalCount";
import ReferalsInfo from "./ReferalsInfo/ReferalsInfo";
import ReferalsShareButtons from "./ReferalsShareButtons/ReferalsShareButtons";
import TitleH3 from "../layout/TitleH3/TitleH3";

const Referals = () => {
  return (
    <div className={`${styles.referals} container`}>
      <TitleH3>друзья</TitleH3>
      <ReferalsTotalEarnings />
      <ReferalsTotalCount />
      <ReferalsShareButtons />
      <ReferalsInfo />
    </div>
  );
};

export default Referals;
