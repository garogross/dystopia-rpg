import React from "react";
import RPGGameClanWrapper from "../../components/RPGGame/RPGGameClanPage/RPGGameClanWrapper/RPGGameClanWrapper";
import RPGGameClanSearchMain from "../../components/RPGGame/RPGGameClanSearchPage/RPGGameClanSearchMain/RPGGameClanSearchMain";

const RPGGameClanSearchPage = () => {
  return (
    <RPGGameClanWrapper
      mainComponent={<RPGGameClanSearchMain />}
      sideBarDisableed={true}
      headerDescriptionText={
        "Ты готов стать частью чего-то большего? Ищи, фильтруй и находи клан по себе — будь то дисциплина, хаос или чистая мощь. Один клик — и ты уже не один."
      }
    />
  );
};

export default RPGGameClanSearchPage;
