import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import * as cyberfarmImages from "../../../assets/imageMaps/cyberfarmEvoImages";
import GameWrapper from "../../GameWrapper/GameWrapper";
import { useEffect } from "react";
import { closeCyberFarm } from "../../../store/slices/cyberFarm/cyberfarmSlice";
import CyberFarmEvoHeader from "../CyberFarmEvoHeader/CyberFarmEvoHeader";

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
        header={<CyberFarmEvoHeader />}
        bottomNavbar={<></>}
        images={cyberfarmImages}
        gameInited={cyberFarmInited}
        offsetSize={48}
        mode={"ton_cyber_farm"}
      />
    </>
  );
};

export default CyberFarmWrapper;
