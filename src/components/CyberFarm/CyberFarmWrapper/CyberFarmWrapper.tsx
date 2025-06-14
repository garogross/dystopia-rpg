import React, { useEffect, useState } from "react";
import styles from "./CyberFarmWrapper.module.scss";
import AppLoader from "../../AppLoader/AppLoader";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGameInited } from "../../../store/slices/uiSlice";
import CyberFarmHeader from "../CyberFarmHeader/CyberFarmHeader";
import CyberFarmBottomNavbar from "../CyberFarmBottomNavbar/CyberFarmBottomNavbar";
import { authorizeUser } from "../../../store/slices/profileSlice";
import { useTelegram } from "../../../hooks/useTelegram";

const CyberFarmWrapper = () => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const cyberFarmInited = useAppSelector(
    (state) => state.cyberfarm.global.dataReceived
  );
  const imagesLoading = false; // useImageLoader();
  const [loading, setLoading] = useState(false); //true
  const [loaderTimerFinished, setLoaderTimerFinished] = useState(false);

  const appLoading = imagesLoading || loading;

  useEffect(() => {
    if (loaderTimerFinished && !appLoading) {
      dispatch(setGameInited(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoading, loaderTimerFinished]);

  useEffect(() => {
    const fetchData = async (initData: string) => {
      try {
        await dispatch(authorizeUser(initData, "ton_cyber_farm"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (!cyberFarmInited) {
      fetchData(tg.initData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.cyberFarmWrapper}`}>
      <div className={`${styles.cyberFarmWrapper__container} gameContainer`}>
        <AppLoader
          loading={appLoading}
          timerFinished={loaderTimerFinished}
          setTimerFinished={setLoaderTimerFinished}
        />
        <CyberFarmHeader />
        <div className={styles.cyberFarmWrapper__main}>
          <Outlet />
        </div>
        <CyberFarmBottomNavbar />
      </div>
    </div>
  );
};

export default CyberFarmWrapper;
