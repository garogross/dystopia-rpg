import React, { useEffect, useState } from "react";
import { usePixi } from "../../../../hooks/influence/usePixi";

import styles from "./BubbleFrontMainCanvas.module.scss";
import {
  Application,
  Container,
  DisplayObject,
  ICanvas,
  Sprite,
  SVGResource,
  Texture,
} from "pixi.js";
import { getHexSvg } from "../../../../utils/influence/getHexSvg";
import {
  lightingBallSpriteImage,
  chemicalBombSpriteImage,
  fireBallSpriteImage,
  iceBallSpriteImage,
  nuclearBallSpriteImage,
  nekroBallSpriteImage,
} from "../../../../assets/imageMaps";
import { BUBBLE_FRONT_GUN_ID } from "../../../../constants/bubbleFront/bubbleFrontGunId";
import { useCopyRef } from "../../../../hooks/useCopyRef";
import { EBubbleFrontBalls } from "../../../../constants/bubbleFront/EBubbleFrontBalls";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setNextBalls } from "../../../../store/slices/bubbleFront/bubbleFrontSlice";
import BubbleFrontMainGameOverModal from "../BubbleFrontMainGameOverModal/BubbleFrontMainGameOverModal";
import { Rectangle } from "pixi.js";
import { getAngle } from "../../../../utils/bubbleFront/getAngle";
import { BUBBLE_FRONT_LEVELS_SETTINGS } from "../../../../constants/bubbleFront/BubbleFrontLevelsSettings";

const HEX_IN_LINE = 15;
const LINES_COUNT = 10;
const DEFAULT_HEX_LINES_COUNT = 3;
const MOVE_SPEED = 15; // Adjust speed as needed
const SCALE_SPEED = 0.03; // Adjust speed as needed (0..1 per frame)
const TOUCHABLE_RADIUS = 0.6; // 1 - width size, min value 0.1
// Minimum number of connected balls required to form a cluster for removal
const MIN_CLUSTERS = 3;
const NEKRO_BALL_RADIUS = 3;
const SCORE_PER_BALL = 100;
const BALL_ANIMATION_DURATION_MS = 500;

const getHexesCountInrow = (lineIndex: number) => {
  const isOdd = lineIndex % 2 === 1;
  return HEX_IN_LINE - (isOdd ? 1 : 0);
};

// Cache: base textures per ball
const BALLS = {
  [EBubbleFrontBalls.FIRE_BALL]: Texture.from(fireBallSpriteImage),
  [EBubbleFrontBalls.CHEMICAL_BOMB]: Texture.from(chemicalBombSpriteImage),
  [EBubbleFrontBalls.ICE_BALL]: Texture.from(iceBallSpriteImage),
  [EBubbleFrontBalls.LIGHTING_BALL]: Texture.from(lightingBallSpriteImage),
  [EBubbleFrontBalls.NUCLEAR_BALL]: Texture.from(nuclearBallSpriteImage),
  // NEKRO_BALL always need to be end
  [EBubbleFrontBalls.NEKRO_BALL]: Texture.from(nekroBallSpriteImage),
};
const ballKeys = Object.keys(BALLS) as (keyof typeof BALLS)[];

const getRandomBall = () =>
  ballKeys[
    Math.floor(Math.random() * (ballKeys.length - 1)) // -1 for not select NEKRO_BALL
  ];

// Generic spritesheet slicer (horizontal strip). Frame size is fixed to 82x82.
const SPRITESHEET_FRAME_SIZE = 90;
const framesCache: Partial<Record<keyof typeof BALLS, Texture[]>> = {};
const getFramesForBall = (ballType: keyof typeof BALLS): Texture[] => {
  if (framesCache[ballType]) return framesCache[ballType] as Texture[];
  const baseTexture = BALLS[ballType].baseTexture;
  // Assume square frames laid out horizontally; use texture height as frame size
  const frameSize = baseTexture.height || SPRITESHEET_FRAME_SIZE;
  const framesCount = Math.max(1, Math.floor(baseTexture.width / frameSize));

  const frames: Texture[] = [];
  for (let i = 0; i < framesCount; i++) {
    frames.push(
      new Texture(
        baseTexture,
        new Rectangle(i * frameSize, 0, frameSize, frameSize)
      )
    );
  }

  framesCache[ballType] = frames;
  return frames;
};

