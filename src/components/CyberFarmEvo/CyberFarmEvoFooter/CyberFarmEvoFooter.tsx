import React from "react";
import { cyberFarmEvoPagePath } from "../../../router/constants";
import styles from "./CyberFarmEvoFooter.module.scss";
import { useNavigate } from "react-router-dom";
import MainBtn from "../../layout/MainBtn/MainBtn";
import { MapIcon } from "../../layout/icons/CyberFarmEvo/Footer";

interface Props {
  className?: string;
}

const CyberFarmEvoFooter: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`container ${styles.cyberFarmEvoFooter} ${className || ""}`}
    >
      <MainBtn
        onClick={() => navigate(cyberFarmEvoPagePath)}
        className={styles.cyberFarmEvoFooter__goBackBtn}
      >
        <MapIcon />
        <span>ВЕРНУТСЯ НА КАРТУ</span>
      </MainBtn>
    </div>
  );
};

export default CyberFarmEvoFooter;
