import React, { useEffect, useState } from "react";
import styles from "./GamePlayArea.module.scss";
import {
  character1Image,
  characterAvatarImage,
  gamePlayAreaBgImage,
  npc1Image,
  npcAvatarImage,
  positionPlaceImage,
} from "../../../../assets/images";
import { Game } from "../../../../canvasModels/Game";
import { PositionPlace } from "../../../../canvasModels/PositionPlace";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import HeadShotIcon from "../../../layout/icons/game/GamePlayArea/HeadShotIcon";
import BodyShotIcon from "../../../layout/icons/game/GamePlayArea/BodyShotIcon";
import FootShotIcon from "../../../layout/icons/game/GamePlayArea/FootShotIcon";
import GamePlayAreaHeader from "../GamePlayAreaHeader/GamePlayAreaHeader";
import { ICharacter } from "../../../../models/ICharacter";
import GamePlayAreaFooter from "../GamePlayAreaFooter/GamePlayAreaFooter";
import GamePlayAreaOrintationCheckModal from "../GamePlayAreaOrintationCheckModal/GamePlayAreaOrintationCheckModal";
import GamePlayAreaLoader from "../GamePlayAreaLoader/GamePlayAreaLoader";
import { PositionLine } from "../../../../canvasModels/PositionLine";
import GamePlayAreaStartGameModal from "../GamePlayAreaStartGameModal/GamePlayAreaStartGameModal";
import { Character } from "../../../../canvasModels/Character";
import GamePlayAreaGameOverModal from "../GamePlayAreaGameOverModal/GamePlayAreaGameOverModal";

type AddCharactersToPlacesArg = Parameters<
  PositionLine["addCharactersToPlaces"]
>[0];

const areaCourts: { left: ICharacter[]; right: ICharacter[] } = {
  left: [
    {
      id: "1",
      avatar: characterAvatarImage,
      model: character1Image,
      hearts: 100,
      sheild: 100,
      powerSheild: 100,
      username: "Vasilisk48",
      type: "striker",
      owned: true,
    },
  ],
  right: [
    {
      id: "2",
      avatar: npcAvatarImage,
      model: npc1Image,
      hearts: 100,
      sheild: 100,
      powerSheild: 100,
      username: "NPC1",
      type: "shooter",
    },

    {
      id: "3",
      avatar: npcAvatarImage,
      model: npc1Image,
      hearts: 100,
      sheild: 100,
      powerSheild: 100,
      username: "NPC2",
      type: "shooter",
    },

    {
      id: "4",
      avatar: npcAvatarImage,
      model: npc1Image,
      hearts: 100,
      sheild: 100,
      powerSheild: 100,
      username: "NPC3",
      type: "shooter",
    },
  ],
};

const generateOrder = () => {
  const orders: ICharacter[] = [];
  const left = areaCourts.left;
  const right = areaCourts.right;

  const maxLen = Math.max(left.length, right.length);

  for (let i = 0; i < maxLen; i++) {
    const leftChar = left[i % left.length];
    const rightChar = right[i % right.length];

    orders.push(leftChar);
    orders.push(rightChar);
  }

  return orders;
};

const generateGameCharactersArr = (side: keyof typeof areaCourts) => {
  return areaCourts[side].reduce((acc, cur, index) => {
    const lineIndex = Math.floor(index / 3);
    const placeIndex = index % 3;
    if (!acc[lineIndex]) acc[lineIndex] = [];
    acc[lineIndex][placeIndex] = {
      uuid: cur.id,
      index: placeIndex,
      image: cur.model,
      type: cur.type,
      owned: cur.owned,
    };
    return acc;
  }, [] as AddCharactersToPlacesArg[]);
};

