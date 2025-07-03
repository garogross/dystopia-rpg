import React, { useEffect, useState } from "react";

import styles from "./HackTerminalWrapper.module.scss";
import { useTelegram } from "../../../hooks/useTelegram";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useImageLoader } from "../../../hooks/useImageLoader";
import * as hackTerminalImages from "../../../assets/imageMaps/hackTerminalImages";
import { setGameInited } from "../../../store/slices/uiSlice";
import { authorizeUser } from "../../../store/slices/profileSlice";
import AppLoader from "../../AppLoader/AppLoader";
import { ESplashTypes } from "../../../constants/ESplashTypes";
import MiniGamesHeader from "../../MiniGames/MiniGamesHeader/MiniGamesHeader";
import { Outlet } from "react-router-dom";
import HackTerminalBottomNavbar from "../HackTerminalBottomNavbar/HackTerminalBottomNavbar";

const HackTerminalWrapper = () => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const cyberFarmInited = useAppSelector(
    (state) => state.cyberfarm.global.dataReceived
  );
  const imagesLoading = useImageLoader(
    Object.values(hackTerminalImages).filter((img) => img.endsWith("webp"))
  );
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
    <div className={`${styles.hackTerminalWrapper}`}>
      <div className={`${styles.hackTerminalWrapper__container} gameContainer`}>
        <AppLoader
          loading={appLoading}
          timerFinished={loaderTimerFinished}
          setTimerFinished={setLoaderTimerFinished}
          type={ESplashTypes.CYBERFARM}
        />
        <MiniGamesHeader />
        <div className={styles.hackTerminalWrapper__main}>
          <Outlet />
        </div>
        <HackTerminalBottomNavbar />
      </div>
    </div>
  );
};

export default HackTerminalWrapper;
