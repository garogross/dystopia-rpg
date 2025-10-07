import React from "react";
import { cyberFarmEvoPagePath } from "../../../router/constants";
import styles from "./CyberFarmEvoFooter.module.scss";
import { useNavigate } from "react-router-dom";
import MainBtn from "../../layout/MainBtn/MainBtn";
import { MapIcon } from "../../layout/icons/CyberFarmEvo/Footer";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  className?: string;
}

const { goBackToMapText } = TRANSLATIONS.cyberfarmEvo.footer;

const CyberFarmEvoFooter: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.ui.language);

  return (
    <div
      className={`container ${styles.cyberFarmEvoFooter} ${className || ""}`}
    >
      <MainBtn
        onClick={() => navigate(cyberFarmEvoPagePath)}
        className={styles.cyberFarmEvoFooter__goBackBtn}
      >
        <MapIcon />
        <span>{goBackToMapText[language]}</span>
      </MainBtn>
    </div>
  );
};

export default CyberFarmEvoFooter;
