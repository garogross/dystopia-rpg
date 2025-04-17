import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useTelegram } from "../../hooks/useTelegram";
import { useImageLoader } from "../../hooks/useImageLoader";
import { authUser } from "../../store/slices/profileSlice";

import AppRouter from "../../router/AppRouter";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import AppLoader from "../AppLoader/AppLoader";

import styles from "./App.module.scss";

export const App = () => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const imagesLoading = useImageLoader();
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div className={`${styles.app}`}>
        <div className={styles.app__container}>
          <AppLoader loading={appLoading} />
          <div className={styles.app__main}>
            <AppRouter />
          </div>
          <BottomNavbar />
        </div>
      </div>
    </>
  );
};
