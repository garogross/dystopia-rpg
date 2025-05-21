import React from "react";
import styles from "./HomeMain.module.scss";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeMainSlider from "../HomeMainSlider/HomeMainSlider";
import HomeBottomSlider from "../HomeBottomSlider/HomeBottomSlider";
import HomeFooter from "../HomeFooter/HomeFooter";
import { useImageLoader } from "../../../hooks/useImageLoader";
import { homebgImageWebp } from "../../../assets/images";

const HomeMain = () => {
  const bgLoading = useImageLoader([homebgImageWebp]);

  return (
    <div
      className={`${styles.homeMain} ${
        !bgLoading ? styles.homeMain_loaded : ""
      }`}
    >
      <HomeHeader />
      <HomeAbout />
      <HomeMainSlider />
      <HomeBottomSlider />
      <HomeFooter />
    </div>
  );
};

export default HomeMain;
