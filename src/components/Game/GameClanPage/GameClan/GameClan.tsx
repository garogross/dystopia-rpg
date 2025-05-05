import React from "react";
import { useAppSelector } from "../../../../hooks/redux";
import GameClanWrapper from "../GameClanWrapper/GameClanWrapper";
import GameClanMain from "../GameClanMain/GameClanMain";

const GameClan = () => {
  const clan = useAppSelector((state) => state.clan.clan);
  return (
    <GameClanWrapper mainComponent={clan ? undefined : <GameClanMain />} />
  );
};

export default GameClan;
