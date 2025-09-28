import React from "react";
import Achievments from "../../components/Achievments/Achievments";
import { useAppSelector } from "../../hooks/redux";
import { CYBER_FARM_ACHIEVMENTS } from "../../constants/cyberfarm/achievments";

const CyberFarmEvoAchievmentsPage = () => {
  const achievments = useAppSelector(
    (state) => state.cyberfarm.achievments.achievments
  );
  const achievmentSettings = useAppSelector(
    (state) => state.cyberfarm.achievments.achievmentSettings
  );

  return (
    <Achievments
      achievments={achievments}
      details={CYBER_FARM_ACHIEVMENTS}
      settings={achievmentSettings}
    />
  );
};

export default CyberFarmEvoAchievmentsPage;
