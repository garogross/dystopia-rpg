import React, { useState } from "react";

import styles from "./OnBoardingMain.module.scss";
import {
  CyberFarmIcon,
  RPGIcon,
  MiniGamesIcon,
} from "../../layout/icons/OnBoarding";
import { cyberFarmPagePath, rpgGamePagePath } from "../../../router/constants";
import { Link } from "react-router-dom";
import { onBoardingGirl2Video } from "../../../assets/videos";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  onBoardingGirlTumbNail2Image,
  onBoardingGirlTumbNail2WebpImage,
} from "../../../assets/imageMaps";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { AppGameMode } from "../../../types/AppGameMode";
import { setStartChoice } from "../../../api/onBoarding/startChioce";

interface Props {
  rememberSelect: boolean;
}

const onBoardingVideos = [
  {
    video: onBoardingGirl2Video,
    thumbnail: {
      webp: onBoardingGirlTumbNail2WebpImage,
      jpg: onBoardingGirlTumbNail2Image,
    },
  },
];

const randomOnBoardingVideo = onBoardingVideos[0];
// Math.floor(Math.random() * onBoardingVideos.length)
type Option = {
  icon: JSX.Element;
  titleKey: string;
  link: string;
  smallText?: string;
  gameModeKey?: AppGameMode;
};

const options: Option[] = [
  {
    icon: <CyberFarmIcon />,
    titleKey: "titleTonCyberFarm",
    link: cyberFarmPagePath,
    smallText: "(Pay2Earn)",
    gameModeKey: "ton_cyber_farm",
  },
  {
    icon: <MiniGamesIcon />,
    titleKey: "titleMiniGames",
    link: "",
  },
  {
    icon: <RPGIcon />,
    titleKey: "titleRPG",
    link: process.env.NODE_ENV === "development" ? rpgGamePagePath : "",
  },
  // {
  //   icon: <StrategyIcon />,
  //   titleKey: "titleStrategy",
  //   link: "",
  // },
];

const { talkText, titleTonCyberFarm, titleMiniGames, titleRPG, titleStrategy } =
  TRANSLATIONS.onBoarding.main;

const titleKeysMap: Record<string, { [key: string]: string }> = {
  titleTonCyberFarm,
  titleMiniGames,
  titleRPG,
  titleStrategy,
};

const OnBoardingMain: React.FC<Props> = ({ rememberSelect }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const language = useAppSelector((state) => state.ui.language);

  const onClickLink = (mode?: AppGameMode) => {
    if (!mode) return;
    if (rememberSelect) {
      setStartChoice(mode);
      // setLSItem(lsProps.selectedGameLink, link);
    } else {
      // removeLSItem(lsProps.selectedGameLink);
    }
  };
  return (
    <section className={styles.onBoardingMain}>
      <div className={styles.onBoardingMain__talkTextWrapper}>
        <div className={styles.onBoardingMain__talkTextInner}>
          <p
            className={styles.onBoardingMain__talkText}
            dangerouslySetInnerHTML={{
              __html: talkText[language],
            }}
          />
          <div className={styles.onBoardingMain__tail}></div>
        </div>
      </div>
      <div className={styles.onBoardingMain__videoWrapper}>
        <video
          muted
          autoPlay
          src={randomOnBoardingVideo.video}
          onCanPlay={() => setVideoLoaded(true)}
          className={styles.onBoardingMain__video}
        ></video>
        <ImageWebp
          srcSet={randomOnBoardingVideo.thumbnail.webp}
          src={randomOnBoardingVideo.thumbnail.jpg}
          alt={"on boarding"}
          className={`${styles.onBoardingMain__tumbnailImage} ${
            !videoLoaded ? styles.onBoardingMain__tumbnailImage_active : ""
          } `}
        />
        <div className={styles.onBoardingMain__optionLinks}>
          {options.map((option, index) => (
            <Link
              onClick={() => onClickLink(option.gameModeKey)}
              to={option.link}
              key={index}
              className={styles.onBoardingMain__optionLink}
            >
              <div className={styles.onBoardingMain__optionLinkInner}>
                {option.icon}
                <span>
                  {titleKeysMap[option.titleKey][language]}
                  {option.smallText && (
                    <span
                      className={styles.onBoardingMain__optionLinkSmallText}
                    >
                      {option.smallText}
                    </span>
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnBoardingMain;
