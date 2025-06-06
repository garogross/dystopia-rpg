import React from "react";
import RPGGameClanWrapper from "../../components/RPGGame/RPGGameClanPage/RPGGameClanWrapper/RPGGameClanWrapper";
import RPGGameCreateClanMain from "../../components/RPGGame/RPGGameCreateClanPage/RPGGameCreateClanMain/RPGGameCreateClanMain";

const RPGGameCreateClanPage = () => {
  return (
    <RPGGameClanWrapper
      mainComponent={<RPGGameCreateClanMain />}
      sideBarDisableed={true}
      headerDescriptionText={
        "Ты был один из многих. Теперь ты — тот, кого ждут. Встань. Назови свой клан. И пусть этот мир дрожит!"
      }
    />
  );
};

export default RPGGameCreateClanPage;
