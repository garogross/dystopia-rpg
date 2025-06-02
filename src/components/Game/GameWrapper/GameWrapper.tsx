import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./GameWrapper.module.scss";
import GameHeader from "../GameHeader/GameHeader";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import { authUser } from "../../../store/slices/profileSlice";
import { useTelegram } from "../../../hooks/useTelegram";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import AppLoader from "../../AppLoader/AppLoader";
import { setGameInited } from "../../../store/slices/uiSlice";
import eruda from "eruda";
import { setLSItem } from "../../../helpers/localStorage";
import { lsProps } from "../../../utils/lsProps";

interface Props {}

const GameWrapper: React.FC<Props> = (props) => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.profile.token);
  const imagesLoading = false; // useImageLoader();
  const [loading, setLoading] = useState(true);
  const [loaderTimerFinished, setLoaderTimerFinished] = useState(false);

  const isMobile =
    tg?.platform &&
    !["macos", "tdesktop", "weba", "web", "webk"].includes(tg?.platform);

  useEffect(() => {
    // if (!tg) return;
    // open fullscreen

    if (process.env.NODE_ENV === "development") {
      eruda.init();
    }

    tg.expand();
    if (tg.isVersionAtLeast("8.0")) {
      // tg.requestFullscreen()
      // tg.lockOrientation()
    }
    tg.disableVerticalSwipes();
    tg.setHeaderColor("#000000");

    if (isMobile) {
      // disable scroll on mobile
      const overflow = 100;
      document.body.style.overflowY = "hidden";
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      window.scrollTo(0, overflow);
    }
    tg.ready();

    const fetchData = async (initData: string) => {
      try {
        await dispatch(authUser(initData)); //1624247936
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(tg.initData);
    if (tg.initData) {
    } else if (process.env.NODE_ENV === "development") {
      const testToken = process.env.REACT_APP_TEST_TOKEN;
      if (!testToken) return;
      setLSItem(lsProps.token, process.env.REACT_APP_TEST_TOKEN);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      const wsUrl = `${process.env.REACT_APP_SOCKET_URL}?token=${token}`;

      const socket = new WebSocket(wsUrl);

      socket.onopen = function () {
        console.log("WebSocket соединение установлено");
      };

      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.timer !== undefined) {
          console.log(`Таймер: ${data.timer}, пауза: ${data.pause} сек.`);
        } else if (data.message) {
          console.log(data.message);
        } else if (data.error) {
          console.error("Ошибка:", data.error);
        }
      };

      socket.onerror = function (error) {
        console.error("WebSocket ошибка:", error);
      };

      socket.onclose = function (event) {
        console.log("Соединение прервано");
      };
    }
  }, [token]);

  const appLoading = imagesLoading || loading;

  useEffect(() => {
    if (loaderTimerFinished && !appLoading) {
      dispatch(setGameInited(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoading, loaderTimerFinished]);

  return (
    <div className={`${styles.gameWrapper}`}>
      <div className={`${styles.gameWrapper__container} gameContainer`}>
        <AppLoader
          loading={appLoading}
          timerFinished={loaderTimerFinished}
          setTimerFinished={setLoaderTimerFinished}
        />
        <GameHeader />
        <div className={styles.gameWrapper__main}>
          <Outlet />
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default GameWrapper;
