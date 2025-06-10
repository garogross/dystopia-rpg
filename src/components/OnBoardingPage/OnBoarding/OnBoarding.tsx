import React, { useEffect, useState } from "react";

import styles from "./OnBoarding.module.scss";
import OnBoardingHeader from "../OnBoardingHeader/OnBoardingHeader";
import OnBoardingMain from "../OnBoardingMain/OnBoardingMain";
import OnBoardingSaveSelectBlock from "../OnBoardingSaveSelectBlock/OnBoardingSaveSelectBlock";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../../hooks/useTelegram";
import { TaddyWeb } from "taddy-sdk-web";
import eruda from "eruda";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setTadyTasks } from "../../../store/slices/tasksSlice";
import { authorizeUser } from "../../../store/slices/profileSlice";
import { cyberFarmPagePath } from "../../../router/constants";

const OnBoarding = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accountDetailsReceived = useAppSelector(
    (state) => state.profile.accountDetailsReceived
  );
  const [rememberSelect, setRememberSelect] = useState(false);
  const [loading, setLoading] = useState(true);
  const tg = useTelegram();

  useEffect(() => {
    const fetchData = async (initData: string) => {
      try {
        const res = await dispatch(authorizeUser(initData));
        console.log({ res });
        if (res === "ton_cyber_farm") navigate(cyberFarmPagePath);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (!accountDetailsReceived) {
      fetchData(tg.initData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tg) return;
    if (process.env.NODE_ENV === "development" && tg.initData) {
      eruda.init();
    }
    tg.ready();

    // taddy integration    //
    if (!tg.initDataUnsafe?.user?.id) return;

    const taddyPublicId = process.env.REACT_APP_TADDY_PUBLIC_ID;
    if (taddyPublicId) {
      const taddy = new TaddyWeb(taddyPublicId);

      taddy.ready();
      const exchange = taddy.exchange();

      exchange
        .feed({
          limit: 8,
          imageFormat: "png",
          autoImpressions: true,
        })
        .then((items) => {
          console.log("taddy items", items);
          dispatch(setTadyTasks(items));
          // render(items)
        })
        .catch((err) => console.log({ err }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  return (
    <main className={`${styles.onBoarding} gameContainer`}>
      <OnBoardingHeader />
      <OnBoardingMain rememberSelect={rememberSelect} />
      <OnBoardingSaveSelectBlock
        rememberSelect={rememberSelect}
        setRememberSelect={setRememberSelect}
      />

      {/* frames */}
      <div
        className={`${styles.onBoarding__sideFrame} ${styles.onBoarding__sideFrame_left}`}
      ></div>
      <div
        className={`${styles.onBoarding__sideFrame} ${styles.onBoarding__sideFrame_right}`}
      ></div>
    </main>
  );
};

export default OnBoarding;
