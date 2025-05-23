import React from "react";
import styles from "./GameSingleChalangeMain.module.scss";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import GameSingleChalangeLevels from "../GameSingleChalangeLevels/GameSingleChalangeLevels";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameSingleChalangeInfo from "../GameSingleChalangeInfo/GameSingleChalangeInfo";
const GameSingleChalangeMain: React.FC = () => {
  const params = useParams<{ id: string }>();
  const chalanges = useAppSelector((state) => state.chalanges.chalanges);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const chalange = chalanges.find(
    (chalange) => chalange.id === Number(params.id)
  );

  return (
    <section className={`${styles.gameSingleChalangeMain} container`}>
      <TransitionProvider
        style={TransitionStyleTypes.zoomOut}
        inProp={gameInited}
        className={styles.gameSingleChalangeMain__headerWings}
      >
        <HeaderWings />
      </TransitionProvider>

      <h3
        className={`${styles.gameSingleChalangeMain__title} titleH1 ${
          gameInited ? "typeAnimation" : ""
        }`}
      >
        {chalange?.name}
      </h3>
      <TransitionProvider
        style={TransitionStyleTypes.zoomOut}
        inProp={gameInited}
        className={styles.gameSingleChalangeMain__headerDotsLines}
      >
        <DotsLine />
        <DotsLine />
      </TransitionProvider>
      <TransitionProvider
        delay={100}
        style={TransitionStyleTypes.zoomIn}
        inProp={gameInited}
        className={styles.gameSingleChalangeMain__imgWrapper}
      >
        <WrapperWithFrame
          innerClassName={styles.gameSingleChalangeMain__imgWrapperInner}
        >
          <img
            src={chalange?.image}
            alt="chalange"
            className={styles.gameSingleChalangeMain__img}
          />
        </WrapperWithFrame>
      </TransitionProvider>
      <TransitionProvider
        delay={200}
        style={TransitionStyleTypes.zoomOut}
        inProp={gameInited}
        className={styles.gameSingleChalangeMain__imgWings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
      <TransitionProvider
        style={TransitionStyleTypes.opacity}
        inProp={gameInited}
        delay={300}
        className={styles.gameSingleChalangeMain__description}
      >
        <p className={styles.gameSingleChalangeMain__description}>
          {chalange?.description}
        </p>
      </TransitionProvider>
      <GameSingleChalangeInfo />
      <GameSingleChalangeLevels />
    </section>
  );
};

export default GameSingleChalangeMain;
