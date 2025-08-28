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
  const hexesInRow = getHexesCountInrow(hex.lineIndex); // Even or odd row
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
    if (hexes?.[nx]?.[ny]) {
      neighbors.push(hexes[ny][nx]);
    }
  }

  return neighbors;
};
const BubbleFrontMainCanvas = () => {
  const [hexes, setHexes] = useState<IHex[][]>(generateRandomBallsArr());
  const [readyBalls, setReadyBalls] = useState(
    Array.from({ length: 2 }, () => getRandomBall())
  );
  const [hexSize, setHexSize] = useState(0);
  const hexSizeRef = useCopyRef(hexSize);
  const hexesRef = useCopyRef(hexes);
  const hexesWithBalls = hexes.flat().filter((item) => item.ball);

  const strikeBall = (app: Application<ICanvas>, hexLayer: Container) => {
    const { centerX, centerY, rotation } = getGunSettings();

    // Create sprite with readyBalls[0]
    if (readyBalls.length > 0) {
      const ballType = readyBalls[0];

      const ballSprite = new Sprite(BALLS[ballType]);

      const canvasRect = app.view.getBoundingClientRect?.();
      ballSprite.anchor.set(0.5);
      ballSprite.scale.set(0);
      ballSprite.x = centerX - (canvasRect?.x || 0);
      ballSprite.y = centerY - (canvasRect?.y || 0);

      // Add ball to the hex layer
      hexLayer.addChild(ballSprite);

      // Calculate movement direction based on rotation
      // Adjust for -90 degree offset and convert to radians
      const angleInRadians = ((rotation + 90) * Math.PI) / 180;
      const moveSpeed = 8; // Adjust speed as needed
      const scaleSpeed = 0.03; // Adjust speed as needed (0..1 per frame)
      let velocityX = Math.cos(angleInRadians) * moveSpeed;
      let velocityY = Math.sin(angleInRadians) * moveSpeed;

      // Determine target scale so that final visual size equals hex size
      const baseTextureWidth =
        ballSprite.texture.orig?.width || ballSprite.texture.width;
      const targetScale =
        baseTextureWidth > 0 ? hexSizeRef.current / baseTextureWidth : 1;

      const hittableBallsLines = hexesRef.current.filter((line, index, arr) => {
        if (!line.some((item) => item.ball)) return false;
        const isCurLineFilled =
          line.filter((item) => item.ball).length !== getHexesCountInrow(index);
        const isNextLineFilled =
          arr[index + 1]?.filter((item) => item.ball)?.length !==
          getHexesCountInrow(index + 1);
        return isCurLineFilled || isNextLineFilled;
      });

      // Animation function
      const animateBall = () => {
        ballSprite.x -= velocityX;
        ballSprite.y -= velocityY;

        // Smoothly scale up to target size
        const currentScale = ballSprite.scale.x; // uniform scale
        if (currentScale < targetScale) {
          const nextScale = Math.min(currentScale + scaleSpeed, targetScale);
          ballSprite.scale.set(nextScale);
        }

        // Compute current radius for collision (texture size * scale / 2)
        const currentRadius = (baseTextureWidth * ballSprite.scale.x) / 2;

        // Bounce on left/right walls
        if (ballSprite.x - currentRadius <= 0) {
          ballSprite.x = currentRadius;
          velocityX = -velocityX;
        } else if (ballSprite.x + currentRadius >= app.screen.width) {
          ballSprite.x = app.screen.width - currentRadius;
          velocityX = -velocityX;
        }

        // check touch to grid balls
        const touchedBall = hittableBallsLines.flat().find((item) => {
          if (!item.position || !item.ball) return false;
          const { x, y } = item.position;
          // Calculate the distance between the moving ball and the grid ball
          const dx =
            ballSprite.x +
            hexSizeRef.current / 2 -
            (x + hexSizeRef.current / 2);
          const dy =
            ballSprite.y +
            hexSizeRef.current / 2 -
            (y + hexSizeRef.current / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Assume grid balls are scaled to hexSize, so their radius is hexSize / 2
          const gridBallRadius = hexSizeRef.current / 2;
          // Use the current moving ball radius
          const movingBallRadius = (baseTextureWidth * ballSprite.scale.x) / 2;

          // If the distance is less than the sum of the radii, they touch
          return distance <= 60;
        });

        if (!touchedBall) {
          requestAnimationFrame(animateBall);
        } else {
          const neighbours = getNeighbors(touchedBall, hexesRef.current);
          let nearestValue = 0;
          let nearestNeighbour = neighbours[0];

          neighbours.forEach((item) => {
            if (!item.ball && item.position && touchedBall.position) {
              const value =
                Math.abs(touchedBall.position.x - item.position.x) +
                Math.abs(touchedBall.position.y - item.position.y);
              if (value < nearestValue) {
                nearestValue = value;
                nearestNeighbour = item;
              }
            }
          });
          debugger;
          setHexes((prev) => {
            const newHexes = [...prev];

            newHexes[nearestNeighbour.lineIndex] = [
              ...newHexes[nearestNeighbour.lineIndex],
            ];
            newHexes[nearestNeighbour.lineIndex][nearestNeighbour.colIndex] = {
              ...newHexes[nearestNeighbour.lineIndex][
                nearestNeighbour.colIndex
              ],
              ball: ballType,
            };

            return newHexes;
          });
          // Remove ball when it goes off screen or exceeds bounces
          hexLayer.removeChild(ballSprite);
          ballSprite.destroy();
        }
      };

      // Start animation
      animateBall();
    }
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
