import React, { useState } from "react";

import styles from "./OnBoardingMain.module.scss";
import {
  CyberFarmIcon,
  RPGIcon,
  MiniGamesIcon,
  StrategyIcon,
} from "../../layout/icons/OnBoarding";
import { rpgGamePagePath } from "../../../router/constants";
import { Link } from "react-router-dom";
import { onBoardingGirlVideo } from "../../../assets/videos";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  onBoardingGirlTumbNailImage,
  onBoardingGirlTumbNailWebpImage,
} from "../../../assets/imageMaps";
import { removeLSItem, setLSItem } from "../../../helpers/localStorage";
import { lsProps } from "../../../utils/lsProps";

interface Props {
  rememberSelect: boolean;
}

const options = [
  {
    icon: <CyberFarmIcon />,
    title: "Cyber Farm",
    link: "",
  },
  {
    icon: <RPGIcon />,
    title: "RPG",
    link: rpgGamePagePath,
  },
  {
    icon: <MiniGamesIcon />,
    title: "Mini Games",
    link: "",
  },
  {
    icon: <StrategyIcon />,
    title: "Strategy",
    link: "",
  },
];

const OnBoardingMain: React.FC<Props> = ({ rememberSelect }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);


  const onClickLink = (link: string) => {
    if (rememberSelect) {
      setLSItem(lsProps.selectedGameLink, link);
    } else {
      removeLSItem(lsProps.selectedGameLink);
    }
  };
  return (
    <section className={styles.onBoardingMain}>
      <div className={styles.onBoardingMain__talkTextWrapper}>
        <div className={styles.onBoardingMain__talkTextInner}>
          <p className={styles.onBoardingMain__talkText}>
            Ну что, красавчик, ты в игре. Тут каждый выживает по-своему… <br />
            Одни строят империю. Другие воруют у корпораций. А кое-кто просто
            гоняет ночью по улицам в хроме.Выбирай, как хочешь начать — а я
            прослежу, чтобы всё пошло гладко 💋
          </p>
          <div className={styles.onBoardingMain__tail}></div>
        </div>
      </div>
      <div className={styles.onBoardingMain__videoWrapper}>
        <video
          muted
          autoPlay
          loop
          src={onBoardingGirlVideo}
          onCanPlay={() => setVideoLoaded(true)}
          className={styles.onBoardingMain__video}
        ></video>
        <ImageWebp
          srcSet={onBoardingGirlTumbNailWebpImage}
          src={onBoardingGirlTumbNailImage}
          alt={"on boarding"}
          className={`${styles.onBoardingMain__tumbnailImage} ${
            !videoLoaded ? styles.onBoardingMain__tumbnailImage_active : ""
          } `}
        />
      </div>
      <div className={styles.onBoardingMain__optionLinks}>
        {options.map((option, index) => (
          <Link
            onClick={() => onClickLink(option.link)}
            to={option.link}
            key={index}
            className={styles.onBoardingMain__optionLink}
          >
            <div className={styles.onBoardingMain__optionLinkInner}>
              {option.icon}
              <span>{option.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OnBoardingMain;
