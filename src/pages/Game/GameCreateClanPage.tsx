import React from "react";
import GameClanWrapper from "../../components/Game/GameClanPage/GameClanWrapper/GameClanWrapper";
import GameCreateClanMain from "../../components/Game/GameCreateClanPage/GameCreateClanMain/GameCreateClanMain";

const GameCreateClanPage = () => {
  return (
    <GameClanWrapper
      mainComponent={<GameCreateClanMain />}
      sideBarDisableed={true}
      headerDescriptionText={
        "Ты был один из многих. Теперь ты — тот, кого ждут. Встань. Назови свой клан. И пусть этот мир дрожит!"
      }
    />
  );
};

export default GameCreateClanPage;
