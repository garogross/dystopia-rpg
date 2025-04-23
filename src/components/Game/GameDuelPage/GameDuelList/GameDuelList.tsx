import React, { useState, useEffect } from "react";
import styles from "./GameDuelList.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import GameDueBottomBg from "../../../layout/icons/game/GameDuelPage/GameDueBottomBg";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { Link } from "react-router-dom";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
const GameDuelList = () => {
  const duels = useAppSelector((state) => state.duels.duels);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 50);
  }, []);

  return (
    <section className={`${styles.gameDuelList} container`}>
      <div className={styles.gameDuelList__main}>
        {duels.map((duel, index) => (
          <TransitionProvider
            style={TransitionStyleTypes.bottom}
            inProp={gameInited && inited}
            delay={index * 300}
            className={styles.gameDuelList__item}
            key={duel.id}
          >
            <TitleH3>{duel.title}</TitleH3>
            <div className={styles.gameDuelList__itemImages}>
              <Link
                to={`/game/duel/${duel.id}`}
                className={styles.gameDuelList__link}
              >
                <WrapperWithFrame className={styles.gameDuelList__imgWrapper}>
                  <div
                    style={{ backgroundImage: `url(${duel.image3vs3})` }}
                    className={styles.gameDuelList__img}
                  />
                  <p className={styles.gameDuelList__itemImageText}>3vs3</p>
                </WrapperWithFrame>
              </Link>
              <Link
                to={`/game/duel/${duel.id}`}
                className={styles.gameDuelList__link}
              >
                <WrapperWithFrame className={styles.gameDuelList__imgWrapper}>
                  <div
                    style={{ backgroundImage: `url(${duel.image5vs5})` }}
                    className={styles.gameDuelList__img}
                  />
                  <p className={styles.gameDuelList__itemImageText}>5vs5</p>
                </WrapperWithFrame>
              </Link>
            </div>
            <div className={styles.gameDuelList__itemWings}>
              <HeaderWings reversed />
            </div>
          </TransitionProvider>
        ))}
      </div>
      <TransitionProvider
        style={TransitionStyleTypes.bottom}
        inProp={gameInited}
        delay={duels.length * 100}
        className={styles.gameDuelList__footer}
      >
        <GameDueBottomBg />
      </TransitionProvider>
    </section>
  );
};

export default GameDuelList;
