import { useState, useEffect, useCallback } from "react";
import {
  activateBattle,
  startBattleFight,
  updateBattleSettings,
} from "../api/battle";
import { useAppSelector } from "../hooks/redux"; // Assuming this is correct path
import {
  checkLooserTeam,
  generateGameCharactersArr,
  generateOrder,
} from "../utils/battleUtils";
import { GameStatusType } from "../types/GameStatusType";
import { EHitZones } from "../constants/EHitZones";
import { Game } from "../canvasModels/Game"; // Import Game for type hinting
import { IBattle } from "../models/IBattle";
import { IBattleAction } from "../models/IBattleAction";
import { ICharacter } from "../models/ICharacter";
import { PositionLine } from "../canvasModels/PositionLine";
import { PositionPlace } from "../canvasModels/PositionPlace";
import { Character } from "../canvasModels/Character";

type AddCharactersToPlacesArg = Parameters<
  PositionLine["addCharactersToPlaces"]
>[0];

interface UseBattleProps {
  gameType: IBattle["type"];
  locationId: string;
  game: Game | null; // Pass the game instance
  setLoading: (loading: boolean) => void;
  setErrored: (errored: boolean) => void;
  setAnimating: (animating: boolean) => void;
  setTimerPoused: (poused: boolean) => void;
}

export const useBattle = ({
  gameType,
  locationId,
  game,
  setLoading,
  setErrored,
  setAnimating,
  setTimerPoused,
}: UseBattleProps) => {
  const tgId = useAppSelector((state) => state.profile.tgId);

  const [battle, setBattle] = useState<IBattle | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing");
  const [activeOrderIndex, setActiveOrderIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [roundShowing, setRoundShowing] = useState(false);
  const [defendZone, setDefendZone] = useState<EHitZones | null>(null);
  const [hitZone, setHitZone] = useState<EHitZones | null>(null);
  const [lastRoundActons, setLastRoundActons] = useState<IBattleAction[]>([]);
  const [orders, setOrders] = useState<ICharacter[] | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PositionPlace | null>(
    null
  );

  const curCharacter = battle?.fighters.team1[tgId] || null;
  const curCharObj = game?.getCharacterPlace(); // Potentially moved to useCanvasGame or passed directly

  const startBattle = useCallback(
    async (isRestart?: boolean) => {
      try {
        setErrored(false);
        setLoading(true);

        if (isRestart) game?.resetCharactersStatus(); // Reset character status on canvas
        const battleData = await activateBattle(gameType, locationId);
        setBattle(battleData);
        setRound(battleData.battle_log.round);
      } catch (error) {
        console.error({ error });
        setErrored(true);
      } finally {
        setLoading(false);
      }
    },
    [game, gameType, locationId, setErrored, setLoading]
  );

  useEffect(() => {
    startBattle();
  }, [startBattle]);

  useEffect(() => {
    if (!battle?.battle_id || !tgId) return;
    setOrders(
      generateOrder(battle.battle_log.turn_order, battle.fighters, tgId)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle?.battle_id, battle?.fighters, tgId]);

  useEffect(() => {
    console.log(game, battle, tgId);

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
      console.log({ rightCharactersArr });

      addCharactersToCourt(leftCharactersArr, 0);
      addCharactersToCourt(rightCharactersArr, 1);
      game.removeEmptyPlacesFromCourtsLines();
      setTimeout(() => {
        game.hideLinesAndPlaces();
        setLoading(false);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle, game, tgId]);

  const handleAttack = useCallback(
    async (
      rivalChar: Character, // Character from canvasModels
      attackerChar: Character, // Character from canvasModels
      actionsAtr?: IBattleAction[]
    ) => {
      if (!game || !battle) return;
      setTimerPoused(true);
      setAnimating(true);
      const actions = actionsAtr || lastRoundActons;
      const curAction = actions.find(
        (action) => action.attacker_id === attackerChar.uuid
      );

      if (!curAction) return;

      const battleCopy = { ...battle };
      battleCopy.fighters[curAction.target_team][
        curAction.target_id
      ].battle_parameters.max_hp = curAction.after_hp;

      await game.attack(rivalChar, attackerChar, curAction.damage);
      setBattle(battleCopy);
      setAnimating(false);

      const hasLooser = checkLooserTeam(battleCopy, game);

      if (hasLooser.some((item) => item)) {
        setGameStatus(hasLooser[0] ? "loose" : "win");
      } else {
        setActiveOrderIndex((prevState) =>
          prevState >= (orders?.length || 0) - 1 ? 0 : prevState + 1
        );
        setTimerPoused(false);
      }
    },
    [
      game,
      battle,
      setTimerPoused,
      setAnimating,
      lastRoundActons,
      orders?.length,
    ]
  );

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
            setLastRoundActons(lastRoundActions);

            // Trigger owned character attack from here
            const rivalChar = selectedPlace.character;
            const attackerChar = curCharObj.place?.character;
            if (rivalChar && attackerChar) {
              await handleAttack(rivalChar, attackerChar, lastRoundActions);
            }
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
  }, [defendZone, hitZone, battle, curCharObj, tgId]);

  useEffect(() => {
    if (
      orders?.[activeOrderIndex]?.mob_name &&
      game &&
      curCharacter &&
      orders &&
      gameStatus === "playing"
    ) {
      const attackerObj = game.getCharacterPlace(orders[activeOrderIndex].id);
      const curCharObjFromGame = game.getCharacterPlace(); // Get current player character from game
      const attackerChar = attackerObj?.place?.character;
      const curChar = curCharObjFromGame?.place?.character;

      if (attackerChar?.death) {
        setActiveOrderIndex((prevState) =>
          prevState >= (orders?.length || 0) - 1 ? 0 : prevState + 1
        );
        return;
      }

      if (!attackerChar || !curChar) return;

      handleAttack(curChar, attackerChar);
    }
  }, [activeOrderIndex, gameStatus, orders, game, curCharacter, handleAttack]);

  const showRound = () => {
    setRoundShowing(true);
    setTimeout(() => {
      setRoundShowing(false);
    }, 1000);
  };

  useEffect(() => {
    if (activeOrderIndex === 0 && gameStarted && battle?.battle_id) {
      showRound();
    }
  }, [activeOrderIndex, gameStarted, battle?.battle_id]);

  const onStartGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const onRestartGame = useCallback(() => {
    setGameStatus("playing");
    setTimerPoused(false);
    setActiveOrderIndex(0);
    startBattle(true);
    setGameStarted(false);
  }, [setTimerPoused, startBattle]);

  const onSelectPlace = (place: PositionPlace | null) => {
    setSelectedPlace(place);
    setHitZone(null);
  };

  const onSetDefendZone = useCallback((zone: EHitZones) => {
    setDefendZone(zone);
  }, []);

  const onSetHitZone = useCallback((zone: EHitZones) => {
    setHitZone(zone);
  }, []);

  const changeActiveOrderIndex = useCallback(() => {
    if (!orders) return;
    setActiveOrderIndex((prevState) =>
      prevState >= orders.length - 1 ? 0 : prevState + 1
    );
  }, [orders]);

  const selectedPlaceBattleChar =
    selectedPlace?.character && battle
      ? battle?.fighters.team2[selectedPlace?.character.uuid]
      : null;

  return {
    battle,
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
    selectedPlace: selectedPlace, // Expose ref value
    selectedPlaceBattleChar,
    onStartGame,
    onRestartGame,
    onSelectPlace,
    onSetDefendZone,
    onSetHitZone,
    changeActiveOrderIndex,
  };
};
