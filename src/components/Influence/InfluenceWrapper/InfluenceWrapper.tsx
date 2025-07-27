import React from "react";
import GameWrapper from "../../GameWrapper/GameWrapper";
import InfluenceHeader from "../InfluenceHeader/InfluenceHeader";
import InfluenceBottomNavbar from "../InfluenceBottomNavbar/InfluenceBottomNavbar";

import * as influenceImages from "../../../assets/imageMaps/influenceImages";
import { ESplashTypes } from "../../../constants/ESplashTypes";
import InfluenceRestoreApModal from "../InfluenceMapPage/InfluenceRestoreApModal/InfluenceRestoreApModal";

const InfluenceWrapper = () => {
  return (
    <>
      <GameWrapper
        header={<InfluenceHeader />}
        bottomNavbar={<InfluenceBottomNavbar />}
        images={influenceImages}
        gameInited={false}
        splashType={ESplashTypes.INFLUENCE}
        offsetSize={180}
        mode={"influence"}
      />
      <InfluenceRestoreApModal />
    </>
  );
};

export default InfluenceWrapper;
