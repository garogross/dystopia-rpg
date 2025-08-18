import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import CyberFarmHeader from "../CyberFarmHeader/CyberFarmHeader";
import CyberFarmBottomNavbar from "../CyberFarmBottomNavbar/CyberFarmBottomNavbar";
import * as cyberfarmImages from "../../../assets/imageMaps/cyberfarmImages";
import TutorialPopup from "../../TutorialPopup/TutorialPopup";
import GameWrapper from "../../GameWrapper/GameWrapper";
import { useEffect } from "react";
import { closeCyberFarm } from "../../../store/slices/cyberFarm/cyberfarmSlice";

const CyberFarmWrapper = () => {
  const dispatch = useAppDispatch();
  const cyberFarmInited = useAppSelector(
    (state) => state.cyberfarm.global.dataReceived
  );

  useEffect(() => {
    return () => {
      dispatch(closeCyberFarm());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GameWrapper
        header={<CyberFarmHeader />}
        bottomNavbar={<CyberFarmBottomNavbar />}
        images={cyberfarmImages}
        gameInited={cyberFarmInited}
        offsetSize={265}
        mode={"ton_cyber_farm"}
      />

      <TutorialPopup />
    </>
  );
};

export default CyberFarmWrapper;
