import React from "react";
import styles from "./RPGGameSingleChalangeMain.module.scss";
import {HeaderWings,DotsLine} from "../../../layout/icons/RPGGame/Common";
import RPGGameSingleChalangeLevels from "../RPGGameSingleChalangeLevels/RPGGameSingleChalangeLevels";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import RPGGameSingleChalangeInfo from "../RPGGameSingleChalangeInfo/RPGGameSingleChalangeInfo";
const RPGGameSingleChalangeMain: React.FC = () => {
  const params = useParams<{ id: string }>();
  const chalanges = useAppSelector((state) => state.chalanges.chalanges);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const chalange = chalanges.find(
    (chalange) => chalange.id === Number(params.id)
  );

  return (
    <section className={`${styles.rpgGameSingleChalangeMain} container`}>
      <TransitionProvider
        style={TransitionStyleTypes.zoomOut}
        inProp={gameInited}
        className={styles.rpgGameSingleChalangeMain__headerWings}
      >
        <HeaderWings />
      </TransitionProvider>

      <h3
        className={`${styles.rpgGameSingleChalangeMain__title} titleH1 ${
          gameInited ? "typeAnimation" : ""
        }`}
      >
        {chalange?.name}
      </h3>
      <TransitionProvider
        style={TransitionStyleTypes.zoomOut}
        inProp={gameInited}
        className={styles.rpgGameSingleChalangeMain__headerDotsLines}
      >
        <DotsLine />
        <DotsLine />
      </TransitionProvider>
      <TransitionProvider
        delay={100}
        style={TransitionStyleTypes.zoomIn}
        inProp={gameInited}
        className={styles.rpgGameSingleChalangeMain__imgWrapper}
      >
        <WrapperWithFrame
          innerClassName={styles.rpgGameSingleChalangeMain__imgWrapperInner}
        >
          <img
            src={chalange?.image}
            alt="chalange"
            className={styles.rpgGameSingleChalangeMain__img}
          />
        </WrapperWithFrame>
      </TransitionProvider>
      <TransitionProvider
        delay={200}
        style={TransitionStyleTypes.zoomOut}
        inProp={gameInited}
        className={styles.rpgGameSingleChalangeMain__imgWings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
      <TransitionProvider
        style={TransitionStyleTypes.opacity}
        inProp={gameInited}
        delay={300}
        className={styles.rpgGameSingleChalangeMain__description}
      >
        <p className={styles.rpgGameSingleChalangeMain__description}>
          {chalange?.description}
        </p>
      </TransitionProvider>
      <RPGGameSingleChalangeInfo />
      <RPGGameSingleChalangeLevels />
    </section>
  );
};

export default RPGGameSingleChalangeMain;
