import React, { useEffect, useState } from "react";

import styles from "./OnBoarding.module.scss";
import OnBoardingHeader from "../OnBoardingHeader/OnBoardingHeader";
import OnBoardingMain from "../OnBoardingMain/OnBoardingMain";
import OnBoardingSaveSelectBlock from "../OnBoardingSaveSelectBlock/OnBoardingSaveSelectBlock";
import { useNavigate } from "react-router-dom";
import { getLSItem } from "../../../helpers/localStorage";
import { lsProps } from "../../../utils/lsProps";
import { useTelegram } from "../../../hooks/useTelegram";
import { TaddyWeb } from "taddy-sdk-web";
import eruda from "eruda";

const OnBoarding = () => {
  const navigate = useNavigate();
  const [rememberSelect, setRememberSelect] = useState(false);
  const [selectedGameLinkChecked, setSelectedGameLinkChecked] = useState(false);
  const tg = useTelegram();

  useEffect(() => {
    getLSItem(lsProps.selectedGameLink)
      .then((selectedGameLink) => {
        if (selectedGameLink) {
          navigate(selectedGameLink);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setSelectedGameLinkChecked(true));
  }, [navigate]);

  useEffect(() => {
    if (!tg) return;
    if (process.env.NODE_ENV === "development") {
    }
    eruda.init();
    tg.ready();

    // taddy integration test    //
    const taddyPublicId = process.env.REACT_APP_TADDY_PUBLIC_ID;
    console.log({ taddyPublicId });
    if (taddyPublicId) {
      const taddy = new TaddyWeb(taddyPublicId);

      console.log({ taddy });
      taddy.ready();
      const exchange = taddy.exchange();
      console.log({ exchange });

      exchange
        .feed({
          limit: 8, // default: 4
          imageFormat: "png", // default: webp
          autoImpressions: true, // impressions event will be called
        })
        .then((items) => {
          console.log(items[0]);

          // render(items)
        })
        .catch((err) => console.log({ err }));
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedGameLinkChecked) return null;

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
