import React, { useEffect, useState } from "react";

import styles from "./MiniGamesWrapper.module.scss";
import AppLoader from "../../AppLoader/AppLoader";
import { useTelegram } from "../../../hooks/useTelegram";
import { setGameInited } from "../../../store/slices/uiSlice";
import { authorizeUser } from "../../../store/slices/profileSlice";
import MiniGamesHeader from "../MiniGamesHeader/MiniGamesHeader";
import { Outlet } from "react-router-dom";
import MiniGamesBottomNavbar from "../MiniGamesBottomNavbar/MiniGamesBottomNavbar";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useImageLoader } from "../../../hooks/useImageLoader";

import * as miniGamesImages from "../../../assets/imageMaps/miniGamesImages";

const MiniGamesWrapper = () => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const cyberFarmInited = useAppSelector(
    (state) => state.cyberfarm.global.dataReceived
  );
  const imagesLoading = useImageLoader(
    Object.values(miniGamesImages).filter((img) => img.endsWith("webp"))
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
    <div className={`${styles.miniGamesWrapper}`}>
      <div className={`${styles.miniGamesWrapper__container} gameContainer`}>
        <AppLoader
          loading={appLoading}
          timerFinished={loaderTimerFinished}
          setTimerFinished={setLoaderTimerFinished}
        />
        <MiniGamesHeader />
        <div className={styles.miniGamesWrapper__main}>
          <Outlet />
        </div>
        <MiniGamesBottomNavbar />
      </div>
    </div>
  );
};

export default MiniGamesWrapper;