// Factory to create a display object for a ball type (first frame only)
const createBallDisplay = (ballType: keyof typeof BALLS): Sprite => {
  const frames = getFramesForBall(ballType);
  return new Sprite(frames[0]);
};

interface IHex {
  ball: (typeof ballKeys)[0] | null;
  position?: { x: number; y: number };
  lineIndex: number;
  colIndex: number;
}

const generateRandomBallsRow = (
  length: number,
  lineIndex: number,
  withBall?: boolean
) => {
  return Array.from({ length: length }, (_, colIndex) => ({
    ball: withBall ? getRandomBall() : null,
    lineIndex,
    colIndex,
  }));
};

const generateRandomBallsArr = (): IHex[][] => {
  return Array.from({ length: LINES_COUNT }, (_, lineIndex) =>
    generateRandomBallsRow(
      getHexesCountInrow(lineIndex),
      lineIndex,
      lineIndex < DEFAULT_HEX_LINES_COUNT
    )
  );
};

const getGunSettings = (clientX: number, clientY: number) => {
  const gunEl = document.querySelector(`#${BUBBLE_FRONT_GUN_ID}`);
  if (gunEl) {
    const gunRect = gunEl.getBoundingClientRect();

    const centerX = gunRect.left + gunRect.width / 2;
    const centerY = gunRect.top + gunRect.height / 2;
    // Type assertion to HTMLElement to access dataset
    const rotation = getAngle(clientX, clientY, centerX, centerY);
    return { centerX, centerY, rotation };
  } else return { centerX: 0, centerY: 0, rotation: 0 };
};

