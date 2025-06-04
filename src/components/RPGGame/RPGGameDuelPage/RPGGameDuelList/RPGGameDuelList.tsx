import React, { useState, useEffect } from "react";
import styles from "./RPGGameDuelList.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common";
import RPGGameDueBottomBg from "../../../layout/icons/RPGGame/RPGGameDuelPage/RPGGameDueBottomBg";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { Link } from "react-router-dom";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
const RPGGameDuelList = () => {
  const duels = useAppSelector((state) => state.duels.duels);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 50);
  }, []);

  return (
    <section className={`${styles.rpgGameDuelList} container`}>
      <div className={styles.rpgGameDuelList__main}>
        {duels.map((duel, index) => (
          <TransitionProvider
            style={TransitionStyleTypes.bottom}
            inProp={gameInited && inited}
            delay={index * 300}
            className={styles.rpgGameDuelList__item}
            key={duel.id}
          >
            <TitleH3>{duel.title}</TitleH3>
            <div className={styles.rpgGameDuelList__itemImages}>
              <Link
                to={`/game/duel/${duel.id}`}
                className={styles.rpgGameDuelList__link}
              >
                <WrapperWithFrame className={styles.rpgGameDuelList__imgWrapper}>
                  <div
                    style={{ backgroundImage: `url(${duel.image3vs3})` }}
                    className={styles.rpgGameDuelList__img}
                  />
                  <p className={styles.rpgGameDuelList__itemImageText}>3vs3</p>
                </WrapperWithFrame>
              </Link>
              <Link
                to={`/game/duel/${duel.id}`}
                className={styles.rpgGameDuelList__link}
              >
                <WrapperWithFrame className={styles.rpgGameDuelList__imgWrapper}>
                  <div
                    style={{ backgroundImage: `url(${duel.image5vs5})` }}
                    className={styles.rpgGameDuelList__img}
                  />
                  <p className={styles.rpgGameDuelList__itemImageText}>5vs5</p>
                </WrapperWithFrame>
              </Link>
            </div>
            <div className={styles.rpgGameDuelList__itemWings}>
              <HeaderWings reversed />
            </div>
          </TransitionProvider>
        ))}
      </div>
      <TransitionProvider
        style={TransitionStyleTypes.bottom}
        inProp={gameInited}
        delay={duels.length * 100}
        className={styles.rpgGameDuelList__footer}
      >
        <RPGGameDueBottomBg />
      </TransitionProvider>
    </section>
  );
};

export default RPGGameDuelList;
