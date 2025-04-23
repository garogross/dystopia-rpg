import React, { useEffect, useState } from "react";

import styles from "./GameChalangesList.module.scss";
import { Link } from "react-router-dom";
import {
  gamePagePath,
  gameSingleChallengePagePath,
} from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import ImageFrame from "../../../layout/icons/game/Common/ImageFrame";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";

const GameChalangesList: React.FC = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const chalanges = useAppSelector((state) => state.chalanges.chalanges);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 50);
  }, []);

  return (
    <section className={styles.gameChalangesList}>
      {chalanges.map((chalange, index) => (
        <TransitionProvider
          key={index}
          delay={(index + 1) * 300}
          style={TransitionStyleTypes.bottom}
          inProp={gameInited && inited}
        >
          <Link
            to={`${gamePagePath}/${gameSingleChallengePagePath}/${chalange.id}`}
            className={styles.gameChalangesList__item}
          >
            <div className={styles.gameChalangesList__itemImgWrapper}>
              <img
                src={chalange.image}
                alt={chalange.name}
                className={styles.gameChalangesList__itemImg}
              />
              <div className={styles.gameChalangesList__itemFrame}>
                <ImageFrame />
              </div>
            </div>
            <div className={styles.gameChalangesList__itemTitleWrapper}>
              <h5
                className={`${styles.gameChalangesList__itemTitle} typeAnimation`}
              >
                {chalange.name}
              </h5>
              <div className={styles.gameChalangesList__itemWings}>
                <HeaderWings reversed />
              </div>
            </div>
          </Link>
        </TransitionProvider>
      ))}
    </section>
  );
};

export default GameChalangesList;
