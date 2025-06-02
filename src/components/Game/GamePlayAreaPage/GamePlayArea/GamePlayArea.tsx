import React, { useEffect, useState } from "react";
import styles from "./GamePlayArea.module.scss";
import {
  gamePlayAreaBgImage,
  positionPlaceImage,
} from "../../../../assets/images";
import { Game } from "../../../../canvasModels/Game";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import GamePlayAreaHeader from "../GamePlayAreaHeader/GamePlayAreaHeader";
import GamePlayAreaFooter from "../GamePlayAreaFooter/GamePlayAreaFooter";
import GamePlayAreaOrintationCheckModal from "../GamePlayAreaOrintationCheckModal/GamePlayAreaOrintationCheckModal";
import GamePlayAreaLoader from "../GamePlayAreaLoader/GamePlayAreaLoader";
import { PositionLine } from "../../../../canvasModels/PositionLine";
import GamePlayAreaStartGameModal from "../GamePlayAreaStartGameModal/GamePlayAreaStartGameModal";
import { Character } from "../../../../canvasModels/Character";
import GamePlayAreaGameOverModal from "../GamePlayAreaGameOverModal/GamePlayAreaGameOverModal";
import { IBattle } from "../../../../models/IBattle";
import {
  activateBattle,
  startBattleFight,
  updateBattleSettings,
} from "../../../../api/battle";
import { ICharacter } from "../../../../models/ICharacter";
import { useAppSelector } from "../../../../hooks/redux";
import GamePlayAreaRivalMenu from "../GamePlayAreaRivalMenu/GamePlayAreaRivalMenu";
import GamePlayAreaOwnedCharacterMenu from "../GamePlayAreaOwnedCharacterMenu/GamePlayAreaOwnedCharacterMenu";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { EHitZones } from "../../../../constants/EHitZones";
import GamePlayAreaErrorModal from "../GamePlayAreaErrorModal/GamePlayAreaErrorModal";
import { GameStatusType } from "../../../../types/GameStatusType";
import { IBattleAction } from "../../../../models/IBattleAction";
import {
  checkLooserTeam,
  generateGameCharactersArr,
  generateOrder,
} from "../../../../utils/battleUtils";

type AddCharactersToPlacesArg = Parameters<
  PositionLine["addCharactersToPlaces"]
>[0];

