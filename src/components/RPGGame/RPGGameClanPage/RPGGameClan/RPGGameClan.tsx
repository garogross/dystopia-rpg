import React from "react";
import { useAppSelector } from "../../../../hooks/redux";
import RPGGameClanWrapper from "../RPGGameClanWrapper/RPGGameClanWrapper";
import RPGGameClanMain from "../RPGGameClanMain/RPGGameClanMain";

const RPGGameClan = () => {
  const clan = useAppSelector((state) => state.clan.clan);
  return (
    <RPGGameClanWrapper mainComponent={clan ? undefined : <RPGGameClanMain />} />
  );
};

export default RPGGameClan;
