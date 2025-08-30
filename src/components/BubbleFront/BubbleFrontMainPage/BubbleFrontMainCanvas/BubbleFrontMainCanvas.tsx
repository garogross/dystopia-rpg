import React, { useEffect, useRef, useState } from "react";
import { usePixi } from "../../../../hooks/influence/usePixi";

import styles from "./BubbleFrontMainCanvas.module.scss";
import {
  Application,
  Container,
  ICanvas,
  Sprite,
  SVGResource,
  Texture,
} from "pixi.js";
import { getHexSvg } from "../../../../utils/influence/getHexSvg";
import {
  chemicalBombImage,
  fireBallImage,
  iceBallImage,
  lightingBBallImage,
  nuclearBallImage,
} from "../../../../assets/imageMaps";
import { BUBBLE_FRONT_GUN_ID } from "../../../../constants/bubbleFront/bubbleFrontGunId";
import { useCopyRef } from "../../../../hooks/useCopyRef";

const HEX_IN_LINE = 15;
const LINES_COUNT = 10;
const DEFAULT_HEX_LINES_COUNT = 3;

const getHexesCountInrow = (lineIndex: number) => {
  const isOdd = lineIndex % 2 === 1;
  return HEX_IN_LINE - (isOdd ? 1 : 0);
};
const BALLS = {
  chemicalBomb: Texture.from(chemicalBombImage),
  fireBall: Texture.from(fireBallImage),
  iceBall: Texture.from(iceBallImage),
  lightingBBall: Texture.from(lightingBBallImage),
  nuclearBall: Texture.from(nuclearBallImage),
};
const ballKeys = Object.keys(BALLS) as (keyof typeof BALLS)[];

const getRandomBall = () =>
  ballKeys[Math.floor(Math.random() * ballKeys.length)];

interface IHex {
  ball: (typeof ballKeys)[0] | null;
  position?: { x: number; y: number };
  lineIndex: number;
  colIndex: number;
}

// Physics constants from bubble shooter example
const BUBBLE_SPEED = 1000; // pixels per second
const BUBBLE_RADIUS = 20; // collision radius

const generateRandomBallsArr = (): IHex[][] => {
  return Array.from({ length: LINES_COUNT }, (_, lineIndex) =>
    Array.from({ length: getHexesCountInrow(lineIndex) }, (_, colIndex) => ({
      ball: lineIndex < DEFAULT_HEX_LINES_COUNT ? getRandomBall() : null,
      lineIndex,
      colIndex,
    }))
  );
};

const getGunSettings = () => {
  const gunEl = document.querySelector(`#${BUBBLE_FRONT_GUN_ID}`);
  if (gunEl) {
    const gunRect = gunEl.getBoundingClientRect();

    const centerX = gunRect.left + gunRect.width / 2;
    const centerY = gunRect.top + gunRect.height / 2;
    // Type assertion to HTMLElement to access dataset
    const rotation = +(gunEl instanceof HTMLElement && gunEl.dataset?.rotation
      ? gunEl.dataset.rotation
      : 0);
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
  ], // Odd row tiles
  [
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [1, 0],
    [0, -1],
  ], // Even row tiles
];

// Get the neighbors of the specified tile
const getNeighbors = (hex: IHex, hexes: IHex[][]) => {
  const hexesInRow = getHexesCountInrow(hex.lineIndex); // Even or odd row
  const isOddRow = hexesInRow < HEX_IN_LINE; // Determine if it's an odd row
  const rowIndex = isOddRow ? 0 : 1; // 0 for odd rows, 1 for even rows
  const neighbors: IHex[] = [];

  // Get the neighbor offsets for the specified tile
  const n = neighborsoffsets[rowIndex];

  // Get the neighbors
  for (let i = 0; i < n.length; i++) {
    // Neighbor coordinate
    const nx = hex.colIndex + n[i][1];
    const ny = hex.lineIndex + n[i][0];

    // Make sure the tile is valid and within bounds
    if (ny >= 0 && ny < hexes.length) {
      const tile = hexes[ny]?.[nx];
      if (tile && !tile.ball) {
        neighbors.push(tile);
      }
    }
  }

  return neighbors;
};

// Physics helper functions from bubble shooter example
const degToRad = (angle: number) => {
  return angle * (Math.PI / 180);
};

const circleIntersection = (
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number
) => {
  // Calculate the distance between the centers
  const dx = x1 - x2;
  const dy = y1 - y2;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len < r1 + r2) {
    // Circles intersect
    return true;
  }

  return false;
};

// Get the closest grid position for snapping
const getGridPosition = (
  x: number,
  y: number,
  hexSize: number,
  levelX: number,
  levelY: number
) => {
  const gridY = Math.floor((y - levelY) / (hexSize * 0.8));

  // Check for offset
  let xOffset = 0;
  if (gridY % 2) {
    xOffset = hexSize / 2;
  }
  const gridX = Math.floor((x - xOffset - levelX) / hexSize);

  return { x: gridX, y: gridY };
};

