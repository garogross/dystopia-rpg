import React from "react";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import styles from "./LoyalityHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const { titleText } = TRANSLATIONS.loyality.header;

const LoyalityHeader = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  return (
    <TransitionProvider
      className={styles.loyalityHeader}
      style={TransitionStyleTypes.zoomOut}
      inProp={gameInited}
    >
      <HeaderWithBackButton
        onClose={() => navigate(-1)}
        title={titleText[language]}
      />
    </TransitionProvider>
  );
};

export default LoyalityHeader;
