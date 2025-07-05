import { useAppSelector } from "../../../hooks/redux";
import CyberFarmHeader from "../CyberFarmHeader/CyberFarmHeader";
import CyberFarmBottomNavbar from "../CyberFarmBottomNavbar/CyberFarmBottomNavbar";
import * as cyberfarmImages from "../../../assets/imageMaps/cyberfarmImages";
import TutorialPopup from "../../TutorialPopup/TutorialPopup";
import GameWrapper from "../../GameWrapper/GameWrapper";

const CyberFarmWrapper = () => {
  const cyberFarmInited = useAppSelector(
    (state) => state.cyberfarm.global.dataReceived
  );

  return (
    <>
      <GameWrapper
        header={<CyberFarmHeader />}
        bottomNavbar={<CyberFarmBottomNavbar />}
        images={cyberfarmImages}
        gameInited={cyberFarmInited}
        offsetSize={265}
      />

      <TutorialPopup />
    </>
  );
};

export default CyberFarmWrapper;
