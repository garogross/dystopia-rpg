import styles from "./HackTerminalWrapper.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import * as hackTerminalImages from "../../../assets/imageMaps/hackTerminalImages";
import MiniGamesHeader from "../../MiniGames/MiniGamesHeader/MiniGamesHeader";
import { useLocation, useNavigate } from "react-router-dom";
import HackTerminalBottomNavbar from "../HackTerminalBottomNavbar/HackTerminalBottomNavbar";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import {
  hackTerminalPagePath,
  onBoardingPagePath,
} from "../../../router/constants";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import GameWrapper from "../../GameWrapper/GameWrapper";

const { title } = TRANSLATIONS.hackTerminal;

const HackTerminalWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = useAppSelector((state) => state.ui.language);

  return (
    <GameWrapper
      gameInited={false}
      header={
        <>
          <MiniGamesHeader />

          <HeaderWithBackButton
            className={`container ${styles.hackTerminalWrapper__title}`}
            onClose={() => {
              navigate(
                location.pathname === hackTerminalPagePath
                  ? onBoardingPagePath
                  : hackTerminalPagePath
              );
            }}
            title={title[language]}
          />
        </>
      }
      bottomNavbar={<HackTerminalBottomNavbar />}
      images={hackTerminalImages}
      offsetSize={180}
    />
  );
};

export default HackTerminalWrapper;
