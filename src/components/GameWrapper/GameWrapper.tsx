import React, { FC, ReactNode, useEffect, useState } from "react";

import styles from "./GameWrapper.module.scss";
import { useTelegram } from "../../hooks/useTelegram";
import { useAppDispatch } from "../../hooks/redux";
import { useImageLoader } from "../../hooks/useImageLoader";
import { setGameInited } from "../../store/slices/uiSlice";
import { authorizeUser } from "../../store/slices/profileSlice";
import AppLoader from "../AppLoader/AppLoader";
import { Outlet } from "react-router-dom";
import { AppGameMode } from "../../types/AppGameMode";
import { ESplashTypes } from "../../constants/ESplashTypes";

interface Props {
  header: ReactNode;
  bottomNavbar: ReactNode;
  images: Record<string, string>;
  gameInited: boolean;
  offsetSize: number;
  mode?: AppGameMode;
  splashType?: ESplashTypes;
}

const GameWrapper: FC<Props> = ({
  header,
  bottomNavbar,
  images,
  mode,
  splashType,
  offsetSize,
  gameInited,
}) => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();

  const imagesLoading = useImageLoader(
    Object.values(images).filter((img) => img.endsWith("webp"))
  );
  const [loading, setLoading] = useState(true);
  const [loaderTimerFinished, setLoaderTimerFinished] = useState(false);

  const appLoading = imagesLoading || loading;

  useEffect(() => {
    if (loaderTimerFinished && !appLoading) {
      dispatch(setGameInited(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoading, loaderTimerFinished]);

  useEffect(() => {
    const fetchData = async (
      initData: string,
      startParam?: string,
      avatar?: string,
      username?: string
    ) => {
      try {
        await dispatch(
          authorizeUser(initData, startParam, avatar, username, mode)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!gameInited) {
      fetchData(
        tg.initData,
        tg.initDataUnsafe.start_param,
        tg.initDataUnsafe.user?.photo_url,
        tg.initDataUnsafe.user?.username
      );
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.gameWrapper}`}>
      <div className={`${styles.gameWrapper__container} gameContainer`}>
        <AppLoader
          loading={appLoading}
          timerFinished={loaderTimerFinished}
          setTimerFinished={setLoaderTimerFinished}
          type={splashType}
        />
        {header}
        <div
          className={styles.gameWrapper__main}
          style={{
            height: `calc(100dvh - ${offsetSize}px)`,
          }}
        >
          <Outlet />
        </div>
        {bottomNavbar}
      </div>
    </div>
  );
};

export default GameWrapper;
