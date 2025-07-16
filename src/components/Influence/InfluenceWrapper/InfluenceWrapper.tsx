import React from "react";
import GameWrapper from "../../GameWrapper/GameWrapper";
import InfluenceHeader from "../InfluenceHeader/InfluenceHeader";
import InfluenceBottomNavbar from "../InfluenceBottomNavbar/InfluenceBottomNavbar";

import * as influenceImages from "../../../assets/imageMaps/influence";

const InfluenceWrapper = () => {
  return (
    <GameWrapper
      header={<InfluenceHeader />}
      bottomNavbar={<InfluenceBottomNavbar />}
      images={influenceImages}
      gameInited={false}
      offsetSize={180}
    />
  );
};

export default InfluenceWrapper;
