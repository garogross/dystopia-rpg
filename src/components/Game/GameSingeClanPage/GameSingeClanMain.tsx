import React, { useEffect } from "react";
import GameClanWrapper from "../GameClanPage/GameClanWrapper/GameClanWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { CLANS } from "../../../dummyData/clans";
import { gameClanPagePath, gamePagePath } from "../../../router/constants";

const GameSingeClanMain = () => {
  const params = useParams() as { id: string };
  const navigate = useNavigate();
  const clanId = params.id;

  const clan = CLANS.find((clan) => clan.id === clanId);

  useEffect(() => {
    if (!clan) {
      navigate(`${gamePagePath}/${gameClanPagePath}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clanId]);

  return <GameClanWrapper sideBarDisableed curClan={clan} />;
};

export default GameSingeClanMain;
