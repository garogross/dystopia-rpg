import React from "react";
import GameWrapper from "../../GameWrapper/GameWrapper";
import MiniGamesHeader from "../../MiniGames/MiniGamesHeader/MiniGamesHeader";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import styles from "./GridlineWrapper.module.scss";
import * as gridlineImages from "../../../assets/imageMaps/gridlineImages";

import {
  gridlineAchievmentsPagePath,
  gridlineLevelSelectPagePath,
  gridlinePagePath,
  gridlineRatingsPagePath,
} from "../../../router/constants";
import GameBottomNavbar from "../../GameBottomNavbar/GameBottomNavbar";
import { useMatch, useNavigate } from "react-router-dom";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

const { name } = TRANSLATIONS.miniGames.gridline;

const GridlineWrapper = () => {
  const navigate = useNavigate();
  const match = useMatch(gridlinePagePath);
  const language = useAppSelector((state) => state.ui.language);
  return (
    <GameWrapper
      gameInited={false}
      header={
        <>
          <MiniGamesHeader />
          {!match && (
            <HeaderWithBackButton
              className={`container ${styles.gridlineWrapper__title}`}
              onClose={() => {
                navigate(gridlinePagePath);
              }}
              title={name[language]}
            />
          )}
        </>
      }
      bottomNavbar={
        <GameBottomNavbar
          ratingsPagePath={gridlineRatingsPagePath}
          levelSelectPagePath={gridlineLevelSelectPagePath}
          achievmentsPagePath={gridlineAchievmentsPagePath}
        />
      }
      images={gridlineImages}
      offsetSize={171}
    />
  );
};

export default GridlineWrapper;
