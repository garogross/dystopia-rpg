import React from "react";

import styles from "./GameChalangesList.module.scss";
import { Link } from "react-router-dom";
import { gameChallengesPagePath } from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import GameChalangesFrame from "../../../layout/icons/game/GameChalangesPage/GameChalangesFrame";

const GameChalangesList: React.FC = () => {
  const chalanges = useAppSelector(state => state.chalanges.chalanges)
  return (
    <section className={styles.gameChalangesList}>
      {
        chalanges.map(chalange => (
      <Link key={chalange.id} to={gameChallengesPagePath} className={styles.gameChalangesList__item}>
        <div className={styles.gameChalangesList__itemImgWrapper}>
          <img src={chalange.image} alt={chalange.name} className={styles.gameChalangesList__itemImg} />
          <div className={styles.gameChalangesList__itemFrame}>
<GameChalangesFrame/>
          </div>
        </div>
        <div className={styles.gameChalangesList__itemTitleWrapper}>
          <h5 className={styles.gameChalangesList__itemTitle}>{chalange.name}</h5>
          <div className={styles.gameChalangesList__itemWings}>

          <HeaderWings reversed/>
          </div>
        </div>
      </Link>

        ))
      }
    </section>
  );
};

export default GameChalangesList;
