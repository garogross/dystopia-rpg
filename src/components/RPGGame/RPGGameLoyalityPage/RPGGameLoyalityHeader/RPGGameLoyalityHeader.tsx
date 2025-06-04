import React from "react";
import HeaderWithBackButton from "../../../layout/HeaderWithBackButton/HeaderWithBackButton";
import styles from "./RPGGameLoyalityHeader.module.scss";
import { useNavigate } from "react-router-dom";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";

const RPGameLoyalityHeader = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.rpgGameLoyalityHeader}
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

export default RPGameLoyalityHeader;
