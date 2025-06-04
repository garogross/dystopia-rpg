import React, { useState } from "react";
import styles from "./RPGGamePlayArea.module.scss";
import {
  rpgGamePlayAreaBgImage,
  positionPlaceImage,
} from "../../../../assets/imageMaps";

import RPGGamePlayAreaHeader from "../RPGGamePlayAreaHeader/RPGGamePlayAreaHeader";
import RPGGamePlayAreaFooter from "../RPGGamePlayAreaFooter/RPGGamePlayAreaFooter";
import RPGGamePlayAreaOrintationCheckModal from "../RPGGamePlayAreaOrintationCheckModal/RPGGamePlayAreaOrintationCheckModal";
import RPGGamePlayAreaLoader from "../RPGGamePlayAreaLoader/RPGGamePlayAreaLoader";
import RPGGamePlayAreaStartGameModal from "../RPGGamePlayAreaStartGameModal/RPGGamePlayAreaStartGameModal";
import RPGGamePlayAreaGameOverModal from "../RPGGamePlayAreaGameOverModal/RPGGamePlayAreaGameOverModal";
import RPGGamePlayAreaRivalMenu from "../RPGGamePlayAreaRivalMenu/RPGGamePlayAreaRivalMenu";
import RPGGamePlayAreaOwnedCharacterMenu from "../RPGGamePlayAreaOwnedCharacterMenu/RPGGamePlayAreaOwnedCharacterMenu";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import RPGGamePlayAreaErrorModal from "../RPGGamePlayAreaErrorModal/RPGGamePlayAreaErrorModal";

import { useBattle } from "../../../../hooks/useBattle";
import { useCanvasGame } from "../../../../hooks/useCanvasGame";
import { Game } from "../../../../canvasModels/Game";

// These variables will be come from props or a global state
const gameType: "pve" = "pve"; // Assuming gameType is always 'pve' for now
const locationId = "2";

const RPGGamePlayArea = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // Local state for animation and loading, shared with hooks
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timerPoused, setTimerPoused] = useState(false);
  const [errored, setErrored] = useState(false);
  const [game, setRPGGame] = useState<Game | null>(null);

  // Use Battle Logic Hook
  const {
    gameStarted,
    gameStatus,
    activeOrderIndex,
    round,
    roundShowing,
    defendZone,
    hitZone,
    orders,
    curCharacter,
    curCharObj,
    selectedPlace, // From ref in useBattle
    selectedPlaceBattleChar,
    onStartGame,
    onRestartGame,
    onSelectPlace, // From battle
    onSetDefendZone,
    onSetHitZone,
    changeActiveOrderIndex,
  } = useBattle({
    gameType,
    locationId,
    game, // Pass the game instance to battle logic
    setLoading,
    setErrored,
    setAnimating,
    setTimerPoused,
  });
  // Use Canvas RPGGame Logic Hook
  const { sizes, onClickCanvas, onUpdateCanvas } = useCanvasGame({
    canvasRef,
    game,
    initGame: setRPGGame,
    setLoading,
    animating,
    isOurStep: !!orders?.[activeOrderIndex]?.owned, // A bit hacky, improve passing this
    onSelectPlace: (place) => onSelectPlace(place), // Pass a setter
  });

  return (
    <div
      className={styles.rpgGamePlayArea}
      style={{
        backgroundImage: `url(${rpgGamePlayAreaBgImage})`, // Use template literal
      }}
    >
      <RPGGamePlayAreaHeader
        characters={orders}
        activeOrderIndex={activeOrderIndex}
        curCharacter={curCharacter}
      />
      <section className={styles.rpgGamePlayArea__canvasWrapper}>
        <canvas
          onClick={onClickCanvas}
          ref={canvasRef}
          width={sizes[0]}
          height={sizes[1]}
        ></canvas>
        {/* RPGGame assets  */}
        <img
          src={positionPlaceImage}
          id="positionPlace"
          alt="positionPlace"
          width={200}
          height={200}
          style={{ visibility: "hidden", position: "absolute" }}
        />
        <TransitionProvider
          style={TransitionStyleTypes.zoomInOut}
          className={styles.rpgGamePlayArea__roundTextWrapper}
          inProp={roundShowing}
        >
          <span>Раунд {round}</span>
        </TransitionProvider>

        <RPGGamePlayAreaRivalMenu
          show={!!selectedPlace && !animating && !hitZone}
          canvasRect={canvasRef.current?.getBoundingClientRect()}
          selectedPlace={selectedPlace}
          onClick={onSetHitZone}
          hp={selectedPlaceBattleChar?.battle_parameters.max_hp || 0}
          damage={selectedPlaceBattleChar?.parameters?.damage || 0}
          sheildPower={selectedPlaceBattleChar?.parameters?.shield_power || 0}
        />
        <RPGGamePlayAreaOwnedCharacterMenu
          show={
            !!orders?.[activeOrderIndex]?.owned &&
            !animating &&
            gameStarted &&
            !defendZone
          }
          canvasRect={canvasRef.current?.getBoundingClientRect()}
          selectedPlace={curCharObj?.place || null}
          onclick={onSetDefendZone}
        />
      </section>
      <RPGGamePlayAreaFooter
        gameType={gameType}
        gameStarted={gameStarted}
        timerPoused={timerPoused}
        onEnd={changeActiveOrderIndex}
        ordersEnded={!!orders && activeOrderIndex === orders?.length - 1}
        isOurStep={!!orders?.[activeOrderIndex]?.owned}
      />
      {game && (
        <RPGGamePlayAreaOrintationCheckModal updateCanvas={onUpdateCanvas} />
      )}
      <RPGGamePlayAreaLoader loading={loading} />
      <RPGGamePlayAreaStartGameModal show={!gameStarted} onStart={onStartGame} />
      <RPGGamePlayAreaGameOverModal
        gameStatus={gameStatus}
        onReStart={onRestartGame}
      />
      <RPGGamePlayAreaErrorModal show={errored} onRestart={onRestartGame} />
    </div>
  );
};

export default RPGGamePlayArea;
