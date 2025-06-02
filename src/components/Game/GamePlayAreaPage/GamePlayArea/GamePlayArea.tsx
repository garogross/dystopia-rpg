import React, { useState } from "react";
import styles from "./GamePlayArea.module.scss";
import {
  gamePlayAreaBgImage,
  positionPlaceImage,
} from "../../../../assets/images";

import GamePlayAreaHeader from "../GamePlayAreaHeader/GamePlayAreaHeader";
import GamePlayAreaFooter from "../GamePlayAreaFooter/GamePlayAreaFooter";
import GamePlayAreaOrintationCheckModal from "../GamePlayAreaOrintationCheckModal/GamePlayAreaOrintationCheckModal";
import GamePlayAreaLoader from "../GamePlayAreaLoader/GamePlayAreaLoader";
import GamePlayAreaStartGameModal from "../GamePlayAreaStartGameModal/GamePlayAreaStartGameModal";
import GamePlayAreaGameOverModal from "../GamePlayAreaGameOverModal/GamePlayAreaGameOverModal";
import GamePlayAreaRivalMenu from "../GamePlayAreaRivalMenu/GamePlayAreaRivalMenu";
import GamePlayAreaOwnedCharacterMenu from "../GamePlayAreaOwnedCharacterMenu/GamePlayAreaOwnedCharacterMenu";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import GamePlayAreaErrorModal from "../GamePlayAreaErrorModal/GamePlayAreaErrorModal";

import { useBattle } from "../../../../hooks/useBattle";
import { useCanvasGame } from "../../../../hooks/useCanvasGame";
import { Game } from "../../../../canvasModels/Game";

// These variables will be come from props or a global state
const gameType: "pve" = "pve"; // Assuming gameType is always 'pve' for now
const locationId = "2";

const GamePlayArea = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Local state for animation and loading, shared with hooks
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timerPoused, setTimerPoused] = useState(false);
  const [errored, setErrored] = useState(false);
  const [game, setGame] = useState<Game | null>(null);

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
  // Use Canvas Game Logic Hook
  const { sizes, onClickCanvas, onUpdateCanvas } = useCanvasGame({
    canvasRef,
    game,
    initGame: setGame,
    setLoading,
    animating,
    isOurStep: !!orders?.[activeOrderIndex]?.owned, // A bit hacky, improve passing this
    onSelectPlace: (place) => onSelectPlace(place), // Pass a setter
  });

  // Update selectedPlace in useBattle based on canvas clicks
  console.log({ selectedPlace });

  return (
    <div
      className={styles.gamePlayArea}
      style={{
        backgroundImage: `url(${gamePlayAreaBgImage})`, // Use template literal
      }}
    >
      <GamePlayAreaHeader
        characters={orders}
        activeOrderIndex={activeOrderIndex}
        curCharacter={curCharacter}
      />
      <section className={styles.gamePlayArea__canvasWrapper}>
        <canvas
          onClick={onClickCanvas}
          ref={canvasRef}
          width={sizes[0]}
          height={sizes[1]}
        ></canvas>
        {/* Game assets  */}
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
          className={styles.gamePlayArea__roundTextWrapper}
          inProp={roundShowing}
        >
          <span>Раунд {round}</span>
        </TransitionProvider>

        <GamePlayAreaRivalMenu
          show={!!selectedPlace && !animating && !hitZone}
          canvasRect={canvasRef.current?.getBoundingClientRect()}
          selectedPlace={selectedPlace}
          onClick={onSetHitZone}
          hp={selectedPlaceBattleChar?.battle_parameters.max_hp || 0}
          damage={selectedPlaceBattleChar?.parameters?.damage || 0}
          sheildPower={selectedPlaceBattleChar?.parameters?.shield_power || 0}
        />
        <GamePlayAreaOwnedCharacterMenu
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
      <GamePlayAreaFooter
        gameType={gameType}
        gameStarted={gameStarted}
        timerPoused={timerPoused}
        onEnd={changeActiveOrderIndex}
        ordersEnded={!!orders && activeOrderIndex === orders?.length - 1}
        isOurStep={!!orders?.[activeOrderIndex]?.owned}
      />
      {game && (
        <GamePlayAreaOrintationCheckModal updateCanvas={onUpdateCanvas} />
      )}
      <GamePlayAreaLoader loading={loading} />
      <GamePlayAreaStartGameModal show={!gameStarted} onStart={onStartGame} />
      <GamePlayAreaGameOverModal
        gameStatus={gameStatus}
        onReStart={onRestartGame}
      />
      <GamePlayAreaErrorModal show={errored} onRestart={onRestartGame} />
    </div>
  );
};

export default GamePlayArea;
