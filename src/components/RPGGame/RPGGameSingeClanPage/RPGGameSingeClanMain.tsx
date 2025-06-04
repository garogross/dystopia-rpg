import React, { useEffect } from "react";
import RPGGameClanWrapper from "../RPGGameClanPage/RPGGameClanWrapper/RPGGameClanWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { CLANS } from "../../../dummyData/clans";
import { rpgGamePagePath, rpgGameClanPagePath } from "../../../router/constants";

const RPGGameSingeClanMain = () => {
  const params = useParams() as { id: string };
  const navigate = useNavigate();
  const clanId = params.id;

  const clan = CLANS.find((clan) => clan.id === clanId);

  useEffect(() => {
    if (!clan) {
      navigate(`${rpgGamePagePath}/${rpgGameClanPagePath}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clanId]);

  return <RPGGameClanWrapper sideBarDisableed curClan={clan} />;
};

export default RPGGameSingeClanMain;
