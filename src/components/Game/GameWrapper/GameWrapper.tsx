import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./GameWrapper.module.scss";
import GameHeader from "../GameHeader/GameHeader";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import { authUser } from "../../../store/slices/profileSlice";
import { useTelegram } from "../../../hooks/useTelegram";
import { useAppDispatch } from "../../../hooks/redux";
import { useImageLoader } from "../../../hooks/useImageLoader";
import AppLoader from "../../AppLoader/AppLoader";
import { setGameInited } from "../../../store/slices/uiSlice";

interface Props {}

const GameWrapper: React.FC<Props> = (props) => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const imagesLoading = useImageLoader();
  const [loading, setLoading] = useState(true);
  const [loaderTimerFinished, setLoaderTimerFinished] = useState(false);

  const isMobile =
    tg?.platform &&
    !["macos", "tdesktop", "weba", "web", "webk"].includes(tg?.platform);

  useEffect(() => {
    if (!tg) return;
    // open fullscreen
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

    const fetchData = async (id: number) => {
      try {
        await Promise.all([
          dispatch(authUser(id)), //1624247936
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (process.env.NODE_ENV === "development") {
      fetchData(1624247931);
    }
    if (!tg.initDataUnsafe?.user) return;
    const { id } = tg.initDataUnsafe?.user;
    fetchData(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appLoading = imagesLoading || loading;

  useEffect(() => {

    if (loaderTimerFinished && !appLoading) {
      dispatch(setGameInited(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoading, loaderTimerFinished]);
console.log({appLoading});

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
