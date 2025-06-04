import React, { useEffect, useState } from "react";

import styles from "./OnBoarding.module.scss";
import OnBoardingHeader from "../OnBoardingHeader/OnBoardingHeader";
import OnBoardingMain from "../OnBoardingMain/OnBoardingMain";
import OnBoardingSaveSelectBlock from "../OnBoardingSaveSelectBlock/OnBoardingSaveSelectBlock";
import { useNavigate } from "react-router-dom";
import { getLSItem } from "../../../helpers/localStorage";
import { lsProps } from "../../../utils/lsProps";

const OnBoarding = () => {
  const navigate = useNavigate();
  const [rememberSelect, setRememberSelect] = useState(false);
  const [selectedGameLinkChecked, setSelectedGameLinkChecked] = useState(false);

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
