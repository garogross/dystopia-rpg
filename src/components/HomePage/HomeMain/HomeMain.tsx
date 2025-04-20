import React from "react";
import { useNavigate } from "react-router-dom";
import { gamePagePath } from "../../../router/constants";
import styles from "./HomeMain.module.scss";

const HomeMain = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeMain}>
      <h1 className={styles.homeMain__title}>Dystopia RPG</h1>
      <button className={styles.homeMain__button} onClick={() => navigate(gamePagePath)}>
        Start Game
      </button>
    </div>
  );
};

export default HomeMain;
