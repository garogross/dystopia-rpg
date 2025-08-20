import { useEffect, useRef } from "react";
import { EAdActionTypes } from "../constants/EadActionTypes";
import { EadProviders } from "../constants/EadProviders";
import { useGlobalAdController } from "./useGlobalAdController";
import { useLocation } from "react-router-dom";
import { onBoardingPagePath } from "../router/constants";
import { useAppSelector } from "./redux";

const INTERVAL_TIMESTAMP = 2 * 60 * 1000;
const TIMEOUT_TIMESTAMP = 30 * 1000;

export const useNotificationAd = () => {
  const location = useLocation();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const onShowAd = useGlobalAdController(
    EAdActionTypes.Video,
    EadProviders.AdsController,
    ""
  );
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInGamePage = location.pathname.includes(onBoardingPagePath);

  useEffect(() => {
    if (isInGamePage && gameInited) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onShowAd();
        intervalRef.current = setInterval(() => {
          onShowAd();
        }, INTERVAL_TIMESTAMP);
      }, TIMEOUT_TIMESTAMP);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInGamePage, gameInited]);
};
