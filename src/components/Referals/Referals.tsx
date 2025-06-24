import React, { useEffect } from "react";

import styles from "./Referals.module.scss";
import ReferalsTotalEarnings from "./ReferalsTotalEarnings/ReferalsTotalEarnings";
import ReferalsTotalCount from "./ReferalsTotalCount/ReferalsTotalCount";
import ReferalsInfo from "./ReferalsInfo/ReferalsInfo";
import ReferalsShareButtons from "./ReferalsShareButtons/ReferalsShareButtons";
import TitleH3 from "../layout/TitleH3/TitleH3";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { getReferals } from "../../store/slices/refferencesSlice";

const { titleText } = TRANSLATIONS.referals.main;
const Referals = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const referals = useAppSelector((state) => state.refferences.refferences);

  const totalReward = referals.reduce((acc, cur) => (acc += cur.bonus), 0);

  useEffect(() => {
    dispatch(getReferals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.referals} container`}>
      <TitleH3>{titleText[language]}</TitleH3>
      <ReferalsTotalEarnings totalReward={totalReward} />
      <ReferalsTotalCount totalCount={referals.length} />
      <ReferalsShareButtons />
      <ReferalsInfo />
    </div>
  );
};

export default Referals;