// theese variables will be come from props
const gameType: IBattle["type"] = "pve";
const locationId = "2";
const GamePlayArea = () => {
  const tgId = useAppSelector((state) => state.profile.tgId);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [battle, setBattle] = useState<IBattle | null>(null);
  const [sizes, setSizes] = useState<[number, number]>([0, 0]);
  const [selectedPlace, setSelectedPlace] = useState<PositionPlace | null>(
    null
  );
  const [animating, setAnimating] = useState(false);
  const [gameInited, setGameInited] = useState(false);
  const [timerPoused, setTimerPoused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing");
  const [errored, setErrored] = useState(false);
  const [activeOrderIndex, setActiveOrderIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [roundShowing, setRoundShowing] = useState(false);
  const [defendZone, setDefendZone] = useState<EHitZones | null>(null);
  const [hitZone, setHitZone] = useState<EHitZones | null>(null);
  const [lastRoundActons, setLastRoundActons] = useState<IBattleAction[]>([]);

  const [orders, setOrders] = useState<ICharacter[] | null>(null);

  const curCharacter = battle?.fighters.team1[tgId] || null;
  const curCharObj = game?.getCharacterPlace();

  const selectedPlaceBattleChar =
    selectedPlace?.character && battle
      ? battle?.fighters.team2[selectedPlace?.character.uuid]
      : null;

  const updateCanvasSizes = () => {
    const width = canvasRef.current?.parentElement?.clientWidth || 0;
    const height = canvasRef.current?.parentElement?.clientHeight || 0;

    setSizes([width, height]);
  };

  const startBattle = async (isRestart?: boolean) => {
    try {
      setErrored(false);
      setLoading(true);

      if (isRestart) game?.resetCharactersStatus();
      const battle = await activateBattle(gameType, locationId);
      setBattle(battle);
      setRound(battle.battle_log.round);
    } catch (error) {
      console.error({ error });
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startBattle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      updateCanvasSizes();
    }
  }, [canvasRef]);

  useEffect(() => {
    if (sizes.every((size) => size) && canvasRef.current) {
      setGame(new Game(canvasRef.current));
    }
  }, [canvasRef, sizes]);

  useEffect(() => {
    if (!battle?.battle_id || !tgId) return;

    setOrders(
      generateOrder(battle.battle_log.turn_order, battle.fighters, tgId)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle?.battle_id, tgId]);

  useEffect(() => {
    if (game && battle && tgId) {
      game.drawCourts();
      const { team1, team2 } = battle.fighters;
      const leftCharactersArr = generateGameCharactersArr(team1, tgId);
      const rightCharactersArr = generateGameCharactersArr(team2, tgId);

      const addCharactersToCourt = (
        charactersArr: AddCharactersToPlacesArg[],
        courtIndex: number
      ) => {
        charactersArr.forEach((line, lineIndex) => {
          const curLine = game.courts?.[courtIndex]?.lines?.[lineIndex];
          if (curLine) {
            curLine.addCharactersToPlaces(line);
          }
        });
      };

      addCharactersToCourt(leftCharactersArr, 0);
      addCharactersToCourt(rightCharactersArr, 1);

      game.removeEmptyPlacesFromCourtsLines();

      setTimeout(() => {
        game.hideLinesAndPlaces();
        setLoading(false);
      }, 300);
    }
  }, [battle, game, tgId]);

  useEffect(() => {
    if (
      defendZone &&
      hitZone &&
      selectedPlace?.character &&
      battle &&
      curCharObj
    ) {
      (async () => {
        try {
          await updateBattleSettings(
            battle?.battle_id,
            curCharObj.line.positionIndex,
            selectedPlace?.character!.uuid,
            hitZone,
            defendZone
          );
          const { battle_log, fighters } = await startBattleFight(
            battle?.battle_id
          );
          setRound(battle_log.round);
          if (battle_log.history) {
            const lastRoundActions =
              battle_log.history[battle_log.history.length - 1].actions;

            setOrders(generateOrder(lastRoundActions, fighters, tgId));
            const updatedActions =
              battle_log.history[battle_log.history.length - 1].actions;
            setLastRoundActons(updatedActions);
            onAttackByOwnedChar(updatedActions);
          }
        } catch (error) {
          setErrored(true);
          console.error(error);
        }
      })();
      setSelectedPlace(null);
      setDefendZone(null);
      setHitZone(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defendZone, hitZone, selectedPlace]);

  useEffect(() => {
    if (orders?.[activeOrderIndex].mob_name && game && curCharacter && orders) {
      const attackerObj = game.getCharacterPlace(orders[activeOrderIndex].id);
      const curCharObj = game.getCharacterPlace();
      const attackerChar = attackerObj?.place?.character;
      const curChar = curCharObj?.place?.character;

      if (attackerChar?.death) {
        changeActiveOrderIndex();
        return;
      }

      if (!attackerChar || !curChar || gameStatus !== "playing") return;

      (async () => {
        await onAttack(curChar, attackerChar);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrderIndex, gameStatus]);

  useEffect(() => {
    (async () => {
      if (activeOrderIndex === 0 && gameStarted && battle) {
        setRoundShowing(true);
        setTimeout(() => {
          setRoundShowing(false);
        }, 1000);

        if (!gameInited) {
          setGameInited(true);
          return;
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrderIndex, gameStarted]);

  const onUpdateCanvas = () => {
    setLoading(true);
    setTimeout(() => {
      updateCanvasSizes();
    }, 100);
  };

  const onStartGame = () => {
    setGameStarted(true);
  };
  const onRestartGame = () => {
    setGameStatus("playing");
    setTimerPoused(false);
    setActiveOrderIndex(0);
    startBattle(true);
  };

  const changeActiveOrderIndex = () => {
    if (!orders) return;

    setActiveOrderIndex((prevState) =>
      prevState >= orders.length - 1 ? 0 : prevState + 1
    );
  };

  const onClickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !game ||
      !game.courts ||
      animating ||
      !orders ||
      !orders[activeOrderIndex].owned
    )
      return;
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const rightCourtPlaces = game.courts[1].lines.flatMap(
      (line) => line.places
    );
    const curPlace = rightCourtPlaces.find(
      (place) =>
        place.checkTarget(x, y) && place.character && !place.character.death
    );

    if (curPlace) {
      rightCourtPlaces.forEach((place) => place.hidePlace());
      curPlace.showPlace();

      game.updateCanvas();
      setSelectedPlace(curPlace);
      setHitZone(null);
    } else if (selectedPlace) {
      // update after close modal
      setSelectedPlace(null);
      game.updateCanvas();
    }
  };

  const onAttack = async (
    rival: Character,
    attacker: Character,
    lastRoundActionsAtr?: IBattleAction[]
  ) => {
    if (!game || !orders || !battle) return;
    setTimerPoused(true);
    setAnimating(true);

    // update character hearts
    const actions = lastRoundActionsAtr || lastRoundActons;
    // const updatedOrders = ordersAtr || orders
    const battleCopy = { ...battle };

    const curAction = actions.find(
      (action) => action.attacker_id === attacker.uuid
    );

    if (!curAction) return;
    battleCopy.fighters[curAction.target_team][
      curAction.target_id
    ].battle_parameters.max_hp = curAction.after_hp;

    await game.attack(rival, attacker, curAction.damage);
    // update battle
    setBattle(battleCopy);
    setAnimating(false);

    const hasLooser = checkLooserTeam(battleCopy, game);

    if (hasLooser.some((item) => item)) {
      setGameStatus(hasLooser[0] ? "loose" : "win");
    } else {
      changeActiveOrderIndex();
      setTimerPoused(false);
    }
  };
  const onAttackByOwnedChar = async (actions: IBattleAction[]) => {
    if (!game || !selectedPlace?.character) return;
    const char = selectedPlace.character;
    const curCharObj = game.getCharacterPlace();
    if (!curCharObj?.place?.character) return;
    const curChar = curCharObj.place.character;
    await onAttack(char, curChar, actions);
  };

  return (
    <div
      className={styles.gamePlayArea}
      style={{
        backgroundImage: `url(${gamePlayAreaBgImage})`,
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
          onClick={(zone) => setHitZone(zone)}
          hp={selectedPlaceBattleChar?.battle_parameters.max_hp || 0}
          damage={selectedPlaceBattleChar?.parameters?.damage || 0}
          sheildPower={selectedPlaceBattleChar?.parameters?.shield_power || 0}
        />
        <GamePlayAreaOwnedCharacterMenu
          show={
            !!orders?.[activeOrderIndex].owned &&
            !animating &&
            gameStarted &&
            !defendZone
          }
          canvasRect={canvasRef.current?.getBoundingClientRect()}
          selectedPlace={curCharObj?.place || null}
          onclick={(zone) => setDefendZone(zone)}
        />
      </section>
      <GamePlayAreaFooter
        gameType={gameType}
        gameStarted={gameStarted}
        timerPoused={timerPoused}
        onEnd={changeActiveOrderIndex}
        ordersEnded={!!orders && activeOrderIndex === orders?.length - 1}
        isOurStep={!!orders?.[activeOrderIndex].owned}
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
      <GamePlayAreaErrorModal show={errored} onRestart={startBattle} />
    </div>
  );
};

export default GamePlayArea;
