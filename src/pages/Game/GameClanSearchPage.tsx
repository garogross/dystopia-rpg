import React from "react";
import GameClanWrapper from "../../components/Game/GameClanPage/GameClanWrapper/GameClanWrapper";
import GameClanSearchMain from "../../components/Game/GameClanSearchPage/GameClanSearchMain/GameClanSearchMain";

const GameClanSearchPage = () => {
  return (
    <GameClanWrapper
      mainComponent={<GameClanSearchMain />}
      sideBarDisableed={true}
      headerDescriptionText={
        "Ты готов стать частью чего-то большего? Ищи, фильтруй и находи клан по себе — будь то дисциплина, хаос или чистая мощь. Один клик — и ты уже не один."
      }
    />
  );
};

export default GameClanSearchPage;
