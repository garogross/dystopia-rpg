import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./RPGGameWrapper.module.scss";
import RPGGameHeader from "../RPGGameHeader/RPGGameHeader";
import BottomNavbar from "../RPGBottomNavbar/RPGBottomNavbar";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import AppLoader from "../../AppLoader/AppLoader";
import { setGameInited } from "../../../store/slices/uiSlice";

interface Props {}

const RPGGameWrapper: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.profile.token);
  const imagesLoading = false; // useImageLoader();
  const [loading, setLoading] = useState(true);
  const [loaderTimerFinished, setLoaderTimerFinished] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // if (token) {
    //   const wsUrl = `${process.env.REACT_APP_SOCKET_URL}?token=${token}`;
    //   const socket = new WebSocket(wsUrl);
    //   socket.onopen = function () {
    //     console.dir("WebSocket соединение установлено");
    //   };
    //   socket.onmessage = function (event) {
    //     const data = JSON.parse(event.data);
    //     if (data.timer !== undefined) {
    //       console.dir(`Таймер: ${data.timer}, пауза: ${data.pause} сек.`);
    //     } else if (data.message) {
    //       console.dir(data.message);
    //     } else if (data.error) {
    //       console.error("Ошибка:", data.error);
    //     }
    //   };
    //   socket.onerror = function (error) {
    //     console.error("WebSocket ошибка:", error);
    //   };
    //   socket.onclose = function (event) {
    //     console.dir("Соединение прервано");
    //   };
    // }
  }, [token]);

  const appLoading = imagesLoading || loading;

  useEffect(() => {
    console.log({ loaderTimerFinished, appLoading });

    if (loaderTimerFinished && !appLoading) {
      dispatch(setGameInited(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoading, loaderTimerFinished]);
  console.log({ appLoading });

  return (
    <div className={`${styles.rpgGameWrapper}`}>
      <div className={`${styles.rpgGameWrapper__container} gameContainer`}>
        <AppLoader
          loading={appLoading}
          timerFinished={loaderTimerFinished}
          setTimerFinished={setLoaderTimerFinished}
        />
        <RPGGameHeader />
        <div className={styles.rpgGameWrapper__main}>
          <Outlet />
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default RPGGameWrapper;
