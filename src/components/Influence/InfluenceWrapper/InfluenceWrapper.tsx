import React, { useEffect } from "react";
import GameWrapper from "../../GameWrapper/GameWrapper";
import InfluenceHeader from "../InfluenceHeader/InfluenceHeader";
import InfluenceBottomNavbar from "../InfluenceBottomNavbar/InfluenceBottomNavbar";

import * as influenceImages from "../../../assets/imageMaps/influenceImages";
import { ESplashTypes } from "../../../constants/ESplashTypes";
import InfluenceRestoreApModal from "../InfluenceMapPage/InfluenceRestoreApModal/InfluenceRestoreApModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { closeInfluence } from "../../../store/slices/influence/influenceSlice";

const InfluenceWrapper = () => {
  const dispatch = useAppDispatch();
  const dataRecieved = useAppSelector(
    (state) => state.influence.influence.dataRecieved
  );

  useEffect(() => {
    return () => {
      dispatch(closeInfluence());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GameWrapper
        header={<InfluenceHeader />}
        bottomNavbar={<InfluenceBottomNavbar />}
        images={influenceImages}
        gameInited={dataRecieved}
        splashType={ESplashTypes.INFLUENCE}
        offsetSize={180}
        mode={"influence"}
      />
      <InfluenceRestoreApModal />
    </>
  );
};

export default InfluenceWrapper;
