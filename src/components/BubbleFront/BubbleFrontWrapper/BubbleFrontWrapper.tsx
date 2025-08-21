import React from "react";
import GameWrapper from "../../GameWrapper/GameWrapper";
import BubbleFrontHeader from "../BubbleFrontHeader/BubbleFrontHeader";
import BubbleFrontBottomNavbar from "../BubbleFrontBottomNavbar/BubbleFrontBottomNavbar";

import * as images from "../../../assets/imageMaps/bubbleFrontImages";

const BubbleFrontWrapper = () => {
  return (
    <GameWrapper
      header={<BubbleFrontHeader />}
      bottomNavbar={<BubbleFrontBottomNavbar />}
      images={images}
      gameInited={false}
      offsetSize={120}
    />
  );
};

export default BubbleFrontWrapper;