const BubbleFrontMainCanvas = () => {
  const [hexes, setHexes] = useState<IHex[][]>(generateRandomBallsArr());
  const [readyBalls, setReadyBalls] = useState(
    Array.from({ length: 2 }, () => getRandomBall())
  );
  const [hexSize, setHexSize] = useState(0);
  const hexSizeRef = useCopyRef(hexSize);
  const hexesRef = useCopyRef(hexes);
  const readyBallsRef = useCopyRef(readyBalls);
  const hexesWithBalls = hexes.flat().filter((item) => item.ball);
  console.log({ readyBalls });

  const strikeBall = (app: Application<ICanvas>, hexLayer: Container) => {
    const { centerX, centerY, rotation } = getGunSettings();

    // Create sprite with readyBalls[0]
    if (readyBallsRef.current.length > 0) {
      const ballType = readyBallsRef.current[0];

      const ballSprite = new Sprite(BALLS[ballType]);

      const canvasRect = app.view.getBoundingClientRect?.();
      ballSprite.anchor.set(0.5);
      ballSprite.scale.set(0);
      ballSprite.x = centerX - (canvasRect?.x || 0);
      ballSprite.y = centerY - (canvasRect?.y || 0);

      // Add ball to the hex layer
      hexLayer.addChild(ballSprite);

      // Calculate movement direction based on rotation
      // Apply angle restrictions like in bubble shooter example
      let restrictedRotation = rotation;

      // Restrict angle to 8, 172 degrees (like bubble shooter example)
      const lbound = 8;
      const ubound = 172;
      if (restrictedRotation > 90 && restrictedRotation < 270) {
        // Left side
        if (restrictedRotation > ubound) {
          restrictedRotation = ubound;
        }
      } else {
        // Right side
        if (restrictedRotation < lbound || restrictedRotation >= 270) {
          restrictedRotation = lbound;
        }
      }

      let angleInRadians = degToRad(restrictedRotation);
      const scaleSpeed = 0.03; // Adjust speed as needed (0..1 per frame)

      // Determine target scale so that final visual size equals hex size
      const baseTextureWidth =
        ballSprite.texture.orig?.width || ballSprite.texture.width;
      const targetScale =
        baseTextureWidth > 0 ? hexSizeRef.current / baseTextureWidth : 1;

      // Get level boundaries
      const levelX = 0;
      const levelY = 0;
      const levelWidth = app.screen.width;
      const levelHeight = app.screen.height;

      // Animation variables
      let lastFrameTime = performance.now();

      // Animation function
      const animateBall = (currentTime: number) => {
        const dt = (currentTime - lastFrameTime) / 1000; // Convert to seconds
        lastFrameTime = currentTime;

        // Move the bubble in the direction of the angle (physics-based movement)
        ballSprite.x += dt * BUBBLE_SPEED * Math.cos(angleInRadians);
        ballSprite.y += dt * BUBBLE_SPEED * -1 * Math.sin(angleInRadians);

        // Smoothly scale up to target size
        const currentScale = ballSprite.scale.x; // uniform scale
        if (currentScale < targetScale) {
          const nextScale = Math.min(currentScale + scaleSpeed, targetScale);
          ballSprite.scale.set(nextScale);
        }

        // Compute current radius for collision (texture size * scale / 2)
        const currentRadius = (baseTextureWidth * ballSprite.scale.x) / 2;

        // Handle left and right collisions with the level (wall bouncing)
        if (ballSprite.x - currentRadius <= levelX) {
          // Left edge - reflect angle
          ballSprite.x = levelX + currentRadius;
          angleInRadians = Math.PI - angleInRadians;
        } else if (ballSprite.x + currentRadius >= levelX + levelWidth) {
          // Right edge - reflect angle
          ballSprite.x = levelX + levelWidth - currentRadius;
          angleInRadians = Math.PI - angleInRadians;
        }

        // Collisions with the top of the level
        if (ballSprite.y - currentRadius <= levelY) {
          // Top collision - snap to grid
          ballSprite.y = levelY + currentRadius;
          snapBubbleToGrid(ballSprite, ballType, hexLayer);
          return;
        }

        // Check collisions with existing balls using circle intersection
        const touchedBall = checkBallCollisions(ballSprite, currentRadius);
        if (touchedBall) {
          snapBubbleToGrid(ballSprite, ballType, hexLayer);
          return;
        }

        // Continue animation
        requestAnimationFrame(animateBall);
      };

      // Start animation
      requestAnimationFrame(animateBall);
    }
  };

  // Check collisions with existing balls
  const checkBallCollisions = (ballSprite: Sprite, currentRadius: number) => {
    const hittableBallsLines = hexesRef.current.filter((line, index, arr) => {
      if (!line.some((item) => item.ball)) return false;
      const isCurLineFilled =
        line.filter((item) => item.ball).length !== getHexesCountInrow(index);
      const isNextLineFilled =
        arr[index + 1]?.filter((item) => item.ball)?.length !==
        getHexesCountInrow(index + 1);
      return isCurLineFilled || isNextLineFilled;
    });

    return hittableBallsLines.flat().find((item) => {
      if (!item.position || !item.ball) return false;
      const { x, y } = item.position;

      // Use circle intersection for proper collision detection
      return circleIntersection(
        ballSprite.x,
        ballSprite.y,
        currentRadius,
        x + hexSizeRef.current / 2,
        y + hexSizeRef.current / 2,
        hexSizeRef.current / 2
      );
    });
  };

  // Snap bubble to grid position
  const snapBubbleToGrid = (
    ballSprite: Sprite,
    ballType: (typeof ballKeys)[0],
    hexLayer: Container
  ) => {
    // Get the grid position
    const centerX = ballSprite.x;
    const centerY = ballSprite.y;
    const gridPos = getGridPosition(centerX, centerY, hexSizeRef.current, 0, 0);

    // Make sure the grid position is valid
    const clampedX = Math.max(0, Math.min(gridPos.x, HEX_IN_LINE - 1));
    const clampedY = Math.max(0, Math.min(gridPos.y, LINES_COUNT - 1));

    // Find the nearest empty position
    const nearestNeighbour = findNearestEmptyPosition(clampedX, clampedY);

    if (nearestNeighbour) {
      // Update hexes state
      setHexes((prev) => {
        const newHexes = [...prev];
        newHexes[nearestNeighbour.lineIndex] = [
          ...newHexes[nearestNeighbour.lineIndex],
        ];
        newHexes[nearestNeighbour.lineIndex][nearestNeighbour.colIndex] = {
          ...newHexes[nearestNeighbour.lineIndex][nearestNeighbour.colIndex],
          ball: ballType,
        };
        return newHexes;
      });

      // Update ready balls - remove the used ball and add a new one
      setReadyBalls((prev) => {
        const newBalls = [...prev];
        newBalls.shift(); // Remove the used ball
        newBalls.push(getRandomBall()); // Add a new random ball
        return newBalls;
      });
    }

    // Remove ball sprite
    hexLayer.removeChild(ballSprite);
    ballSprite.destroy();
  };

  // Find nearest empty position for ball placement
  const findNearestEmptyPosition = (gridX: number, gridY: number) => {
    // First try the exact grid position
    if (
      hexesRef.current[gridY]?.[gridX] &&
      !hexesRef.current[gridY][gridX].ball
    ) {
      return hexesRef.current[gridY][gridX];
    }

    // If not empty, find the nearest empty neighbor
    const targetHex = hexesRef.current[gridY]?.[gridX];
    if (targetHex) {
      const neighbours = getNeighbors(targetHex, hexesRef.current);
      let nearestValue: number | null = null;
      let nearestNeighbour: IHex | null = null;

      neighbours.forEach((item) => {
        if (!item.ball && item.position && targetHex.position) {
          // Use Euclidean distance for more accurate nearest neighbor calculation
          const dx = targetHex.position.x - item.position.x;
          const dy = targetHex.position.y - item.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (nearestValue === null || distance < nearestValue) {
            nearestValue = distance;
            nearestNeighbour = item;
          }
        }
      });

      return nearestNeighbour;
    }

    return null;
  };

  const onInitApp = (app: Application<ICanvas>, hexLayer: Container) => {
    (app.view as HTMLCanvasElement).addEventListener(
      "mousedown",
      (e: MouseEvent) => {
        strikeBall(app, hexLayer);
      }
    );
  };

  const { isInitialized, pixiContainer, appRef, hexLayerRef } =
    usePixi(onInitApp);

  const updateCanvas = () => {
    if (!pixiContainer.current || !hexLayerRef.current) return;

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
      const hexesInRow = getHexesCountInrow(l);
      const isOdd = hexesInRow < HEX_IN_LINE; // l % 2 === 1;
      for (let i = 0; i < hexesInRow; i++) {
        const x = i * hexSize + (isOdd ? hexSize / 2 : 0);
        const y = l * hexSize * 0.8; // Vertical spacing for hex grid
        updatingHexes[l][i].position = { x, y };
        // Create sprite with the ball image
        const curBall = hexes[l]?.[i].ball;
        if (curBall) {
          const ballType = curBall;
          const sprite = new Sprite(BALLS[ballType]);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, hexesWithBalls.length]);

  return (
    <div className={styles.bubbleFrontMainCanvas}>
      <div
        ref={pixiContainer}
        className={styles.bubbleFrontMainCanvas__container}
      ></div>
    </div>
  );
};

export default BubbleFrontMainCanvas;