const neighborsoffsets = [
  [
    [1, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
  ],
  [
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [1, 0],
    [0, -1],
  ], // Even row tiles
]; // Odd row tiles

// Get the neighbors of the specified tile
const getNeighbors = (hex: IHex, hexes: IHex[][]) => {
  const hexesInRow = hexes[hex.lineIndex].length; // Even or odd row
  const rowIndex = HEX_IN_LINE - hexesInRow;
  const neighbors: IHex[] = [];

  // Get the neighbor offsets for the specified tile
  const n = neighborsoffsets[rowIndex];

  // Get the neighbors
  for (let i = 0; i < n.length; i++) {
    // Neighbor coordinate
    const nx = hex.colIndex + n[i][1];
    const ny = hex.lineIndex + n[i][0];

    // Make sure the tile is valid
    if (hexes?.[ny]?.[nx]) {
      neighbors.push(hexes[ny][nx]);
    }
  }

  return neighbors;
};

interface Props {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const BubbleFrontMainCanvas: React.FC<Props> = ({ score, setScore }) => {
  const dispatch = useAppDispatch();
  const readyBalls = useAppSelector(
    (state) => state.bubbleFront.global.nextBalls
  );
  const curDifficultylevel = useAppSelector(
    (state) => state.bubbleFront.global.curDifficultylevel
  );
  const [hexes, setHexes] = useState<IHex[][]>(generateRandomBallsArr());

  const [hexSize, setHexSize] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [turnCounter, setTurnCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isStriking, setIsStriking] = useState(false);

  const hexSizeRef = useCopyRef(hexSize);
  const hexesRef = useCopyRef(hexes);
  const readyBallsRef = useCopyRef(readyBalls);
  const isStrikingRef = useCopyRef(isStriking);
  const hexesWithBalls = hexes.flat().filter((item) => item.ball);

  const maxTurnCounter = BUBBLE_FRONT_LEVELS_SETTINGS[curDifficultylevel];

  const findCluster = (
    targettile: IHex,
    matchColors?: boolean,
    hexes?: IHex[][]
  ) => {
    // Get the target tile. Tile coord must be valid.

    // Initialize the toprocess array with the specified tile
    const toprocess = [targettile];
    const processed: IHex[] = [];
    const foundcluster: IHex[] = [];

    while (toprocess.length > 0) {
      // Pop the last element from the array
      const currenttile = toprocess.pop();
      // Skip processed and empty tiles
      if (!currenttile?.ball) {
        continue;
      }
      // Check if current tile has the right type, if matchtype is true
      if (!matchColors || currenttile.ball === targettile.ball) {
        // Add current tile to the cluster
        foundcluster.push(currenttile);

        // Mark processed immediately after accepting the tile
        processed.push(currenttile);

        // Get the neighbors of the current tile
        const neighbors = getNeighbors(currenttile, hexes || hexesRef.current);

        neighbors
          .filter(
            (item) =>
              (!matchColors || item.ball === targettile.ball) &&
              !processed.some(
                (p) =>
                  p.colIndex === item.colIndex && p.lineIndex === item.lineIndex
              ) &&
              !toprocess.some(
                (p) =>
                  p.colIndex === item.colIndex && p.lineIndex === item.lineIndex
              ) &&
              !foundcluster.some(
                (p) =>
                  p.colIndex === item.colIndex && p.lineIndex === item.lineIndex
              )
          )
          .forEach((item) => {
            toprocess.push(item);
          });
      }
    }

    // Return the found cluster
    return foundcluster;
  };

  const findFloatingClusters = (hexes: IHex[][]) => {
    if (!hexes) return;

    const foundclusters: IHex[][] = [];
    const processedHexes: IHex[] = [];
    hexes.flat().forEach((hex) => {
      if (!hex.ball) return;

      if (
        processedHexes.some(
          (item) =>
            item.colIndex === hex.colIndex && hex.lineIndex === item.lineIndex
        )
      )
        return;
      // debugger;

      const foundcluster = findCluster(hex, false, hexes);

      if (!foundcluster.length) return;
      processedHexes.push(...foundcluster);
      let floating = true;
      for (var k = 0; k < foundcluster.length; k++) {
        if (foundcluster[k].position?.y === 0) {
          // Tile is attached to the roof
          floating = false;
          break;
        }
      }

      if (floating) {
        // Found a floating cluster
        foundclusters.push(foundcluster);
      }
    });

    return foundclusters;
  };

  // Helper function to find closest hex to a position
  const findClosestHex = (
    position: { x: number; y: number },
    hexes: IHex[]
  ) => {
    let closestHex = hexes[0];
    let minDistance = Infinity;

    hexes.forEach((hex) => {
      if (!hex.position) return;
      const centerX = hex.position.x + hexSizeRef.current / 2;
      const centerY = hex.position.y + hexSizeRef.current / 2;
      const dx = position.x - centerX;
      const dy = position.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistance) {
        minDistance = dist;
        closestHex = hex;
      }
    });

    return closestHex;
  };

  // Collect hexes within a given radius (in steps) starting from origin
  const getHexesWithinRadius = (
    origin: IHex,
    radius: number,
    hexGrid: IHex[][]
  ): IHex[] => {
    if (radius <= 0) return [origin];

    const queue: IHex[] = [origin];
    const visited: Set<string> = new Set([
      `${origin.lineIndex}:${origin.colIndex}`,
    ]);
    const result: IHex[] = [origin];
    const distanceMap: Map<string, number> = new Map([
      [`${origin.lineIndex}:${origin.colIndex}`, 0],
    ]);

    while (queue.length > 0) {
      const current = queue.shift() as IHex;
      const currentKey = `${current.lineIndex}:${current.colIndex}`;
      const currentDistance = distanceMap.get(currentKey) ?? 0;
      if (currentDistance === radius) continue;

      const neighbors = getNeighbors(current, hexGrid);
      neighbors.forEach((n) => {
        const key = `${n.lineIndex}:${n.colIndex}`;
        if (!visited.has(key)) {
          visited.add(key);
          distanceMap.set(key, currentDistance + 1);
          result.push(n);
          queue.push(n);
        }
      });
    }

    return result;
  };

  // Helper function to remove clusters and update score
  const removeClustersAndUpdateScore = async (
    // clusters: IHex[],
    // floatingClusters: IHex[][] | undefined,
    closestHex: IHex,
    ballType: EBubbleFrontBalls,
    setHexes: React.Dispatch<React.SetStateAction<IHex[][]>>,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setTurnCounter: React.Dispatch<React.SetStateAction<number>>,
    hexLayer: Container<DisplayObject>
  ) => {
    let updatingHexes: IHex[][] = [...(hexesRef.current || [])];

    // Small helper to animate removal of a provided tile list
    const animateTilesRemoval = async (tiles: IHex[]) => {
      if (!hexLayer || !tiles.length) return;
      const animations: Promise<void>[] = [];
      const animationDurationMs = BALL_ANIMATION_DURATION_MS;
      tiles.forEach((tile) => {
        const tileBallType = tile.ball as keyof typeof BALLS;
        if (!tile.position || !tileBallType) return;
        const existing = hexLayer.children.find(
          (c: any) => c.name === `ball-${tile.lineIndex}-${tile.colIndex}`
        ) as Sprite | undefined;
        if (existing) {
          hexLayer.removeChild(existing);
          existing.destroy({ children: true });
        }
        const display = createBallDisplay(tileBallType);
        if (display) {
          display.x = tile.position.x;
          display.y = tile.position.y;
          (display as any).width = hexSizeRef.current;
          (display as any).height = hexSizeRef.current;
          hexLayer.addChild(display);

          animations.push(
            new Promise<void>((resolve) => {
              const start = performance.now();
              const frames = getFramesForBall(tileBallType);
              const totalFrames = frames.length;

              const step = (now: number) => {
                const t = Math.min(1, (now - start) / animationDurationMs);
                const frameIndex = Math.min(
                  totalFrames - 1,
                  Math.floor(t * totalFrames)
                );

                if ((display as any).texture !== frames[frameIndex]) {
                  (display as any).texture = frames[frameIndex];
                }
                const fadeStart = 0.5;
                if (t >= fadeStart) {
                  const localProgress = (t - fadeStart) / (1 - fadeStart);
                  (display as any).alpha = Math.max(0, 1 - localProgress);
                } else {
                  (display as any).alpha = 1;
                }
                if (t < 1) {
                  requestAnimationFrame(step);
                } else {
                  hexLayer.removeChild(display);
                  display.destroy({ children: true });
                  resolve();
                }
              };
              requestAnimationFrame(step);
            })
          );
        }
      });
      await Promise.all(animations);
    };

    // 1) Decide which tiles are initially removed
    let initialRemovals: IHex[] = [];
    if (ballType === EBubbleFrontBalls.NEKRO_BALL) {
      initialRemovals = getHexesWithinRadius(
        closestHex,
        NEKRO_BALL_RADIUS,
        updatingHexes
      ).filter((h) => h.ball) as IHex[];
    } else {
      const clusters = findCluster({ ...closestHex, ball: ballType }, true);
      if (clusters.length < MIN_CLUSTERS) {
        setTurnCounter((prev) => prev + 1);
        return;
      }
      initialRemovals = clusters;
    }

    if (!initialRemovals.length) {
      setTurnCounter((prev) => prev + 1);
      return;
    }

    // 2) Animate initial removals
    setIsAnimating(true);
    try {
      // await animateTilesRemoval(initialRemovals);

      // 3) Remove from grid
      updatingHexes = updatingHexes
        .map((line) => [...line])
        .map((line) =>
          line.map((hex) =>
            initialRemovals.some(
              (item) =>
                item.colIndex === hex.colIndex &&
                item.lineIndex === hex.lineIndex
            )
              ? { ...hex, ball: null }
              : hex
          )
        );

      // 4) Find floating clusters and animate/remove them as well
      const floatingClusters = findFloatingClusters(updatingHexes) || [];
      const floatingTiles = floatingClusters.flat();
      await animateTilesRemoval([...initialRemovals, ...floatingTiles]);
      if (floatingTiles.length) {
        updatingHexes = updatingHexes.map((line) =>
          line.map((hex) =>
            floatingTiles.some(
              (item) =>
                item.colIndex === hex.colIndex &&
                item.lineIndex === hex.lineIndex
            )
              ? { ...hex, ball: null }
              : hex
          )
        );
      }

      // 5) Commit state and score once
      setHexes(updatingHexes);
      const removedCount = initialRemovals.length + (floatingTiles.length || 0);
      setScore((prev) => prev + removedCount * SCORE_PER_BALL);
    } finally {
      setIsAnimating(false);
    }
  };

  // Helper function to update ready balls
  const updateReadyBalls = (
    readyBalls: [EBubbleFrontBalls, EBubbleFrontBalls]
  ) => {
    const updatingReadyBalls = [...readyBalls] as typeof readyBalls;
    updatingReadyBalls.shift();
    updatingReadyBalls.push(getRandomBall());
    dispatch(setNextBalls(updatingReadyBalls));
  };

  // Helper function to place ball in hex grid
  const placeBallInHex = (
    hex: IHex,
    ballType: keyof typeof BALLS,
    setHexes: React.Dispatch<React.SetStateAction<IHex[][]>>
  ) => {
    setHexes((prevHexes) => {
      const newHexes = prevHexes.map((line) => [...line]);
      newHexes[hex.lineIndex][hex.colIndex] = {
        ...newHexes[hex.lineIndex][hex.colIndex],
        ball: ballType,
      };
      return newHexes;
    });
  };

  const onStikeBubbleTouch = (
    ballSprite: Sprite,
    emptyFirstRow: IHex[],
    ballType: EBubbleFrontBalls,
    readyBalls: [EBubbleFrontBalls, EBubbleFrontBalls],
    hexLayer: Container<DisplayObject>
  ) => {
    if (emptyFirstRow.length) {
      const closestHex = findClosestHex(
        { x: ballSprite.x, y: ballSprite.y },
        emptyFirstRow
      );

      // Place the ball in the closest empty first-row hex
      placeBallInHex(closestHex, ballType, setHexes);

      removeClustersAndUpdateScore(
        // clusters,
        // floatingClusters,
        // updatingHexes,
        closestHex,
        ballType,
        setHexes,
        setScore,
        setTurnCounter,
        hexLayer
      );
    }

    hexLayer.removeChild(ballSprite);
    ballSprite.destroy();
    setTimeout(() => {
      setIsStriking(false);
    }, 400);
  };

  const strikeBall = (
    app: Application<ICanvas>,
    hexLayer: Container,
    clientPosition: { clientX: number; clientY: number }
  ) => {
    if (isStrikingRef.current) return;
    setIsStriking(true);
    const { centerX, centerY, rotation } = getGunSettings(
      clientPosition.clientX,
      clientPosition.clientY
    );

    // Create sprite with readyBalls[0]
    const readyBalls = readyBallsRef.current;
    if (readyBalls && readyBalls.length > 0) {
      updateReadyBalls(readyBalls);
      const ballType = readyBalls[0];

      const ballSprite = createBallDisplay(ballType) as Sprite;

      const canvasRect = app.view.getBoundingClientRect?.();
      (ballSprite as any).anchor?.set?.(0.5);
      ballSprite.scale.set(0);
      ballSprite.x = centerX - (canvasRect?.x || 0);
      ballSprite.y = centerY - (canvasRect?.y || 0);

      // Add ball to the hex layer
      hexLayer.addChild(ballSprite);

      // Calculate movement direction based on rotation
      // Adjust for -90 degree offset and convert to radians
      const angleInRadians = ((rotation + 90) * Math.PI) / 180;

      let velocityX = Math.cos(angleInRadians) * MOVE_SPEED;
      let velocityY = Math.sin(angleInRadians) * MOVE_SPEED;

      // Determine target scale so that final visual size equals hex size
      const baseFrameWidth = SPRITESHEET_FRAME_SIZE;
      const targetScale =
        baseFrameWidth > 0 ? hexSizeRef.current / baseFrameWidth : 1;

      const hittableBallsLines = hexesRef.current.filter((line, index, arr) => {
        if (!line.some((item) => item.ball)) return false;
        const isCurLineFilled =
          line.filter((item) => item.ball).length !== line.length;
        const isNextLineFilled =
          arr[index + 1]?.filter((item) => item.ball)?.length !==
          arr[index + 1]?.length;
        return isCurLineFilled || isNextLineFilled;
      });

      // Animation function
      const animateBall = () => {
        if (!ballSprite) return;

        ballSprite.x -= velocityX;
        ballSprite.y -= velocityY;

        // Smoothly scale up to target size
        const currentScale = ballSprite.scale.x; // uniform scale
        if (currentScale < targetScale) {
          const nextScale = Math.min(currentScale + SCALE_SPEED, targetScale);
          ballSprite.scale.set(nextScale);
        }

        // Compute current radius for collision (texture size * scale / 2)
        const currentRadius = (baseFrameWidth * ballSprite.scale.x) / 2;

        // Bounce on left/right walls
        if (ballSprite.x - currentRadius <= 0) {
          ballSprite.x = currentRadius;
          velocityX = -velocityX;
        } else if (ballSprite.x + currentRadius >= app.screen.width) {
          ballSprite.x = app.screen.width - currentRadius;
          velocityX = -velocityX;
        }

        // If hits top (y <= 0), snap to closest empty hex in the first row
        if (ballSprite.y - currentRadius <= 0) {
          const firstRow = hexesRef.current[0];
          const emptyFirstRow = firstRow?.filter((h) => !h.ball && h.position);

          onStikeBubbleTouch(
            ballSprite,
            emptyFirstRow,
            ballType,
            readyBalls,
            hexLayer
          );
          return; // Stop animating after snapping to top row
        }

        // check touch to grid balls
        const touchedBall = hittableBallsLines.flat().find((item) => {
          if (!item.position || !item.ball) return false;
          const { x, y } = item.position;
          // Calculate the distance between the moving ball and the grid ball
          const dx = ballSprite.x - (x + hexSizeRef.current / 2);
          const dy = ballSprite.y - (y + hexSizeRef.current / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Assume grid balls are scaled to hexSize, so their radius is hexSize / 2
          const gridBallRadius = hexSizeRef.current / 2;
          // Use the current moving ball radius
          const movingBallRadius =
            (baseFrameWidth * TOUCHABLE_RADIUS * ballSprite.scale.x) / 2;

          // If the distance is less than the sum of the radii, they touch
          return distance <= gridBallRadius + movingBallRadius;
        });

        if (!touchedBall) {
          requestAnimationFrame(animateBall);
        } else {
          // Find empty neighbors of the ball we collided with
          const emptyNeighbours = getNeighbors(
            touchedBall,
            hexesRef.current
          ).filter((n) => !n.ball && n.position);

          onStikeBubbleTouch(
            ballSprite,
            emptyNeighbours,
            ballType,
            readyBalls,
            hexLayer
          );
        }
      };

      // Start animation
      animateBall();
    }
  };

  function onInitApp(app: Application<ICanvas>, hexLayer: Container) {
    // Desktop: mouse click
    (app.view as HTMLCanvasElement).addEventListener(
      "mousedown",
      (e: MouseEvent) => {
        strikeBall(app, hexLayer, { clientX: e.clientX, clientY: e.clientY });
      }
    );
    // Mobile: touchend (not touchcancel)
    (app.view as HTMLCanvasElement).addEventListener(
      "touchend",
      (e: TouchEvent) => {
        // Prevent default to avoid double firing with mouse events on mobile
        e.preventDefault();
        if (e.changedTouches && e.changedTouches.length > 0) {
          const touch = e.changedTouches[0];
          strikeBall(app, hexLayer, {
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
        }
      },
      { passive: false }
    );
  }

  const { isInitialized, pixiContainer, hexLayerRef } = usePixi(onInitApp);

  const initNextBalls = () => {
    if (!readyBalls?.length) {
      dispatch(setNextBalls([getRandomBall(), getRandomBall()]));
    }
  };

  useEffect(() => {
    initNextBalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (turnCounter >= maxTurnCounter) {
      setTimeout(() => {
        setHexes((prev) => {
          const lineLength =
            prev[0].length === HEX_IN_LINE ? HEX_IN_LINE - 1 : HEX_IN_LINE;
          // Insert a new row at the top with correct length and balls
          const newRow = generateRandomBallsRow(lineLength, 0, true);
          const updated = [newRow, ...prev.slice(0, prev.length - 1)];

          // Update lineIndex for all hexes
          return updated.map((line, lineIndex) =>
            line.map((hex) => ({ ...hex, lineIndex }))
          );
        });
        setTurnCounter(0);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnCounter]);

  const updateCanvas = () => {
    if (isAnimating || !pixiContainer.current || !hexLayerRef.current) return;

    // Clear previous children to avoid memory leaks and overdraw
    hexLayerRef.current.removeChildren().forEach((child) => {
      child.destroy({ children: true, texture: false });
    });

    const spriteBatch: Sprite[] = [];

    const graphicsBatch: Sprite[] = [];

    const containerWidth = pixiContainer.current.getBoundingClientRect().width;

    // Calculate hex size to fit both width and height
    const hexSize = containerWidth / HEX_IN_LINE;
    const halfHexSize = hexSize / 2;
    // Calculate the total width and height of the hex grid
    setHexSize(hexSize);
    const updatingHexes = [...hexes];

    for (let l = 0; l < LINES_COUNT; l++) {
      // Offset every other row for hex grid
      const hexesInRow = hexes[l].length;
      const isOdd = hexesInRow < HEX_IN_LINE;
      for (let i = 0; i < hexesInRow; i++) {
        const x = i * hexSize + (isOdd ? hexSize / 2 : 0);
        const y = l * hexSize * 0.8; // Vertical spacing for hex grid
        updatingHexes[l][i].position = { x, y };
        // Create sprite with the ball image
        const curBall = hexes[l]?.[i].ball;
        if (curBall) {
          const ballType = curBall;
          const sprite = createBallDisplay(ballType) as Sprite;
          sprite.name = `ball-${l}-${i}`;
          sprite.x = x;
          sprite.y = y;
          sprite.width = hexSize;
          sprite.height = hexSize;
          spriteBatch.push(sprite);
        }

        // load hex texture
        const svgString = getHexSvg(halfHexSize, undefined, "#3D2B7E", [2, 4]);
        const texture = Texture.from(svgString, {
          resourceOptions: { scale: 1, resource: SVGResource }, // Important
        });
        const textureSprite = new Sprite(texture);

        textureSprite.x = x;
        textureSprite.y = y;

        graphicsBatch.push(textureSprite);
      }
    }

    setHexes(updatingHexes);
    // Add ball sprites to the layer
    spriteBatch.forEach((sprite) => hexLayerRef.current?.addChild(sprite));

    // Add hex graphics to the layer
    graphicsBatch.forEach((graphics) =>
      hexLayerRef.current?.addChild(graphics)
    );
  };

  useEffect(() => {
    if (hexLayerRef.current && hexesWithBalls.length) {
      updateCanvas();

      if (
        hexes.filter((line) => line.some((hex) => hex.ball)).length >=
        LINES_COUNT
      ) {
        setGameOver(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, hexesWithBalls.length, isAnimating]);

  const onReset = () => {
    setHexes(generateRandomBallsArr());
    setGameOver(false);
    setTurnCounter(0);
    setScore(0);
    initNextBalls();
  };

  useEffect(() => {
    if (readyBalls?.length) {
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTurnCounter]);

  return (
    <div className={styles.bubbleFrontMainCanvas}>
      <div
        ref={pixiContainer}
        className={styles.bubbleFrontMainCanvas__container}
      ></div>
      <BubbleFrontMainGameOverModal
        show={gameOver}
        onReset={onReset}
        score={score}
      />
    </div>
  );
};

export default BubbleFrontMainCanvas;
