import React, { useEffect, useState } from "react";

import styles from "./RPGGameChalangesList.module.scss";
import { Link } from "react-router-dom";
import {
  rpgGamePagePath,
  rpgGameSingleChallengePagePath,
} from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import {HeaderWings} from "../../../layout/icons/RPGGame/Common";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";

const RPGGameChalangesList: React.FC = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const chalanges = useAppSelector((state) => state.chalanges.chalanges);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 50);
  }, []);

  return (
    <section className={styles.rpgGameChalangesList}>
      {chalanges.map((chalange, index) => (
        <TransitionProvider
          key={index}
          delay={(index + 1) * 300}
          style={TransitionStyleTypes.bottom}
          inProp={gameInited && inited}
        >
          <Link
            to={`${rpgGamePagePath}/${rpgGameSingleChallengePagePath}/${chalange.id}`}
            className={styles.rpgGameChalangesList__item}
          >
            <WrapperWithFrame
              innerClassName={styles.rpgGameChalangesList__itemImgWrapperInner}
            >
              <img
                src={chalange.image}
                alt={chalange.name}
                className={styles.rpgGameChalangesList__itemImg}
              />
            </WrapperWithFrame>

            <div className={styles.rpgGameChalangesList__itemTitleWrapper}>
              <h5
                className={`${styles.rpgGameChalangesList__itemTitle} typeAnimation`}
              >
                {chalange.name}
              </h5>
              <div className={styles.rpgGameChalangesList__itemWings}>
                <HeaderWings reversed />
              </div>
            </div>
          </Link>
        </TransitionProvider>
      ))}
    </section>
  );
};

export default RPGGameChalangesList;