const orders = generateOrder();
const GamePlayArea = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [sizes, setSizes] = useState<[number, number]>([0, 0]);
  const [selectedPlace, setSelectedPlace] = useState<PositionPlace | null>(
    null
  );
  const [animating, setAnimating] = useState(false);
  const [timerPoused, setTimerPoused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOvered, setGameOvered] = useState(false);
  const [activeOrderIndex, setActiveOrderIndex] = useState(0);
  const [characters, setCharacters] = useState(
    Object.values(areaCourts).flatMap((item) => item)
  );

  const curCharacter = characters.find((char) => char.owned);

  const updateCanvasSizes = () => {
    const width = canvasRef.current?.parentElement?.clientWidth || 0;
    const height = canvasRef.current?.parentElement?.clientHeight || 0;

    setSizes([width, height]);
  };

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
    if (game) {
      game.drawCourts();

      const leftCharactersArr = generateGameCharactersArr("left");
      const rightCharactersArr = generateGameCharactersArr("right");

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
  }, [game]);

  useEffect(() => {
    if (activeOrderIndex % 2 && game && curCharacter) {
      const attackerObj = game.getCharacterPlace(orders[activeOrderIndex].id);
      const curCharObj = game.getCharacterPlace();
      const attackerChar = attackerObj?.place?.character;
      const curChar = curCharObj?.place?.character;
      if (!attackerChar || !curChar) return;

      (async () => {
        await onAttack(curChar, attackerChar);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrderIndex]);

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
    setGameOvered(false);
    setTimerPoused(false);
    setActiveOrderIndex(0);

    setCharacters(Object.values(areaCourts).flatMap((item) => item));
  };

  const changeActiveOrderIndex = () => {
    setActiveOrderIndex((prevState) =>
      prevState >= orders.length - 1 ? orders.length - 1 : prevState + 1
    );
  };

  const onClickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!game || !game.courts || animating || !orders[activeOrderIndex].owned)
      return;
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const rightCourtPlaces = game.courts[1].lines.flatMap(
      (line) => line.places
    );
    const curPlace = rightCourtPlaces.find((place) => place.checkTarget(x, y));

    if (curPlace) {
      rightCourtPlaces.forEach((place) => place.hidePlace());
      curPlace.showPlace();

      game.updateCanvas();
      setSelectedPlace(curPlace);
    } else if (selectedPlace) {
      setSelectedPlace(null);
    }
  };

  const onAttack = async (rival: Character, attacker: Character) => {
    if (!game) return;
    setTimerPoused(true);
    setAnimating(true);
    await game.attack(rival, attacker);

    // update character hearts
    setCharacters((prevState) =>
      prevState.map((char) => ({
        ...char,
        hearts: char.id === rival.uuid ? char.hearts - 20 : char.hearts,
      }))
    );

    changeActiveOrderIndex();
    setSelectedPlace(null);
    setAnimating(false);
    if (activeOrderIndex < orders.length - 1) {
      setTimerPoused(false);
    } else {
      setGameOvered(true);
    }
  };
  const onAttackByOwnedChar = () => {
    if (!game || !selectedPlace?.character) return;
    const char = selectedPlace.character;
    const curCharObj = game.getCharacterPlace();
    if (!curCharObj?.place?.character) return;
    const curChar = curCharObj.place.character;
    (async () => {
      await onAttack(char, curChar);
    })();
  };

  const sharacterMenuPositionStyles = {
    top:
      (canvasRef.current?.getBoundingClientRect().top || 0) +
      (selectedPlace?.character?.y || 0) +
      (selectedPlace?.character?.height || 0) / 2,
    left:
      (canvasRef.current?.getBoundingClientRect().left || 0) +
      (selectedPlace?.character?.x || 0),
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
          className={styles.gamePlayArea__characterMenu}
          style={TransitionStyleTypes.opacity}
          inProp={!!selectedPlace && !animating}
          duration={100}
        >
          <div
            style={sharacterMenuPositionStyles}
            className={styles.gamePlayArea__characterMenuMain}
          >
            <button
              className={styles.gamePlayArea__characterMenuBtn}
              onClick={onAttackByOwnedChar}
            >
              <div className={styles.gamePlayArea__characterMenuBtnInner}>
                <HeadShotIcon />
              </div>
            </button>
            <button
              onClick={onAttackByOwnedChar}
              className={styles.gamePlayArea__characterMenuBtn}
            >
              <div className={styles.gamePlayArea__characterMenuBtnInner}>
                <BodyShotIcon />
              </div>
            </button>
            <button
              onClick={onAttackByOwnedChar}
              className={styles.gamePlayArea__characterMenuBtn}
            >
              <div className={styles.gamePlayArea__characterMenuBtnInner}>
                <FootShotIcon />
              </div>
            </button>
          </div>
        </TransitionProvider>
      </section>
      <GamePlayAreaFooter
        gameStarted={gameStarted}
        timerPoused={timerPoused}
        onEnd={changeActiveOrderIndex}
        ordersEnded={activeOrderIndex === orders.length - 1}
      />
      {game && (
        <GamePlayAreaOrintationCheckModal updateCanvas={onUpdateCanvas} />
      )}
      <GamePlayAreaLoader loading={loading} />
      <GamePlayAreaStartGameModal show={!gameStarted} onStart={onStartGame} />
      <GamePlayAreaGameOverModal show={gameOvered} onReStart={onRestartGame} />
    </div>
  );
};

export default GamePlayArea;
