import React from "react";
import HeaderWithBackButton from "../../../layout/HeaderWithBackButton/HeaderWithBackButton";
import styles from "./GameLoyalityHeader.module.scss";
import { useNavigate } from "react-router-dom";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";

const GameLoyalityHeader = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.gameLoyalityHeader}
      style={TransitionStyleTypes.zoomOut}
      inProp={gameInited}
    >
      <HeaderWithBackButton
        onClose={() => navigate(-1)}
      />
      <TitleH3>Лояльность проекту</TitleH3>
    </TransitionProvider>
  );
};

export default GameLoyalityHeader;
