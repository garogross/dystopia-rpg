import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import * as cyberfarmImages from "../../../assets/imageMaps/cyberfarmEvoImages";
import GameWrapper from "../../GameWrapper/GameWrapper";
import { useEffect } from "react";
import { closeCyberFarm } from "../../../store/slices/cyberFarm/cyberfarmSlice";
import CyberFarmEvoHeader from "../CyberFarmEvoHeader/CyberFarmEvoHeader";
import { useMatch } from "react-router-dom";
import { cyberFarmEvoPagePath } from "../../../router/constants";
import CyberFarmEvoFooter from "../CyberFarmEvoFooter/CyberFarmEvoFooter";
import TutorialPopup from "../../TutorialPopup/TutorialPopup";

const CyberFarmWrapper = () => {
  const isMapPage = useMatch(cyberFarmEvoPagePath);
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
        header={<CyberFarmEvoHeader />}
        bottomNavbar={isMapPage ? <></> : <CyberFarmEvoFooter />}
        images={cyberfarmImages}
        gameInited={cyberFarmInited}
        offsetSize={isMapPage ? 48 : 113}
        mode={"ton_cyber_farm"}
      />
      <TutorialPopup />
    </>
  );
};

export default CyberFarmWrapper;
